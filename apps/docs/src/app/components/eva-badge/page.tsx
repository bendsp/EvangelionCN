import { EvaBadge } from "@eva-cn/registry/eva-badge"
import { EvaText } from "@eva-cn/registry/eva-text"
import { EvaAutoBadgeLab } from "@/components/eva-auto-badge-lab"
import { EvaBadgeLab } from "@/components/eva-badge-lab"

export default function EvaBadgePage() {
  return (
    <main className="page-shell">
      <EvaText as="p" className="eyebrow" tracking="wide" variant="data">
        ITEMS 03 + 04 / REGISTRY:UI / FRAMED LABELS
      </EvaText>
      <EvaText as="h1" className="doc-heading" horizontalScale={0.72} tracking="tight" variant="interface" uppercase>
        EVA-BADGE
      </EvaText>
      <EvaText as="p" className="lede" variant="roman">
        Two sizing models for framed interface labels. Eva Badge fits its contents into a chosen frame; Eva Auto Badge lets the labels, type sizes, and padding determine the frame.
      </EvaText>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">INSTALL / INCLUDES EVA-TEXT + EVA-THEME</EvaText>
      </div>
      <code className="install-command">
        <EvaText as="span" variant="data">pnpm dlx shadcn@latest add bendsp/eva-cn/eva-badge</EvaText>
      </code>

      <EvaBadgeLab />

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">EXPERIMENT 02 / CONTENT-SIZED BADGE</EvaText>
      </div>
      <code className="install-command">
        <EvaText as="span" variant="data">pnpm dlx shadcn@latest add bendsp/eva-cn/eva-auto-badge</EvaText>
      </code>

      <EvaAutoBadgeLab />

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
        <EvaBadge shape="square" size="sm" tone="paper">MAGI</EvaBadge>
        <EvaBadge secondary="ACTIVE" separator size="md" tone="cyan">CASPER</EvaBadge>
        <EvaBadge height="7rem" secondary="ENTRY PLUG" tone="amber" width="18rem">EVA-01</EvaBadge>
        <EvaBadge lang="ja" secondary="接続中" separator size="md" tone="terminal">第3新東京市</EvaBadge>
      </div>
    </main>
  )
}
