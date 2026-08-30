import { EvaBadge } from "@eva-cn/registry/eva-badge"
import { EvaText } from "@eva-cn/registry/eva-text"
import Link from "next/link"

const itemBadgeProps = {
  align: "center",
  borderWidth: 3,
  cornerRadius: 4,
  fontSize: 32,
  horizontalScale: 0.86,
  paddingBlock: 1,
  paddingInline: 6,
  shape: "rounded",
  tone: "amber",
  tracking: "tight",
  uppercase: true,
} as const

export default function Home() {
  return (
    <main className="page-shell">
      <EvaText as="p" className="eyebrow" tracking="wide" variant="data">
        EVA-CN / SHADCN REGISTRY / INITIAL RELEASE
      </EvaText>
      <EvaText as="h1" className="doc-heading" horizontalScale={0.72} tracking="tight" variant="title">
        TYPE IS THE INTERFACE.
      </EvaText>

      <div className="registry-grid">
        <Link className="registry-link" href="/components/eva-theme">
          <EvaBadge className="registry-link-badge" {...itemBadgeProps}>
            ITEM-01
          </EvaBadge>
          <EvaText as="h2" horizontalScale={0.8} tracking="tight" variant="interface" uppercase>
            EVA-THEME
          </EvaText>
          <EvaText as="p" variant="roman">
            Color, typography, radius, and semantic tokens. Install this first or let Eva Text pull it in.
          </EvaText>
          <EvaText as="span" className="registry-link-arrow" tracking="wide" variant="data">OPEN ITEM →</EvaText>
        </Link>
        <Link className="registry-link" href="/components/eva-text">
          <EvaBadge className="registry-link-badge" {...itemBadgeProps}>
            ITEM-02
          </EvaBadge>
          <EvaText as="h2" horizontalScale={0.8} tracking="tight" variant="interface" uppercase>
            EVA-TEXT
          </EvaText>
          <EvaText as="p" variant="roman">
            English and Japanese type roles with explicit tracking and horizontal display scaling.
          </EvaText>
          <EvaText as="span" className="registry-link-arrow" tracking="wide" variant="data">OPEN LAB →</EvaText>
        </Link>
        <Link className="registry-link" href="/components/eva-badge">
          <EvaBadge className="registry-link-badge" {...itemBadgeProps}>
            ITEM-03
          </EvaBadge>
          <EvaText as="h2" horizontalScale={0.8} tracking="tight" variant="interface" uppercase>
            EVA-BADGE
          </EvaText>
          <EvaText as="p" variant="roman">
            Content-sized labels whose frame grows with the widest text level and the chosen spacing.
          </EvaText>
          <EvaText as="span" className="registry-link-arrow" tracking="wide" variant="data">OPEN LAB →</EvaText>
        </Link>
        <Link className="registry-link" href="/components/eva-timer">
          <EvaBadge className="registry-link-badge" {...itemBadgeProps}>
            ITEM-04
          </EvaBadge>
          <EvaText as="h2" horizontalScale={0.8} tracking="tight" variant="interface" uppercase>
            EVA-TIMER
          </EvaText>
          <EvaText as="p" variant="roman">
            Seven-segment time displays for countdowns, elapsed time, and operational limits.
          </EvaText>
          <EvaText as="span" className="registry-link-arrow" tracking="wide" variant="data">OPEN LAB →</EvaText>
        </Link>
      </div>
    </main>
  )
}
