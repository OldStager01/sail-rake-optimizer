# SAIL Rake Optimizer - AI-Powered Railway Transportation Management System

## 🚂 Project Overview

The SAIL Rake Optimizer is an advanced AI-powered web application designed for Steel Authority of India Limited (SAIL) to optimize railway rake formation and transportation management. This system helps in efficient scheduling, cost optimization, and real-time tracking of steel product shipments across India.

## 🎯 Key Features

### 1. **AI-Powered Rake Formation**
- Intelligent rake composition optimization for maximum efficiency
- Real-time cost calculations and savings analysis
- Automated route planning and scheduling
- Dynamic capacity utilization optimization

### 2. **Smart Order Management**
- Create and manage customer orders seamlessly
- Real-time order tracking and status updates
- Priority-based order handling
- Integrated order-to-rake assignment system

### 3. **Material Inventory Management**
- Real-time stockyard monitoring
- Multi-location inventory tracking
- Loading point capacity management
- Material distribution analytics

### 4. **Advanced Analytics Dashboard**
- Performance metrics and KPIs
- Cost breakdown analysis
- Utilization trends and forecasting
- Interactive data visualizations

### 5. **Comprehensive Reporting**
- Export capabilities (CSV, PDF)
- Detailed dispatch schedules
- Cost optimization reports
- Performance analytics

## 🎬 Demo Video

[![SAIL Rake Optimizer Demo](./images/Screenshot%202025-10-27%20201557.png)](./images/Demo.mp4)

*Click on the image above to view the complete system demonstration*

## 📸 Application Screenshots

### Dashboard Overview
![Dashboard](./images/Screenshot%202025-10-27%20201557.png)
*Main dashboard showing key metrics, performance charts, and high-priority orders*

### Material Inventory Management
![Material Inventory](./images/Screenshot%202025-10-27%20200426.png)
*Comprehensive inventory management with stockyard status and loading point monitoring*

### Secondary Dashboard View
![Dashboard View](./images/Screenshot%202025-10-27%20200422.png)
*Alternative dashboard view with additional performance metrics*

### AI-Powered Rake Formation
![Rake Formation](./images/Screenshot%202025-10-27%20201343.png)
*Intelligent rake formation planning with optimization algorithms*

### Create Manual Plan
![Manual Plan Creation](./images/Screenshot%202025-10-27%20201407.png)
*Manual rake plan creation with dropdown order selection and auto-filled destination*

### Order Management
![Order Form](./images/Screenshot%202025-10-27%20201415.png)
*Comprehensive order creation form with customer details and specifications*

### Analytics and Reports
![Analytics](./images/Screenshot%202025-10-27%20201521.png)
*Advanced analytics dashboard with performance metrics and trends*

### Optimization Panel
![Optimization](./images/Screenshot%202025-10-27%20201532.png)
*Real-time optimization parameters and algorithm controls*

### Data Export Options
![Export Options](./images/Screenshot%202025-10-27%20201537.png)
*Multiple export formats for reports and data analysis*

### Order Status Tracking
![Order Tracking](./images/Screenshot%202025-10-27%20201546.png)
*Real-time order status updates and rake assignment tracking*

## 🚀 Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS for modern, responsive design
- **Icons**: Lucide React for consistent iconography
- **Charts**: Recharts for interactive data visualizations
- **Build Tool**: Vite for fast development and optimized builds
- **Code Quality**: ESLint for code linting and best practices

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/OldStager01/sail-rake-optimizer.git
   cd sail-rake-optimizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🌟 Key Improvements Made

### Recent Updates
- ✅ **Fixed Order State Management**: Implemented centralized state management for orders across all components
- ✅ **Enhanced Manual Plan Creation**: Added dropdown selection for orders with auto-filled destination
- ✅ **Real-time Order Updates**: New orders now immediately reflect in rake formation planning
- ✅ **Order Status Tracking**: Orders automatically update status when assigned to rakes
- ✅ **Improved User Experience**: Better form validation and user feedback

## 🏗️ Project Structure

```
sail-rake-optimizer/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── DataTable.jsx
│   │   ├── Header.jsx
│   │   ├── MetricCard.jsx
│   │   ├── OptimizationPanel.jsx
│   │   ├── OrderForm.jsx
│   │   └── Sidebar.jsx
│   ├── data/               # Mock data and configurations
│   │   └── mockData.js
│   ├── pages/              # Main application pages
│   │   ├── Analytics.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MaterialInventory.jsx
│   │   ├── RakeFormation.jsx
│   │   └── Reports.jsx
│   ├── utils/              # Utility functions
│   │   └── helpers.js
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── images/                 # Screenshots and demo video
└── README.md              # Project documentation
```

## 🎯 Use Cases

### For SAIL Operations Team
- **Optimize rake utilization** to reduce transportation costs
- **Streamline order processing** from creation to delivery
- **Monitor inventory levels** across multiple stockyards
- **Generate comprehensive reports** for management

### For Railway Logistics
- **Intelligent route planning** for optimal delivery times
- **Capacity optimization** to maximize rake efficiency
- **Real-time tracking** of rake assignments and schedules
- **Cost analysis** for budget planning and optimization

### For Management
- **Performance dashboards** with key metrics and KPIs
- **Cost savings analysis** with detailed breakdowns
- **Trend analysis** for strategic planning
- **Export capabilities** for external reporting

## 🔧 Configuration

The application includes several configuration options:

- **Mock Data**: Located in `src/data/mockData.js`
- **Styling**: Tailwind configuration in `tailwind.config.js`
- **Build Settings**: Vite configuration in `vite.config.js`
- **Linting Rules**: ESLint configuration in `eslint.config.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is developed for Steel Authority of India Limited (SAIL) as part of the Smart India Hackathon initiative.

## 📞 Support

For support, email: [Your Email] or raise an issue in the GitHub repository.

---

**Made with ❤️ for SAIL - Steel Authority of India Limited**
