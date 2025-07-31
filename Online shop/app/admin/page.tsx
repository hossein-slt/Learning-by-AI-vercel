"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Home, Shield, Eye, EyeOff } from "lucide-react"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    // Simulate admin login process
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        setMessage("Admin login successful! Redirecting to admin panel...")
        setTimeout(() => {
          window.location.href = "/admin/panel"
        }, 1500)
      } else {
        setMessage("Invalid admin credentials")
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
              <Shield className="h-8 w-8" />
              <h1 className="text-4xl font-bold tracking-wide">Admin Login</h1>
            </div>
            <nav className="flex flex-wrap gap-4 justify-center">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <Home className="h-4 w-4 mr-2" />
                  Home
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
              <CardTitle className="text-2xl font-bold text-amber-900">Admin Access</CardTitle>
              <CardDescription className="text-amber-700">
                Enter your admin credentials to access the management panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-amber-800">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
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
                      placeholder="Enter admin password"
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
                  {isLoading ? "Authenticating..." : "Login as Admin"}
                </Button>
              </form>

              {message && (
                <Alert className="mt-4 border-amber-300">
                  <AlertDescription className="text-amber-800">{message}</AlertDescription>
                </Alert>
              )}

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-700">
                  <strong>Demo Credentials:</strong>
                  <br />
                  Username: admin
                  <br />
                  Password: admin123
                </p>
              </div>

              <div className="mt-4 text-center">
                <p className="text-amber-700">
                  Already logged in?{" "}
                  <Link href="/admin/panel" className="text-amber-800 hover:text-amber-900 font-medium underline">
                    Go to Admin Panel
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
