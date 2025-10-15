import { TrendingUp, DollarSign, Clock, Target } from "lucide-react";
import MetricCard from "../components/MetricCard";
import DataTable from "../components/DataTable";
import { productWagonMatrix, costBreakdown } from "../data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const Analytics = () => {
  const performanceData = [
    { metric: "Utilization", current: 94.2, target: 95 },
    { metric: "On-Time", current: 96.5, target: 98 },
    { metric: "Cost Efficiency", current: 88, target: 90 },
    { metric: "Load Time", current: 92, target: 95 },
    { metric: "Route Optimization", current: 91, target: 93 },
  ];

  const monthlyPerformance = [
    { month: "Apr", rakes: 45, onTime: 93, cost: 1250000 },
    { month: "May", rakes: 48, onTime: 94, cost: 1180000 },
    { month: "Jun", rakes: 52, onTime: 95, cost: 1320000 },
    { month: "Jul", rakes: 55, onTime: 95.5, cost: 1090000 },
    { month: "Aug", rakes: 58, onTime: 96, cost: 1150000 },
    { month: "Sep", rakes: 60, onTime: 96.5, cost: 1015000 },
  ];

  const matrixColumns = [
    { header: "Product Type", accessor: "product" },
    {
      header: "BOXN",
      accessor: "BOXN",
      render: (row) => (row.BOXN === "Yes" ? "✓" : "✗"),
    },
    {
      header: "BOXNHL",
      accessor: "BOXNHL",
      render: (row) => (row.BOXNHL === "Yes" ? "✓" : "✗"),
    },
    {
      header: "BCN",
      accessor: "BCN",
      render: (row) => (row.BCN === "Yes" ? "✓" : "✗"),
    },
    {
      header: "BCNA",
      accessor: "BCNA",
      render: (row) => (row.BCNA === "Yes" ? "✓" : "✗"),
    },
    {
      header: "Optimal Wagon",
      accessor: "optimal",
      render: (row) => (
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          {row.optimal}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Analytics & Insights
        </h2>
        <p className="text-gray-600 mt-1">
          Comprehensive performance metrics and optimization insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Avg. Rake Utilization"
          value={94.2}
          unit="%"
          trend={8.5}
          icon={TrendingUp}
          color="blue"
        />
        <MetricCard
          title="Monthly Cost Savings"
          value="₹1.92L"
          trend={15.2}
          icon={DollarSign}
          color="green"
        />
        <MetricCard
          title="Avg. Loading Time"
          value={4.2}
          unit="hrs"
          trend={-12.5}
          icon={Clock}
          color="orange"
        />
        <MetricCard
          title="SLA Compliance"
          value={96.5}
          unit="%"
          trend={4.3}
          icon={Target}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance vs Target
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Current"
                dataKey="current"
                stroke="#003366"
                fill="#003366"
                fillOpacity={0.6}
              />
              <Radar
                name="Target"
                dataKey="target"
                stroke="#FF6B35"
                fill="#FF6B35"
                fillOpacity={0.3}
              />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="rakes"
                fill="#003366"
                name="Rakes Formed"
              />
              <Bar
                yAxisId="right"
                dataKey="onTime"
                fill="#FF6B35"
                name="On-Time %"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Product-Wagon Type Compatibility Matrix
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          AI-recommended optimal wagon types for each product category
        </p>
        <DataTable columns={matrixColumns} data={productWagonMatrix} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Cost Optimization Impact
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Loading Efficiency
                </span>
                <span className="text-sm font-semibold">18.5% ↑</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Route Optimization
                </span>
                <span className="text-sm font-semibold">22.3% ↑</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Demurrage Reduction
                </span>
                <span className="text-sm font-semibold">35.7% ↓</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Key Recommendations
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">●</span>
              <p className="text-sm text-gray-700">
                Prioritize BOXNHL wagons for HR Coil to improve utilization by
                8%
              </p>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">●</span>
              <p className="text-sm text-gray-700">
                Club Jamshedpur orders to reduce transport cost by ₹45K
              </p>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-orange-500 mt-1">●</span>
              <p className="text-sm text-gray-700">
                Increase LP-03 usage during peak hours for better throughput
              </p>
            </li>
          </ul>
        </div>

        <div className="card bg-gradient-to-br from-sail-blue to-blue-900 text-white">
          <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
          <div className="space-y-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-2xl font-bold mb-1">₹1.92L</p>
              <p className="text-sm text-blue-100">Total savings this month</p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-2xl font-bold mb-1">94.2%</p>
              <p className="text-sm text-blue-100">Average utilization rate</p>
            </div>
            <p className="text-xs text-blue-100 mt-4">
              AI model confidence: 96.8% | Last trained: Oct 10, 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
