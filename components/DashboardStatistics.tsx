'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface DashboardStatisticsProps {
  stats: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: string;
  }>;
}

export function DashboardStatistics({ stats }: DashboardStatisticsProps) {
  // Datos de ejemplo para el gráfico de barras (ventas por mes)
  const salesData = [
    { mes: "Ene", ventas: 1200 },
    { mes: "Feb", ventas: 2100 },
    { mes: "Mar", ventas: 800 },
    { mes: "Abr", ventas: 1600 },
    { mes: "May", ventas: 900 },
    { mes: "Jun", ventas: 1700 },
  ];

  // Datos de ejemplo para productos más vendidos
  const topProducts = [
    { name: "Gomitas", value: 320 },
    { name: "Chocolates", value: 210 },
    { name: "Paletas", value: 180 },
    { name: "Caramelos", value: 140 },
    { name: "Chicles", value: 90 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <>
      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 mx-auto my-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl shadow-md p-6 flex flex-col items-center justify-center bg-white dark:bg-zinc-800 ${stat.color || ""}`}
          >
            {stat.icon && <div className="mb-2 text-3xl">{stat.icon}</div>}
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="mt-1 text-default-500">{stat.label}</div>
          </div>
        ))}
      </div>
      {/* Gráfico de barras de ventas por mes */}
      <div className="w-full max-w-3xl p-6 mx-auto mb-8 bg-white shadow-md dark:bg-zinc-800 dark:text-white rounded-xl">
        <h2 className="mb-4 text-lg font-semibold">Ventas por mes</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ventas" fill="#8884d8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Gráfico de pastel de productos más vendidos */}
      <div className="w-full max-w-3xl p-6 mx-auto bg-white shadow-md dark:bg-zinc-800 dark:text-white rounded-xl">
        <h2 className="mb-4 text-lg font-semibold">Productos más vendidos</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={topProducts}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {topProducts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
