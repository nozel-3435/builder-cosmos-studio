import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { productsService, type Product, type ProductFilter, type CreateProductData, type UpdateProductData } from '@/services/products';
import { toast } from 'sonner';

// Query keys for React Query
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilter) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
  categories: () => ['categories'] as const,
  subcategories: (categoryId: string) => ['subcategories', categoryId] as const,
  popular: () => [...productKeys.all, 'popular'] as const,
  featured: () => [...productKeys.all, 'featured'] as const,
};

/**
 * Hook for fetching products with filters and pagination
 */
export const useProducts = (filters: ProductFilter = {}) => {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productsService.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook for fetching a single product
 */
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsService.getProduct(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook for searching products
 */
export const useProductSearch = (query: string, filters: Omit<ProductFilter, 'search'> = {}) => {
  return useQuery({
    queryKey: productKeys.search(query),
    queryFn: () => productsService.searchProducts(query, filters),
    enabled: query.length >= 2, // Only search when query is at least 2 characters
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook for fetching popular products
 */
export const usePopularProducts = (limit: number = 10) => {
  return useQuery({
    queryKey: productKeys.popular(),
    queryFn: () => productsService.getPopularProducts(limit),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

/**
 * Hook for fetching featured products
 */
export const useFeaturedProducts = (limit: number = 8) => {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: () => productsService.getFeaturedProducts(limit),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

/**
 * Hook for fetching categories
 */
export const useCategories = () => {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: () => productsService.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

/**
 * Hook for fetching subcategories
 */
export const useSubcategories = (categoryId: string) => {
  return useQuery({
    queryKey: productKeys.subcategories(categoryId),
    queryFn: () => productsService.getSubcategories(categoryId),
    enabled: !!categoryId,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

/**
 * Hook for creating a new product
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductData) => productsService.createProduct(data),
    onSuccess: (newProduct) => {
      // Invalidate and refetch products lists
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.popular() });
      queryClient.invalidateQueries({ queryKey: productKeys.featured() });
      
      toast.success('Produit créé avec succès !');
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'Erreur lors de la création du produit';
      toast.error(message);
    },
  });
};

/**
 * Hook for updating a product
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductData) => productsService.updateProduct(data),
    onSuccess: (updatedProduct) => {
      // Update the specific product in cache
      queryClient.setQueryData(
        productKeys.detail(updatedProduct.id),
        updatedProduct
      );
      
      // Invalidate lists to ensure consistency
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.popular() });
      queryClient.invalidateQueries({ queryKey: productKeys.featured() });
      
      toast.success('Produit mis à jour avec succès !');
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'Erreur lors de la mise à jour du produit';
      toast.error(message);
    },
  });
};

/**
 * Hook for deleting a product
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsService.deleteProduct(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });
      
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.popular() });
      queryClient.invalidateQueries({ queryKey: productKeys.featured() });
      
      toast.success('Produit supprimé avec succès !');
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'Erreur lors de la suppression du produit';
      toast.error(message);
    },
  });
};

/**
 * Hook for advanced product filtering with state management
 */
export const useProductFilters = (initialFilters: ProductFilter = {}) => {
  const [filters, setFilters] = useState<ProductFilter>(initialFilters);
  const [debouncedFilters, setDebouncedFilters] = useState<ProductFilter>(initialFilters);

  // Debounce filters to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  const updateFilter = (key: keyof ProductFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const updateFilters = (newFilters: Partial<ProductFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const clearFilter = (key: keyof ProductFilter) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  return {
    filters,
    debouncedFilters,
    updateFilter,
    updateFilters,
    resetFilters,
    clearFilter,
  };
};

/**
 * Hook for product search with debouncing
 */
export const useProductSearchWithDebounce = (initialQuery: string = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const searchResults = useProductSearch(debouncedQuery);

  return {
    query,
    setQuery,
    debouncedQuery,
    searchResults,
    isSearching: query !== debouncedQuery,
  };
};

/**
 * Hook for managing product pagination
 */
export const useProductPagination = (itemsPerPage: number = 20) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const offset = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);
  const resetPagination = () => setCurrentPage(1);

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    offset,
    setTotalItems,
    goToPage,
    nextPage,
    prevPage,
    resetPagination,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

/**
 * Hook that combines products fetching with filtering and pagination
 */
export const useProductsWithFilters = (initialFilters: ProductFilter = {}) => {
  const { filters, debouncedFilters, updateFilter, updateFilters, resetFilters } = useProductFilters(initialFilters);
  const pagination = useProductPagination();

  const productsQuery = useProducts({
    ...debouncedFilters,
    limit: pagination.itemsPerPage,
    offset: pagination.offset,
  });

  // Update total items when data changes
  useEffect(() => {
    if (productsQuery.data?.count !== undefined) {
      pagination.setTotalItems(productsQuery.data.count);
    }
  }, [productsQuery.data?.count]);

  // Reset pagination when filters change
  useEffect(() => {
    pagination.resetPagination();
  }, [debouncedFilters]);

  return {
    products: productsQuery.data?.data || [],
    totalProducts: productsQuery.data?.count || 0,
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    error: productsQuery.error,
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    pagination,
    refetch: productsQuery.refetch,
  };
};
