import { EvaStripe } from "@eva-cn/registry/eva-stripe"
import { EvaText } from "@eva-cn/registry/eva-text"
import { EvaStripeLab } from "@/components/eva-stripe-lab"

export default function EvaStripePage() {
  return (
    <main className="page-shell">
      <EvaText as="p" className="eyebrow" tracking="wide" variant="data">
        ITEM 05 / REGISTRY:UI / EDGE PATTERN
      </EvaText>
      <EvaText as="h1" className="doc-heading" horizontalScale={0.72} tracking="tight" variant="interface" uppercase>
        EVA-STRIPE
      </EvaText>
      <EvaText as="p" className="lede" variant="roman">
        Repeating signal bands for frame edges, warning fields, and status regions.
      </EvaText>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">INSTALL / INCLUDES EVA-THEME</EvaText>
      </div>
      <code className="install-command">
        <EvaText as="span" variant="data">pnpm dlx shadcn@latest add bendsp/eva-cn/eva-stripe</EvaText>
      </code>

      <EvaStripeLab />

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">REFERENCE FORMS / PLACEMENT STAYS EXTERNAL</EvaText>
      </div>
      <div className="stripe-reference-grid">
        <section className="stripe-reference-sample stripe-reference-horizontal">
          <EvaText as="span" className="stripe-reference-label" tracking="wide" variant="data">
            HORIZONTAL / CRITICAL
          </EvaText>
          <div className="stripe-reference-bar">
            <EvaStripe angle={-45} band={18} gap={10} orientation="horizontal" tone="critical" />
          </div>
        </section>

        <section className="stripe-reference-sample stripe-reference-vertical">
          <EvaText as="span" className="stripe-reference-label" tracking="wide" variant="data">
            VERTICAL / AMBER / 500MS
          </EvaText>
          <div className="stripe-reference-rail">
            <EvaStripe
              angle={-45}
              band={25}
              gap={25}
              motion={{ kind: "scroll", durationMs: 500 }}
              orientation="vertical"
              tone="amber"
            />
          </div>
        </section>

        <section className="stripe-reference-sample stripe-reference-frame">
          <EvaText as="span" className="stripe-reference-label" tracking="wide" variant="data">
            INHERITED TONE / FRAME EDGE
          </EvaText>
          <div className="stripe-frame-example">
            <div className="stripe-frame-edge">
              <EvaStripe angle={-45} band={15} gap={9} tone="inherit" />
            </div>
            <EvaText as="span" horizontalScale={0.78} tracking="tight" variant="interface" uppercase>
              RESTRICTED AREA
            </EvaText>
            <div className="stripe-frame-edge">
              <EvaStripe angle={45} band={15} gap={9} tone="inherit" />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
