"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, MoreVertical, Copy, Tag } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { formatPrice } from "../../lib/utils/format"

const coupons = [
  {
    id: "1",
    code: "WELCOME10",
    type: "Percentage",
    value: 10,
    minOrder: 999,
    maxDiscount: 500,
    usageLimit: 1000,
    used: 456,
    validFrom: "Nov 01, 2024",
    validTo: "Dec 31, 2024",
    status: "Active",
  },
  {
    id: "2",
    code: "FLAT500",
    type: "Fixed",
    value: 500,
    minOrder: 4999,
    maxDiscount: null,
    usageLimit: 500,
    used: 234,
    validFrom: "Nov 15, 2024",
    validTo: "Nov 30, 2024",
    status: "Active",
  },
  {
    id: "3",
    code: "SUMMER20",
    type: "Percentage",
    value: 20,
    minOrder: 1999,
    maxDiscount: 1000,
    usageLimit: 200,
    used: 200,
    validFrom: "Oct 01, 2024",
    validTo: "Oct 31, 2024",
    status: "Expired",
  },
  {
    id: "4",
    code: "NEWYEAR25",
    type: "Percentage",
    value: 25,
    minOrder: 2999,
    maxDiscount: 2000,
    usageLimit: 1000,
    used: 0,
    validFrom: "Dec 25, 2024",
    validTo: "Jan 05, 2025",
    status: "Scheduled",
  },
]

export default function AdminCouponsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Coupons</h1>
          <p className="text-muted-foreground">Manage discount coupons and promotions.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="couponCode">Coupon Code</Label>
                <Input id="couponCode" placeholder="Enter coupon code" className="uppercase" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="discountType">Discount Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="discountValue">Discount Value</Label>
                  <Input id="discountValue" type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="minOrder">Min. Order Value (₹)</Label>
                  <Input id="minOrder" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxDiscount">Max. Discount (₹)</Label>
                  <Input id="maxDiscount" type="number" placeholder="No limit" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="validFrom">Valid From</Label>
                  <Input id="validFrom" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="validTo">Valid To</Label>
                  <Input id="validTo" type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input id="usageLimit" type="number" placeholder="Unlimited" />
              </div>
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                Create Coupon
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search coupons..." className="pl-9" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 pr-4">Code</th>
                  <th className="pb-3 pr-4">Discount</th>
                  <th className="pb-3 pr-4">Min. Order</th>
                  <th className="pb-3 pr-4">Usage</th>
                  <th className="pb-3 pr-4">Validity</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="border-b border-border">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <span className="font-mono font-semibold">{coupon.code}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      {coupon.type === "Percentage" ? (
                        <span>{coupon.value}% off</span>
                      ) : (
                        <span>{formatPrice(coupon.value)} off</span>
                      )}
                      {coupon.maxDiscount && (
                        <p className="text-xs text-muted-foreground">Max: {formatPrice(coupon.maxDiscount)}</p>
                      )}
                    </td>
                    <td className="py-4 pr-4">{formatPrice(coupon.minOrder)}</td>
                    <td className="py-4 pr-4">
                      <span>
                        {coupon.used} / {coupon.usageLimit}
                      </span>
                      <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width: `${(coupon.used / coupon.usageLimit) * 100}%`,
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-sm">
                      <p>{coupon.validFrom}</p>
                      <p className="text-muted-foreground">to {coupon.validTo}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <Badge
                        variant="secondary"
                        className={
                          coupon.status === "Active"
                            ? "bg-green-500/10 text-green-600"
                            : coupon.status === "Scheduled"
                              ? "bg-blue-500/10 text-blue-600"
                              : "bg-gray-500/10 text-gray-600"
                        }
                      >
                        {coupon.status}
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
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
