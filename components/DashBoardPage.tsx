import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  return <Dashboard user={user} />;
}
