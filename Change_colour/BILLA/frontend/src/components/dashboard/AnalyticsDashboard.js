import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { CalendarDaysIcon, ListBulletIcon } from '@heroicons/react/24/outline';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AnalyticsDashboard = ({ data }) => {
  // --- Data for Cards ---
  const summaryCards = [
    {
      title: 'Total Monthly',
      value: `$${data.totalMonthly.toFixed(2)}`,
      icon: CalendarDaysIcon,
      color: 'text-blue-500',
    },
    {
      title: 'Total Yearly',
      value: `$${data.totalYearly.toFixed(2)}`,
      icon: CalendarDaysIcon,
      color: 'text-green-500',
    },
    {
      title: 'Total Subscriptions',
      value: data.totalSubscriptions,
      icon: ListBulletIcon,
      color: 'text-indigo-500',
    },
  ];

  // --- Data for Doughnut Chart ---
  const doughnutData = {
    labels: data.byCategory.map(c => c.category),
    datasets: [
      {
        label: 'Cost by Category',
        data: data.byCategory.map(c => c.totalCost),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Spending Analytics</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
            <card.icon className={`h-12 w-12 p-2 bg-gray-100 dark:bg-gray-700 rounded-full ${card.color}`} />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Cost by Category</h3>
          <div className="h-64 md:h-80 flex justify-center items-center">
            {data.byCategory.length > 0 ? (
                <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, responsive: true }} />
            ) : (
                <p className="text-gray-500">No data for chart.</p>
            )}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
           <h3 className="text-xl font-semibold mb-4">Subscription Count</h3>
           <div className="h-64 md:h-80 flex justify-center items-center">
            {data.byCategory.length > 0 ? (
                <Bar 
                    data={{
                        labels: data.byCategory.map(c => c.category),
                        datasets: [{
                            label: 'Count',
                            data: data.byCategory.map(c => c.count),
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    }} 
                    options={{ maintainAspectRatio: false, responsive: true, plugins: { legend: { display: false } } }} 
                />
            ) : (
                <p className="text-gray-500">No data for chart.</p>
            )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;