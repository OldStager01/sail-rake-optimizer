import {
  Train,
  MapPin,
  Package,
  DollarSign,
  Clock,
  Download,
} from "lucide-react";
import OptimizationPanel from "../components/OptimizationPanel";
import DataTable from "../components/DataTable";
import { optimizedRakePlan, costBreakdown } from "../data/mockData";
import {
  formatCurrency,
  formatDateTime,
  getStatusColor,
} from "../utils/helpers";

const RakeFormation = () => {
  const planColumns = [
    {
      header: "Rake ID",
      accessor: "rakeId",
      render: (row) => (
        <div className="flex items-center space-x-2">
          <Train className="w-4 h-4 text-sail-blue" />
          <span className="font-semibold">{row.rakeId}</span>
        </div>
      ),
    },
    {
      header: "Orders",
      accessor: "orders",
      render: (row) => row.orders.join(", "),
    },
    { header: "Stockyard", accessor: "stockyard" },
    { header: "Loading Point", accessor: "loadingPoint" },
    { header: "Destination", accessor: "destination" },
    {
      header: "Utilization",
      accessor: "utilization",
      render: (row) => (
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                row.utilization > 95 ? "bg-green-500" : "bg-yellow-500"
              }`}
              style={{ width: `${row.utilization}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{row.utilization}%</span>
        </div>
      ),
    },
    {
      header: "Cost",
      accessor: "cost",
      render: (row) => (
        <div>
          <p className="font-semibold">{formatCurrency(row.cost)}</p>
          <p className="text-xs text-green-600">
            Save {formatCurrency(row.savings)}
          </p>
        </div>
      ),
    },
    {
      header: "Dispatch",
      accessor: "dispatchTime",
      render: (row) => (
        <span className="text-sm">{formatDateTime(row.dispatchTime)}</span>
      ),
    },
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
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            AI-Powered Rake Formation
          </h2>
          <p className="text-gray-600 mt-1">
            Optimize rake composition for maximum efficiency and cost savings
          </p>
        </div>
        <button className="btn-secondary flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Plan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Optimized Rake Plans
            </h3>
            <DataTable columns={planColumns} data={optimizedRakePlan} />
          </div>
        </div>

        <div className="space-y-6">
          <OptimizationPanel />

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Cost Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Loading Costs</span>
                <span className="font-semibold">
                  {formatCurrency(costBreakdown.loading)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Transport Costs</span>
                <span className="font-semibold">
                  {formatCurrency(costBreakdown.transport)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-green-600">Demurrage Saved</span>
                <span className="font-semibold text-green-700">
                  {formatCurrency(costBreakdown.saved_demurrage)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-green-600">Penalty Saved</span>
                <span className="font-semibold text-green-700">
                  {formatCurrency(costBreakdown.saved_penalty)}
                </span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900 font-semibold">
                    Total Cost
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {formatCurrency(costBreakdown.total_cost)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-semibold">
                    Total Savings
                  </span>
                  <span className="text-xl font-bold text-green-700">
                    {formatCurrency(costBreakdown.total_savings)}
                  </span>
                </div>
              </div>
              <div className="bg-sail-blue text-white p-3 rounded-lg text-center">
                <p className="text-sm mb-1">Efficiency Gain</p>
                <p className="text-2xl font-bold">
                  {costBreakdown.efficiency_gain}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Dispatch Schedule Timeline
        </h3>
        <div className="relative">
          {optimizedRakePlan.map((plan, index) => (
            <div
              key={plan.id}
              className="flex items-center space-x-4 mb-6 last:mb-0"
            >
              <div className="flex-shrink-0 w-32 text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {formatDateTime(plan.dispatchTime)}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-4 h-4 bg-sail-blue rounded-full border-4 border-blue-200"></div>
              </div>
              <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {plan.rakeId} → {plan.destination}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {plan.totalWeight} MT • {plan.utilization}% Utilization •
                      ETA: {formatDateTime(plan.eta)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Cost Savings</p>
                    <p className="font-bold text-green-600">
                      {formatCurrency(plan.savings)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RakeFormation;
