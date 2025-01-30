import { Toaster } from "react-hot-toast"
import "./globals.css"
import type React from "react"


export const metadata = {
  title: "Records Management",
  description: "Manage your client records efficiently",
  icons : {
    icon :  "/logo.jpeg",
  },
  openGraph: {
    title: "Records Management",
    description: "Manage your client records efficiently",
    images: [
      {
        url: "/logo.jpeg", 
        width: 1200,
        height: 630,
        alt: "Records Management Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Records Management",
    description: "Manage your client records efficiently",
    images: ["/logo.jpeg"],
  },
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

