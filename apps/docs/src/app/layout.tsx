import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "EvangelionCN",
    template: "%s — EvangelionCN",
  },
  description: "Evangelion-inspired typography and interface primitives for shadcn.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="dark">
      <body>
        <header className="site-header">
          <Link className="wordmark" href="/">
            <span>EVANGELION</span>
            <span className="wordmark-cn">CN</span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/components/eva-theme">EVA-THEME</Link>
            <Link href="/components/eva-text">EVA-TEXT</Link>
            <a href="https://github.com/bendsp/EvangelionCN">GITHUB ↗</a>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <span>EVANGELIONCN / UNOFFICIAL FAN PROJECT</span>
          <span>REGISTRY STATUS 02/02</span>
        </footer>
      </body>
    </html>
  )
}
