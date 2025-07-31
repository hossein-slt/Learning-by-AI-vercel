"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coffee, Home, ShoppingBag, User, Plus, Minus, Trash2, CreditCard } from "lucide-react"

// Sample cart data
const initialCartItems = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    price: 24.99,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Colombian Supremo",
    price: 22.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = () => {
    alert("Checkout functionality would be implemented here!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-orange-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <Coffee className="h-8 w-8" />
              <h1 className="text-4xl font-bold tracking-wide">Your Cart</h1>
            </div>
            <nav className="flex flex-wrap gap-4 justify-center">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Products
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
        <div className="max-w-4xl mx-auto">
          {cartItems.length === 0 ? (
            <Card className="bg-white/90 backdrop-blur-sm border-amber-200 text-center py-12">
              <CardContent>
                <Coffee className="h-16 w-16 text-amber-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-amber-900 mb-2">Your cart is empty</h2>
                <p className="text-amber-700 mb-6">Add some delicious coffee to get started!</p>
                <Link href="/products">
                  <Button className="bg-amber-800 hover:bg-amber-900 text-white">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Browse Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Cart Items ({getTotalItems()})</h2>
                {cartItems.map((item) => (
                  <Card key={item.id} className="bg-white/90 backdrop-blur-sm border-amber-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-amber-900">{item.name}</h3>
                          <p className="text-amber-700 font-medium">${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="border-amber-300 text-amber-800 hover:bg-amber-50"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800 px-3 py-1">
                            {item.quantity}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="border-amber-300 text-amber-800 hover:bg-amber-50"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-amber-900">${(item.price * item.quantity).toFixed(2)}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="bg-white/90 backdrop-blur-sm border-amber-200 sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-amber-900">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-amber-700">Subtotal:</span>
                      <span className="font-semibold text-amber-900">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Shipping:</span>
                      <span className="font-semibold text-amber-900">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Tax:</span>
                      <span className="font-semibold text-amber-900">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                    <hr className="border-amber-200" />
                    <div className="flex justify-between text-lg">
                      <span className="font-bold text-amber-900">Total:</span>
                      <span className="font-bold text-amber-900">${(getTotalPrice() * 1.08).toFixed(2)}</span>
                    </div>
                    <Button onClick={handleCheckout} className="w-full bg-amber-800 hover:bg-amber-900 text-white">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                    <Link href="/products">
                      <Button
                        variant="outline"
                        className="w-full border-amber-300 text-amber-800 hover:bg-amber-50 bg-transparent"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
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
