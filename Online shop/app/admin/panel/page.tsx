"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Coffee,
  Home,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Package,
  DollarSign,
  ShoppingBag,
  Users,
} from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
}

// Sample initial products
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    description: "Bright, floral notes with citrus undertones. Light to medium roast.",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200&text=Ethiopian+Coffee",
    category: "Single Origin",
    inStock: true,
  },
  {
    id: 2,
    name: "Colombian Supremo",
    description: "Rich, full-bodied with chocolate and caramel notes. Medium roast.",
    price: 22.99,
    image: "/placeholder.svg?height=200&width=200&text=Colombian+Coffee",
    category: "Single Origin",
    inStock: true,
  },
  {
    id: 3,
    name: "House Blend",
    description: "Our signature blend combining beans from three continents. Medium-dark roast.",
    price: 19.99,
    image: "/placeholder.svg?height=200&width=200&text=House+Blend",
    category: "Blend",
    inStock: true,
  },
]

const categories = ["Single Origin", "Blend", "Dark Roast", "Light Roast", "Decaf", "Espresso"]

export default function AdminPanelPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Form state for adding new products
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    inStock: true,
  })

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category) {
      setMessage("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      const product: Product = {
        id: Date.now(), // Simple ID generation
        name: newProduct.name,
        description: newProduct.description,
        price: Number.parseFloat(newProduct.price),
        image: newProduct.image || `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(newProduct.name)}`,
        category: newProduct.category,
        inStock: newProduct.inStock,
      }

      setProducts((prev) => [...prev, product])
      setNewProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        inStock: true,
      })
      setMessage("Product added successfully!")
      setIsLoading(false)
    }, 500)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product })
  }

  const handleSaveEdit = () => {
    if (!editingProduct) return

    setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? editingProduct : p)))
    setEditingProduct(null)
    setMessage("Product updated successfully!")
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
      setMessage("Product deleted successfully!")
    }
  }

  const toggleStock = (id: number) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p)))
  }

  const getTotalProducts = () => products.length
  const getInStockProducts = () => products.filter((p) => p.inStock).length
  const getTotalValue = () => products.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-orange-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <Coffee className="h-8 w-8" />
              <h1 className="text-4xl font-bold tracking-wide">Admin Panel</h1>
            </div>
            <nav className="flex flex-wrap gap-4 justify-center">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-amber-700">Total Products</p>
                  <p className="text-2xl font-bold text-amber-900">{getTotalProducts()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-amber-700">In Stock</p>
                  <p className="text-2xl font-bold text-amber-900">{getInStockProducts()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-amber-700">Total Value</p>
                  <p className="text-2xl font-bold text-amber-900">${getTotalValue().toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-amber-700">Categories</p>
                  <p className="text-2xl font-bold text-amber-900">{categories.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add New Product Form */}
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Product
              </CardTitle>
              <CardDescription className="text-amber-700">
                Fill in the details to add a new coffee product to your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-amber-800">
                    Product Name *
                  </Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Ethiopian Yirgacheffe"
                    className="border-amber-300 focus:border-amber-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-amber-800">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the coffee's flavor profile, roast level, etc."
                    className="border-amber-300 focus:border-amber-500"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-amber-800">
                      Price ($) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
                      placeholder="24.99"
                      className="border-amber-300 focus:border-amber-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-amber-800">
                      Category *
                    </Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="border-amber-300 focus:border-amber-500">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-amber-800">
                    Image URL (optional)
                  </Label>
                  <Input
                    id="image"
                    type="url"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/coffee-image.jpg"
                    className="border-amber-300 focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={newProduct.inStock}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, inStock: e.target.checked }))}
                    className="rounded border-amber-300"
                  />
                  <Label htmlFor="inStock" className="text-amber-800">
                    In Stock
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-800 hover:bg-amber-900 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding Product..." : "Add Product"}
                </Button>
              </form>

              {message && (
                <Alert className="mt-4 border-amber-300">
                  <AlertDescription className="text-amber-800">{message}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Product List */}
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Product Management
              </CardTitle>
              <CardDescription className="text-amber-700">Manage your existing coffee products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {products.map((product) => (
                  <div key={product.id} className="border border-amber-200 rounded-lg p-4">
                    {editingProduct?.id === product.id ? (
                      // Edit Mode
                      <div className="space-y-3">
                        <Input
                          value={editingProduct.name}
                          onChange={(e) =>
                            setEditingProduct((prev) => (prev ? { ...prev, name: e.target.value } : null))
                          }
                          className="font-semibold border-amber-300"
                        />
                        <Textarea
                          value={editingProduct.description}
                          onChange={(e) =>
                            setEditingProduct((prev) => (prev ? { ...prev, description: e.target.value } : null))
                          }
                          className="text-sm border-amber-300"
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            step="0.01"
                            value={editingProduct.price}
                            onChange={(e) =>
                              setEditingProduct((prev) =>
                                prev ? { ...prev, price: Number.parseFloat(e.target.value) } : null,
                              )
                            }
                            className="w-24 border-amber-300"
                          />
                          <Select
                            value={editingProduct.category}
                            onValueChange={(value) =>
                              setEditingProduct((prev) => (prev ? { ...prev, category: value } : null))
                            }
                          >
                            <SelectTrigger className="w-40 border-amber-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveEdit}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            onClick={() => setEditingProduct(null)}
                            size="sm"
                            variant="outline"
                            className="border-amber-300"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-amber-900">{product.name}</h3>
                          <div className="flex gap-1">
                            <Button
                              onClick={() => handleEditProduct(product)}
                              size="sm"
                              variant="outline"
                              className="border-amber-300 text-amber-800 hover:bg-amber-50"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteProduct(product.id)}
                              size="sm"
                              variant="outline"
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-amber-700 mb-2">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2 items-center">
                            <span className="font-bold text-amber-900">${product.price}</span>
                            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                              {product.category}
                            </Badge>
                            <Badge
                              variant={product.inStock ? "default" : "destructive"}
                              className={product.inStock ? "bg-green-100 text-green-800" : ""}
                            >
                              {product.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </div>
                          <Button
                            onClick={() => toggleStock(product.id)}
                            size="sm"
                            variant="outline"
                            className="border-amber-300 text-amber-800 hover:bg-amber-50"
                          >
                            Toggle Stock
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-700 to-orange-800 text-white text-center py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-lg font-medium">Est. 2024 - Roozane Coffee Admin</p>
        </div>
      </footer>
    </div>
  )
}
