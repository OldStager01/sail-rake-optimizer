import {
  FileText,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useState } from "react";
import {
  historicalReports,
  optimizedRakePlan,
  costBreakdown,
  metrics,
} from "../data/mockData";
import { formatCurrency, getStatusColor } from "../utils/helpers";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Reports = () => {
  const [reportType, setReportType] = useState("performance");
  const [dateRange, setDateRange] = useState("monthly");

  const generateReport = () => {
    const reportContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>SAIL - ${reportType.toUpperCase()} Report</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            padding: 40px; 
            background: #f5f5f5;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header { 
            text-align: center; 
            margin-bottom: 40px; 
            border-bottom: 3px solid #003366;
            padding-bottom: 20px;
          }
          .logo { 
            color: #003366; 
            font-size: 32px; 
            font-weight: bold; 
            margin-bottom: 10px;
          }
          .subtitle {
            color: #666;
            font-size: 14px;
          }
          .meta-info {
            display: flex;
            justify-content: space-between;
            margin: 30px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
          }
          .metric-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin: 30px 0;
          }
          .metric-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border-left: 4px solid #003366;
          }
          .metric-value {
            font-size: 28px;
            font-weight: bold;
            color: #003366;
            margin: 10px 0;
          }
          .metric-label {
            color: #666;
            font-size: 14px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 30px 0; 
          }
          th, td { 
            border: 1px solid #ddd; 
            padding: 14px; 
            text-align: left; 
          }
          th { 
            background-color: #003366; 
            color: white; 
            font-weight: 600;
          }
          tr:nth-child(even) {
            background-color: #f8f9fa;
          }
          .section {
            margin: 40px 0;
          }
          .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #003366;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e0e0e0;
          }
          .summary-box {
            background: linear-gradient(135deg, #003366 0%, #0066cc 100%);
            color: white;
            padding: 30px;
            border-radius: 8px;
            margin: 30px 0;
          }
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 20px;
          }
          .summary-item {
            text-align: center;
          }
          .summary-value {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
          }
          .footer { 
            margin-top: 60px; 
            text-align: center; 
            font-size: 12px; 
            color: #666; 
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
          }
          .recommendations {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 20px;
            margin: 20px 0;
          }
          .recommendations ul {
            margin-left: 20px;
            margin-top: 10px;
          }
          .recommendations li {
            margin: 8px 0;
          }
          @media print {
            body { padding: 0; }
            .container { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">SAIL - Rake Formation Report</div>
            <p class="subtitle">Steel Authority of India Limited | Bokaro Steel Plant</p>
            <p class="subtitle">Ministry of Steel, Government of India</p>
          </div>

          <div class="meta-info">
            <div>
              <strong>Report Type:</strong> ${reportType.toUpperCase()}
            </div>
            <div>
              <strong>Period:</strong> ${dateRange.toUpperCase()}
            </div>
            <div>
              <strong>Generated:</strong> ${new Date().toLocaleString("en-IN")}
            </div>
            <div>
              <strong>Generated By:</strong> OldStager01
            </div>
          </div>

          <div class="summary-box">
            <h3 style="margin-bottom: 10px;">Executive Summary</h3>
            <div class="summary-grid">
              <div class="summary-item">
                <div>Total Active Rakes</div>
                <div class="summary-value">${metrics.activeRakes}</div>
              </div>
              <div class="summary-item">
                <div>Cost Savings</div>
                <div class="summary-value">${formatCurrency(
                  metrics.costSavings
                )}</div>
              </div>
              <div class="summary-item">
                <div>Utilization Rate</div>
                <div class="summary-value">${metrics.utilizationRate}%</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Performance Metrics</h2>
            <div class="metric-grid">
              <div class="metric-card">
                <div class="metric-label">Total Rakes Formed</div>
                <div class="metric-value">${metrics.totalRakes}</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">Average Utilization</div>
                <div class="metric-value">${metrics.utilizationRate}%</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">On-Time Delivery</div>
                <div class="metric-value">${metrics.onTimeDelivery}%</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">Avg Loading Time</div>
                <div class="metric-value">${metrics.avgLoadingTime} hrs</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Rake Formation Details</h2>
            <table>
              <thead>
                <tr>
                  <th>Rake ID</th>
                  <th>Orders</th>
                  <th>Destination</th>
                  <th>Weight (MT)</th>
                  <th>Utilization</th>
                  <th>Cost</th>
                  <th>Savings</th>
                </tr>
              </thead>
              <tbody>
                ${optimizedRakePlan
                  .map(
                    (plan) => `
                  <tr>
                    <td>${plan.rakeId}</td>
                    <td>${plan.orders.join(", ")}</td>
                    <td>${plan.destination}</td>
                    <td>${plan.totalWeight}</td>
                    <td>${plan.utilization}%</td>
                    <td>${formatCurrency(plan.cost)}</td>
                    <td>${formatCurrency(plan.savings)}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <div class="section">
            <h2 class="section-title">Cost Analysis</h2>
            <table>
              <tr>
                <td><strong>Loading Costs</strong></td>
                <td>${formatCurrency(costBreakdown.loading)}</td>
              </tr>
              <tr>
                <td><strong>Transport Costs</strong></td>
                <td>${formatCurrency(costBreakdown.transport)}</td>
              </tr>
              <tr>
                <td><strong>Demurrage Saved</strong></td>
                <td style="color: green;">${formatCurrency(
                  costBreakdown.saved_demurrage
                )}</td>
              </tr>
              <tr>
                <td><strong>Penalty Saved</strong></td>
                <td style="color: green;">${formatCurrency(
                  costBreakdown.saved_penalty
                )}</td>
              </tr>
              <tr style="background: #f0f0f0; font-weight: bold;">
                <td>Total Cost</td>
                <td>${formatCurrency(costBreakdown.total_cost)}</td>
              </tr>
              <tr style="background: #d4edda; font-weight: bold;">
                <td>Total Savings</td>
                <td style="color: green;">${formatCurrency(
                  costBreakdown.total_savings
                )}</td>
              </tr>
            </table>
          </div>

          <div class="recommendations">
            <h3>AI-Powered Recommendations</h3>
            <ul>
              <li>Increase BOXNHL wagon usage for HR Coil shipments to improve utilization by 8%</li>
              <li>Consider multi-destination clubbing for Mumbai-bound orders to reduce cost by ₹65,000</li>
              <li>Optimize LP-03 loading bay usage during peak hours for 15% better throughput</li>
              <li>Schedule maintenance for RK-105 to bring it back into active service</li>
              <li>Implement predictive demand forecasting to reduce emergency orders by 22%</li>
            </ul>
          </div>

          <div class="footer">
            <p><strong>Confidential Document</strong></p>
            <p>This is a system-generated report from SAIL Rake Optimization AI System</p>
            <p>Steel Authority of India Limited | Ministry of Steel | Government of India</p>
            <p>For internal use only. Do not distribute without authorization.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(reportContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const downloadReportData = () => {
    const reportData = {
      metadata: {
        type: reportType,
        period: dateRange,
        generatedAt: new Date().toISOString(),
        generatedBy: "OldStager01",
      },
      metrics: metrics,
      rakePlans: optimizedRakePlan,
      costBreakdown: costBreakdown,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sail_report_${reportType}_${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
  };

  const performanceData = [
    { month: "Apr", utilization: 82, onTime: 93, cost: 1.25 },
    { month: "May", utilization: 78, onTime: 94, cost: 1.18 },
    { month: "Jun", utilization: 85, onTime: 95, cost: 1.32 },
    { month: "Jul", utilization: 88, onTime: 95.5, cost: 1.09 },
    { month: "Aug", utilization: 91, onTime: 96, cost: 1.15 },
    { month: "Sep", utilization: 94.2, onTime: 96.5, cost: 1.02 },
  ];

  const costDistribution = [
    { name: "Loading", value: 125000 },
    { name: "Transport", value: 890000 },
    { name: "Handling", value: 65000 },
    { name: "Other", value: 45000 },
  ];

  const COLORS = ["#003366", "#0066cc", "#3399ff", "#66b2ff"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Reports & Analytics
          </h2>
          <p className="text-gray-600 mt-1">
            Generate comprehensive reports and export data
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={downloadReportData}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Data (JSON)</span>
          </button>
        </div>
      </div>

      {/* Report Configuration */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Report Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sail-blue focus:border-transparent"
            >
              <option value="performance">Performance Report</option>
              <option value="cost">Cost Analysis Report</option>
              <option value="utilization">Utilization Report</option>
              <option value="delivery">Delivery Performance</option>
              <option value="comprehensive">Comprehensive Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sail-blue focus:border-transparent"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={generateReport}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="utilization"
                stroke="#003366"
                strokeWidth={2}
                name="Utilization %"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="onTime"
                stroke="#FF6B35"
                strokeWidth={2}
                name="On-Time %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Cost Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {costDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Reports */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Historical Reports
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Report ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Date Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  File Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {historicalReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {report.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {report.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {report.size}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-sail-blue hover:text-blue-800 font-medium">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Reports</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">
                {historicalReports.length}
              </p>
            </div>
            <FileText className="w-10 h-10 text-blue-400" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">This Month</p>
              <p className="text-2xl font-bold text-green-900 mt-1">8</p>
            </div>
            <Calendar className="w-10 h-10 text-green-400" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">
                Avg. Generation Time
              </p>
              <p className="text-2xl font-bold text-orange-900 mt-1">2.3s</p>
            </div>
            <Clock className="w-10 h-10 text-orange-400" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">
                Data Accuracy
              </p>
              <p className="text-2xl font-bold text-purple-900 mt-1">99.8%</p>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
