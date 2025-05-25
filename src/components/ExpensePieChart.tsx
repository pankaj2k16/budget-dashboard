'use client'; // This component uses client-side hooks from Recharts

import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { BudgetItem, formatCurrency } from '@/data/budgetData';

interface ExpensePieChartProps {
  expenses: BudgetItem[];
  totalExpenses: number;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const percentage = (payload.value / payload.totalAmount) * 100;


  // Only show label if percentage is large enough to avoid clutter
  if (percentage < 1.5) return null;


  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize="12px"
      fontWeight="bold"
    >
      {`${percentage.toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = (data.value / data.totalAmount * 100).toFixed(1);
    return (
      <div className="bg-white p-2 border border-gray-300 shadow-lg rounded">
        <p className="font-semibold">{`${data.label}`}</p>
        <p>{`Amount: ${formatCurrency(data.value)}`}</p>
        <p>{`Percentage: ${percentage}%`}</p>
      </div>
    );
  }
  return null;
};


const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ expenses, totalExpenses }) => {
  const chartData = expenses.map(expense => ({
    ...expense,
    value: expense.amount, // Recharts expects 'value'
    totalAmount: totalExpenses // Pass total for percentage calculation in label/tooltip
  }));

  return (
    <div className="w-full h-[400px] md:h-[450px]">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center md:text-left">Money Out</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="80%"
            innerRadius="40%" // For donut chart effect
            fill="#8884d8"
            dataKey="value"
            nameKey="label"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#000000'} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value, entry) => {
                const { color } = entry as any; // Type assertion
                return <span style={{ color: '#555' }}>{value}</span>;
            }}
            iconType="circle" // Makes the legend icon a circle
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;