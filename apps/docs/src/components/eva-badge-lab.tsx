"use client"

import { useLayoutEffect, useRef, useState } from "react"
import {
  EvaBadge,
  type EvaBadgeAlignment,
  type EvaBadgeShape,
  type EvaBadgeSize,
  type EvaBadgeTone,
} from "@eva-cn/registry/eva-badge"
import {
  EvaText,
  type EvaTextLanguage,
  type EvaTextTracking,
} from "@eva-cn/registry/eva-text"
import { LabSelect, LabSlider, LabToggle } from "@/components/eva-badge-lab-controls"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const tones = ["paper", "critical", "amber", "terminal", "cyan"] as const satisfies readonly EvaBadgeTone[]
const languages = ["en", "ja"] as const satisfies readonly EvaTextLanguage[]
const alignments = ["start", "center", "end"] as const satisfies readonly EvaBadgeAlignment[]
const trackings = ["tight", "normal", "wide"] as const satisfies readonly EvaTextTracking[]
const shapes = ["rounded", "square"] as const satisfies readonly EvaBadgeShape[]
const presets = ["sm", "md", "lg", "custom"] as const

type BadgePreset = (typeof presets)[number]

interface BadgeGeometry {
  borderWidth: number
  cornerRadius: number
  fontSize: number
  gap: number
  paddingBlock: number
  paddingInline: number
  secondaryFontSize: number
  separatorThickness: number
}

const presetGeometry: Record<EvaBadgeSize, BadgeGeometry> = {
  sm: {
    borderWidth: 2,
    cornerRadius: 6,
    fontSize: 24,
    gap: 2,
    paddingBlock: 4,
    paddingInline: 8,
    secondaryFontSize: 12,
    separatorThickness: 2,
  },
  md: {
    borderWidth: 3,
    cornerRadius: 8,
    fontSize: 40,
    gap: 3,
    paddingBlock: 5,
    paddingInline: 12,
    secondaryFontSize: 16,
    separatorThickness: 2,
  },
  lg: {
    borderWidth: 5,
    cornerRadius: 12,
    fontSize: 64,
    gap: 4,
    paddingBlock: 8,
    paddingInline: 18,
    secondaryFontSize: 24,
    separatorThickness: 4,
  },
}

