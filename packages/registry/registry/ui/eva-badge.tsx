"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import {
  EvaText,
  type EvaTextLanguage,
  type EvaTextTracking,
} from "./eva-text"

const evaBadgeVariants = cva(
  "inline-block max-w-full overflow-hidden border-[length:var(--eva-badge-border)] border-current bg-eva-black p-[var(--eva-badge-padding)] align-middle leading-none [container-type:inline-size]",
  {
    variants: {
      shape: {
        rounded: "rounded-[var(--eva-badge-radius)]",
        square: "rounded-none",
      },
      tone: {
        paper: "text-eva-paper",
        critical: "text-eva-critical",
        amber: "text-eva-amber",
        terminal: "text-eva-terminal",
        cyan: "text-eva-cyan",
      },
      size: {
        sm: "h-12 w-36 [--eva-badge-border:2px] [--eva-badge-padding:2px] [--eva-badge-radius:6px]",
        md: "h-20 w-60 [--eva-badge-border:3px] [--eva-badge-padding:4px] [--eva-badge-radius:8px]",
        lg: "h-32 w-96 [--eva-badge-border:5px] [--eva-badge-padding:6px] [--eva-badge-radius:12px]",
      },
    },
    defaultVariants: {
      shape: "rounded",
      tone: "amber",
      size: "md",
    },
  }
)

export type EvaBadgeTone = NonNullable<VariantProps<typeof evaBadgeVariants>["tone"]>
export type EvaBadgeSize = NonNullable<VariantProps<typeof evaBadgeVariants>["size"]>
export type EvaBadgeShape = NonNullable<VariantProps<typeof evaBadgeVariants>["shape"]>
export type EvaBadgeAlignment = "start" | "center" | "end"

export interface EvaBadgeProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children" | "lang">,
    Omit<VariantProps<typeof evaBadgeVariants>, "shape" | "size" | "tone"> {
  align?: EvaBadgeAlignment
  borderWidth?: React.CSSProperties["borderWidth"]
  children: React.ReactNode
  cornerRadius?: React.CSSProperties["borderRadius"]
  emphasis?: "primary" | "secondary"
  gap?: React.CSSProperties["gap"]
  height?: React.CSSProperties["height"]
  horizontalScale?: number
  lang?: EvaTextLanguage
  padding?: React.CSSProperties["padding"]
  secondary?: React.ReactNode
  separatorThickness?: React.CSSProperties["height"]
  separator?: boolean
  shape?: EvaBadgeShape
  size?: EvaBadgeSize
  tone?: EvaBadgeTone
  tracking?: EvaTextTracking
  uppercase?: boolean
  width?: React.CSSProperties["width"]
}

const fittedTextVariants = cva(
  "absolute top-1/2 block w-max whitespace-nowrap [transform-origin:center_center]",
  {
    variants: {
      align: {
        center: "left-1/2",
        end: "right-0 [transform-origin:right_center]",
        start: "left-0 [transform-origin:left_center]",
      },
    },
    defaultVariants: {
      align: "center",
    },
  }
)

