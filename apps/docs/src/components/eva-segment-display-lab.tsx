"use client"

import { useState } from "react"
import {
  EvaSegmentDisplay,
  resolveEvaSegmentGeometry,
  type EvaSegmentDisplayTone,
} from "@eva-cn/registry/eva-segment-display"
import { EvaText } from "@eva-cn/registry/eva-text"
import { LabSelect, LabSlider, LabToggle } from "@/components/eva-badge-lab-controls"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const tones = ["amber", "critical", "terminal", "data", "paper"] as const satisfies readonly EvaSegmentDisplayTone[]
const ghostOptions = ["on", "off"] as const

export function EvaSegmentDisplayLab() {
  const [value, setValue] = useState("49:13")
  const [tone, setTone] = useState<EvaSegmentDisplayTone>("amber")
  const [ghosts, setGhosts] = useState(true)
  const [digitSize, setDigitSize] = useState(132)
  const [digitWidth, setDigitWidth] = useState(60)
  const [segmentThickness, setSegmentThickness] = useState(10)
  const [segmentGap, setSegmentGap] = useState(1)
  const [characterGap, setCharacterGap] = useState(8)
  const [ghostOpacity, setGhostOpacity] = useState(0.08)
  const geometry = resolveEvaSegmentGeometry({
    characterGap,
    digitWidth,
    segmentGap,
    segmentThickness,
  })

  const updateGeometry = ({
    characterGap: nextCharacterGap = characterGap,
    digitWidth: nextDigitWidth = digitWidth,
    segmentGap: nextSegmentGap = segmentGap,
    segmentThickness: nextSegmentThickness = segmentThickness,
  }: {
    characterGap?: number
    digitWidth?: number
    segmentGap?: number
    segmentThickness?: number
  }) => {
    const nextGeometry = resolveEvaSegmentGeometry({
      characterGap: nextCharacterGap,
      digitWidth: nextDigitWidth,
      segmentGap: nextSegmentGap,
      segmentThickness: nextSegmentThickness,
    })

    setCharacterGap(nextGeometry.characterGap)
    setDigitWidth(nextGeometry.digitWidth)
    setSegmentGap(nextGeometry.segmentGap)
    setSegmentThickness(nextGeometry.segmentThickness)
  }

  return (
    <section className="segment-lab" aria-labelledby="segment-lab-title">
      <div className="section-rule" id="segment-lab-title">
        <EvaText as="span" tracking="wide" variant="data">
          EVA-SEGMENT-DISPLAY LAB / GLYPH GEOMETRY
        </EvaText>
      </div>

      <FieldGroup className="segment-lab-controls">
        <Field>
          <FieldLabel className="control-label" htmlFor="segment-value">
            <EvaText as="span" tracking="wide" variant="data">DISPLAY STRING</EvaText>
          </FieldLabel>
          <Input
            autoComplete="off"
            className="eva-sample-input"
            id="segment-value"
            maxLength={14}
            onChange={(event) => setValue(event.target.value)}
            spellCheck={false}
            value={value}
          />
        </Field>

        <LabSelect id="segment-tone" label="SIGNAL TONE" onChange={setTone} options={tones} value={tone} />
        <LabToggle
          id="segment-ghosts"
          label="GHOST SEGMENTS"
          onChange={(nextValue) => setGhosts(nextValue === "on")}
          options={ghostOptions}
          value={ghosts ? "on" : "off"}
        />
        <LabSlider id="segment-digit-size" label="DIGIT HEIGHT" max={220} min={32} onChange={setDigitSize} value={digitSize} />
        <LabSlider id="segment-digit-width" label="DIGIT WIDTH" max={90} min={36} onChange={(nextValue) => updateGeometry({ digitWidth: nextValue })} unit="U" value={geometry.digitWidth} />
        <LabSlider id="segment-thickness" label="SEGMENT THICKNESS" max={geometry.maxSegmentThickness} min={4} onChange={(nextValue) => updateGeometry({ segmentThickness: nextValue })} step={0.1} unit="U" value={geometry.segmentThickness} />
        <LabSlider id="segment-gap" label="JOINT GAP" max={geometry.maxSegmentGap} min={0} onChange={(nextValue) => updateGeometry({ segmentGap: nextValue })} step={0.1} unit="U" value={geometry.segmentGap} />
        <LabSlider id="segment-character-gap" label="CHARACTER GAP" max={24} min={0} onChange={(nextValue) => updateGeometry({ characterGap: nextValue })} unit="U" value={geometry.characterGap} />
        <LabSlider
          disabled={!ghosts}
          id="segment-ghost-opacity"
          label="GHOST OPACITY"
          max={0.3}
          min={0}
          onChange={setGhostOpacity}
          step={0.01}
          unit=""
          value={ghostOpacity}
        />
      </FieldGroup>

      <div className="segment-lab-stage">
        <div className="segment-lab-readout">
          <EvaText as="span" tracking="wide" variant="data">
            INPUT {value.length.toString().padStart(2, "0")} CHR / 0-9 : . - SPACE
          </EvaText>
          <EvaText as="span" tracking="wide" variant="data">
            {geometry.digitWidth}W / {geometry.segmentThickness.toFixed(1)}T / {geometry.segmentGap.toFixed(1)} JOINT GAP / {geometry.characterGap} CHR GAP
          </EvaText>
        </div>
        <div className="segment-lab-output">
          <EvaSegmentDisplay
            characterGap={geometry.characterGap}
            digitSize={digitSize}
            digitWidth={geometry.digitWidth}
            ghostOpacity={ghosts ? ghostOpacity : 0}
            segmentGap={geometry.segmentGap}
            segmentThickness={geometry.segmentThickness}
            tone={tone}
            value={value}
          />
        </div>
      </div>
    </section>
  )
}
