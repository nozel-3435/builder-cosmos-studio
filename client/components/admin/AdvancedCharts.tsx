import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

interface ChartData {
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
}

const AdvancedCharts = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [selectedChart, setSelectedChart] = useState("revenue");

  // Mock data - dans une vraie app, ces données viendraient de l'API
  const chartData = {
    revenue: [
      { name: "Lun", value: 2400, previousValue: 2100 },
      { name: "Mar", value: 1398, previousValue: 1200 },
      { name: "Mer", value: 9800, previousValue: 8500 },
      { name: "Jeu", value: 3908, previousValue: 3200 },
      { name: "Ven", value: 4800, previousValue: 4100 },
      { name: "Sam", value: 3800, previousValue: 3500 },
      { name: "Dim", value: 4300, previousValue: 3900 },
    ],
    orders: [
      { name: "Lun", value: 45, previousValue: 38 },
      { name: "Mar", value: 32, previousValue: 29 },
      { name: "Mer", value: 78, previousValue: 65 },
      { name: "Jeu", value: 56, previousValue: 48 },
      { name: "Ven", value: 89, previousValue: 72 },
      { name: "Sam", value: 67, previousValue: 58 },
      { name: "Dim", value: 54, previousValue: 49 },
    ],
    users: [
      { name: "Lun", value: 12, previousValue: 8 },
      { name: "Mar", value: 19, previousValue: 15 },
      { name: "Mer", value: 25, previousValue: 20 },
      { name: "Jeu", value: 18, previousValue: 14 },
      { name: "Ven", value: 23, previousValue: 19 },
      { name: "Sam", value: 31, previousValue: 25 },
      { name: "Dim", value: 28, previousValue: 22 },
    ],
    products: [
      { name: "Lun", value: 8, previousValue: 5 },
      { name: "Mar", value: 12, previousValue: 9 },
      { name: "Mer", value: 15, previousValue: 11 },
      { name: "Jeu", value: 9, previousValue: 7 },
      { name: "Ven", value: 18, previousValue: 14 },
      { name: "Sam", value: 22, previousValue: 18 },
      { name: "Dim", value: 16, previousValue: 12 },
    ],
  };

  const chartConfigs = {
    revenue: {
      title: "Revenus",
      icon: DollarSign,
      color: "linka-green",
      unit: "FCFA",
      format: (value: number) => `${(value / 1000).toFixed(1)}k`,
    },
    orders: {
      title: "Commandes",
      icon: ShoppingCart,
      color: "linka-orange",
      unit: "",
      format: (value: number) => value.toString(),
    },
    users: {
      title: "Nouveaux utilisateurs",
      icon: Users,
      color: "blue-500",
      unit: "",
      format: (value: number) => value.toString(),
    },
    products: {
      title: "Nouveaux produits",
      icon: Package,
      color: "purple-500",
      unit: "",
      format: (value: number) => value.toString(),
    },
  };

  const currentData = chartData[selectedChart as keyof typeof chartData];
  const config = chartConfigs[selectedChart as keyof typeof chartConfigs];

  const maxValue = Math.max(...currentData.map((d) => d.value));

  const calculateTrend = () => {
    const totalCurrent = currentData.reduce((sum, item) => sum + item.value, 0);
    const totalPrevious = currentData.reduce(
      (sum, item) => sum + (item.previousValue || 0),
      0,
    );
    const change = ((totalCurrent - totalPrevious) / totalPrevious) * 100;
    return {
      value: change,
      isPositive: change > 0,
      formatted: `${change > 0 ? "+" : ""}${change.toFixed(1)}%`,
    };
  };

  const trend = calculateTrend();

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Analytics avancées
            </h2>
            <p className="text-gray-600">
              Visualisez les performances de votre plateforme
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Period Selector */}
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
            >
              <option value="24h">Dernières 24h</option>
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="90d">3 derniers mois</option>
            </select>

            {/* Chart Type Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {Object.entries(chartConfigs).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedChart(key)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedChart === key
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{config.title}</span>
                  </button>
                );
              })}
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 bg-${config.color}/10 rounded-lg`}
              style={{
                backgroundColor: `var(--color-${config.color.replace("-", "")}, rgba(111, 207, 151, 0.1))`,
              }}
            >
              <config.icon
                className={`w-6 h-6 text-${config.color}`}
                style={{
                  color: config.color.includes("linka")
                    ? config.color === "linka-green"
                      ? "#6FCF97"
                      : "#F2994A"
                    : undefined,
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {config.title}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {config.format(
                    currentData.reduce((sum, item) => sum + item.value, 0),
                  )}
                </span>
                <div
                  className={`flex items-center space-x-1 text-sm ${
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendingUp
                    className={`w-4 h-4 ${!trend.isPositive ? "rotate-180" : ""}`}
                  />
                  <span>{trend.formatted}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Bar Chart */}
        <div className="relative">
          <div className="flex items-end justify-between h-64 space-x-2">
            {currentData.map((item, index) => {
              const height = (item.value / maxValue) * 100;
              const prevHeight = ((item.previousValue || 0) / maxValue) * 100;

              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center space-y-2"
                >
                  <div className="w-full relative flex items-end justify-center space-x-1">
                    {/* Previous period bar (background) */}
                    <div
                      className="w-full bg-gray-200 rounded-t-sm opacity-50 transition-all duration-700 ease-out"
                      style={{
                        height: `${prevHeight}%`,
                        minHeight: "4px",
                      }}
                    />
                    {/* Current period bar */}
                    <div
                      className={`w-full rounded-t-sm transition-all duration-700 ease-out delay-${index * 100}`}
                      style={{
                        height: `${height}%`,
                        minHeight: "4px",
                        backgroundColor:
                          config.color === "linka-green"
                            ? "#6FCF97"
                            : config.color === "linka-orange"
                              ? "#F2994A"
                              : config.color === "blue-500"
                                ? "#3B82F6"
                                : "#8B5CF6",
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-900 font-semibold">
                    {config.format(item.value)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-gray-500">
            <span>{config.format(maxValue)}</span>
            <span>{config.format(Math.floor(maxValue * 0.75))}</span>
            <span>{config.format(Math.floor(maxValue * 0.5))}</span>
            <span>{config.format(Math.floor(maxValue * 0.25))}</span>
            <span>0</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{
                backgroundColor:
                  config.color === "linka-green"
                    ? "#6FCF97"
                    : config.color === "linka-orange"
                      ? "#F2994A"
                      : config.color === "blue-500"
                        ? "#3B82F6"
                        : "#8B5CF6",
              }}
            />
            <span className="text-sm text-gray-700">Période actuelle</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-sm bg-gray-300" />
            <span className="text-sm text-gray-700">Période précédente</span>
          </div>
        </div>
      </div>

      {/* Mini Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(chartConfigs).map(([key, config]) => {
          const data = chartData[key as keyof typeof chartData];
          const total = data.reduce((sum, item) => sum + item.value, 0);
          const prevTotal = data.reduce(
            (sum, item) => sum + (item.previousValue || 0),
            0,
          );
          const change = ((total - prevTotal) / prevTotal) * 100;
          const Icon = config.icon;

          return (
            <div key={key} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`p-2 bg-${config.color}/10 rounded-lg`}
                  style={{
                    backgroundColor: `var(--color-${config.color.replace("-", "")}, rgba(111, 207, 151, 0.1))`,
                  }}
                >
                  <Icon
                    className={`w-4 h-4 text-${config.color}`}
                    style={{
                      color: config.color.includes("linka")
                        ? config.color === "linka-green"
                          ? "#6FCF97"
                          : "#F2994A"
                        : undefined,
                    }}
                  />
                </div>
                <div
                  className={`text-xs flex items-center space-x-1 ${
                    change > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendingUp
                    className={`w-3 h-3 ${change < 0 ? "rotate-180" : ""}`}
                  />
                  <span>
                    {change > 0 ? "+" : ""}
                    {change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-xl font-bold text-gray-900">
                  {config.format(total)}
                </div>
                <div className="text-sm text-gray-600">{config.title}</div>
              </div>
              {/* Mini sparkline */}
              <div className="flex items-end space-x-1 h-8">
                {data.map((item, index) => {
                  const height =
                    (item.value / Math.max(...data.map((d) => d.value))) * 100;
                  return (
                    <div
                      key={index}
                      className="flex-1 rounded-t-sm transition-all duration-500"
                      style={{
                        height: `${height}%`,
                        backgroundColor:
                          config.color === "linka-green"
                            ? "#6FCF97"
                            : config.color === "linka-orange"
                              ? "#F2994A"
                              : config.color === "blue-500"
                                ? "#3B82F6"
                                : "#8B5CF6",
                        minHeight: "2px",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdvancedCharts;
