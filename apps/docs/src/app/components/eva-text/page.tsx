import { EvaText } from "@evangelioncn/registry/eva-text"
import { TypographyLab } from "@/components/typography-lab"

export default function EvaTextPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">ITEM 02 / REGISTRY:UI / TYPOGRAPHY LABORATORY</p>
      <EvaText as="h1" className="doc-heading" horizontalScale={0.72} tracking="tight" variant="interface" uppercase>
        EVA-TEXT
      </EvaText>
      <p className="lede">
        Display typography for headings, labels, and data. Horizontal scaling changes the rendered shape, not its layout width, so it is intentionally unsuited to body-copy wrapping.
      </p>

      <div className="section-rule">INSTALL / INCLUDES EVA-THEME</div>
      <code className="install-command">pnpm dlx shadcn@latest add bendsp/EvangelionCN/eva-text</code>

      <div className="section-rule">LIVE LAB / SCALE + TRACKING</div>
      <TypographyLab />
    </main>
  )
}
