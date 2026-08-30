"use client"

import { useState } from "react"
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
import { Field, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const tones = ["paper", "critical", "amber", "terminal", "cyan"] as const satisfies readonly EvaBadgeTone[]
const languages = ["en", "ja"] as const satisfies readonly EvaTextLanguage[]
const alignments = ["start", "center", "end"] as const satisfies readonly EvaBadgeAlignment[]
const trackings = ["tight", "normal", "wide"] as const satisfies readonly EvaTextTracking[]
const shapes = ["rounded", "square"] as const satisfies readonly EvaBadgeShape[]
const presets = ["sm", "md", "lg", "custom"] as const

type BadgePreset = (typeof presets)[number]
type Emphasis = "primary" | "secondary"

interface BadgeGeometry {
  borderWidth: number
  cornerRadius: number
  gapOverride: number | null
  height: number
  padding: number
  separatorThicknessOverride: number | null
  width: number
}

const presetGeometry: Record<EvaBadgeSize, {
  borderWidth: number
  cornerRadius: number
  height: number
  padding: number
  width: number
}> = {
  sm: { width: 144, height: 48, padding: 2, borderWidth: 2, cornerRadius: 6 },
  md: { width: 240, height: 80, padding: 4, borderWidth: 3, cornerRadius: 8 },
  lg: { width: 384, height: 128, padding: 6, borderWidth: 5, cornerRadius: 12 },
}

const minimumTextZoneHeight = 4

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum)
}

function defaultGap(width: number) {
  return clamp(width * 0.012, 3.2, 10.4)
}

function defaultSeparatorThickness(width: number) {
  return clamp(width * 0.008, 2, 6)
}

function contentBoxWidth(geometry: BadgeGeometry) {
  return Math.max(
    0,
    geometry.width - (geometry.borderWidth + geometry.padding) * 2
  )
}

function constrainGeometry(
  geometry: BadgeGeometry,
  secondaryEnabled: boolean,
  separatorEnabled: boolean
): BadgeGeometry {
  const inlineSize = contentBoxWidth(geometry)
  let gap = geometry.gapOverride ?? defaultGap(inlineSize)
  let separatorThickness = geometry.separatorThicknessOverride
    ?? defaultSeparatorThickness(inlineSize)

  if (secondaryEnabled) {
    if (separatorEnabled) {
      separatorThickness = clamp(
        separatorThickness,
        1,
        Math.max(1, geometry.height - minimumTextZoneHeight * 2)
      )
      gap = clamp(
        gap,
        0,
        Math.max(
          0,
          (geometry.height - minimumTextZoneHeight * 2 - separatorThickness) / 2
        )
      )
    } else {
      gap = clamp(
        gap,
        0,
        Math.max(0, geometry.height - minimumTextZoneHeight * 2)
      )
    }
  }

  const minimumContentHeight = !secondaryEnabled
    ? minimumTextZoneHeight
    : separatorEnabled
      ? minimumTextZoneHeight * 2 + gap * 2 + separatorThickness
      : minimumTextZoneHeight * 2 + gap
  const availableInset = Math.max(
    0,
    (geometry.height - minimumContentHeight) / 2
  )
  const borderWidth = clamp(geometry.borderWidth, 0, availableInset)
  const padding = clamp(geometry.padding, 0, availableInset - borderWidth)

  return {
    ...geometry,
    borderWidth,
    padding,
    gapOverride: geometry.gapOverride === null ? null : gap,
    separatorThicknessOverride:
      geometry.separatorThicknessOverride === null ? null : separatorThickness,
  }
}

const sliderClassName = "[&_[data-slot=slider-range]]:bg-eva-amber [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:rounded-none [&_[data-slot=slider-thumb]]:border-eva-amber [&_[data-slot=slider-thumb]]:bg-eva-black [&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-track]]:rounded-none"
const toggleClassName = "rounded-none border border-eva-amber px-3 font-mono text-[0.68rem] uppercase data-[pressed]:bg-eva-amber data-[pressed]:text-eva-black"

interface LabSliderProps {
  disabled?: boolean
  id: string
  label: string
  max: number
  min: number
  onChange: (value: number) => void
  step?: number
  unit?: string
  value: number
}

function LabSlider({
  disabled,
  id,
  label,
  max,
  min,
  onChange,
  step = 1,
  unit = "PX",
  value,
}: LabSliderProps) {
  return (
    <Field data-disabled={disabled || undefined}>
      <FieldTitle className="control-label" id={`${id}-label`}>
        <EvaText as="span" tracking="wide" variant="data">{label}</EvaText>
        <output>
          <EvaText as="span" variant="data">{value.toFixed(step < 1 ? 2 : 0)} {unit}</EvaText>
        </output>
      </FieldTitle>
      <Slider
        aria-labelledby={`${id}-label`}
        className={sliderClassName}
        disabled={disabled}
        max={max}
        min={min}
        onValueChange={(nextValue) => {
          const value = typeof nextValue === "number" ? nextValue : (nextValue[0] ?? min)
          onChange(value)
        }}
        step={step}
        value={[value]}
      />
    </Field>
  )
}

