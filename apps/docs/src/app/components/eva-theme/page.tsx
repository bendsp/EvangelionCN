import { EvaText } from "@eva-cn/registry/eva-text"

const fontRoles = [
  { role: "TITLE / EN", family: "Besley", variant: "title" as const, lang: "en" as const, sample: "NEON GENESIS" },
  { role: "TITLE / JA", family: "Noto Serif JP", variant: "title" as const, lang: "ja" as const, sample: "新世紀" },
  { role: "INTERFACE / EN", family: "Archivo", variant: "interface" as const, lang: "en" as const, sample: "PATTERN BLUE" },
  { role: "INTERFACE / JA", family: "Noto Sans JP", variant: "interface" as const, lang: "ja" as const, sample: "作戦開始" },
  { role: "ROMAN / EN", family: "Tinos", variant: "roman" as const, lang: "en" as const, sample: "The fate of destruction" },
  { role: "DATA / JA + EN", family: "M PLUS 1 Code", variant: "data" as const, lang: "ja" as const, sample: "第3新東京市 / 00:03:27" },
]

export default function EvaThemePage() {
  return (
    <main className="page-shell">
      <EvaText as="p" className="eyebrow" tracking="wide" variant="data">ITEM 01 / REGISTRY:THEME</EvaText>
      <EvaText as="h1" className="doc-heading" horizontalScale={0.72} tracking="tight" variant="interface" uppercase>
        EVA-THEME
      </EvaText>
      <EvaText as="p" className="lede" variant="roman">
        The common signal palette and font roles used by every EVA-CN component.
      </EvaText>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">INSTALL / PUBLIC GITHUB REGISTRY</EvaText>
      </div>
      <code className="install-command">
        <EvaText as="span" variant="data">pnpm dlx shadcn@latest add bendsp/eva-cn/eva-theme</EvaText>
      </code>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">SIGNAL PALETTE / SIX TOKENS</EvaText>
      </div>
      <div className="palette-grid">
        <div className="swatch swatch-black">
          <EvaText as="span" variant="data">BLACK</EvaText>
          <EvaText as="span" variant="data">--eva-black</EvaText>
        </div>
        <div className="swatch swatch-paper">
          <EvaText as="span" variant="data">PAPER</EvaText>
          <EvaText as="span" variant="data">--eva-paper</EvaText>
        </div>
        <div className="swatch swatch-critical">
          <EvaText as="span" variant="data">EMERGENCY RED</EvaText>
          <EvaText as="span" variant="data">--eva-critical</EvaText>
        </div>
        <div className="swatch swatch-amber">
          <EvaText as="span" variant="data">COMMAND ORANGE</EvaText>
          <EvaText as="span" variant="data">--eva-amber</EvaText>
        </div>
        <div className="swatch swatch-terminal">
          <EvaText as="span" variant="data">TERMINAL GREEN</EvaText>
          <EvaText as="span" variant="data">--eva-terminal</EvaText>
        </div>
        <div className="swatch swatch-cyan">
          <EvaText as="span" variant="data">DATA CYAN</EvaText>
          <EvaText as="span" variant="data">--eva-cyan</EvaText>
        </div>
      </div>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">FONT ROLES / OPEN-SOURCE SUBSTITUTES</EvaText>
      </div>
      <div className="font-map">
        {fontRoles.map((font) => (
          <div className="font-cell" key={font.role}>
            <small>
              <EvaText as="span" tracking="wide" variant="data">{font.role} / {font.family}</EvaText>
            </small>
            <EvaText as="div" lang={font.lang} variant={font.variant}>{font.sample}</EvaText>
          </div>
        ))}
      </div>
    </main>
  )
}
