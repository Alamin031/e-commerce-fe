"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, MoreVertical, Eye, FileText } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Textarea } from "../../components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"

const pages = [
  {
    id: "1",
    title: "About Us",
    slug: "about",
    status: "Published",
    lastUpdated: "Nov 15, 2024",
  },
  {
    id: "2",
    title: "Privacy Policy",
    slug: "privacy-policy",
    status: "Published",
    lastUpdated: "Nov 10, 2024",
  },
  {
    id: "3",
    title: "Terms & Conditions",
    slug: "terms",
    status: "Published",
    lastUpdated: "Nov 10, 2024",
  },
  {
    id: "4",
    title: "Return Policy",
    slug: "return-policy",
    status: "Published",
    lastUpdated: "Nov 05, 2024",
  },
  {
    id: "5",
    title: "FAQ",
    slug: "faq",
    status: "Draft",
    lastUpdated: "Nov 01, 2024",
  },
]

export default function AdminPagesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground">Manage static content pages.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Page
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="pageTitle">Page Title</Label>
                <Input id="pageTitle" placeholder="Enter page title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pageSlug">URL Slug</Label>
                <Input id="pageSlug" placeholder="page-url-slug" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pageContent">Content</Label>
                <Textarea id="pageContent" placeholder="Enter page content..." rows={10} />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Save as Draft
                </Button>
                <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                  Publish
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search pages..." className="pl-9" />
            </div>
          </div>

          <div className="space-y-4">
            {pages.map((page) => (
              <div key={page.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{page.title}</h3>
                      <Badge
                        variant="secondary"
                        className={
                          page.status === "Published"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-yellow-500/10 text-yellow-600"
                        }
                      >
                        {page.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      /{page.slug} • Updated {page.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/${page.slug}`} target="_blank">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
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
