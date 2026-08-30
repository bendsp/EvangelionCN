import { EvaBadge } from "@eva-cn/registry/eva-badge"
import { EvaText } from "@eva-cn/registry/eva-text"

export default function EvaBadgePage() {
  return (
    <main className="page-shell">
      <EvaText as="p" className="eyebrow" tracking="wide" variant="data">
        ITEM 03 / REGISTRY:UI / FRAMED LABELS
      </EvaText>
      <EvaText as="h1" className="doc-heading" horizontalScale={0.72} tracking="tight" variant="interface" uppercase>
        EVA-BADGE
      </EvaText>
      <EvaText as="p" className="lede" variant="roman">
        Framed interface labels with one or two auto-fitting text zones. Choose a size preset or set an exact width and height; the contents scale with the frame.
      </EvaText>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">INSTALL / INCLUDES EVA-TEXT + EVA-THEME</EvaText>
      </div>
      <code className="install-command">
        <EvaText as="span" variant="data">pnpm dlx shadcn@latest add bendsp/eva-cn/eva-badge</EvaText>
      </code>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">REFERENCE FORMS / ONE + TWO LEVELS</EvaText>
      </div>
      <div className="badge-showcase">
        <section className="badge-sample">
          <EvaText as="span" className="badge-sample-label" tracking="wide" variant="data">
            ONE LEVEL / CRITICAL
          </EvaText>
          <EvaBadge size="lg" tone="critical">UNKNOWN</EvaBadge>
        </section>
        <section className="badge-sample badge-sample-alert">
          <EvaText as="span" className="badge-sample-label" tracking="wide" variant="data">
            TWO LEVELS / DIVIDED / TERMINAL
          </EvaText>
          <EvaBadge secondary="TOPOGRAPHICAL MAP" separator size="lg" tone="terminal">
            TOKYO-3
          </EvaBadge>
        </section>
        <section className="badge-sample badge-sample-wide">
          <EvaText as="span" className="badge-sample-label" tracking="wide" variant="data">
            TWO LEVELS / OPEN / AMBER
          </EvaText>
          <EvaBadge emphasis="secondary" height="12rem" secondary="ANGEL" size="lg" tone="amber" width="25rem">
            17TH
          </EvaBadge>
        </section>
      </div>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">CONTROLLED FRAMES + SIGNAL TONES</EvaText>
      </div>
      <div className="badge-scale-row">
        <EvaBadge size="sm" tone="paper">MAGI</EvaBadge>
        <EvaBadge secondary="ACTIVE" separator size="md" tone="cyan">CASPER</EvaBadge>
        <EvaBadge height="7rem" secondary="ENTRY PLUG" tone="amber" width="18rem">EVA-01</EvaBadge>
        <EvaBadge lang="ja" secondary="接続中" separator size="md" tone="terminal">第3新東京市</EvaBadge>
      </div>
    </main>
  )
}
