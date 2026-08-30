import { EvaText } from "@eva-cn/registry/eva-text"
import { TypographyLab } from "@/components/typography-lab"

export default function EvaTextPage() {
  return (
    <main className="page-shell">
      <EvaText as="p" className="eyebrow" tracking="wide" variant="data">
        ITEM 02 / REGISTRY:UI / TYPOGRAPHY STUDIO
      </EvaText>
      <EvaText as="h1" className="doc-heading" horizontalScale={0.72} tracking="tight" variant="interface" uppercase>
        EVA-TEXT
      </EvaText>
      <EvaText as="p" className="lede" variant="roman">
        Display typography for headings, labels, and data. Horizontal scaling changes the rendered shape; the optional fit mode keeps a single-line display inside its parent without turning it into wrapping body copy.
      </EvaText>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">INSTALL / INCLUDES EVA-THEME</EvaText>
      </div>
      <code className="install-command">
        <EvaText as="span" variant="data">pnpm dlx shadcn@latest add bendsp/eva-cn/eva-text</EvaText>
      </code>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">TYPOGRAPHY STUDIO / TEXT + TYPE + SCALE + COLOR</EvaText>
      </div>
      <TypographyLab />
    </main>
  )
}
