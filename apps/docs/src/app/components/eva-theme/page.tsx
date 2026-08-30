import { EvaText } from "@evangelioncn/registry/eva-text"

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
      <p className="eyebrow">ITEM 01 / REGISTRY:THEME</p>
      <EvaText as="h1" className="doc-heading" horizontalScale={0.72} tracking="tight" variant="interface" uppercase>
        EVA-THEME
      </EvaText>
      <p className="lede">The common signal palette and font roles used by every EvangelionCN component.</p>

      <div className="section-rule">INSTALL / PUBLIC GITHUB REGISTRY</div>
      <code className="install-command">pnpm dlx shadcn@latest add bendsp/EvangelionCN/eva-theme</code>

      <div className="section-rule">SIGNAL PALETTE / SIX TOKENS</div>
      <div className="palette-grid">
        <div className="swatch swatch-black"><span>BLACK</span><span>--eva-black</span></div>
        <div className="swatch swatch-paper"><span>PAPER</span><span>--eva-paper</span></div>
        <div className="swatch swatch-red"><span>EMERGENCY RED</span><span>--eva-red</span></div>
        <div className="swatch swatch-orange"><span>COMMAND ORANGE</span><span>--eva-orange</span></div>
        <div className="swatch swatch-green"><span>TERMINAL GREEN</span><span>--eva-green</span></div>
        <div className="swatch swatch-cyan"><span>DATA CYAN</span><span>--eva-cyan</span></div>
      </div>

      <div className="section-rule">FONT ROLES / OPEN-SOURCE SUBSTITUTES</div>
      <div className="font-map">
        {fontRoles.map((font) => (
          <div className="font-cell" key={font.role}>
            <small>{font.role} / {font.family}</small>
            <EvaText as="div" lang={font.lang} variant={font.variant}>{font.sample}</EvaText>
          </div>
        ))}
      </div>
    </main>
  )
}
