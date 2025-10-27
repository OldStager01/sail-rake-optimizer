import { Train, TrendingUp, Package, Clock } from "lucide-react";
import MetricCard from "../components/MetricCard";
import DataTable from "../components/DataTable";
import { metrics, rakeAvailability } from "../data/mockData";
import {
  getPriorityColor,
  getStatusColor,
  formatCurrency,
} from "../utils/helpers";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Dashboard = ({ orders = [] }) => {
  const utilizationData = [
    { month: "Apr", utilization: 82 },
    { month: "May", utilization: 78 },
    { month: "Jun", utilization: 85 },
    { month: "Jul", utilization: 88 },
    { month: "Aug", utilization: 91 },
    { month: "Sep", utilization: 94.2 },
  ];

  const costData = [
    { month: "Apr", cost: 1250000, savings: 85000 },
    { month: "May", cost: 1180000, savings: 120000 },
    { month: "Jun", cost: 1320000, savings: 95000 },
    { month: "Jul", cost: 1090000, savings: 165000 },
    { month: "Aug", cost: 1150000, savings: 178000 },
    { month: "Sep", cost: 1015000, savings: 192000 },
  ];

  const orderColumns = [
    { header: "Order ID", accessor: "id" },
    { header: "Customer", accessor: "customer" },
    { header: "Material", accessor: "material" },
    {
      header: "Priority",
      accessor: "priority",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
            row.priority
          )}`}
        >
          {row.priority}
        </span>
      ),
    },
    { header: "Destination", accessor: "destination" },
  ];

  const rakeColumns = [
    { header: "Rake ID", accessor: "id" },
    { header: "Type", accessor: "type" },
    { header: "Wagons", accessor: "wagons" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            row.status
          )}`}
        >
          {row.status}
        </span>
      ),
    },
    { header: "Location", accessor: "location" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 mt-1">
            Real-time insights into rake formation and logistics operations
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last Updated</p>
          <p className="text-sm font-semibold text-gray-900">
            {new Date().toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Active Rakes"
          value={metrics.activeRakes}
          unit={`/ ${metrics.totalRakes}`}
          trend={12}
          icon={Train}
          color="blue"
        />
        <MetricCard
          title="Utilization Rate"
          value={metrics.utilizationRate}
          unit="%"
          trend={8.5}
          icon={TrendingUp}
          color="green"
        />
        <MetricCard
          title="Cost Savings (Monthly)"
          value={formatCurrency(metrics.costSavings)}
          trend={15.2}
          icon={Package}
          color="orange"
        />
        <MetricCard
          title="On-Time Delivery"
          value={metrics.onTimeDelivery}
          unit="%"
          trend={4.3}
          icon={Clock}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Rake Utilization Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="utilization"
                stroke="#003366"
                strokeWidth={2}
                name="Utilization %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Cost vs Savings Analysis
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cost" fill="#003366" name="Total Cost" />
              <Bar dataKey="savings" fill="#FF6B35" name="Savings" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Pending High-Priority Orders
          </h3>
          <DataTable
            columns={orderColumns}
            data={orders.filter((o) => o.priority === "High")}
          />
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Available Rakes
          </h3>
          <DataTable
            columns={rakeColumns}
            data={rakeAvailability.filter((r) => r.status === "Available")}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