function LabSelect<T extends string>({
  id,
  label,
  onChange,
  options,
  value,
}: {
  id: string
  label: string
  onChange: (value: T) => void
  options: readonly T[]
  value: T
}) {
  return (
    <Field>
      <FieldTitle className="control-label" id={`${id}-label`}>
        <EvaText as="span" tracking="wide" variant="data">{label}</EvaText>
      </FieldTitle>
      <Select onValueChange={(nextValue) => nextValue && onChange(nextValue as T)} value={value}>
        <SelectTrigger aria-labelledby={`${id}-label`} className="eva-type-select">
          <SelectValue>
            {(selectedValue: T) => (
              <EvaText as="span" uppercase variant="data">{selectedValue}</EvaText>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false} className="eva-type-select-content">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem className="eva-type-select-item" key={option} value={option}>
                <EvaText as="span" uppercase variant="data">{option}</EvaText>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}

function LabToggle<T extends string>({
  id,
  label,
  onChange,
  options,
  value,
}: {
  id: string
  label: string
  onChange: (value: T) => void
  options: readonly T[]
  value: T
}) {
  return (
    <Field>
      <FieldTitle className="control-label" id={`${id}-label`}>
        <EvaText as="span" tracking="wide" variant="data">{label}</EvaText>
      </FieldTitle>
      <ToggleGroup
        aria-labelledby={`${id}-label`}
        className="gap-0 rounded-none"
        onValueChange={(nextValue) => nextValue[0] && onChange(nextValue[0] as T)}
        spacing={0}
        value={[value]}
      >
        {options.map((option) => (
          <ToggleGroupItem className={toggleClassName} key={option} value={option}>
            <EvaText as="span" uppercase variant="data">{option}</EvaText>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Field>
  )
}

export function EvaBadgeLab() {
  const [primary, setPrimary] = useState("UNKNOWN")
  const [secondary, setSecondary] = useState("TOPOGRAPHICAL MAP")
  const [tone, setTone] = useState<EvaBadgeTone>("critical")
  const [language, setLanguage] = useState<EvaTextLanguage>("en")
  const [preset, setPreset] = useState<BadgePreset>("lg")
  const [geometry, setGeometry] = useState<BadgeGeometry>({
    ...presetGeometry.lg,
    gapOverride: null,
    separatorThicknessOverride: null,
  })
  const [shape, setShape] = useState<EvaBadgeShape>("rounded")
  const [horizontalScale, setHorizontalScale] = useState(0.86)
  const [tracking, setTracking] = useState<EvaTextTracking>("tight")
  const [align, setAlign] = useState<EvaBadgeAlignment>("center")
  const [emphasis, setEmphasis] = useState<Emphasis>("primary")
  const [secondaryEnabled, setSecondaryEnabled] = useState(false)
  const [separatorEnabled, setSeparatorEnabled] = useState(false)
  const [uppercase, setUppercase] = useState(true)

  const updateGeometry = (patch: Partial<BadgeGeometry>) => {
    setGeometry((current) => constrainGeometry(
      { ...current, ...patch },
      secondaryEnabled,
      separatorEnabled
    ))
    setPreset("custom")
  }

  const applyPreset = (nextPreset: BadgePreset) => {
    setPreset(nextPreset)
    if (nextPreset === "custom") return

    setGeometry(constrainGeometry(
      {
        ...presetGeometry[nextPreset],
        gapOverride: null,
        separatorThicknessOverride: null,
      },
      secondaryEnabled,
      separatorEnabled
    ))
  }

  const setSecondLevel = (enabled: boolean) => {
    setSecondaryEnabled(enabled)
    setGeometry((current) => constrainGeometry(
      current,
      enabled,
      separatorEnabled
    ))
  }

  const setSeparationLine = (enabled: boolean) => {
    setSeparatorEnabled(enabled)
    setGeometry((current) => constrainGeometry(
      current,
      secondaryEnabled,
      enabled
    ))
  }

  const componentSize: EvaBadgeSize = preset === "custom" ? "lg" : preset
  const inlineSize = contentBoxWidth(geometry)
  const gap = geometry.gapOverride ?? defaultGap(inlineSize)
  const separatorThickness = geometry.separatorThicknessOverride
    ?? defaultSeparatorThickness(inlineSize)
  const livePrimary = primary || "\u00a0"
  const liveSecondary = secondaryEnabled ? (secondary || "\u00a0") : undefined

  return (
    <section className="badge-lab" aria-labelledby="badge-lab-title">
      <div className="section-rule" id="badge-lab-title">
        <EvaText as="span" tracking="wide" variant="data">
          EVA-BADGE LAB / LIVE GEOMETRY
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
        <LabSelect id="badge-preset" label="FRAME PRESET" onChange={applyPreset} options={presets} value={preset} />

        <LabToggle id="badge-shape" label="CORNERS" onChange={setShape} options={shapes} value={shape} />
        <LabToggle id="badge-alignment" label="TEXT ALIGN" onChange={setAlign} options={alignments} value={align} />
        <LabToggle id="badge-tracking" label="TRACKING" onChange={setTracking} options={trackings} value={tracking} />

        <LabToggle
          id="badge-secondary"
          label="SECOND LEVEL"
          onChange={(value) => setSecondLevel(value === "on")}
          options={["off", "on"] as const}
          value={secondaryEnabled ? "on" : "off"}
        />
        <LabToggle
          id="badge-separator"
          label="SEPARATION LINE"
          onChange={(value) => setSeparationLine(value === "on")}
          options={["off", "on"] as const}
          value={separatorEnabled ? "on" : "off"}
        />
        <LabToggle id="badge-emphasis" label="EMPHASIS" onChange={setEmphasis} options={["primary", "secondary"] as const} value={emphasis} />
        <LabToggle
          id="badge-uppercase"
          label="UPPERCASE"
          onChange={(value) => setUppercase(value === "on")}
          options={["off", "on"] as const}
          value={uppercase ? "on" : "off"}
        />

        <LabSlider id="badge-width" label="WIDTH" max={640} min={120} onChange={(value) => updateGeometry({ width: value })} value={geometry.width} />
        <LabSlider id="badge-height" label="HEIGHT" max={320} min={40} onChange={(value) => updateGeometry({ height: value })} value={geometry.height} />
        <LabSlider id="badge-padding" label="PADDING" max={32} min={0} onChange={(value) => updateGeometry({ padding: value })} value={geometry.padding} />
        <LabSlider id="badge-border" label="BORDER" max={12} min={0} onChange={(value) => updateGeometry({ borderWidth: value })} value={geometry.borderWidth} />
        <LabSlider disabled={shape === "square"} id="badge-radius" label="CORNER RADIUS" max={48} min={0} onChange={(value) => updateGeometry({ cornerRadius: value })} value={geometry.cornerRadius} />
        <LabSlider id="badge-gap" label="LEVEL GAP" max={24} min={0} onChange={(value) => updateGeometry({ gapOverride: value })} step={0.1} value={gap} />
        <LabSlider disabled={!secondaryEnabled || !separatorEnabled} id="badge-separator-thickness" label="LINE WEIGHT" max={12} min={1} onChange={(value) => updateGeometry({ separatorThicknessOverride: value })} step={0.1} value={separatorThickness} />
        <LabSlider id="badge-horizontal-scale" label="HORIZONTAL SCALE" max={1.2} min={0.5} onChange={setHorizontalScale} step={0.01} unit="×" value={horizontalScale} />
      </FieldGroup>

      <div className="badge-lab-stage" data-tone={tone}>
        <div className="badge-lab-readout">
          <EvaText as="span" tracking="wide" variant="data">
            {geometry.width} × {geometry.height} / PAD {geometry.padding.toFixed(1)} / BORDER {geometry.borderWidth.toFixed(1)} / {shape.toUpperCase()}
          </EvaText>
          <EvaText as="span" tracking="wide" variant="data">
            FIT {horizontalScale.toFixed(2)}× / {tracking.toUpperCase()} / {align.toUpperCase()}
          </EvaText>
        </div>
        <div className="badge-lab-output" data-slot="eva-badge-lab-output">
          <EvaBadge
            align={align}
            borderWidth={geometry.borderWidth}
            className="shrink-0"
            cornerRadius={shape === "rounded" ? geometry.cornerRadius : undefined}
            emphasis={emphasis}
            gap={geometry.gapOverride ?? undefined}
            height={geometry.height}
            horizontalScale={horizontalScale}
            lang={language}
            padding={geometry.padding}
            secondary={liveSecondary}
            separator={secondaryEnabled && separatorEnabled}
            separatorThickness={geometry.separatorThicknessOverride ?? undefined}
            shape={shape}
            size={componentSize}
            style={{ maxWidth: "none" }}
            tone={tone}
            tracking={tracking}
            uppercase={uppercase}
            width={geometry.width}
          >
            {livePrimary}
          </EvaBadge>
        </div>
      </div>
    </section>
  )
}
