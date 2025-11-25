import Link from "next/link"
import Image from "next/image"
import { Package, ChevronRight, Search, Filter } from "lucide-react"
import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { formatPrice } from "../../../lib/utils/format"

const orders = [
  {
    id: "ORD-2024-001",
    date: "Nov 20, 2024",
    status: "Delivered",
    deliveredDate: "Nov 23, 2024",
    total: 129999,
    items: [
      {
        name: "iPhone 15 Pro Max",
        image: "/iphone-15-pro-max-display.png",
        price: 129999,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "Nov 15, 2024",
    status: "Shipped",
    expectedDate: "Nov 26, 2024",
    total: 49999,
    items: [
      {
        name: "Samsung Galaxy Watch 6",
        image: "/smartwatch.png",
        price: 29999,
        quantity: 1,
      },
      {
        name: "Galaxy Buds Pro 2",
        image: "/galaxy-buds.jpg",
        price: 19999,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "Nov 10, 2024",
    status: "Processing",
    total: 79999,
    items: [
      {
        name: "MacBook Air M3",
        image: "/macbook-air-m3.jpg",
        price: 79999,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-2024-004",
    date: "Oct 28, 2024",
    status: "Cancelled",
    total: 15999,
    items: [
      {
        name: "AirPods Pro 2",
        image: "/airpods-pro-lifestyle.png",
        price: 15999,
        quantity: 1,
      },
    ],
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Delivered":
      return "bg-green-500/10 text-green-600 border-green-200"
    case "Shipped":
      return "bg-blue-500/10 text-blue-600 border-blue-200"
    case "Processing":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-200"
    case "Cancelled":
      return "bg-red-500/10 text-red-600 border-red-200"
    default:
      return ""
  }
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-9" />
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold">{order.id}</p>
                      <Badge className={getStatusColor(order.status)} variant="outline">
                        {order.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Ordered on {order.date}
                      {order.deliveredDate && ` • Delivered on ${order.deliveredDate}`}
                      {order.expectedDate && ` • Expected by ${order.expectedDate}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatPrice(order.total)}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} {order.items.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-background">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={`/account/orders/${order.id}`}>
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  {order.status === "Delivered" && (
                    <>
                      <Button variant="outline" size="sm">
                        Write Review
                      </Button>
                      <Button variant="outline" size="sm">
                        Buy Again
                      </Button>
                    </>
                  )}
                  {order.status === "Shipped" && (
                    <Button variant="outline" size="sm">
                      Track Order
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="processing" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">No processing orders</p>
          </div>
        </TabsContent>

        <TabsContent value="shipped" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">No shipped orders</p>
          </div>
        </TabsContent>

        <TabsContent value="delivered" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">No delivered orders</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