const separatorVariants = cva(
  "h-[clamp(2px,0.8cqi,6px)] w-full bg-current",
  {
    variants: {
      shape: {
        rounded: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      shape: "rounded",
    },
  }
)

interface FittedTextProps {
  align?: EvaBadgeAlignment
  children: React.ReactNode
  horizontalScale: number
  lang: EvaTextLanguage
  tracking: EvaTextTracking
  uppercase: boolean
}

function FittedText({
  align = "center",
  children,
  horizontalScale,
  lang,
  tracking,
  uppercase,
}: FittedTextProps) {
  const frameRef = React.useRef<HTMLDivElement>(null)
  const textRef = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(0)

  React.useLayoutEffect(() => {
    const frame = frameRef.current
    const text = textRef.current
    if (!frame || !text) return

    let active = true
    let animationFrame = 0

    const fit = () => {
      if (!active) return

      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const availableWidth = frame.clientWidth
        const availableHeight = frame.clientHeight
        const naturalWidth = text.scrollWidth * horizontalScale
        const naturalHeight = text.scrollHeight
        if (naturalWidth === 0 || naturalHeight === 0) return

        const nextScale = Math.min(
          availableWidth / naturalWidth,
          availableHeight / naturalHeight
        ) * 0.98

        if (active && Number.isFinite(nextScale)) {
          setScale(Math.max(0, nextScale))
        }
      })
    }

    const observer = new ResizeObserver(fit)
    observer.observe(frame)
    observer.observe(text)
    void document.fonts?.ready.then(() => {
      if (active) fit()
    })
    fit()

    return () => {
      active = false
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [children, horizontalScale, lang, tracking, uppercase])

  const translate = align === "center" ? "translate(-50%, -50%)" : "translate(0, -50%)"

  return (
    <div className="relative min-h-0 min-w-0 overflow-hidden" ref={frameRef}>
      <div
        className={fittedTextVariants({ align })}
        ref={textRef}
        style={{
          fontSize: "100px",
          transform: `${translate} scale(${scale}) scaleX(${horizontalScale})`,
          visibility: scale > 0 ? "visible" : "hidden",
        }}
      >
        <EvaText as="span" className="block" lang={lang} tracking={tracking} uppercase={uppercase} variant="interface">
          {children}
        </EvaText>
      </div>
    </div>
  )
}

export function EvaBadge({
  align,
  borderWidth,
  children,
  cornerRadius,
  emphasis = "primary",
  gap,
  height,
  horizontalScale = 0.86,
  lang = "en",
  padding,
  secondary,
  separator = false,
  separatorThickness,
  shape,
  tone,
  size,
  tracking = "tight",
  uppercase = true,
  className,
  style,
  width,
  ...props
}: EvaBadgeProps) {
  const hasSecondary = secondary !== undefined && secondary !== null
  const safeHorizontalScale = Number.isFinite(horizontalScale) && horizontalScale > 0
    ? horizontalScale
    : 1
  const primaryAlignment = align ?? (emphasis === "secondary" ? "start" : "center")
  const secondaryAlignment = align ?? "center"
  const rowSizes = !hasSecondary
    ? "minmax(0, 1fr)"
    : emphasis === "secondary"
      ? separator
        ? "minmax(0, 0.42fr) auto minmax(0, 1fr)"
        : "minmax(0, 0.42fr) minmax(0, 1fr)"
      : separator
        ? "minmax(0, 1fr) auto minmax(0, 0.42fr)"
        : "minmax(0, 1fr) minmax(0, 0.42fr)"

  return (
    <div
      className={evaBadgeVariants({ shape, tone, size, className })}
      data-shape={shape ?? "rounded"}
      data-slot="eva-badge"
      data-size={size ?? "md"}
      lang={lang}
      style={{
        borderColor: "currentColor",
        ...style,
        ...(width !== undefined ? { width } : {}),
        ...(height !== undefined ? { height } : {}),
        ...(padding !== undefined ? { padding } : {}),
        ...(borderWidth !== undefined ? { borderWidth } : {}),
        ...(shape === "square"
          ? { borderRadius: 0 }
          : cornerRadius !== undefined
            ? { borderRadius: cornerRadius }
            : {}),
      }}
      {...props}
    >
      <div
        className="grid h-full min-h-0 w-full min-w-0 gap-[clamp(0.2rem,1.2cqi,0.65rem)]"
        data-slot="eva-badge-content"
        style={{ gridTemplateRows: rowSizes, ...(gap !== undefined ? { gap } : {}) }}
      >
        <FittedText
          align={primaryAlignment}
          horizontalScale={safeHorizontalScale}
          lang={lang}
          tracking={tracking}
          uppercase={uppercase}
        >
          {children}
        </FittedText>
        {hasSecondary ? (
          <>
            {separator ? (
              <span
                aria-hidden="true"
                className={separatorVariants({ shape })}
                data-slot="eva-badge-separator"
                style={separatorThickness !== undefined ? { height: separatorThickness } : undefined}
              />
            ) : null}
            <FittedText
              align={secondaryAlignment}
              horizontalScale={safeHorizontalScale}
              lang={lang}
              tracking={tracking}
              uppercase={uppercase}
            >
              {secondary}
            </FittedText>
          </>
        ) : null}
      </div>
    </div>
  )
}

export { evaBadgeVariants }
