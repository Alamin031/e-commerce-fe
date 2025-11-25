import Image from "next/image"
import { Search, MoreVertical, Star, Check, X, Flag } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"

const reviews = [
  {
    id: "1",
    product: "iPhone 15 Pro Max",
    productImage: "/placeholder.svg?key=f23k9",
    customer: "John Doe",
    rating: 5,
    title: "Best phone ever!",
    content: "Amazing phone with great camera and performance. The titanium design feels premium.",
    date: "Nov 20, 2024",
    status: "Pending",
  },
  {
    id: "2",
    product: "MacBook Air M3",
    productImage: "/placeholder.svg?key=m9x2v",
    customer: "Jane Smith",
    rating: 4,
    title: "Great laptop, minor issues",
    content: "Overall excellent laptop for daily use. Battery life is incredible. Wish it had more ports.",
    date: "Nov 19, 2024",
    status: "Approved",
  },
  {
    id: "3",
    product: "Sony WH-1000XM5",
    productImage: "/placeholder.svg?key=s5h7k",
    customer: "Bob Wilson",
    rating: 5,
    title: "Best noise cancelling",
    content: "The noise cancelling is unmatched. Sound quality is excellent too.",
    date: "Nov 18, 2024",
    status: "Approved",
  },
  {
    id: "4",
    product: "Samsung Galaxy S24",
    productImage: "/placeholder.svg?key=g4n8p",
    customer: "Alice Brown",
    rating: 2,
    title: "Disappointing experience",
    content: "Battery drains too fast and the phone gets hot during gaming.",
    date: "Nov 17, 2024",
    status: "Flagged",
  },
]

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
          <p className="text-muted-foreground">Moderate and manage product reviews.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">4.5</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-sm text-muted-foreground">Total Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">Pending Approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Flagged</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="all">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending (5)</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="flagged">Flagged (3)</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <div className="relative sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search reviews..." className="pl-9" />
                </div>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={review.productImage || "/placeholder.svg"}
                        alt={review.product}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{review.product}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <Badge
                              variant="secondary"
                              className={
                                review.status === "Approved"
                                  ? "bg-green-500/10 text-green-600"
                                  : review.status === "Pending"
                                    ? "bg-yellow-500/10 text-yellow-600"
                                    : "bg-red-500/10 text-red-600"
                              }
                            >
                              {review.status}
                            </Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Flag className="mr-2 h-4 w-4" />
                              Flag
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <X className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <h4 className="mt-2 font-medium">{review.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{review.content}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        By {review.customer} on {review.date}
                      </p>
                    </div>
                  </div>
                  {review.status === "Pending" && (
                    <div className="mt-4 flex gap-2 border-t border-border pt-4">
                      <Button size="sm" className="gap-1">
                        <Check className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                        <X className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
