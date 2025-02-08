import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LumpsumProjection = ({ portfolioData = {}, currentBalance = 0 }) => {
  const getRiskReturnRate = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low':
        return 0.11;
      case 'conservative':
        return 0.135;
      case 'high':
        return 0.165;
      default:
        return 0.11;
    }
  };

  const calculateLumpsumValue = (principal, rate, years) => {
    return Math.round(principal * Math.pow(1 + rate, years));
  };

  const calculateCAGR = (initialValue, finalValue, years) => {
    if (!initialValue || !finalValue || !years) return "0.00";
    return ((Math.pow(finalValue / initialValue, 1 / years) - 1) * 100).toFixed(2);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  const projectionData = useMemo(() => {
    const riskLevel = portfolioData?.user_info?.[0]?.risk || 'low';
    const returnRate = getRiskReturnRate(riskLevel);
    const years = Array.from({ length: 21 }, (_, i) => i);
    
    return years.map(year => {
      const futureValue = calculateLumpsumValue(currentBalance, returnRate, year);
      const totalInvested = currentBalance;

      const cagr = year > 0 
        ? calculateCAGR(currentBalance, futureValue, year)
        : "0.00";

      return {
        year,
        value: futureValue,
        totalInvested,
        cagr,
        formatted: formatCurrency(futureValue),
        formattedInvested: formatCurrency(totalInvested)
      };
    });
  }, [currentBalance, portfolioData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">Year {label}</p>
          <p className="text-gray-600">Initial Investment: {formatCurrency(currentBalance)}</p>
          <p className="text-gray-600">Portfolio Value: {data.formatted}</p>
          <p className="text-gray-600">CAGR: {data.cagr}%</p>
        </div>
      );
    }
    return null;
  };

  const milestoneYears = [5, 10, 15, 20];
  const riskLevel = portfolioData?.user_info?.[0]?.risk || 'low';
  const returnRate = getRiskReturnRate(riskLevel);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div>
          <h3 className="text-lg font-semibold mb-2">Lumpsum Investment Summary</h3>
          <p className="text-gray-600">Investment Type: Lumpsum</p>
          <p className="text-gray-600">Initial Investment: {formatCurrency(currentBalance)}</p>
          <p className="text-gray-600">
            Expected Return: {(returnRate * 100).toFixed(1)}% ({riskLevel} risk)
          </p>
        </div>
      </div>

      <div className="h-80 bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year"
              
            />
            <YAxis 
              tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
              
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              name="Portfolio Value"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="totalInvested"
              stroke="#4ade80"
              name="Initial Investment"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2  gap-4">
        {milestoneYears.map(year => {
          const projection = projectionData[year];
          return (
            <div 
              key={year} 
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <p className="text-sm text-gray-600 font-medium">After {year} years</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Initial Investment: {formatCurrency(currentBalance)}</p>
                <div className="border-t border-gray-400"></div>
                <p className="text-lg font-semibold text-gray-900">{projection.formatted}</p>
                <p className="text-sm text-gray-600">CAGR: {projection.cagr}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LumpsumProjection;
