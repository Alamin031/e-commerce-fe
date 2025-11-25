"use client"

import { useState } from "react"
import { MapPin, Plus, Edit2, Trash2, Check } from "lucide-react"
import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"

const initialAddresses = [
  {
    id: "1",
    name: "John Doe",
    phone: "+91 98765 43210",
    address: "123 Main Street, Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    type: "Home",
    isDefault: true,
  },
  {
    id: "2",
    name: "John Doe",
    phone: "+91 98765 43210",
    address: "456 Business Park, Tower A, Floor 5",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400051",
    type: "Office",
    isDefault: false,
  },
]

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const setDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
  }

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Addresses</h1>
          <p className="text-muted-foreground">Manage your delivery addresses.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="House no., Building, Street, Area" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" placeholder="6-digit pincode" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="State" />
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1 bg-transparent">
                  Home
                </Button>
                <Button type="button" variant="outline" className="flex-1 bg-transparent">
                  Office
                </Button>
              </div>
              <Button type="submit" className="w-full" onClick={() => setIsDialogOpen(false)}>
                Save Address
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <MapPin className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold">No addresses saved</h2>
            <p className="mt-1 text-muted-foreground">Add an address for faster checkout.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address.id} className={address.isDefault ? "border-primary" : ""}>
              <CardContent className="p-6">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={address.type === "Home" ? "default" : "secondary"}>{address.type}</Badge>
                    {address.isDefault && (
                      <Badge variant="outline" className="border-primary text-primary">
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => deleteAddress(address.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{address.name}</p>
                  <p className="text-muted-foreground">{address.address}</p>
                  <p className="text-muted-foreground">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-muted-foreground">{address.phone}</p>
                </div>
                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 gap-2 bg-transparent"
                    onClick={() => setDefaultAddress(address.id)}
                  >
                    <Check className="h-4 w-4" />
                    Set as Default
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
