import './globals.css'
import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import { AuthProvider } from "@/contexts/AuthContext";


export const metadata: Metadata = {
  title: 'Cashionix - Sell Your Device Instantly',
  description: 'India\'s most trusted platform for buying and selling used phones and laptops. Get the best prices with instant quotes and free pickup.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}