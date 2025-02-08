import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

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

  const calculateLumpsumValue = (principal, rate, years) => {
    // Simple compound interest formula: A = P(1 + r)^t
    return Math.round(principal * Math.pow(1 + rate, years));
  };

  const calculateSIPValue = (principal, monthlyContribution, rate, years) => {
    let totalValue = principal;
    const monthlyRate = rate / 12;
    
    // Calculate monthly compounding with SIP
    for (let i = 1; i <= years * 12; i++) {
      totalValue = (totalValue * (1 + monthlyRate)) + monthlyContribution;
    }
    
    return Math.round(totalValue);
  };

  const calculateCAGR = (initialValue, finalValue, years) => {
    return ((Math.pow(finalValue / initialValue, 1 / years) - 1) * 100).toFixed(2);
  };

  const projectionData = useMemo(() => {
    const riskLevel = portfolioData?.portfolio_allocation?.risk || 'low';
    const returnRate = getRiskReturnRate(riskLevel);
    const isLumpsum = portfolioData?.investment_type === 'lumpsum';
    const monthlyContribution = portfolioData?.portfolio_allocation?.monthly_contribution || 0;
    const years = Array.from({ length: 21 }, (_, i) => i); // 0 to 20 years
    
    return years.map(year => {
      const futureValue = isLumpsum 
        ? calculateLumpsumValue(currentBalance, returnRate, year)
        : calculateSIPValue(currentBalance, monthlyContribution, returnRate, year);

      const totalInvested = isLumpsum 
        ? currentBalance 
        : currentBalance + (monthlyContribution * 12 * year);

      const cagr = year > 0 ? calculateCAGR(currentBalance, futureValue, year) : 0;

      return {
        year,
        value: futureValue,
        totalInvested,
        cagr,
        formatted: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(futureValue),
        formattedInvested: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(totalInvested)
      };
    });
  }, [currentBalance, portfolioData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">Year {label}</p>
          <p className="text-gray-600">Initial Amount: ₹{currentBalance.toLocaleString()}</p>
          <p className="text-gray-600">Total Invested: {data.formattedInvested}</p>
          <p className="text-gray-600">Portfolio Value: {data.formatted}</p>
          <p className="text-gray-600">CAGR: {data.cagr}%</p>
        </div>
      );
    }
    return null;
  };

  const milestoneYears = [5, 10, 15, 20];
  const riskLevel = portfolioData?.portfolio_allocation?.risk || 'low';
  const returnRate = getRiskReturnRate(riskLevel);
  const isLumpsum = portfolioData?.investment_type === 'lumpsum';

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Investment Summary</h3>
          <p className="text-gray-600">Investment Type: {isLumpsum ? 'Lumpsum' : 'SIP'}</p>
          <p className="text-gray-600">Initial Amount: ₹{currentBalance.toLocaleString()}</p>
          {!isLumpsum && (
            <p className="text-gray-600">
              Monthly SIP: ₹{portfolioData?.portfolio_allocation?.monthly_contribution.toLocaleString()}
            </p>
          )}
          <p className="text-gray-600">
            Expected Return: {(returnRate * 100).toFixed(1)}% ({riskLevel} risk)
          </p>
        </div>
      </Card>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year"
              label={{ value: 'Years', position: 'bottom' }}
            />
            <YAxis 
              tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
              label={{ value: 'Portfolio Value', angle: -90, position: 'insideLeft' }}
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
              name="Total Invested"
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
            <Card key={year} className="p-4">
              <p className="text-sm text-gray-600 font-medium">After {year} years</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Total Invested: {projection.formattedInvested}</p>
                <p className="text-lg font-semibold text-gray-900">{projection.formatted}</p>
                <p className="text-sm text-gray-600">CAGR: {projection.cagr}%</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioProjection;
