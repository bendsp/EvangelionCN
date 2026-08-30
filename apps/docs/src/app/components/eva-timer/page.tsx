import { EvaText } from "@eva-cn/registry/eva-text"
import { EvaTimer } from "@eva-cn/registry/eva-timer"
import { EvaTimerLab } from "@/components/eva-timer-lab"

export default function EvaTimerPage() {
  return (
    <main className="page-shell">
      <EvaText as="p" className="eyebrow" tracking="wide" variant="data">
        ITEM 04 / REGISTRY:UI / SEGMENTED DISPLAY
      </EvaText>
      <EvaText as="h1" className="doc-heading" horizontalScale={0.72} tracking="tight" variant="interface" uppercase>
        EVA-TIMER
      </EvaText>
      <EvaText as="p" className="lede" variant="roman">
        Seven-segment time displays for countdowns, elapsed time, and operational limits.
      </EvaText>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">INSTALL / INCLUDES EVA-TEXT + EVA-THEME</EvaText>
      </div>
      <code className="install-command">
        <EvaText as="span" variant="data">pnpm dlx shadcn@latest add bendsp/eva-cn/eva-timer</EvaText>
      </code>

      <EvaTimerLab />

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">REFERENCE FORMS / LIMITS + ELAPSED TIME</EvaText>
      </div>
      <div className="timer-reference-grid">
        <section className="timer-reference-sample">
          <EvaText as="span" className="timer-reference-label" tracking="wide" variant="data">
            INTERNAL POWER / AMBER
          </EvaText>
          <EvaTimer label="INTERNAL BATTERY" size="sm" status="ACTIVE" tone="amber" value={185} />
        </section>
        <section className="timer-reference-sample">
          <EvaText as="span" className="timer-reference-label" tracking="wide" variant="data">
            HARD LIMIT / CRITICAL
          </EvaText>
          <EvaTimer label="TIME REMAINING" precision={2} size="sm" status="LIMIT" tone="critical" value={10} />
        </section>
        <section className="timer-reference-sample timer-reference-wide">
          <EvaText as="span" className="timer-reference-label" tracking="wide" variant="data">
            OPERATION TIME / TERMINAL / BARE
          </EvaText>
          <EvaTimer format="hh:mm:ss" frame="bare" ghostSegments={false} size="md" tone="terminal" value={5265} />
        </section>
      </div>
    </main>
  )
}
