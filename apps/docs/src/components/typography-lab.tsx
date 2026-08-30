"use client"

import { useState } from "react"
import {
  EvaText,
  type EvaTextLanguage,
  type EvaTextTracking,
  type EvaTextVariant,
} from "@evangelioncn/registry/eva-text"
import { Field, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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
const textTypes = ["title", "interface", "roman", "data"] as const satisfies readonly EvaTextVariant[]

function detectLanguage(value: string): EvaTextLanguage {
  return /[\u3040-\u30ff\u3400-\u9fff]/.test(value) ? "ja" : "en"
}

export function TypographyLab() {
  const [scale, setScale] = useState(0.72)
  const [tracking, setTracking] = useState<EvaTextTracking>("tight")
  const [variant, setVariant] = useState<EvaTextVariant>("title")
  const [sampleText, setSampleText] = useState("NEON GENESIS EVANGELION")
  const scaleState = scale < 1 ? "COMPRESSED" : scale > 1 ? "EXPANDED" : "NATURAL"
  const language = detectLanguage(sampleText)
  const liveText = sampleText || "\u00a0"

  return (
    <>
      <FieldGroup className="lab-controls">
        <Field className="lab-field-wide">
          <FieldLabel className="control-label" htmlFor="sample-text">
            <EvaText as="span" tracking="wide" variant="data">SAMPLE TEXT</EvaText>
            <span aria-hidden="true">
              <EvaText as="span" variant="data">
                {sampleText.length.toString().padStart(2, "0")} CHR / {language.toUpperCase()}
              </EvaText>
            </span>
          </FieldLabel>
          <Input
            autoComplete="off"
            className="eva-sample-input"
            id="sample-text"
            maxLength={80}
            onChange={(event) => setSampleText(event.target.value)}
            placeholder="TYPE TO TEST"
            spellCheck={false}
            value={sampleText}
          />
        </Field>

        <Field>
          <FieldTitle className="control-label" id="text-type-label">
            <EvaText as="span" tracking="wide" variant="data">TEXT TYPE</EvaText>
          </FieldTitle>
          <ToggleGroup
            aria-labelledby="text-type-label"
            className="w-full gap-0 rounded-none"
            onValueChange={(value) => {
              const nextVariant = value[0] as EvaTextVariant | undefined
              if (nextVariant) setVariant(nextVariant)
            }}
            spacing={0}
            value={[variant]}
          >
            {textTypes.map((value) => (
              <ToggleGroupItem
                className="flex-1 rounded-none border border-eva-orange px-3 font-mono text-[0.68rem] uppercase data-[pressed]:bg-eva-orange data-[pressed]:text-eva-black"
                key={value}
                value={value}
              >
                <EvaText as="span" uppercase variant="data">{value}</EvaText>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Field>

        <Field>
          <FieldTitle className="control-label" id="tracking-label">
            <EvaText as="span" tracking="wide" variant="data">TRACKING</EvaText>
          </FieldTitle>
          <ToggleGroup
            aria-labelledby="tracking-label"
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
                <EvaText as="span" uppercase variant="data">{value}</EvaText>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Field>

        <Field className="lab-field-wide">
          <FieldTitle className="control-label" id="horizontal-scale-label">
            <EvaText as="span" tracking="wide" variant="data">HORIZONTAL SCALE</EvaText>
            <output>
              <EvaText as="span" variant="data">{scale.toFixed(2)}×</EvaText>
            </output>
          </FieldTitle>
          <Slider
            aria-labelledby="horizontal-scale-label"
            className="[&_[data-slot=slider-range]]:bg-eva-orange [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:rounded-none [&_[data-slot=slider-thumb]]:border-eva-orange [&_[data-slot=slider-thumb]]:bg-eva-black [&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-track]]:rounded-none"
            max={1.2}
            min={0.5}
            onValueChange={(value) => setScale(typeof value === "number" ? value : (value[0] ?? 1))}
            step={0.01}
            value={[scale]}
          />
        </Field>
      </FieldGroup>

      <div className="lab-stage">
        <EvaText as="p" className="eyebrow !text-eva-red" tracking="wide" variant="data">
          LIVE OUTPUT / {variant.toUpperCase()} / {language.toUpperCase()} / GHOST SHOWS NATURAL WIDTH
        </EvaText>
        <div className="scale-ghost">
          <span aria-hidden="true">
            <EvaText className="scale-ghost-natural" lang={language} tracking={tracking} variant={variant}>
              {liveText}
            </EvaText>
          </span>
          <EvaText horizontalScale={scale} lang={language} tracking={tracking} variant={variant}>
            {liveText}
          </EvaText>
        </div>
      </div>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">
          NATURAL 1.00 / {scaleState} {scale.toFixed(2)}
        </EvaText>
      </div>
      <div className="comparison-grid">
        <div className="comparison-cell">
          <small>
            <EvaText as="span" tracking="wide" variant="data">NATURAL WIDTH / EN</EvaText>
          </small>
          <EvaText className="comparison-text" tracking={tracking} variant="title">
            NEON GENESIS EVANGELION
          </EvaText>
        </div>
        <div className="comparison-cell">
          <small>
            <EvaText as="span" tracking="wide" variant="data">SCALED WIDTH / EN</EvaText>
          </small>
          <EvaText className="comparison-text" horizontalScale={scale} tracking={tracking} variant="title">
            NEON GENESIS EVANGELION
          </EvaText>
        </div>
        <div className="comparison-cell">
          <small>
            <EvaText as="span" tracking="wide" variant="data">NATURAL WIDTH / JA</EvaText>
          </small>
          <EvaText className="comparison-text" lang="ja" tracking={tracking} variant="title">
            使徒、襲来
          </EvaText>
        </div>
        <div className="comparison-cell">
          <small>
            <EvaText as="span" tracking="wide" variant="data">SCALED WIDTH / JA</EvaText>
          </small>
          <EvaText className="comparison-text" horizontalScale={scale} lang="ja" tracking={tracking} variant="title">
            使徒、襲来
          </EvaText>
        </div>
      </div>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">VARIANT MATRIX / EN + JA</EvaText>
      </div>
      <div className="variant-grid">
        {variants.flatMap(({ variant, en, ja }) => [
          <div className="variant-cell" key={`${variant}-en`}>
            <small>
              <EvaText as="span" tracking="wide" variant="data">{variant.toUpperCase()} / EN</EvaText>
            </small>
            <EvaText className="variant-sample" horizontalScale={scale} tracking={tracking} variant={variant}>
              {en}
            </EvaText>
          </div>,
          <div className="variant-cell" key={`${variant}-ja`}>
            <small>
              <EvaText as="span" tracking="wide" variant="data">{variant.toUpperCase()} / JA</EvaText>
            </small>
            <EvaText className="variant-sample" horizontalScale={scale} lang="ja" tracking={tracking} variant={variant}>
              {ja}
            </EvaText>
          </div>,
        ])}
      </div>

      <div className="section-rule">
        <EvaText as="span" tracking="wide" variant="data">OVERFLOW TEST / INTENTIONAL CLIP BOUNDARY</EvaText>
      </div>
      <div className="long-string">
        <EvaText horizontalScale={scale} tracking={tracking} uppercase>{longEnglish}</EvaText>
      </div>
      <div className="long-string">
        <EvaText horizontalScale={scale} lang="ja" tracking={tracking}>{longJapanese}</EvaText>
      </div>
    </>
  )
}
