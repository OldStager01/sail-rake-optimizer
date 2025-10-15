import { Sparkles, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

const OptimizationPanel = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);

  const runOptimization = () => {
    setIsOptimizing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsOptimizing(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="card bg-gradient-to-r from-sail-blue to-blue-800 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-6 h-6" />
          <h3 className="text-lg font-semibold">AI Optimization Engine</h3>
        </div>
        {progress === 100 && <CheckCircle className="w-6 h-6 text-green-400" />}
      </div>

      {!isOptimizing && progress === 0 && (
        <p className="text-blue-100 mb-4">
          Run AI-powered optimization to generate the most efficient rake
          formation plan based on current inventory, orders, and constraints.
        </p>
      )}

      {isOptimizing && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-100">
              Analyzing parameters...
            </span>
            <span className="text-sm font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-blue-900 rounded-full h-2">
            <div
              className="bg-green-400 h-2 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {progress === 100 && !isOptimizing && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-400/30 rounded-lg">
          <p className="text-sm text-green-100">
            ✓ Optimization complete! Generated 3 optimal rake plans with ₹1.92L
            cost savings.
          </p>
        </div>
      )}

      <button
        onClick={runOptimization}
        disabled={isOptimizing}
        className="btn-primary w-full bg-white text-sail-blue hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isOptimizing ? (
          <span className="flex items-center justify-center">
            <Clock className="w-4 h-4 mr-2 animate-spin" />
            Optimizing...
          </span>
        ) : progress === 100 ? (
          "Re-run Optimization"
        ) : (
          "Run Optimization"
        )}
      </button>
    </div>
  );
};

export default OptimizationPanel;
