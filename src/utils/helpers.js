export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getPriorityColor = (priority) => {
  const colors = {
    High: "bg-red-100 text-red-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-green-100 text-green-800",
  };
  return colors[priority] || "bg-gray-100 text-gray-800";
};

export const getStatusColor = (status) => {
  const colors = {
    Available: "bg-green-100 text-green-800",
    Limited: "bg-yellow-100 text-yellow-800",
    "Out of Stock": "bg-red-100 text-red-800",
    Active: "bg-blue-100 text-blue-800",
    Full: "bg-red-100 text-red-800",
    "In Transit": "bg-purple-100 text-purple-800",
    Maintenance: "bg-gray-100 text-gray-800",
    Optimized: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

export const calculateUtilization = (current, total) => {
  return ((current / total) * 100).toFixed(1);
};
