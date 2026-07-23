import UserSidebar from "@/components/UserSidebar";
import Topbar from "@/components/Topbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-brand-white">
      <UserSidebar />
      <main className="flex-1 h-full overflow-y-auto relative bg-[#F8F9FA]">
              <Topbar />
              {children}
            </main>
    </div>
  );
}