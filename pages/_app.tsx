// File: app/layout.tsx or pages/_app.tsx
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
