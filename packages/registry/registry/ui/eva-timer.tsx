"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

import { EvaText } from "./eva-text"

const evaTimerVariants = cva(
  "inline-grid w-max max-w-none overflow-hidden text-current",
  {
    variants: {
      frame: {
        bare: "bg-transparent",
        panel:
          "relative border-[length:var(--eva-timer-border)] border-current bg-eva-black px-[var(--eva-timer-padding-inline)] py-[var(--eva-timer-padding-block)] before:absolute before:inset-y-0 before:left-0 before:w-[var(--eva-timer-bar)] before:bg-current",
      },
      size: {
        sm: "[--eva-timer-bar:3px] [--eva-timer-border:2px] [--eva-timer-digit-size:3rem] [--eva-timer-padding-block:0.65rem] [--eva-timer-padding-inline:0.85rem]",
        md: "[--eva-timer-bar:4px] [--eva-timer-border:3px] [--eva-timer-digit-size:5.5rem] [--eva-timer-padding-block:0.9rem] [--eva-timer-padding-inline:1.2rem]",
        lg: "[--eva-timer-bar:6px] [--eva-timer-border:5px] [--eva-timer-digit-size:8rem] [--eva-timer-padding-block:1.25rem] [--eva-timer-padding-inline:1.6rem]",
      },
      tone: {
        amber: "text-eva-amber",
        critical: "text-eva-critical",
        cyan: "text-eva-cyan",
        paper: "text-eva-paper",
        terminal: "text-eva-terminal",
      },
    },
    defaultVariants: {
      frame: "panel",
      size: "md",
      tone: "amber",
    },
  }
)

const segmentPoints = {
  a: "10,3 50,3 57,10 50,17 10,17 3,10",
  b: "50,11 57,18 57,43 50,50 43,43 43,18",
  c: "50,50 57,57 57,82 50,89 43,82 43,57",
  d: "10,83 50,83 57,90 50,97 10,97 3,90",
  e: "10,50 17,57 17,82 10,89 3,82 3,57",
  f: "10,11 17,18 17,43 10,50 3,43 3,18",
  g: "10,43 50,43 57,50 50,57 10,57 3,50",
} as const

type SegmentName = keyof typeof segmentPoints

const digitSegments = {
  "0": "abcdef",
  "1": "bc",
  "2": "abdeg",
  "3": "abcdg",
  "4": "bcfg",
  "5": "acdfg",
  "6": "acdefg",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
} satisfies Record<string, string>

const glyphWidths = {
  ".": 16,
  ":": 18,
  digit: 60,
} as const

const glyphGap = 8

export type EvaTimerFormat = "hh:mm:ss" | "mm:ss"
export type EvaTimerPrecision = 0 | 1 | 2
export type EvaTimerFrame = NonNullable<VariantProps<typeof evaTimerVariants>["frame"]>
export type EvaTimerSize = NonNullable<VariantProps<typeof evaTimerVariants>["size"]>
export type EvaTimerTone = NonNullable<VariantProps<typeof evaTimerVariants>["tone"]>

export const EVA_TIMER_MAX_SECONDS = 359999.99

type EvaTimerStyle = React.CSSProperties & {
  "--eva-timer-digit-size"?: React.CSSProperties["fontSize"]
  "--eva-timer-fitted-height"?: string
}

export interface EvaTimerProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children">,
    Omit<VariantProps<typeof evaTimerVariants>, "frame" | "size" | "tone"> {
  digitSize?: React.CSSProperties["fontSize"]
  format?: EvaTimerFormat
  frame?: EvaTimerFrame
  ghostSegments?: boolean
  label?: React.ReactNode
  precision?: EvaTimerPrecision
  size?: EvaTimerSize
  status?: React.ReactNode
  tone?: EvaTimerTone
  value: number
}

export function formatEvaTimerValue(
  value: number,
  format: EvaTimerFormat = "mm:ss",
  precision: EvaTimerPrecision = 0
) {
  const safeValue = Number.isFinite(value)
    ? Math.min(EVA_TIMER_MAX_SECONDS, Math.max(0, value))
    : 0
  const factor = 10 ** precision
  const scaledValue = safeValue * factor
  const floatingPointCorrection = Math.abs(scaledValue) * Number.EPSILON * 4
  const ticks = Math.floor(scaledValue + floatingPointCorrection)
  const wholeSeconds = Math.floor(ticks / factor)
  const fraction = ticks % factor
  const seconds = wholeSeconds % 60
  const minutes = format === "hh:mm:ss"
    ? Math.floor(wholeSeconds / 60) % 60
    : Math.floor(wholeSeconds / 60)
  const hours = Math.floor(wholeSeconds / 3600)
  const groups = format === "hh:mm:ss"
    ? [hours, minutes, seconds]
    : [minutes, seconds]
  const base = groups.map((group) => String(group).padStart(2, "0")).join(":")

  return precision === 0
    ? base
    : `${base}.${String(fraction).padStart(precision, "0")}`
}

function EvaTimerDigit({
  ghostSegments,
  offset,
  value,
}: {
  ghostSegments: boolean
  offset: number
  value: keyof typeof digitSegments
}) {
  const active = new Set(digitSegments[value].split("") as SegmentName[])

  return (
    <g transform={`translate(${offset} 0)`}>
      {(Object.keys(segmentPoints) as SegmentName[]).map((segment) => (
        <polygon
          fill="currentColor"
          key={segment}
          opacity={active.has(segment) ? 1 : ghostSegments ? 0.08 : 0}
          points={segmentPoints[segment]}
        />
      ))}
    </g>
  )
}