export function EvaBadgeLab() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [primary, setPrimary] = useState("WARNING")
  const [secondary, setSecondary] = useState("CONTAMINATION DETECTED")
  const [tone, setTone] = useState<EvaBadgeTone>("critical")
  const [language, setLanguage] = useState<EvaTextLanguage>("en")
  const [preset, setPreset] = useState<BadgePreset>("md")
  const [geometry, setGeometry] = useState<BadgeGeometry>(presetGeometry.md)
  const [shape, setShape] = useState<EvaBadgeShape>("rounded")
  const [horizontalScale, setHorizontalScale] = useState(0.86)
  const [tracking, setTracking] = useState<EvaTextTracking>("tight")
  const [align, setAlign] = useState<EvaBadgeAlignment>("center")
  const [secondaryEnabled, setSecondaryEnabled] = useState(false)
  const [separatorEnabled, setSeparatorEnabled] = useState(false)
  const [uppercase, setUppercase] = useState(true)
  const [renderedSize, setRenderedSize] = useState({ height: 0, width: 0 })

  useLayoutEffect(() => {
    const badge = stageRef.current?.querySelector<HTMLElement>(
      '[data-slot="eva-badge"]'
    )
    if (!badge) return

    const measure = () => {
      const bounds = badge.getBoundingClientRect()
      setRenderedSize({ height: bounds.height, width: bounds.width })
    }

    const observer = new ResizeObserver(measure)
    observer.observe(badge)
    measure()

    return () => observer.disconnect()
  }, [])

  const updateGeometry = (patch: Partial<BadgeGeometry>) => {
    setGeometry((current) => ({ ...current, ...patch }))
    setPreset("custom")
  }

  const applyPreset = (nextPreset: BadgePreset) => {
    setPreset(nextPreset)
    if (nextPreset !== "custom") {
      setGeometry(presetGeometry[nextPreset])
    }
  }

  const componentSize: EvaBadgeSize = preset === "custom" ? "md" : preset
  const livePrimary = primary || "\u00a0"
  const liveSecondary = secondaryEnabled ? (secondary || "\u00a0") : undefined

  return (
    <section className="badge-lab" aria-labelledby="badge-lab-title">
      <div className="section-rule" id="badge-lab-title">
        <EvaText as="span" tracking="wide" variant="data">
          EVA-BADGE LAB / CONTENT DEFINES FRAME
        </EvaText>
      </div>

      <FieldGroup className="badge-lab-controls">
        <Field className="lab-field-wide">
          <FieldLabel className="control-label" htmlFor="badge-primary-text">
            <EvaText as="span" tracking="wide" variant="data">PRIMARY TEXT</EvaText>
            <EvaText as="span" variant="data">{primary.length.toString().padStart(2, "0")} CHR</EvaText>
          </FieldLabel>
          <Input
            autoComplete="off"
            className="eva-sample-input"
            id="badge-primary-text"
            maxLength={48}
            onChange={(event) => setPrimary(event.target.value)}
            spellCheck={false}
            value={primary}
          />
        </Field>

        <Field className="lab-field-wide" data-disabled={!secondaryEnabled || undefined}>
          <FieldLabel className="control-label" htmlFor="badge-secondary-text">
            <EvaText as="span" tracking="wide" variant="data">SECONDARY TEXT</EvaText>
            <EvaText as="span" variant="data">{secondary.length.toString().padStart(2, "0")} CHR</EvaText>
          </FieldLabel>
          <Input
            autoComplete="off"
            className="eva-sample-input"
            disabled={!secondaryEnabled}
            id="badge-secondary-text"
            maxLength={64}
            onChange={(event) => setSecondary(event.target.value)}
            spellCheck={false}
            value={secondary}
          />
        </Field>

        <LabSelect id="badge-tone" label="SIGNAL TONE" onChange={setTone} options={tones} value={tone} />
        <LabSelect id="badge-language" label="LANGUAGE" onChange={setLanguage} options={languages} value={language} />
        <LabSelect id="badge-preset" label="TYPE PRESET" onChange={applyPreset} options={presets} value={preset} />

        <LabToggle id="badge-shape" label="CORNERS" onChange={setShape} options={shapes} value={shape} />
        <LabToggle id="badge-alignment" label="TEXT ALIGN" onChange={setAlign} options={alignments} value={align} />
        <LabToggle id="badge-tracking" label="TRACKING" onChange={setTracking} options={trackings} value={tracking} />

        <LabToggle
          id="badge-secondary"
          label="SECOND LEVEL"
          onChange={(value) => setSecondaryEnabled(value === "on")}
          options={["off", "on"] as const}
          value={secondaryEnabled ? "on" : "off"}
        />
        <LabToggle
          id="badge-separator"
          label="SEPARATION LINE"
          onChange={(value) => setSeparatorEnabled(value === "on")}
          options={["off", "on"] as const}
          value={separatorEnabled ? "on" : "off"}
        />
        <LabToggle
          id="badge-uppercase"
          label="UPPERCASE"
          onChange={(value) => setUppercase(value === "on")}
          options={["off", "on"] as const}
          value={uppercase ? "on" : "off"}
        />

        <LabSlider id="badge-primary-size" label="PRIMARY SIZE" max={120} min={12} onChange={(value) => updateGeometry({ fontSize: value })} value={geometry.fontSize} />
        <LabSlider disabled={!secondaryEnabled} id="badge-secondary-size" label="SECONDARY SIZE" max={80} min={8} onChange={(value) => updateGeometry({ secondaryFontSize: value })} value={geometry.secondaryFontSize} />
        <LabSlider id="badge-padding-inline" label="HORIZONTAL PADDING" max={64} min={0} onChange={(value) => updateGeometry({ paddingInline: value })} value={geometry.paddingInline} />
        <LabSlider id="badge-padding-block" label="VERTICAL PADDING" max={32} min={0} onChange={(value) => updateGeometry({ paddingBlock: value })} value={geometry.paddingBlock} />
        <LabSlider id="badge-border" label="BORDER" max={12} min={0} onChange={(value) => updateGeometry({ borderWidth: value })} value={geometry.borderWidth} />
        <LabSlider disabled={shape === "square"} id="badge-radius" label="CORNER RADIUS" max={48} min={0} onChange={(value) => updateGeometry({ cornerRadius: value })} value={geometry.cornerRadius} />
        <LabSlider disabled={!secondaryEnabled} id="badge-gap" label="LEVEL GAP" max={24} min={0} onChange={(value) => updateGeometry({ gap: value })} value={geometry.gap} />
        <LabSlider disabled={!secondaryEnabled || !separatorEnabled} id="badge-separator-thickness" label="LINE WEIGHT" max={12} min={1} onChange={(value) => updateGeometry({ separatorThickness: value })} value={geometry.separatorThickness} />
        <LabSlider id="badge-horizontal-scale" label="HORIZONTAL SCALE" max={1.2} min={0.5} onChange={setHorizontalScale} step={0.01} unit="×" value={horizontalScale} />
      </FieldGroup>

      <div className="badge-lab-stage" data-tone={tone} ref={stageRef}>
        <div className="badge-lab-readout">
          <EvaText as="span" tracking="wide" variant="data">
            RENDERED {Math.round(renderedSize.width)} × {Math.round(renderedSize.height)} / CONTENT-SIZED
          </EvaText>
          <EvaText as="span" tracking="wide" variant="data">
            PAD {geometry.paddingInline} × {geometry.paddingBlock} / TYPE {geometry.fontSize} + {geometry.secondaryFontSize}
          </EvaText>
        </div>
        <div className="badge-lab-output" data-slot="eva-badge-lab-output">
          <EvaBadge
            align={align}
            borderWidth={geometry.borderWidth}
            cornerRadius={shape === "rounded" ? geometry.cornerRadius : undefined}
            fontSize={geometry.fontSize}
            gap={geometry.gap}
            horizontalScale={horizontalScale}
            lang={language}
            paddingBlock={geometry.paddingBlock}
            paddingInline={geometry.paddingInline}
            secondary={liveSecondary}
            secondaryFontSize={geometry.secondaryFontSize}
            separator={secondaryEnabled && separatorEnabled}
            separatorThickness={geometry.separatorThickness}
            shape={shape}
            size={componentSize}
            tone={tone}
            tracking={tracking}
            uppercase={uppercase}
          >
            {livePrimary}
          </EvaBadge>
        </div>
      </div>
    </section>
  )
}
