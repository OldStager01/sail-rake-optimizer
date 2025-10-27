import { Package, AlertCircle, TrendingUp, Plus } from "lucide-react";
import { useState } from "react";
import DataTable from "../components/DataTable";
import OrderForm from "../components/OrderForm";
import { stockyards, loadingPoints } from "../data/mockData";
import { getStatusColor, getPriorityColor } from "../utils/helpers";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const MaterialInventory = ({ orders, setOrders }) => {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const handleCreateOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const stockColumns = [
    { header: "Stockyard", accessor: "name" },
    { header: "Material Type", accessor: "material" },
    {
      header: "Total Quantity",
      accessor: "quantity",
      render: (row) => `${row.quantity} ${row.unit}`,
    },
    {
      header: "Reserved",
      accessor: "reserved",
      render: (row) => `${row.reserved} ${row.unit}`,
    },
    {
      header: "Available",
      accessor: "available",
      render: (row) => (
        <span className="font-semibold text-green-600">
          {row.available} {row.unit}
        </span>
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

  const orderColumns = [
    { header: "Order ID", accessor: "id" },
    { header: "Customer", accessor: "customer" },
    { header: "Material", accessor: "material" },
    {
      header: "Quantity",
      accessor: "quantity",
      render: (row) => `${row.quantity} MT`,
    },
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
    { header: "Deadline", accessor: "deadline" },
    { header: "Destination", accessor: "destination" },
  ];

  const loadingColumns = [
    { header: "Loading Point", accessor: "name" },
    { header: "Total Capacity", accessor: "capacity" },
    { header: "Currently Used", accessor: "current" },
    { header: "Available", accessor: "available" },
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

  const inventoryData = [
    { name: "HR Coil", value: 2500 },
    { name: "CR Coil", value: 1800 },
    { name: "TMT Bars", value: 3200 },
    { name: "Wire Rods", value: 1500 },
    { name: "Plates", value: 950 },
    { name: "GP Sheets", value: 2200 },
  ];

  const COLORS = [
    "#003366",
    "#0066CC",
    "#3399FF",
    "#66B2FF",
    "#99CCFF",
    "#CCEEFF",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Material Inventory Management
          </h2>
          <p className="text-gray-600 mt-1">
            Track stockyard inventory, pending orders, and loading point
            capacity
          </p>
        </div>
        <button
          onClick={() => setIsOrderFormOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Order</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Inventory
            </h3>
            <Package className="w-5 h-5 text-sail-blue" />
          </div>
          <p className="text-3xl font-bold text-gray-900">11,150 MT</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            12% increase from last week
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Pending Orders
            </h3>
            <AlertCircle className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
          <p className="text-sm text-gray-600 mt-2">
            {orders.filter((o) => o.priority === "High").length} high priority
            orders
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Loading Points Active
            </h3>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {loadingPoints.filter((lp) => lp.status === "Active").length}/
            {loadingPoints.length}
          </p>
          <p className="text-sm text-gray-600 mt-2">75% utilization rate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Stockyard Availability
          </h3>
          <DataTable columns={stockColumns} data={stockyards} />
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Inventory Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={inventoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {inventoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Pending Customer Orders ({orders.length})
        </h3>
        <DataTable columns={orderColumns} data={orders} />
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Loading Point Status
        </h3>
        <DataTable columns={loadingColumns} data={loadingPoints} />
      </div>

      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        onSubmit={handleCreateOrder}
      />
    </div>
  );
};

export default MaterialInventory;