function EvaTimerSeparator({
  offset,
  value,
}: {
  offset: number
  value: "." | ":"
}) {
  if (value === ".") {
    return (
      <g transform={`translate(${offset} 0)`}>
        <rect fill="currentColor" height="12" width="12" x="2" y="84" />
      </g>
    )
  }

  return (
    <g transform={`translate(${offset} 0)`}>
      <rect fill="currentColor" height="12" width="12" x="3" y="27" />
      <rect fill="currentColor" height="12" width="12" x="3" y="61" />
    </g>
  )
}

export function EvaTimer({
  "aria-label": ariaLabel,
  className,
  digitSize,
  format = "mm:ss",
  frame,
  ghostSegments = true,
  label,
  precision = 0,
  size,
  status,
  style,
  tone,
  value,
  ...props
}: EvaTimerProps) {
  const timerRef = React.useRef<HTMLDivElement>(null)
  const shellRef = React.useRef<HTMLDivElement>(null)
  const [naturalSize, setNaturalSize] = React.useState({ height: 0, width: 0 })
  const [fitScale, setFitScale] = React.useState(1)
  const displayValue = formatEvaTimerValue(value, format, precision)
  const resolvedDigitSize = typeof digitSize === "number"
    ? `${digitSize}px`
    : digitSize
  const hasHeader = label !== undefined || status !== undefined
  let displayOffset = 0
  const glyphs = Array.from(displayValue).map((character, index) => {
    const offset = displayOffset
    const width = character === ":"
      ? glyphWidths[":"]
      : character === "."
        ? glyphWidths["."]
        : glyphWidths.digit
    displayOffset += width + glyphGap

    return character === ":" || character === "." ? (
      <EvaTimerSeparator
        key={`${character}-${index}`}
        offset={offset}
        value={character}
      />
    ) : (
      <EvaTimerDigit
        ghostSegments={ghostSegments}
        key={`${character}-${index}`}
        offset={offset}
        value={character as keyof typeof digitSegments}
      />
    )
  })
  const displayWidth = Math.max(1, displayOffset - glyphGap)

  React.useLayoutEffect(() => {
    const timer = timerRef.current
    const shell = shellRef.current
    if (!timer || !shell) return

    let active = true
    let animationFrame = 0

    const measure = () => {
      if (!active) return

      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const height = timer.offsetHeight
        const width = timer.offsetWidth
        if (!active || height === 0 || width === 0) return

        const availableWidth = shell.clientWidth
        const rawScale = availableWidth === 0
          ? 0
          : Math.min(1, availableWidth / width)
        const nextScale = rawScale > 0.999 ? 1 : rawScale

        setNaturalSize((current) =>
          current.height === height && current.width === width
            ? current
            : { height, width }
        )
        setFitScale((current) =>
          Math.abs(current - nextScale) < 0.001 ? current : nextScale
        )
      })
    }

    const observer = new ResizeObserver(measure)
    observer.observe(timer)
    observer.observe(shell)
    measure()

    return () => {
      active = false
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [])

  const measured = naturalSize.height > 0 && naturalSize.width > 0
  const timerStyle: EvaTimerStyle = {
    "--eva-timer-fitted-height": measured
      ? `${naturalSize.height * fitScale}px`
      : undefined,
    ...(resolvedDigitSize !== undefined
      ? { "--eva-timer-digit-size": resolvedDigitSize }
      : {}),
    width: measured ? `min(${naturalSize.width}px, 100%)` : undefined,
    ...style,
  }

  return (
    <div
      aria-label={ariaLabel ?? displayValue}
      aria-live="off"
      className={twMerge(
        "relative inline-block h-[var(--eva-timer-fitted-height)] max-w-full min-w-0 shrink-0 align-middle leading-none",
        className
      )}
      data-frame={frame ?? "panel"}
      data-slot="eva-timer"
      data-tone={tone ?? "amber"}
      role="timer"
      ref={shellRef}
      style={timerStyle}
      {...props}
    >
      <div
        data-slot="eva-timer-scaler"
        style={{
          transform: `scale(${fitScale})`,
          transformOrigin: "left top",
          visibility: measured ? "visible" : "hidden",
          width: "max-content",
        }}
      >
        <div
          className={evaTimerVariants({ frame, size, tone })}
          data-slot="eva-timer-frame"
          ref={timerRef}
        >
          {hasHeader ? (
            <div
              className="mb-[0.45rem] flex min-w-max items-center justify-between gap-6 border-b border-current/45 pb-[0.35rem]"
              data-slot="eva-timer-header"
            >
              <EvaText as="span" tracking="wide" variant="data">
                {label}
              </EvaText>
              <EvaText as="span" tracking="wide" variant="data">
                {status}
              </EvaText>
            </div>
          ) : null}

          <div
            className="w-max max-w-none leading-none"
            data-slot="eva-timer-display"
            style={{
              fontSize: "var(--eva-timer-digit-size)",
              width: `${displayWidth / 100}em`,
            }}
          >
            <svg
              aria-hidden="true"
              className="block h-auto w-full"
              focusable="false"
              viewBox={`0 0 ${displayWidth} 100`}
            >
              {glyphs}
            </svg>
          </div>

          {(frame ?? "panel") === "panel" ? (
            <div
              aria-hidden="true"
              className="mt-[0.45rem] h-[3px] w-full opacity-40 [background:repeating-linear-gradient(90deg,currentColor_0_3px,transparent_3px_10px)]"
              data-slot="eva-timer-ticks"
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { evaTimerVariants }
