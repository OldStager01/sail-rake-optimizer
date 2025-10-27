import {
  Train,
  MapPin,
  Package,
  DollarSign,
  Clock,
  Download,
  Plus,
  Edit,
  Save,
  X,
} from "lucide-react";
import { useState } from "react";
import OptimizationPanel from "../components/OptimizationPanel";
import DataTable from "../components/DataTable";
import {
  optimizedRakePlan,
  costBreakdown,
  pendingOrders,
  rakeAvailability,
  loadingPoints,
  stockyards,
} from "../data/mockData";
import {
  formatCurrency,
  formatDateTime,
  getStatusColor,
} from "../utils/helpers";

const RakeFormation = () => {
  const [plans, setPlans] = useState(optimizedRakePlan);
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [manualPlan, setManualPlan] = useState({
    rakeId: "",
    orders: [],
    stockyard: "",
    loadingPoint: "",
    destination: "",
    dispatchTime: "",
  });

  const exportToCSV = () => {
    const headers = [
      "Rake ID",
      "Orders",
      "Stockyard",
      "Loading Point",
      "Destination",
      "Weight (MT)",
      "Utilization (%)",
      "Cost (₹)",
      "Savings (₹)",
      "Dispatch Time",
      "ETA",
      "Status",
    ];
    const rows = plans.map((plan) => [
      plan.rakeId,
      plan.orders.join("; "),
      plan.stockyard,
      plan.loadingPoint,
      plan.destination,
      plan.totalWeight,
      plan.utilization,
      plan.cost,
      plan.savings,
      plan.dispatchTime,
      plan.eta,
      plan.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rake_formation_plan_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
  };

  const exportToPDF = () => {
    const printWindow = window.open("", "_blank");
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Rake Formation Plan - SAIL</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { color: #003366; font-size: 24px; font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #003366; color: white; }
          .summary { background: #f5f7fa; padding: 15px; margin: 20px 0; border-radius: 8px; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">SAIL - Rake Formation Plan</div>
          <p>Steel Authority of India Limited | Bokaro Steel Plant</p>
          <p>Generated on: ${new Date().toLocaleString("en-IN")}</p>
        </div>
        
        <div class="summary">
          <h3>Cost Summary</h3>
          <p><strong>Total Cost:</strong> ${formatCurrency(
            costBreakdown.total_cost
          )}</p>
          <p><strong>Total Savings:</strong> ${formatCurrency(
            costBreakdown.total_savings
          )}</p>
          <p><strong>Efficiency Gain:</strong> ${
            costBreakdown.efficiency_gain
          }%</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Rake ID</th>
              <th>Orders</th>
              <th>Stockyard</th>
              <th>Loading Point</th>
              <th>Destination</th>
              <th>Weight (MT)</th>
              <th>Utilization</th>
              <th>Cost</th>
              <th>Dispatch Time</th>
            </tr>
          </thead>
          <tbody>
            ${plans
              .map(
                (plan) => `
              <tr>
                <td>${plan.rakeId}</td>
                <td>${plan.orders.join(", ")}</td>
                <td>${plan.stockyard}</td>
                <td>${plan.loadingPoint}</td>
                <td>${plan.destination}</td>
                <td>${plan.totalWeight}</td>
                <td>${plan.utilization}%</td>
                <td>${formatCurrency(plan.cost)}</td>
                <td>${formatDateTime(plan.dispatchTime)}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div class="footer">
          <p>This is a system-generated report from SAIL Rake Optimization System</p>
          <p>Ministry of Steel, Government of India</p>
        </div>
      </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleCreateManualPlan = () => {
    if (
      !manualPlan.rakeId ||
      !manualPlan.loadingPoint ||
      !manualPlan.destination ||
      manualPlan.orders.length === 0
    ) {
      alert("Please fill all required fields");
      return;
    }

    const selectedOrders = pendingOrders.filter((o) =>
      manualPlan.orders.includes(o.id)
    );
    const totalWeight = selectedOrders.reduce(
      (sum, order) => sum + parseInt(order.quantity),
      0
    );
    const selectedRake = rakeAvailability.find(
      (r) => r.id === manualPlan.rakeId
    );
    const utilization = (
      (totalWeight / (selectedRake.capacity * selectedRake.wagons)) *
      100
    ).toFixed(1);

    const newPlan = {
      id: `RAKE-PLAN-${String(plans.length + 1).padStart(3, "0")}`,
      rakeId: manualPlan.rakeId,
      orders: manualPlan.orders,
      stockyard: manualPlan.stockyard,
      loadingPoint: manualPlan.loadingPoint,
      destination: manualPlan.destination,
      totalWeight: totalWeight,
      utilization: parseFloat(utilization),
      cost: totalWeight * 450,
      savings: totalWeight * 85,
      dispatchTime: manualPlan.dispatchTime,
      eta: new Date(
        new Date(manualPlan.dispatchTime).getTime() + 48 * 60 * 60 * 1000
      )
        .toISOString()
        .slice(0, 16)
        .replace("T", " "),
      status: "Manual",
      route: "TBD",
      distance: 0,
      estimatedFuel: 0,
    };

    setPlans([...plans, newPlan]);
    setIsCreatingPlan(false);
    setManualPlan({
      rakeId: "",
      orders: [],
      stockyard: "",
      loadingPoint: "",
      destination: "",
      dispatchTime: "",
    });
  };

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
                row.utilization > 95
                  ? "bg-green-500"
                  : row.utilization > 80
                  ? "bg-yellow-500"
                  : "bg-red-500"
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
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsCreatingPlan(true)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Manual Plan</span>
          </button>
          <div className="relative group">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Plan</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button
                onClick={exportToCSV}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
              >
                Export as CSV
              </button>
              <button
                onClick={exportToPDF}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm border-t"
              >
                Export as PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Plan Creation Form */}
      {isCreatingPlan && (
        <div className="card border-2 border-sail-blue">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Create Manual Rake Plan
            </h3>
            <button
              onClick={() => setIsCreatingPlan(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Rake *
              </label>
              <select
                value={manualPlan.rakeId}
                onChange={(e) =>
                  setManualPlan({ ...manualPlan, rakeId: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sail-blue"
              >
                <option value="">Choose Rake</option>
                {rakeAvailability
                  .filter((r) => r.status === "Available")
                  .map((rake) => (
                    <option key={rake.id} value={rake.id}>
                      {rake.id} - {rake.type} ({rake.wagons} wagons)
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Orders *
              </label>
              <select
                multiple
                value={manualPlan.orders}
                onChange={(e) =>
                  setManualPlan({
                    ...manualPlan,
                    orders: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    ),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sail-blue h-24"
              >
                {pendingOrders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.id} - {order.customer} ({order.quantity} MT)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stockyard *
              </label>
              <select
                value={manualPlan.stockyard}
                onChange={(e) =>
                  setManualPlan({ ...manualPlan, stockyard: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sail-blue"
              >
                <option value="">Choose Stockyard</option>
                {stockyards.map((sy) => (
                  <option key={sy.id} value={sy.name}>
                    {sy.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loading Point *
              </label>
              <select
                value={manualPlan.loadingPoint}
                onChange={(e) =>
                  setManualPlan({ ...manualPlan, loadingPoint: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sail-blue"
              >
                <option value="">Choose Loading Point</option>
                {loadingPoints
                  .filter((lp) => lp.status === "Active")
                  .map((lp) => (
                    <option key={lp.id} value={lp.id}>
                      {lp.name} ({lp.available} available)
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination *
              </label>
              <input
                type="text"
                value={manualPlan.destination}
                onChange={(e) =>
                  setManualPlan({ ...manualPlan, destination: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sail-blue"
                placeholder="Enter destination"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dispatch Time *
              </label>
              <input
                type="datetime-local"
                value={manualPlan.dispatchTime}
                onChange={(e) =>
                  setManualPlan({ ...manualPlan, dispatchTime: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sail-blue"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsCreatingPlan(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateManualPlan}
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Plan</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Rake Formation Plans ({plans.length})
            </h3>
            <DataTable columns={planColumns} data={plans} />
          </div>
          <div className="card mt-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Dispatch Schedule Timeline
            </h3>
            <div className="relative">
              {plans.map((plan, index) => (
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
                    <div
                      className={`w-4 h-4 rounded-full border-4 ${
                        plan.status === "Optimized"
                          ? "bg-green-500 border-green-200"
                          : "bg-blue-500 border-blue-200"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {plan.rakeId} → {plan.destination}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {plan.totalWeight} MT • {plan.utilization}%
                          Utilization • ETA: {formatDateTime(plan.eta)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Route: {plan.route}
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
    </div>
  );
};

export default RakeFormation;
