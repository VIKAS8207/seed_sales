import AdminSidebar from "@/components/AdminSidebar";
import Topbar from "@/components/Topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-brand-bg">
      <AdminSidebar />
      <main className="flex-1 h-full overflow-y-auto relative bg-[#F8F9FA]">
        <Topbar />
        {children}
      </main>
    </div>
  );
}