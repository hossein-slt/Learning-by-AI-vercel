"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Coffee, Home, UserPlus, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    // Simulate login process
    setTimeout(() => {
      if (email && password) {
        setMessage("Login successful! Redirecting...")
        // In a real app, you would redirect to the dashboard
        setTimeout(() => {
          window.location.href = "/products"
        }, 1500)
      } else {
        setMessage("Please fill in all fields")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-orange-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <Coffee className="h-8 w-8" />
              <h1 className="text-4xl font-bold tracking-wide">Client Login</h1>
            </div>
            <nav className="flex flex-wrap gap-4 justify-center">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-amber-900">Welcome Back</CardTitle>
              <CardDescription className="text-amber-700">Sign in to your Roozane Coffee account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-amber-800">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="border-amber-300 focus:border-amber-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-amber-800">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="border-amber-300 focus:border-amber-500 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-amber-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-amber-600" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-800 hover:bg-amber-900 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              {message && (
                <Alert className="mt-4 border-amber-300">
                  <AlertDescription className="text-amber-800">{message}</AlertDescription>
                </Alert>
              )}

              <div className="mt-6 text-center">
                <p className="text-amber-700">
                  {"Don't have an account? "}
                  <Link href="/register" className="text-amber-800 hover:text-amber-900 font-medium underline">
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
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
