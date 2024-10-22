// File: pages/landing.tsx
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Willwali Faraid Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Calculate Islamic inheritance shares accurately and easily
          </p>
          <Link href="/calculator">
            <Button size="lg" className="bg-primary text-white">
              Start Calculating
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Easy to Use</CardTitle>
              <CardDescription>
                Simple and intuitive interface for calculating inheritance shares
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-600">
                <li>Step-by-step guidance</li>
                <li>Clear input fields</li>
                <li>Instant calculations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accurate Calculations</CardTitle>
              <CardDescription>
                Based on Islamic inheritance laws
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-600">
                <li>Precise share distribution</li>
                <li>Supports multiple heirs</li>
                <li>Handles complex cases</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Share Results</CardTitle>
              <CardDescription>
                Easy sharing and documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-600">
                <li>Email results directly</li>
                <li>Detailed breakdown</li>
                <li>Clear formatting</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Enter Assets</h3>
              <p className="text-gray-600">Input the total value of the assets to be distributed</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Add Heirs</h3>
              <p className="text-gray-600">Select all eligible heirs from the comprehensive list</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Calculate</h3>
              <p className="text-gray-600">Get instant calculation of shares based on Islamic law</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Share Results</h3>
              <p className="text-gray-600">Email the detailed results to yourself or others</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Calculate Inheritance Shares?
          </h2>
          <p className="text-gray-600 mb-6">
            Get started with our easy-to-use Faraid calculator now
          </p>
          <Link href="/calculator">
            <Button size="lg" className="bg-primary text-white">
              Start Calculating
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Willwali Faraid Calculator. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/terms" className="mx-2 hover:text-gray-900">
              Terms of Service
            </Link>
            <Link href="/privacy" className="mx-2 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="/contact" className="mx-2 hover:text-gray-900">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
