import Link from "next/link"
import { Search, Filter, Eye, MoreVertical, Download, Printer } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Checkbox } from "../../components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { formatPrice } from "../../lib/utils/format"

const orders = [
  {
    id: "ORD-2024-001",
    customer: "John Doe",
    email: "john@example.com",
    items: 2,
    total: 148399,
    status: "Processing",
    payment: "Paid",
    date: "Nov 20, 2024",
  },
  {
    id: "ORD-2024-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    items: 1,
    total: 49999,
    status: "Shipped",
    payment: "Paid",
    date: "Nov 19, 2024",
  },
  {
    id: "ORD-2024-003",
    customer: "Bob Wilson",
    email: "bob@example.com",
    items: 3,
    total: 79999,
    status: "Delivered",
    payment: "Paid",
    date: "Nov 18, 2024",
  },
  {
    id: "ORD-2024-004",
    customer: "Alice Brown",
    email: "alice@example.com",
    items: 1,
    total: 15999,
    status: "Pending",
    payment: "Pending",
    date: "Nov 17, 2024",
  },
  {
    id: "ORD-2024-005",
    customer: "Charlie Davis",
    email: "charlie@example.com",
    items: 2,
    total: 249999,
    status: "Cancelled",
    payment: "Refunded",
    date: "Nov 16, 2024",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Delivered":
      return "bg-green-500/10 text-green-600"
    case "Shipped":
      return "bg-blue-500/10 text-blue-600"
    case "Processing":
      return "bg-yellow-500/10 text-yellow-600"
    case "Pending":
      return "bg-orange-500/10 text-orange-600"
    case "Cancelled":
      return "bg-red-500/10 text-red-600"
    default:
      return ""
  }
}

function getPaymentColor(payment: string) {
  switch (payment) {
    case "Paid":
      return "bg-green-500/10 text-green-600"
    case "Pending":
      return "bg-yellow-500/10 text-yellow-600"
    case "Refunded":
      return "bg-gray-500/10 text-gray-600"
    default:
      return ""
  }
}

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and process customer orders.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="all">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="all">All (234)</TabsTrigger>
                <TabsTrigger value="pending">Pending (12)</TabsTrigger>
                <TabsTrigger value="processing">Processing (8)</TabsTrigger>
                <TabsTrigger value="shipped">Shipped (15)</TabsTrigger>
                <TabsTrigger value="delivered">Delivered (189)</TabsTrigger>
              </TabsList>
            </div>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>

            <TabsContent value="all">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left text-sm text-muted-foreground">
                      <th className="pb-3 pr-4">
                        <Checkbox />
                      </th>
                      <th className="pb-3 pr-4">Order</th>
                      <th className="pb-3 pr-4">Customer</th>
                      <th className="pb-3 pr-4">Items</th>
                      <th className="pb-3 pr-4">Total</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3 pr-4">Payment</th>
                      <th className="pb-3 pr-4">Date</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-border">
                        <td className="py-4 pr-4">
                          <Checkbox />
                        </td>
                        <td className="py-4 pr-4">
                          <Link href={`/admin/orders/${order.id}`} className="font-medium hover:underline">
                            {order.id}
                          </Link>
                        </td>
                        <td className="py-4 pr-4">
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-muted-foreground">{order.email}</p>
                          </div>
                        </td>
                        <td className="py-4 pr-4">{order.items}</td>
                        <td className="py-4 pr-4 font-medium">{formatPrice(order.total)}</td>
                        <td className="py-4 pr-4">
                          <Badge variant="secondary" className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-4 pr-4">
                          <Badge variant="secondary" className={getPaymentColor(order.payment)}>
                            {order.payment}
                          </Badge>
                        </td>
                        <td className="py-4 pr-4 text-sm text-muted-foreground">{order.date}</td>
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
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                Print Invoice
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing 1-5 of 234 orders</p>
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
