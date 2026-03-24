import CardList from "@/components/admin/CardList";
import Transactions from "@/components/admin/Transactions";
import FinanceChart from "@/components/admin/FinanceChart";

const AdminDashboardPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <CardList />
      <Transactions />
      <FinanceChart />
    </div>
  );
};

export default AdminDashboardPage;
