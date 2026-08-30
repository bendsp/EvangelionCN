import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

const evaSegmentDisplayVariants = cva(
  "inline-block max-w-full shrink-0 align-middle leading-none",
  {
    variants: {
      size: {
        sm: "[--eva-segment-size:3rem]",
        md: "[--eva-segment-size:6rem]",
        lg: "[--eva-segment-size:10rem]",
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
      size: "md",
      tone: "amber",
    },
  }
)

const activeSegments = {
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
  "-": "g",
} as const

type DigitCharacter = keyof typeof activeSegments
type SegmentName = "a" | "b" | "c" | "d" | "e" | "f" | "g"

export type EvaSegmentDisplaySize = NonNullable<
  VariantProps<typeof evaSegmentDisplayVariants>["size"]
>
export type EvaSegmentDisplayTone = NonNullable<
  VariantProps<typeof evaSegmentDisplayVariants>["tone"]
>

type EvaSegmentDisplayStyle = React.CSSProperties & {
  "--eva-segment-size"?: React.CSSProperties["fontSize"]
}

export interface EvaSegmentDisplayProps
  extends Omit<React.ComponentPropsWithoutRef<"span">, "children">,
    Omit<VariantProps<typeof evaSegmentDisplayVariants>, "size" | "tone"> {
  characterGap?: number
  digitSize?: React.CSSProperties["fontSize"]
  digitWidth?: number
  ghostOpacity?: number
  segmentGap?: number
  segmentThickness?: number
  size?: EvaSegmentDisplaySize
  tone?: EvaSegmentDisplayTone
  value: string
}

function clamp(value: number, minimum: number, maximum: number) {
  if (!Number.isFinite(value)) return minimum
  return Math.min(maximum, Math.max(minimum, value))
}

export interface EvaSegmentGeometryInput {
  characterGap?: number
  digitWidth?: number
  segmentGap?: number
  segmentThickness?: number
}

export interface EvaSegmentGeometry {
  characterGap: number
  digitWidth: number
  maxSegmentGap: number
  maxSegmentThickness: number
  segmentGap: number
  segmentThickness: number
}

export function resolveEvaSegmentGeometry({
  characterGap = 8,
  digitWidth = 60,
  segmentGap = 1,
  segmentThickness = 10,
}: EvaSegmentGeometryInput = {}): EvaSegmentGeometry {
  const resolvedDigitWidth = clamp(digitWidth, 32, 100)
  const maxSegmentThickness = Math.min(20, resolvedDigitWidth * 0.3)
  const resolvedSegmentThickness = clamp(
    segmentThickness,
    3,
    maxSegmentThickness
  )
  const maxSegmentGap = Math.max(
    0,
    Math.min(
      8,
      Math.SQRT2 * (resolvedDigitWidth - 4 - 2 * resolvedSegmentThickness) / 2,
      Math.SQRT2 * (48 - 1.5 * resolvedSegmentThickness) / 2
    )
  )

  return {
    characterGap: clamp(characterGap, 0, 40),
    digitWidth: resolvedDigitWidth,
    maxSegmentGap,
    maxSegmentThickness,
    segmentGap: clamp(segmentGap, 0, maxSegmentGap),
    segmentThickness: resolvedSegmentThickness,
  }
}

function horizontalSegment(
  centerY: number,
  endX: number,
  startX: number,
  thickness: number
) {
  const half = thickness / 2
  const bevel = Math.min(half, (endX - startX) / 2)

  return [
    [startX, centerY],
    [startX + bevel, centerY - half],
    [endX - bevel, centerY - half],
    [endX, centerY],
    [endX - bevel, centerY + half],
    [startX + bevel, centerY + half],
  ].map((point) => point.join(",")).join(" ")
}

function verticalSegment(
  centerX: number,
  endY: number,
  startY: number,
  thickness: number
) {
  const half = thickness / 2
  const bevel = Math.min(half, (endY - startY) / 2)

  return [
    [centerX, startY],
    [centerX + half, startY + bevel],
    [centerX + half, endY - bevel],
    [centerX, endY],
    [centerX - half, endY - bevel],
    [centerX - half, startY + bevel],
  ].map((point) => point.join(",")).join(" ")
}

function getSegmentPoints(
  digitWidth: number,
  segmentGap: number,
  thickness: number
): Record<SegmentName, string> {
  const half = thickness / 2
  const left = 2 + half
  const right = digitWidth - 2 - half
  const top = 2 + half
  const middle = 50
  const bottom = 98 - half
  const jointInset = segmentGap / Math.SQRT2

  return {
    a: horizontalSegment(top, right - jointInset, left + jointInset, thickness),
    b: verticalSegment(right, middle - jointInset, top + jointInset, thickness),
    c: verticalSegment(right, bottom - jointInset, middle + jointInset, thickness),
    d: horizontalSegment(bottom, right - jointInset, left + jointInset, thickness),
    e: verticalSegment(left, bottom - jointInset, middle + jointInset, thickness),
    f: verticalSegment(left, middle - jointInset, top + jointInset, thickness),
    g: horizontalSegment(middle, right - jointInset, left + jointInset, thickness),
  }
}

function EvaSegmentDigit({
  character,
  ghostOpacity,
  offset,
  points,
}: {
  character: DigitCharacter | " "
  ghostOpacity: number
  offset: number
  points: Record<SegmentName, string>
}) {
  const active = new Set<SegmentName>(
    character === " "
      ? []
      : activeSegments[character].split("") as SegmentName[]
  )

  return (
    <g transform={`translate(${offset} 0)`}>
      {(Object.keys(points) as SegmentName[]).map((segment) => (
        <polygon
          fill="currentColor"
          key={segment}
          opacity={active.has(segment) ? 1 : ghostOpacity}
          points={points[segment]}
        />
      ))}
    </g>
  )
}

function EvaSegmentSeparator({
  character,
  offset,
  thickness,
}: {
  character: "." | ":"
  offset: number
  thickness: number
}) {
  const markSize = Math.max(5, thickness * 0.82)
  const centerX = markSize / 2

  return (
    <g transform={`translate(${offset} 0)`}>
      {character === ":" ? (
        <>
          <rect fill="currentColor" height={markSize} width={markSize} x={0} y={30 - markSize / 2} />
          <rect fill="currentColor" height={markSize} width={markSize} x={0} y={70 - markSize / 2} />
        </>
      ) : (
        <rect fill="currentColor" height={markSize} width={markSize} x={centerX - markSize / 2} y={98 - markSize} />
      )}
    </g>
  )
}

function normalizeCharacter(character: string): DigitCharacter | "." | ":" | " " {
  if (character in activeSegments) return character as DigitCharacter
  if (character === "." || character === ":") return character
  return " "
}

export function EvaSegmentDisplay({
  "aria-label": ariaLabel,
  characterGap = 8,
  className,
  digitSize,
  digitWidth = 60,
  ghostOpacity = 0.08,
  segmentGap = 1,
  segmentThickness = 10,
  size,
  style,
  tone,
  value,
  ...props
}: EvaSegmentDisplayProps) {
  const geometry = resolveEvaSegmentGeometry({
    characterGap,
    digitWidth,
    segmentGap,
    segmentThickness,
  })
  const resolvedDigitWidth = geometry.digitWidth
  const resolvedThickness = geometry.segmentThickness
  const resolvedSegmentGap = geometry.segmentGap
  const resolvedCharacterGap = geometry.characterGap
  const resolvedGhostOpacity = clamp(ghostOpacity, 0, 1)
  const resolvedDigitSize = typeof digitSize === "number" ? `${digitSize}px` : digitSize
  const points = getSegmentPoints(
    resolvedDigitWidth,
    resolvedSegmentGap,
    resolvedThickness
  )
  let displayOffset = 0

  const glyphs = Array.from(value).map((rawCharacter, index) => {
    const character = normalizeCharacter(rawCharacter)
    const offset = displayOffset
    const separatorWidth = Math.max(8, resolvedThickness * 0.82)
    const glyphWidth = character === "." || character === ":"
      ? separatorWidth
      : resolvedDigitWidth

    displayOffset += glyphWidth + resolvedCharacterGap

    return character === "." || character === ":" ? (
      <EvaSegmentSeparator
        character={character}
        key={`${rawCharacter}-${index}`}
        offset={offset}
        thickness={resolvedThickness}
      />
    ) : (
      <EvaSegmentDigit
        character={character}
        ghostOpacity={resolvedGhostOpacity}
        key={`${rawCharacter}-${index}`}
        offset={offset}
        points={points}
      />
    )
  })
  const displayWidth = Math.max(1, displayOffset - resolvedCharacterGap)
  const displayStyle: EvaSegmentDisplayStyle = {
    ...(resolvedDigitSize !== undefined
      ? { "--eva-segment-size": resolvedDigitSize }
      : {}),
    fontSize: "var(--eva-segment-size)",
    width: `min(${displayWidth / 100}em, 100%)`,
    ...style,
  }

  return (
    <span
      aria-label={ariaLabel ?? value}
      aria-roledescription="seven-segment display"
      className={twMerge(evaSegmentDisplayVariants({ size, tone }), className)}
      data-slot="eva-segment-display"
      role="img"
      style={displayStyle}
      {...props}
    >
      <svg
        aria-hidden="true"
        className="block h-auto w-full overflow-visible"
        focusable="false"
        viewBox={`0 0 ${displayWidth} 100`}
      >
        {glyphs}
      </svg>
    </span>
  )
}

export { evaSegmentDisplayVariants }
