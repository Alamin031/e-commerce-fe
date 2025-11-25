import Image from "next/image"
import { Search, Filter, MoreVertical, Mail, Eye, Ban } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Checkbox } from "../../components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { formatPrice } from "../../lib/utils/format"

const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?key=rk8n5",
    orders: 12,
    totalSpent: 456789,
    lastOrder: "Nov 20, 2024",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/placeholder.svg?key=m3fz2",
    orders: 8,
    totalSpent: 234567,
    lastOrder: "Nov 19, 2024",
    status: "Active",
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    avatar: "/placeholder.svg?key=v9qs7",
    orders: 3,
    totalSpent: 79999,
    lastOrder: "Nov 15, 2024",
    status: "Active",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    avatar: "/placeholder.svg?key=x5kt9",
    orders: 1,
    totalSpent: 15999,
    lastOrder: "Nov 10, 2024",
    status: "Inactive",
  },
  {
    id: "5",
    name: "Charlie Davis",
    email: "charlie@example.com",
    avatar: "/placeholder.svg?key=h2pw4",
    orders: 0,
    totalSpent: 0,
    lastOrder: "-",
    status: "Blocked",
  },
]

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer base.</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Mail className="h-4 w-4" />
          Email All
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">5,678</p>
            <p className="text-sm text-muted-foreground">Total Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">4,532</p>
            <p className="text-sm text-muted-foreground">Active Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">234</p>
            <p className="text-sm text-muted-foreground">New This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">{formatPrice(43256)}</p>
            <p className="text-sm text-muted-foreground">Avg. Order Value</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search customers..." className="pl-9" />
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 pr-4">
                    <Checkbox />
                  </th>
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Orders</th>
                  <th className="pb-3 pr-4">Total Spent</th>
                  <th className="pb-3 pr-4">Last Order</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border">
                    <td className="py-4 pr-4">
                      <Checkbox />
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                          <Image
                            src={customer.avatar || "/placeholder.svg"}
                            alt={customer.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4">{customer.orders}</td>
                    <td className="py-4 pr-4 font-medium">{formatPrice(customer.totalSpent)}</td>
                    <td className="py-4 pr-4 text-sm text-muted-foreground">{customer.lastOrder}</td>
                    <td className="py-4 pr-4">
                      <Badge
                        variant="secondary"
                        className={
                          customer.status === "Active"
                            ? "bg-green-500/10 text-green-600"
                            : customer.status === "Inactive"
                              ? "bg-yellow-500/10 text-yellow-600"
                              : "bg-red-500/10 text-red-600"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Ban className="mr-2 h-4 w-4" />
                            Block User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing 1-5 of 5,678 customers</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
