import type { Metadata } from 'next'
import { Providers } from '../components/providers'
import { Navbar } from '@/components/shared/navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'مدرسة المستقبل',
  description: 'موقع مدرسة المستقبل التعليمي',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Providers>
          <Navbar />
          <main className="main-content">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
} 