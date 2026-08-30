import { EvaSegmentDisplay } from "@eva-cn/registry/eva-segment-display"
import { EvaText } from "@eva-cn/registry/eva-text"
import { EvaSegmentDisplayLab } from "@/components/eva-segment-display-lab"

export default function EvaSegmentDisplayPage() {
  return (
    <main className="page-shell">
      <EvaText as="p" className="eyebrow" tracking="wide" variant="data">
        ITEM 04 / REGISTRY:UI / DISPLAY PRIMITIVE
      </EvaText>
      <EvaText as="h1" className="doc-heading" horizontalScale={0.72} tracking="tight" variant="interface" uppercase>
        EVA-SEGMENT-DISPLAY
      </EvaText>
      <EvaText as="p" className="lede" variant="roman">
        Seven-segment glyphs for time, percentages, limits, counters, and system values.
      </EvaText>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">INSTALL / INCLUDES EVA-THEME</EvaText>
      </div>
      <code className="install-command">
        <EvaText as="span" variant="data">pnpm dlx shadcn@latest add bendsp/eva-cn/eva-segment-display</EvaText>
      </code>

      <EvaSegmentDisplayLab />

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">REFERENCE STRINGS / NO TIMER LOGIC</EvaText>
      </div>
      <div className="segment-reference-grid">
        <section className="segment-reference-sample">
          <EvaText as="span" className="segment-reference-label" tracking="wide" variant="data">
            TIME / AMBER / GHOSTS
          </EvaText>
          <EvaSegmentDisplay
            characterGap={6}
            digitSize={126}
            digitWidth={55}
            ghostOpacity={0.1}
            segmentGap={2.8}
            segmentThickness={10.2}
            tone="amber"
            value="09:13.27"
          />
        </section>
        <section className="segment-reference-sample">
          <EvaText as="span" className="segment-reference-label" tracking="wide" variant="data">
            RATIO / CRITICAL / NARROW
          </EvaText>
          <EvaSegmentDisplay digitWidth={48} ghostOpacity={0} size="md" tone="critical" value="87.32" />
        </section>
        <section className="segment-reference-sample segment-reference-wide">
          <EvaText as="span" className="segment-reference-label" tracking="wide" variant="data">
            SIGNED VALUE / TERMINAL / LOOSE
          </EvaText>
          <EvaSegmentDisplay characterGap={16} segmentGap={3} size="lg" tone="terminal" value="-01:05" />
        </section>
      </div>
    </main>
  )
}
