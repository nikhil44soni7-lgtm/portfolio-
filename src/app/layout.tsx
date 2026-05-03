import '@/app/globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThreeBackground from '@/components/ThreeBackground'
import SmoothScroll from '@/components/SmoothScroll'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Harshita Soni | UI/UX Designer & Developer Portfolio',
  description: 'Portfolio of Harshita Soni — UI/UX Designer, Graphic Designer, Video Editor and Web Developer from Bhilwara, Rajasthan.'
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
