"use client"

import { useEffect, useRef, useState } from "react"
import {
  EVA_TIMER_MAX_SECONDS,
  EvaTimer,
  type EvaTimerFormat,
  type EvaTimerFrame,
  type EvaTimerPrecision,
  type EvaTimerSize,
  type EvaTimerTone,
} from "@eva-cn/registry/eva-timer"
import { EvaText } from "@eva-cn/registry/eva-text"
import { LabSelect, LabSlider, LabToggle } from "@/components/eva-badge-lab-controls"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const tones = ["amber", "critical", "terminal", "cyan", "paper"] as const satisfies readonly EvaTimerTone[]
const formats = ["mm:ss", "hh:mm:ss"] as const satisfies readonly EvaTimerFormat[]
const sizes = ["sm", "md", "lg"] as const satisfies readonly EvaTimerSize[]
const frames = ["panel", "bare"] as const satisfies readonly EvaTimerFrame[]
const precisionOptions = ["seconds", "tenths", "hundredths"] as const
const ghostOptions = ["on", "off"] as const

type PrecisionOption = (typeof precisionOptions)[number]

const precisionByOption: Record<PrecisionOption, EvaTimerPrecision> = {
  hundredths: 2,
  seconds: 0,
  tenths: 1,
}

export function EvaTimerLab() {
  const [duration, setDuration] = useState(185)
  const [remaining, setRemaining] = useState(185)
  const [running, setRunning] = useState(false)
  const [label, setLabel] = useState("INTERNAL BATTERY")
  const [status, setStatus] = useState("ACTIVE")
  const [tone, setTone] = useState<EvaTimerTone>("amber")
  const [format, setFormat] = useState<EvaTimerFormat>("mm:ss")
  const [precisionOption, setPrecisionOption] = useState<PrecisionOption>("hundredths")
  const [size, setSize] = useState<EvaTimerSize>("md")
  const [frame, setFrame] = useState<EvaTimerFrame>("panel")
  const [ghostSegments, setGhostSegments] = useState(true)
  const [digitSize, setDigitSize] = useState(96)
  const countdownRef = useRef({ remaining: 185, startedAt: 0 })

  useEffect(() => {
    if (!running) return

    const update = () => {
      const elapsed = (performance.now() - countdownRef.current.startedAt) / 1000
      const nextRemaining = Math.max(0, countdownRef.current.remaining - elapsed)
      setRemaining(nextRemaining)

      if (nextRemaining === 0) {
        setRunning(false)
      }
    }

    const interval = window.setInterval(update, 31)
    update()

    return () => window.clearInterval(interval)
  }, [running])

  const precision = precisionByOption[precisionOption]

  const updateDuration = (nextDuration: number) => {
    const safeDuration = Number.isFinite(nextDuration)
      ? Math.min(EVA_TIMER_MAX_SECONDS, Math.max(0, nextDuration))
      : 0
    setDuration(safeDuration)
    setRemaining(safeDuration)
    setRunning(false)
  }

  const toggleRunning = () => {
    if (running) {
      setRunning(false)
      return
    }

    countdownRef.current = {
      remaining,
      startedAt: performance.now(),
    }
    setRunning(true)
  }

  const reset = () => {
    setRunning(false)
    setRemaining(duration)
  }

  return (
    <section className="timer-lab" aria-labelledby="timer-lab-title">
      <div className="section-rule" id="timer-lab-title">
        <EvaText as="span" tracking="wide" variant="data">
          EVA-TIMER LAB / LIVE COUNTDOWN
        </EvaText>
      </div>

      <FieldGroup className="timer-lab-controls">
        <Field>
          <FieldLabel className="control-label" htmlFor="timer-label">
            <EvaText as="span" tracking="wide" variant="data">LABEL</EvaText>
          </FieldLabel>
          <Input
            autoComplete="off"
            className="eva-sample-input"
            id="timer-label"
            maxLength={32}
            onChange={(event) => setLabel(event.target.value)}
            spellCheck={false}
            value={label}
          />
        </Field>

        <Field>
          <FieldLabel className="control-label" htmlFor="timer-status">
            <EvaText as="span" tracking="wide" variant="data">STATUS</EvaText>
          </FieldLabel>
          <Input
            autoComplete="off"
            className="eva-sample-input"
            id="timer-status"
            maxLength={20}
            onChange={(event) => setStatus(event.target.value)}
            spellCheck={false}
            value={status}
          />
        </Field>

        <Field>
          <FieldLabel className="control-label" htmlFor="timer-duration">
            <EvaText as="span" tracking="wide" variant="data">START VALUE / SECONDS</EvaText>
          </FieldLabel>
          <Input
            className="eva-sample-input"
            id="timer-duration"
            inputMode="decimal"
            max={EVA_TIMER_MAX_SECONDS}
            min={0}
            onChange={(event) => updateDuration(event.target.valueAsNumber)}
            step="0.01"
            type="number"
            value={duration}
          />
        </Field>

        <LabSelect id="timer-tone" label="SIGNAL TONE" onChange={setTone} options={tones} value={tone} />
        <LabSelect id="timer-format" label="FORMAT" onChange={setFormat} options={formats} value={format} />
        <LabToggle id="timer-precision" label="PRECISION" onChange={setPrecisionOption} options={precisionOptions} value={precisionOption} />
        <LabToggle id="timer-size" label="PANEL SIZE" onChange={setSize} options={sizes} value={size} />
        <LabToggle id="timer-frame" label="FRAME" onChange={setFrame} options={frames} value={frame} />
        <LabToggle
          id="timer-ghosts"
          label="GHOST SEGMENTS"
          onChange={(value) => setGhostSegments(value === "on")}
          options={ghostOptions}
          value={ghostSegments ? "on" : "off"}
        />
        <LabSlider id="timer-digit-size" label="DIGIT SIZE" max={180} min={32} onChange={setDigitSize} value={digitSize} />
      </FieldGroup>

      <div className="timer-lab-stage">
        <div className="timer-lab-readout">
          <div>
            <EvaText as="span" tracking="wide" variant="data">
              VALUE {remaining.toFixed(2)} S / {format} / P{precision}
            </EvaText>
          </div>
          <div className="timer-lab-actions">
            <Button disabled={remaining <= 0} onClick={toggleRunning} variant="eva">
              <EvaText as="span" tracking="wide" variant="data">
                {running ? "PAUSE" : "START"}
              </EvaText>
            </Button>
            <Button onClick={reset} variant="eva">
              <EvaText as="span" tracking="wide" variant="data">RESET</EvaText>
            </Button>
          </div>
        </div>

        <div className="timer-lab-output">
          <EvaTimer
            digitSize={digitSize}
            format={format}
            frame={frame}
            ghostSegments={ghostSegments}
            label={label || undefined}
            precision={precision}
            size={size}
            status={status || undefined}
            tone={tone}
            value={remaining}
          />
        </div>
      </div>
    </section>
  )
}
