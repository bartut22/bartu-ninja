import './globals.css'
import { Rubik } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
config.autoAddCss = false

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'Bartu Tunctan',
  description: 'My developer portfolio',
  metadataBase: new URL('https://www.bartutunctan.com'),
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children} <Analytics /> <SpeedInsights /> </body>
    </html>
  )
}
