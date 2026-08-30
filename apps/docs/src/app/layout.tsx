import { EvaText } from "@eva-cn/registry/eva-text"
import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "EVA-CN",
    template: "%s / EVA-CN",
  },
  description: "Evangelion-inspired typography and interface primitives for shadcn.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="dark">
      <body>
        <header className="site-header">
          <Link className="wordmark" href="/">
            <EvaText as="span" tracking="tight" variant="title">EVA-CN</EvaText>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/components/eva-theme">
              <EvaText as="span" tracking="wide" variant="interface">EVA-THEME</EvaText>
            </Link>
            <Link href="/components/eva-text">
              <EvaText as="span" tracking="wide" variant="interface">EVA-TEXT</EvaText>
            </Link>
            <a href="https://github.com/bendsp/eva-cn">
              <EvaText as="span" tracking="wide" variant="interface">GITHUB ↗</EvaText>
            </a>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <EvaText as="span" tracking="wide" variant="data">
            EVA-CN / UNOFFICIAL FAN PROJECT / BY{" "}
            <a className="site-footer-author" href="https://desprets.net">BEN DESPRETS</a>
          </EvaText>
          <EvaText as="span" tracking="wide" variant="data">REGISTRY STATUS 02/02</EvaText>
        </footer>
      </body>
    </html>
  )
}
