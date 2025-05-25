export interface BudgetItem {
  label: string;
  amount: number;
  color?: string; // Optional: for pie chart segments
}

export interface BudgetData {
  moneyIn: {
    items: BudgetItem[];
    total: number;
  };
  moneyOut: {
    items: BudgetItem[];
    total: number;
  };
  moneyLeftOver: number;
}

// Initial Data (matching the image)
const salary = 225000;
const additionalIncome = 0;
const totalIncome = salary + additionalIncome;

const expenses: BudgetItem[] = [
  { label: "Housing (Rent, mortgage, taxes, insurance)", amount: 15050, color: "#00AEEF" }, // Bright Blue
  { label: "Shopping", amount: 5000, color: "#8DC63F" },          // Green
  { label: "Transport", amount: 1500, color: "#A0A0A0" },         // Grey
  { label: "Utilities", amount: 1200, color: "#FFC107" },         // Yellow/Orange
  { label: "Dining, travel, entertainment", amount: 10000, color: "#F44336" }, // Red
  { label: "Education", amount: 25000, color: "#E91E63" },        // Pink/Magenta
];

const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
const moneyLeftOver = totalIncome - totalExpenses;

export const initialBudgetData: BudgetData = {
  moneyIn: {
    items: [
      { label: "Salary", amount: salary },
      { label: "Additional income", amount: additionalIncome },
    ],
    total: totalIncome,
  },
  moneyOut: {
    items: expenses,
    total: totalExpenses,
  },
  moneyLeftOver: moneyLeftOver,
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};