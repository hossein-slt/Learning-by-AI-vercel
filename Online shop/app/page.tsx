import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee, ShoppingBag, Users, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-orange-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <Coffee className="h-8 w-8" />
              <h1 className="text-4xl font-bold tracking-wide">Roozane Coffee</h1>
            </div>
            <nav className="flex flex-wrap gap-4 justify-center">
              <Link href="/admin">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Login
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  Client Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <Users className="h-4 w-4 mr-2" />
                  Register
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Products
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <Card className="mb-12 bg-white/80 backdrop-blur-sm border-amber-200">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-amber-900 mb-4">Welcome to Roozane Coffee</CardTitle>
              <CardDescription className="text-lg text-amber-700">
                Discover premium coffee beans, expertly roasted and delivered fresh to your door. Browse our products,
                create an account, and shop securely!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/products">
                <Button size="lg" className="bg-amber-800 hover:bg-amber-900 text-white">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Shop Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Coffee className="h-12 w-12 text-amber-800 mb-2" />
                <CardTitle className="text-amber-900">Premium Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700">
                  Hand-selected coffee beans from the finest farms around the world, roasted to perfection for the
                  ultimate coffee experience.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <ShoppingBag className="h-12 w-12 text-amber-800 mb-2" />
                <CardTitle className="text-amber-900">Easy Shopping</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700">
                  Browse our extensive collection, add items to your cart, and enjoy a seamless checkout experience with
                  secure payment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-amber-800 mb-2" />
                <CardTitle className="text-amber-900">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700">
                  Join our coffee-loving community, track your orders, and discover new favorites with personalized
                  recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-700 to-orange-800 text-white text-center py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-lg font-medium">Est. 2024 - Roozane Coffee</p>
          <p className="text-amber-200 mt-2">Brewing excellence, one cup at a time</p>
        </div>
      </footer>
    </div>
  )
}
