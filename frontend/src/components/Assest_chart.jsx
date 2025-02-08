import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PortfolioAllocationChart = ({ portfolioData }) => {
  // Extract allocation data and format it for the pie chart
  const allocation = portfolioData?.portfolio_allocation || {};
  
  const chartData = [
    {
      name: 'Gold',
      value: allocation.gold_investment?.percentage || 0,
      amount: allocation.gold_investment?.amount || 0
    },
    {
      name: 'Nifty 50',
      value: allocation.nifty_50_investment?.percentage || 0,
      amount: allocation.nifty_50_investment?.amount || 0
    },
    {
      name: 'Blue Chips',
      value: allocation.blue_chips_investment?.percentage || 0,
      amount: allocation.blue_chips_investment?.amount || 0
    },
    {
      name: 'Mid Cap',
      value: allocation.mid_cap_investment?.percentage || 0,
      amount: allocation.mid_cap_investment?.amount || 0
    },
    {
      name: 'Small Cap',
      value: allocation.small_cap_investment?.percentage || 0,
      amount: allocation.small_cap_investment?.amount || 0
    }
  ].filter(item => item.value > 0); 

  
  const COLORS = ['#FFD700', '#0088FE', '#00C49F', '#FF8042', '#8884D8'];

  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-gray-600">Percentage: {payload[0].value}%</p>
          <p className="text-gray-600">Amount: ₹{payload[0].payload.amount}</p>
        </div>
      );
    }
    return null;
  };

 
  const portfolioSummary = portfolioData?.portfolio_summary ? 
    JSON.parse(portfolioData.portfolio_summary) : null;

  return (
    <div className="space-y-6">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-₹{index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {portfolioSummary && (
        <div className="space-y-4">
          <p className="text-gray-700">{portfolioSummary.summary}</p>
          
          <div>
            <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {portfolioSummary.pros.map((pro, index) => (
                <li key={index} className="text-gray-700">{pro}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {portfolioSummary.cons.map((con, index) => (
                <li key={index} className="text-gray-700">{con}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioAllocationChart;