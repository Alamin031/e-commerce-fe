"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Edit, Trash2, MoreVertical, GripVertical, Eye, EyeOff } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Switch } from "../../components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

const banners = [
  {
    id: "1",
    title: "iPhone 15 Launch",
    image: "/iphone-banner-electronics-sale.jpg",
    position: "Hero Slider",
    link: "/product/iphone-15-pro-max",
    order: 1,
    active: true,
  },
  {
    id: "2",
    title: "Flash Sale",
    image: "/flash-sale-electronics-discount.jpg",
    position: "Hero Slider",
    link: "/category/flash-sale",
    order: 2,
    active: true,
  },
  {
    id: "3",
    title: "Audio Collection",
    image: "/headphones-audio-collection.jpg",
    position: "Category Banner",
    link: "/category/audio",
    order: 1,
    active: true,
  },
  {
    id: "4",
    title: "MacBook Promo",
    image: "/macbook-laptop-promotional-banner.jpg",
    position: "Hero Slider",
    link: "/product/macbook-air-m3",
    order: 3,
    active: false,
  },
]

export default function AdminBannersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Banners</h1>
          <p className="text-muted-foreground">Manage promotional banners and sliders.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Banner</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="bannerTitle">Banner Title</Label>
                <Input id="bannerTitle" placeholder="Enter banner title" />
              </div>
              <div className="grid gap-2">
                <Label>Banner Image</Label>
                <div className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted">
                  <span className="text-sm text-muted-foreground">Click to upload (1920×600 recommended)</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bannerPosition">Position</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero Slider</SelectItem>
                    <SelectItem value="category">Category Banner</SelectItem>
                    <SelectItem value="promo">Promotional Banner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bannerLink">Link URL</Label>
                <Input id="bannerLink" placeholder="/category/sale" />
              </div>
              <div className="flex items-center gap-2">
                <Switch id="bannerActive" defaultChecked />
                <Label htmlFor="bannerActive">Active</Label>
              </div>
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                Create Banner
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {banners.map((banner) => (
              <div key={banner.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
                <div className="cursor-grab text-muted-foreground">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="h-20 w-40 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.title}
                    width={160}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{banner.title}</h3>
                    <Badge variant="secondary">{banner.position}</Badge>
                    {!banner.active && (
                      <Badge variant="outline" className="text-muted-foreground">
                        Hidden
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{banner.link}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked={banner.active} />
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
                        {banner.active ? (
                          <>
                            <EyeOff className="mr-2 h-4 w-4" />
                            Hide
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            Show
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
