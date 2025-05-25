import React from 'react';
import { BudgetItem, formatCurrency } from '@/data/budgetData';

interface BudgetSectionProps {
  title: string;
  items: BudgetItem[];
  total?: { label: string; amount: number };
  titleBgColor: string; // e.g., 'bg-green-500'
  totalBgColor?: string; // e.g., 'bg-gray-200'
  isMoneyLeftOver?: boolean; // Special case for Money Left Over styling
}

const BudgetSection: React.FC<BudgetSectionProps> = ({
  title,
  items,
  total,
  titleBgColor,
  totalBgColor = 'bg-gray-200',
  isMoneyLeftOver = false,
}) => {
  return (
    <div className="mb-6 w-full">
      <h2 className={`text-xl font-semibold p-2 text-white ${titleBgColor}`}>
        {title}
      </h2>
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="p-2 border-r border-gray-300 text-gray-700">{item.label}</td>
              <td className="p-2 text-right font-medium text-gray-800">{formatCurrency(item.amount)}</td>
            </tr>
          ))}
          {total && (
            <tr className={`${totalBgColor}`}>
              <td className={`p-2 border-r border-gray-300 font-bold ${isMoneyLeftOver ? 'text-gray-700' : 'text-gray-800'}`}>
                {total.label}
              </td>
              <td className={`p-2 text-right font-bold ${isMoneyLeftOver ? 'text-gray-800' : 'text-gray-800'}`}>
                {formatCurrency(total.amount)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetSection;