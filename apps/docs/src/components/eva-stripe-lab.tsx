"use client"

import { useState } from "react"
import {
  EvaStripe,
  resolveEvaStripeGeometry,
  type EvaStripeMotion,
  type EvaStripeOrientation,
  type EvaStripeTone,
} from "@eva-cn/registry/eva-stripe"
import { EvaText } from "@eva-cn/registry/eva-text"
import { LabSelect, LabSlider, LabToggle } from "@/components/eva-badge-lab-controls"

const orientations = ["horizontal", "vertical"] as const satisfies readonly EvaStripeOrientation[]
const tones = ["critical", "amber", "terminal", "cyan", "paper", "inherit"] as const satisfies readonly EvaStripeTone[]
const motions = ["none", "forward", "reverse"] as const
const surfaces = ["dark", "light"] as const

export function EvaStripeLab() {
  const [orientation, setOrientation] = useState<EvaStripeOrientation>("horizontal")
  const [tone, setTone] = useState<EvaStripeTone>("critical")
  const [angle, setAngle] = useState(-45)
  const [band, setBand] = useState(12)
  const [gap, setGap] = useState(8)
  const [motionMode, setMotionMode] = useState<(typeof motions)[number]>("none")
  const [durationMs, setDurationMs] = useState(1200)
  const [length, setLength] = useState(560)
  const [thickness, setThickness] = useState(48)
  const [surface, setSurface] = useState<(typeof surfaces)[number]>("dark")
  const geometry = resolveEvaStripeGeometry({ angle, band, gap })
  const motion: EvaStripeMotion = motionMode === "none"
    ? { kind: "none" }
    : { kind: "scroll", direction: motionMode, durationMs }

  return (
    <section className="stripe-lab" aria-labelledby="stripe-lab-title">
      <div className="section-rule" id="stripe-lab-title">
        <EvaText as="span" tracking="wide" variant="data">
          EVA-STRIPE LAB / PATTERN GEOMETRY
        </EvaText>
      </div>

      <div className="stripe-lab-controls">
        <LabToggle id="stripe-orientation" label="ORIENTATION" onChange={setOrientation} options={orientations} value={orientation} />
        <LabSelect id="stripe-tone" label="SIGNAL TONE" onChange={setTone} options={tones} value={tone} />
        <LabToggle id="stripe-surface" label="SURFACE" onChange={setSurface} options={surfaces} value={surface} />
        <LabSlider id="stripe-angle" label="ANGLE" max={80} min={-80} onChange={setAngle} unit="DEG" value={angle} />
        <LabSlider id="stripe-band" label="BAND" max={40} min={1} onChange={setBand} value={band} />
        <LabSlider id="stripe-gap" label="GAP" max={40} min={0} onChange={setGap} value={gap} />
        <LabSlider id="stripe-length" label="LENGTH" max={900} min={120} onChange={setLength} value={length} />
        <LabSlider id="stripe-thickness" label="THICKNESS" max={160} min={8} onChange={setThickness} value={thickness} />
        <LabSelect id="stripe-motion" label="MOTION" onChange={setMotionMode} options={motions} value={motionMode} />
        <LabSlider disabled={motionMode === "none"} id="stripe-duration" label="LOOP DURATION" max={4000} min={300} onChange={setDurationMs} step={100} unit="MS" value={durationMs} />
      </div>

      <div className="stripe-lab-stage" data-surface={surface}>
        <div className="stripe-lab-readout">
          <EvaText as="span" tracking="wide" variant="data">
            {orientation.toUpperCase()} / {length} × {thickness} PX / {motionMode.toUpperCase()}
          </EvaText>
          <EvaText as="span" tracking="wide" variant="data">
            {geometry.angle} DEG / {geometry.band} BAND / {geometry.gap} GAP / {geometry.period} PERIOD
          </EvaText>
        </div>
        <div className="stripe-lab-output">
          <div
            className="stripe-lab-sized-area"
            data-orientation={orientation}
            style={orientation === "horizontal"
              ? { height: thickness, width: length }
              : { height: length, width: thickness }}
          >
            <EvaStripe
              angle={geometry.angle}
              band={geometry.band}
              gap={geometry.gap}
              motion={motion}
              orientation={orientation}
              tone={tone}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
