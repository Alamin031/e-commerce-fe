"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Search, Edit, Trash2, MoreVertical } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

const categories = [
  {
    id: "1",
    name: "Smartphones",
    slug: "smartphones",
    image: "/placeholder.svg?key=5c3bh",
    products: 156,
    subcategories: [
      { id: "1a", name: "Android Phones", products: 89 },
      { id: "1b", name: "iPhones", products: 67 },
    ],
  },
  {
    id: "2",
    name: "Laptops",
    slug: "laptops",
    image: "/placeholder.svg?key=9qrz3",
    products: 98,
    subcategories: [
      { id: "2a", name: "MacBooks", products: 34 },
      { id: "2b", name: "Windows Laptops", products: 64 },
    ],
  },
  {
    id: "3",
    name: "Audio",
    slug: "audio",
    image: "/placeholder.svg?key=vb5kn",
    products: 234,
    subcategories: [
      { id: "3a", name: "Headphones", products: 89 },
      { id: "3b", name: "Earbuds", products: 145 },
    ],
  },
  {
    id: "4",
    name: "Wearables",
    slug: "wearables",
    image: "/placeholder.svg?key=m2k8p",
    products: 67,
    subcategories: [],
  },
]

export default function AdminCategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage product categories and subcategories.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="catName">Category Name</Label>
                <Input id="catName" placeholder="Enter category name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="catSlug">URL Slug</Label>
                <Input id="catSlug" placeholder="category-slug" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="parent">Parent Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="None (Top Level)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Top Level)</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Category Image</Label>
                <div className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted">
                  <span className="text-sm text-muted-foreground">Click to upload image</span>
                </div>
              </div>
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                Create Category
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
              <Input placeholder="Search categories..." className="pl-9" />
            </div>
          </div>

          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="rounded-lg border border-border">
                <div className="flex items-center gap-4 p-4">
                  <div className="h-16 w-16 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{category.name}</h3>
                      <Badge variant="secondary">{category.products} products</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">/{category.slug}</p>
                  </div>
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
                        <Plus className="mr-2 h-4 w-4" />
                        Add Subcategory
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {category.subcategories.length > 0 && (
                  <div className="border-t border-border bg-muted/30 p-4">
                    <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">Subcategories</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub) => (
                        <Badge key={sub.id} variant="outline" className="gap-1">
                          {sub.name}
                          <span className="text-muted-foreground">({sub.products})</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
