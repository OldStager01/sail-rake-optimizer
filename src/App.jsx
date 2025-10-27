import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import RakeFormation from "./pages/RakeFormation";
import MaterialInventory from "./pages/MaterialInventory";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import { pendingOrders } from "./data/mockData";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState(pendingOrders);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard orders={orders} />;
      case "rake-formation":
        return <RakeFormation orders={orders} setOrders={setOrders} />;
      case "inventory":
        return <MaterialInventory orders={orders} setOrders={setOrders} />;
      case "analytics":
        return <Analytics />;
      case "reports":
        return <Reports />;
      case "settings":
        return (
          <div className="card">
            <h2 className="text-xl font-bold">Settings</h2>
            <p className="text-gray-600 mt-2">
              System configuration and preferences...
            </p>
          </div>
        );
      default:
        return <Dashboard orders={orders} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

export default App;
