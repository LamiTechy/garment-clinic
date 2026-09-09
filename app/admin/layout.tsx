import Link from "next/link";
import { AdminSignOut } from "@/components/admin/sign-out";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card-bg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="text-lg font-bold text-foreground">Ace Wash N Dry <span className="font-normal text-muted-foreground">Admin</span></Link>
          <div className="flex items-center gap-4">
            <AdminSignOut />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
