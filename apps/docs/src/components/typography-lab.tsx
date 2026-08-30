"use client"

import { useState } from "react"
import { EvaText, type EvaTextTracking, type EvaTextVariant } from "@evangelioncn/registry/eva-text"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const variants: Array<{ variant: EvaTextVariant; en: string; ja: string }> = [
  { variant: "title", en: "NEON GENESIS EVANGELION", ja: "使徒、襲来" },
  { variant: "interface", en: "PATTERN BLUE", ja: "目標を確認" },
  { variant: "roman", en: "The fate of destruction", ja: "静止した闇の中で" },
  { variant: "data", en: "MAGI-01 / 87.32%", ja: "第3新東京市 / 接続中" },
]

const longEnglish = "ABSOLUTE TERROR FIELD DETECTED BEYOND THE DEFENSIVE PERIMETER"
const longJapanese = "非常事態宣言発令中第三新東京市全域に避難命令"

export function TypographyLab() {
  const [scale, setScale] = useState(0.72)
  const [tracking, setTracking] = useState<EvaTextTracking>("tight")
  const scaleState = scale < 1 ? "COMPRESSED" : scale > 1 ? "EXPANDED" : "NATURAL"

  return (
    <>
      <div className="lab-controls">
        <div>
          <span className="control-label" id="horizontal-scale-label">
            <span>HORIZONTAL SCALE</span>
            <output>{scale.toFixed(2)}×</output>
          </span>
          <Slider
            aria-labelledby="horizontal-scale-label"
            className="[&_[data-slot=slider-range]]:bg-eva-orange [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:rounded-none [&_[data-slot=slider-thumb]]:border-eva-orange [&_[data-slot=slider-thumb]]:bg-eva-black [&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-track]]:rounded-none"
            max={1.2}
            min={0.5}
            onValueChange={(value) => setScale(typeof value === "number" ? value : (value[0] ?? 1))}
            step={0.01}
            value={[scale]}
          />
        </div>
        <div>
          <span className="control-label">TRACKING</span>
          <ToggleGroup
            aria-label="Letter spacing"
            className="gap-0 rounded-none"
            onValueChange={(value) => value.length > 0 && setTracking(value[0] as EvaTextTracking)}
            spacing={0}
            value={[tracking]}
          >
            {(["tight", "normal", "wide"] as const).map((value) => (
              <ToggleGroupItem
                className="rounded-none border border-eva-orange px-3 font-mono text-[0.68rem] uppercase data-[pressed]:bg-eva-orange data-[pressed]:text-eva-black"
                key={value}
                value={value}
              >
                {value}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className="lab-stage">
        <p className="eyebrow !text-eva-red">LIVE OUTPUT / GHOST SHOWS NATURAL WIDTH</p>
        <div className="scale-ghost">
          <span aria-hidden="true">
            <EvaText className="scale-ghost-natural" tracking={tracking} variant="title">NEON GENESIS</EvaText>
          </span>
          <EvaText horizontalScale={scale} tracking={tracking} variant="title">NEON GENESIS</EvaText>
        </div>
        <div className="scale-ghost" lang="ja">
          <span aria-hidden="true">
            <EvaText className="scale-ghost-natural" lang="ja" tracking={tracking} variant="title">使徒、襲来</EvaText>
          </span>
          <EvaText horizontalScale={scale} lang="ja" tracking={tracking} variant="title">使徒、襲来</EvaText>
        </div>
      </div>

      <div className="section-rule">NATURAL 1.00 / {scaleState} {scale.toFixed(2)}</div>
      <div className="comparison-grid">
        <div className="comparison-cell"><small>NATURAL WIDTH / EN</small><EvaText className="comparison-text" tracking={tracking} variant="title">NEON GENESIS EVANGELION</EvaText></div>
        <div className="comparison-cell"><small>SCALED WIDTH / EN</small><EvaText className="comparison-text" horizontalScale={scale} tracking={tracking} variant="title">NEON GENESIS EVANGELION</EvaText></div>
        <div className="comparison-cell"><small>NATURAL WIDTH / JA</small><EvaText className="comparison-text" lang="ja" tracking={tracking} variant="title">使徒、襲来</EvaText></div>
        <div className="comparison-cell"><small>SCALED WIDTH / JA</small><EvaText className="comparison-text" horizontalScale={scale} lang="ja" tracking={tracking} variant="title">使徒、襲来</EvaText></div>
      </div>

      <div className="section-rule">VARIANT MATRIX / EN + JA</div>
      <div className="variant-grid">
        {variants.flatMap(({ variant, en, ja }) => [
          <div className="variant-cell" key={`${variant}-en`}><small>{variant.toUpperCase()} / EN</small><EvaText className="variant-sample" horizontalScale={scale} tracking={tracking} variant={variant}>{en}</EvaText></div>,
          <div className="variant-cell" key={`${variant}-ja`}><small>{variant.toUpperCase()} / JA</small><EvaText className="variant-sample" horizontalScale={scale} lang="ja" tracking={tracking} variant={variant}>{ja}</EvaText></div>,
        ])}
      </div>

      <div className="section-rule">OVERFLOW TEST / INTENTIONAL CLIP BOUNDARY</div>
      <div className="long-string"><EvaText horizontalScale={scale} tracking={tracking} uppercase>{longEnglish}</EvaText></div>
      <div className="long-string"><EvaText horizontalScale={scale} lang="ja" tracking={tracking}>{longJapanese}</EvaText></div>
    </>
  )
}
