import { EvaText } from "@evangelioncn/registry/eva-text"
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
            <EvaText as="span" tracking="tight" variant="title">EvangelionCN</EvaText>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/components/eva-theme">
              <EvaText as="span" tracking="wide" variant="data">EVA-THEME</EvaText>
            </Link>
            <Link href="/components/eva-text">
              <EvaText as="span" tracking="wide" variant="data">EVA-TEXT</EvaText>
            </Link>
            <a href="https://github.com/bendsp/EvangelionCN">
              <EvaText as="span" tracking="wide" variant="data">GITHUB ↗</EvaText>
            </a>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <EvaText as="span" tracking="wide" variant="data">EVANGELIONCN / UNOFFICIAL FAN PROJECT</EvaText>
          <EvaText as="span" tracking="wide" variant="data">REGISTRY STATUS 02/02</EvaText>
        </footer>
      </body>
    </html>
  )
}
