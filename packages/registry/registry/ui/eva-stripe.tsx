import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

import styles from "./eva-stripe.module.css"

const evaStripeVariants = cva(
  "pointer-events-none block h-full w-full shrink-0",
  {
    variants: {
      tone: {
        inherit: "text-inherit",
        paper: "text-eva-paper",
        critical: "text-eva-critical",
        amber: "text-eva-amber",
        terminal: "text-eva-terminal",
        cyan: "text-eva-cyan",
      },
    },
    defaultVariants: {
      tone: "inherit",
    },
  }
)

export type EvaStripeTone = NonNullable<
  VariantProps<typeof evaStripeVariants>["tone"]
>
export type EvaStripeOrientation = "horizontal" | "vertical"
export type EvaStripeMotion =
  | { kind: "none" }
  | {
      kind: "scroll"
      direction?: "forward" | "reverse"
      durationMs?: number
    }

export interface EvaStripeProps
  extends Omit<React.ComponentPropsWithoutRef<"span">, "aria-hidden" | "children">,
    Omit<VariantProps<typeof evaStripeVariants>, "tone"> {
  angle?: number
  band?: number
  gap?: number
  motion?: EvaStripeMotion
  orientation?: EvaStripeOrientation
  tone?: EvaStripeTone
}

export interface EvaStripeGeometry {
  angle: number
  band: number
  gap: number
  period: number
}

type EvaStripeStyle = React.CSSProperties & {
  "--eva-stripe-band"?: string
  "--eva-stripe-direction"?: React.CSSProperties["animationDirection"]
  "--eva-stripe-duration"?: string
  "--eva-stripe-image"?: string
  "--eva-stripe-overscan-x"?: string
  "--eva-stripe-overscan-y"?: string
  "--eva-stripe-period"?: string
  "--eva-stripe-travel-x"?: string
  "--eva-stripe-travel-y"?: string
}

function clamp(value: number, minimum: number, maximum: number) {
  if (!Number.isFinite(value)) return minimum
  return Math.min(maximum, Math.max(minimum, value))
}

function normalizeAngle(value: number) {
  if (!Number.isFinite(value)) return -45
  return ((value % 360) + 540) % 360 - 180
}

export function resolveEvaStripeGeometry({
  angle = -45,
  band = 12,
  gap = 8,
}: Pick<EvaStripeProps, "angle" | "band" | "gap"> = {}): EvaStripeGeometry {
  const resolvedBand = clamp(band, 0.5, 256)
  const resolvedGap = clamp(gap, 0, 256)

  return {
    angle: normalizeAngle(angle),
    band: resolvedBand,
    gap: resolvedGap,
    period: resolvedBand + resolvedGap,
  }
}

function resolveTravel(
  angle: number,
  orientation: EvaStripeOrientation,
  period: number
) {
  const radians = angle * Math.PI / 180
  const horizontalProjection = Math.sin(radians)
  const verticalProjection = -Math.cos(radians)

  if (orientation === "horizontal" && Math.abs(horizontalProjection) > 0.01) {
    return { x: period / Math.abs(horizontalProjection), y: 0 }
  }

  if (orientation === "vertical" && Math.abs(verticalProjection) > 0.01) {
    return { x: 0, y: period / Math.abs(verticalProjection) }
  }

  if (Math.abs(horizontalProjection) > 0.01) {
    return { x: period / Math.abs(horizontalProjection), y: 0 }
  }

  return { x: 0, y: period / Math.abs(verticalProjection) }
}

export function EvaStripe({
  angle = -45,
  band = 12,
  className,
  gap = 8,
  motion = { kind: "none" },
  orientation = "horizontal",
  style,
  tone,
  ...props
}: EvaStripeProps) {
  const geometry = resolveEvaStripeGeometry({ angle, band, gap })
  const gradientAngle = -geometry.angle
  const travel = resolveTravel(
    gradientAngle,
    orientation,
    geometry.period
  )
  const isMoving = motion.kind === "scroll"
  const durationMs = isMoving
    ? clamp(motion.durationMs ?? 1200, 100, 60_000)
    : undefined
  const stripeStyle: EvaStripeStyle = {
    ...style,
    "--eva-stripe-band": `${geometry.band}px`,
    "--eva-stripe-direction":
      isMoving && motion.direction === "reverse" ? "reverse" : "normal",
    "--eva-stripe-duration": `${durationMs ?? 1200}ms`,
    "--eva-stripe-image": `repeating-linear-gradient(${gradientAngle}deg, currentColor 0 var(--eva-stripe-band), transparent var(--eva-stripe-band) var(--eva-stripe-period))`,
    "--eva-stripe-overscan-x": `${Math.abs(travel.x) + 1}px`,
    "--eva-stripe-overscan-y": `${Math.abs(travel.y) + 1}px`,
    "--eva-stripe-period": `${geometry.period}px`,
    "--eva-stripe-travel-x": `${travel.x}px`,
    "--eva-stripe-travel-y": `${travel.y}px`,
  }

  return (
    <span
      aria-hidden="true"
      className={twMerge(styles.root, evaStripeVariants({ tone }), className)}
      data-motion={motion.kind}
      data-orientation={orientation}
      data-slot="eva-stripe"
      style={stripeStyle}
      {...props}
    />
  )
}

export { evaStripeVariants }
