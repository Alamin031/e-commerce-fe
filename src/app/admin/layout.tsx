import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  ImageIcon,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  Search,
  FolderTree,
  CreditCard,
  TrendingUp,
} from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage your e-commerce store.",
}

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart, badge: "12" },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/coupons", label: "Coupons", icon: Tag },
  { href: "/admin/banners", label: "Banners", icon: ImageIcon },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/reviews", label: "Reviews", icon: MessageSquare, badge: "5" },
  { href: "/admin/emi", label: "EMI Plans", icon: CreditCard },
  { href: "/admin/product-loyalty-points", label: "Loyalty Points", icon: TrendingUp },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-border bg-card lg:block">
          <div className="flex h-16 items-center border-b border-border px-6">
            <Link href="/admin" className="text-xl font-bold">
              Admin Panel
            </Link>
          </div>
          <nav className="space-y-1 p-4">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <link.icon className="h-5 w-5" />
                {link.label}
                {link.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {link.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              Back to Store
            </Link>
          </div>
        </aside>
      </Suspense>

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background px-6">
          <Suspense fallback={<div>Loading...</div>}>
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                3
              </span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary text-center text-sm font-bold leading-9 text-primary-foreground">
                A
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">admin@store.com</p>
              </div>
            </div>
          </Suspense>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
