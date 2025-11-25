'use client'

import { useState } from "react"
import Image from "next/image"
import { Search, MoreVertical, Star, Check, X, Flag } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"

interface Review {
  id: string
  product: string
  productImage: string
  customer: string
  rating: number
  title: string
  content: string
  date: string
  status: "Pending" | "Approved" | "Flagged" | "Rejected"
}

const initialReviews: Review[] = [
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
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [approveOpen, setApproveOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [flagOpen, setFlagOpen] = useState(false)
  const [flagReason, setFlagReason] = useState("")

  const handleApproveClick = (review: Review) => {
    setSelectedReview(review)
    setApproveOpen(true)
  }

  const handleRejectClick = (review: Review) => {
    setSelectedReview(review)
    setRejectOpen(true)
  }

  const handleFlagClick = (review: Review) => {
    setSelectedReview(review)
    setFlagReason("")
    setFlagOpen(true)
  }

  const handleConfirmApprove = () => {
    if (selectedReview) {
      setReviews(
        reviews.map((r) =>
          r.id === selectedReview.id ? { ...r, status: "Approved" } : r
        )
      )
      setApproveOpen(false)
    }
  }

  const handleConfirmReject = () => {
    if (selectedReview) {
      setReviews(
        reviews.map((r) =>
          r.id === selectedReview.id ? { ...r, status: "Rejected" } : r
        )
      )
      setRejectOpen(false)
    }
  }

  const handleConfirmFlag = () => {
    if (selectedReview) {
      setReviews(
        reviews.map((r) =>
          r.id === selectedReview.id ? { ...r, status: "Flagged" } : r
        )
      )
      setFlagOpen(false)
      setFlagReason("")
    }
  }

  const pendingCount = reviews.filter((r) => r.status === "Pending").length
  const flaggedCount = reviews.filter((r) => r.status === "Flagged").length
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

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
            <p className="text-2xl font-bold">{avgRating}</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">{reviews.length}</p>
            <p className="text-sm text-muted-foreground">Total Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">{pendingCount}</p>
            <p className="text-sm text-muted-foreground">Pending Approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">{flaggedCount}</p>
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
                <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="flagged">Flagged ({flaggedCount})</TabsTrigger>
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
                                    : review.status === "Flagged"
                                      ? "bg-red-500/10 text-red-600"
                                      : "bg-gray-500/10 text-gray-600"
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
                            <DropdownMenuItem onClick={() => handleApproveClick(review)}>
                              <Check className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFlagClick(review)}>
                              <Flag className="mr-2 h-4 w-4" />
                              Flag
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleRejectClick(review)}>
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
                      <Button size="sm" className="gap-1" onClick={() => handleApproveClick(review)}>
                        <Check className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 bg-transparent" onClick={() => handleFlagClick(review)}>
                        <Flag className="h-4 w-4" />
                        Flag
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 bg-transparent text-destructive" onClick={() => handleRejectClick(review)}>
                        <X className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {reviews
                .filter((r) => r.status === "Pending")
                .map((review) => (
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
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleApproveClick(review)}>
                                <Check className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleFlagClick(review)}>
                                <Flag className="mr-2 h-4 w-4" />
                                Flag
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => handleRejectClick(review)}>
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
                    <div className="mt-4 flex gap-2 border-t border-border pt-4">
                      <Button size="sm" className="gap-1" onClick={() => handleApproveClick(review)}>
                        <Check className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 bg-transparent" onClick={() => handleFlagClick(review)}>
                        <Flag className="h-4 w-4" />
                        Flag
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 bg-transparent text-destructive" onClick={() => handleRejectClick(review)}>
                        <X className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {reviews
                .filter((r) => r.status === "Approved")
                .map((review) => (
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
                              <Badge className="bg-green-500/10 text-green-600">Approved</Badge>
                            </div>
                          </div>
                        </div>
                        <h4 className="mt-2 font-medium">{review.title}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{review.content}</p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          By {review.customer} on {review.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="flagged" className="space-y-4">
              {reviews
                .filter((r) => r.status === "Flagged")
                .map((review) => (
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
                              <Badge className="bg-red-500/10 text-red-600">Flagged</Badge>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleApproveClick(review)}>
                                <Check className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => handleRejectClick(review)}>
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
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Approve Review Modal */}
      <AlertDialog open={approveOpen} onOpenChange={setApproveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve this review for <span className="font-semibold">{selectedReview?.product}</span>? It will be published on the product page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmApprove}>
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Review Modal */}
      <AlertDialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject this review for <span className="font-semibold">{selectedReview?.product}</span>? It will not be published.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmReject} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Flag Review Modal */}
      <Dialog open={flagOpen} onOpenChange={setFlagOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Flag Review</DialogTitle>
            <DialogDescription>
              Flag this review for <span className="font-semibold">{selectedReview?.product}</span> for further review
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="flag-reason">Reason for flagging (optional)</Label>
              <Textarea
                id="flag-reason"
                value={flagReason}
                onChange={(e) => setFlagReason(e.target.value)}
                placeholder="Explain why you're flagging this review..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFlagOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmFlag}>Flag Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
