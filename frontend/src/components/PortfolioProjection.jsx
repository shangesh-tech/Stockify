import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PortfolioProjection = ({ portfolioData, currentBalance }) => {
  const getRiskReturnRate = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return 0.11; // 11% average return
      case 'conservative':
        return 0.135; // 13.5% average return
      case 'high':
        return 0.165; // 16.5% average return
      default:
        return 0.11;
    }
  };

  const calculateFutureValue = (principal, rate, years) => {
    const monthlyContribution = portfolioData?.portfolio_allocation?.monthly_contribution || 0;
    let totalValue = principal;
    
    // Compound interest with monthly contributions
    for (let i = 1; i <= years * 12; i++) {
      totalValue = totalValue * (1 + rate / 12) + monthlyContribution;
    }
    
    return Math.round(totalValue);
  };

  const projectionData = useMemo(() => {
    const riskLevel = portfolioData?.portfolio_allocation?.risk || 'low';
    const returnRate = getRiskReturnRate(riskLevel);
    const years = Array.from({ length: 21 }, (_, i) => i); // 0 to 20 years
    
    return years.map(year => {
      const futureValue = calculateFutureValue(currentBalance, returnRate, year);
      return {
        year,
        value: futureValue,
        formatted: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(futureValue)
      };
    });
  }, [currentBalance, portfolioData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">Year {label}</p>
          <p className="text-gray-600">Portfolio Value:{payload[0].payload.formatted}</p>
        </div>
      );
    }
    return null;
  };

  const milestoneYears = [5, 10, 15, 20];
  const riskLevel = portfolioData?.portfolio_allocation?.risk || 'low';
  const returnRate = getRiskReturnRate(riskLevel);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Growth Projection</h3>
        <p className="text-gray-600 mb-4">
          Estimated return rate: {(returnRate * 100).toFixed(1)}% ({riskLevel} risk)
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year"
              label={{ value: 'Years', position: 'bottom' }}
            />
            <YAxis 
              tickFormatter={(value) => `${(value / 1000)}K`}
              label={{ value: 'Portfolio Value', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="Portfolio Value"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {milestoneYears.map(year => {
          const projection = projectionData[year];
          return (
            <div key={year} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">After {year} years</p>
              <p className="text-lg font-semibold text-gray-900">{projection.formatted}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioProjection;
