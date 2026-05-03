import '@/app/globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThreeBackground from '@/components/ThreeBackground'
import SmoothScroll from '@/components/SmoothScroll'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Aura Creative | 3D Design Portfolio',
  description: 'Minimalist 3D portfolio for UI/UX, Graphic Design and Video Editing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
          <SmoothScroll>
            <ThreeBackground />
            <Header />
              <main id="app">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
