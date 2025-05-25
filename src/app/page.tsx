import BudgetHeader from '@/components/BudgetHeader';
import BudgetSection from '@/components/BudgetSection';
import ExpensePieChart from '@/components/ExpensePieChart';
import { initialBudgetData } from '@/data/budgetData';

export default function HomePage() {
  const { moneyIn, moneyOut, moneyLeftOver } = initialBudgetData;

  return (
    <main className="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <BudgetHeader />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Tables */}
        <div className="lg:w-1/2 flex flex-col">
          <BudgetSection
            title="Money In"
            items={moneyIn.items}
            total={{ label: 'Total income', amount: moneyIn.total }}
            titleBgColor="bg-green-500" // Tailwind green
            totalBgColor="bg-gray-100"
          />

          <BudgetSection
            title="Money Out"
            items={moneyOut.items}
            total={{ label: 'Total expenses', amount: moneyOut.total }}
            titleBgColor="bg-red-500" // Tailwind red
            totalBgColor="bg-gray-100"
          />

          <BudgetSection
            title="Money Left Over"
            items={[{ label: 'Income minus expenses', amount: moneyLeftOver }]}
            // No separate total row needed, the single item acts as total
            titleBgColor="bg-blue-500" // Tailwind blue
            isMoneyLeftOver // To potentially style differently if needed
          />
        </div>

        {/* Right Column: Pie Chart */}
        <div className="lg:w-1/2 flex items-center justify-center">
          <ExpensePieChart expenses={moneyOut.items} totalExpenses={moneyOut.total} />
        </div>
      </div>
    </main>
  );
}