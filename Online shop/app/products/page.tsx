"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Coffee, ShoppingCart, Search, Home, User } from "lucide-react"

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    description: "Bright, floral notes with citrus undertones. Light to medium roast.",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Single Origin",
    inStock: true,
  },
  {
    id: 2,
    name: "Colombian Supremo",
    description: "Rich, full-bodied with chocolate and caramel notes. Medium roast.",
    price: 22.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Single Origin",
    inStock: true,
  },
  {
    id: 3,
    name: "House Blend",
    description: "Our signature blend combining beans from three continents. Medium-dark roast.",
    price: 19.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Blend",
    inStock: true,
  },
  {
    id: 4,
    name: "French Roast",
    description: "Bold, smoky flavor with low acidity. Dark roast for espresso lovers.",
    price: 21.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Dark Roast",
    inStock: false,
  },
  {
    id: 5,
    name: "Guatemala Antigua",
    description: "Complex flavor with spicy and smoky notes. Medium-dark roast.",
    price: 26.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Single Origin",
    inStock: true,
  },
  {
    id: 6,
    name: "Decaf Brazil",
    description: "Smooth, nutty flavor without the caffeine. Swiss water processed.",
    price: 23.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Decaf",
    inStock: true,
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(sampleProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<{ [key: number]: number }>({})

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-orange-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <Coffee className="h-8 w-8" />
              <h1 className="text-4xl font-bold tracking-wide">Our Products</h1>
            </div>
            <nav className="flex flex-wrap gap-4 justify-center">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" className="text-white hover:bg-white/20 relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">{getTotalItems()}</Badge>
                  )}
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-amber-300 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-white/90 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="text-center">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4 shadow-md"
                />
                <CardTitle className="text-amber-900">{product.name}</CardTitle>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                  {product.category}
                </Badge>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <CardDescription className="text-amber-700">{product.description}</CardDescription>
                <div className="text-2xl font-bold text-amber-800">${product.price}</div>
                {product.inStock ? (
                  <Button
                    onClick={() => addToCart(product.id)}
                    className="w-full bg-amber-800 hover:bg-amber-900 text-white"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                ) : (
                  <Button disabled className="w-full">
                    Out of Stock
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Coffee className="h-16 w-16 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-amber-800 mb-2">No products found</h3>
            <p className="text-amber-600">Try adjusting your search terms</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-700 to-orange-800 text-white text-center py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-lg font-medium">Est. 2024 - Roozane Coffee</p>
        </div>
      </footer>
    </div>
  )
}
