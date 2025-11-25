/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, X, Plus, GripVertical } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Switch } from "../../../components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

export default function NewProductPage() {
  const [images, setImages] = useState<string[]>([])
  const [variants, setVariants] = useState([{ id: "1", name: "256GB", price: 129999, stock: 25 }])

  const addVariant = () => {
    setVariants([...variants, { id: Date.now().toString(), name: "", price: 0, stock: 0 }])
  }

  const removeVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground">Create a new product listing.</p>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Variants</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter product description" rows={5} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smartphones">Smartphones</SelectItem>
                      <SelectItem value="laptops">Laptops</SelectItem>
                      <SelectItem value="tablets">Tablets</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="wearables">Wearables</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="samsung">Samsung</SelectItem>
                      <SelectItem value="sony">Sony</SelectItem>
                      <SelectItem value="lg">LG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" placeholder="Enter SKU" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-4">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg border border-border bg-muted">
                    <button
                      className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <div className="absolute left-2 top-2 cursor-grab text-muted-foreground">
                      <GripVertical className="h-4 w-4" />
                    </div>
                  </div>
                ))}
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted">
                  <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Upload</span>
                  <input type="file" className="hidden" accept="image/*" multiple />
                </label>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Drag images to reorder. First image will be the primary image.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="price">Selling Price (₹)</Label>
                  <Input id="price" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mrp">MRP (₹)</Label>
                  <Input id="mrp" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cost">Cost Price (₹)</Label>
                  <Input id="cost" type="number" placeholder="0" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="emi" />
                <Label htmlFor="emi">Enable EMI options</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Variants</CardTitle>
              <Button variant="outline" size="sm" onClick={addVariant}>
                <Plus className="mr-2 h-4 w-4" />
                Add Variant
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {variants.map((variant, index) => (
                  <div key={variant.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
                    <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground" />
                    <div className="grid flex-1 gap-4 sm:grid-cols-3">
                      <Input placeholder="Variant name (e.g., 256GB)" defaultValue={variant.name} />
                      <Input type="number" placeholder="Price" defaultValue={variant.price} />
                      <Input type="number" placeholder="Stock" defaultValue={variant.stock} />
                    </div>
                    {variants.length > 1 && (
                      <Button variant="ghost" size="icon" onClick={() => removeVariant(variant.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lowStock">Low Stock Alert</Label>
                  <Input id="lowStock" type="number" placeholder="10" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="trackStock" defaultChecked />
                <Label htmlFor="trackStock">Track stock quantity</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="allowBackorder" />
                <Label htmlFor="allowBackorder">Allow backorders</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input id="metaTitle" placeholder="Enter meta title" />
                <p className="text-xs text-muted-foreground">Recommended: 50-60 characters</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea id="metaDescription" placeholder="Enter meta description" rows={3} />
                <p className="text-xs text-muted-foreground">Recommended: 150-160 characters</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input id="slug" placeholder="product-url-slug" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-end gap-4">
        <Button variant="outline">Save as Draft</Button>
        <Button>Publish Product</Button>
      </div>
    </div>
  )
}
