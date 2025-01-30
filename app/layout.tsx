import { Toaster } from "react-hot-toast"
import "./globals.css"
import type React from "react" // Added import for React

export const metadata = {
  title: "Client Records Management",
  description: "Manage your client records efficiently",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-100">
          <main>{children}</main>
          <Toaster position="top-right" />
        </div>
      </body>
    </html>
  )
}

