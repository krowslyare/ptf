import React from "react"
import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono, Zen_Old_Mincho } from 'next/font/google'
import { SmoothScroll } from '@/components/portfolio/smooth-scroll'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ibmPlexSans = IBM_Plex_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ["latin"],
  weight: ["400", "500"]
});
// Loaded for its @font-face side effect: globals.css references the family by
// name. next/font exposes no japanese subset for any family in this version, so
// the kana motif falls back to a system mincho — and is glyph-checked at
// runtime rather than risking tofu boxes. See components/portfolio/kana.tsx.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const zenOldMincho = Zen_Old_Mincho({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"]
});

export const metadata: Metadata = {
  title: 'Hideki Toyama | Software & Data Engineer',
  description: 'Software and data engineer based in Lima, Peru. I build web systems end to end: client portals, inventory ERPs, and data pipelines running in production.',
  icons: {
    icon: [
      {
        url: '/icon?v=2',
      },
      {
        url: '/favicon.svg?v=2',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/icon?v=2',
    apple: '/icon?v=2',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <SmoothScroll />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
