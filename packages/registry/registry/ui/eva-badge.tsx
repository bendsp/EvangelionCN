"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { EvaText, type EvaTextLanguage } from "./eva-text"

const evaBadgeVariants = cva(
  "inline-block max-w-full overflow-hidden rounded-[var(--eva-badge-radius)] border-[length:var(--eva-badge-border)] border-current bg-eva-black p-[var(--eva-badge-padding)] align-middle leading-none [container-type:inline-size]",
  {
    variants: {
      tone: {
        paper: "text-eva-paper",
        critical: "text-eva-critical",
        amber: "text-eva-amber",
        terminal: "text-eva-terminal",
        cyan: "text-eva-cyan",
      },
      size: {
        sm: "h-12 w-36 [--eva-badge-border:2px] [--eva-badge-padding:0.3rem] [--eva-badge-radius:0.5rem]",
        md: "h-20 w-60 [--eva-badge-border:3px] [--eva-badge-padding:0.5rem] [--eva-badge-radius:0.75rem]",
        lg: "h-32 w-96 [--eva-badge-border:5px] [--eva-badge-padding:0.75rem] [--eva-badge-radius:1rem]",
      },
    },
    defaultVariants: {
      tone: "amber",
      size: "md",
    },
  }
)

export type EvaBadgeTone = NonNullable<VariantProps<typeof evaBadgeVariants>["tone"]>
export type EvaBadgeSize = NonNullable<VariantProps<typeof evaBadgeVariants>["size"]>

export interface EvaBadgeProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children" | "lang">,
    Omit<VariantProps<typeof evaBadgeVariants>, "size" | "tone"> {
  children: React.ReactNode
  emphasis?: "primary" | "secondary"
  lang?: EvaTextLanguage
  secondary?: React.ReactNode
  separator?: boolean
  size?: EvaBadgeSize
  tone?: EvaBadgeTone
  width?: React.CSSProperties["width"]
  height?: React.CSSProperties["height"]
}

const fittedTextVariants = cva(
  "absolute top-1/2 block w-max whitespace-nowrap [transform-origin:center_center]",
  {
    variants: {
      align: {
        center: "left-1/2",
        start: "left-0 [transform-origin:left_center]",
      },
    },
    defaultVariants: {
      align: "center",
    },
  }
)

interface FittedTextProps {
  align?: "center" | "start"
  children: React.ReactNode
  lang: EvaTextLanguage
}

function FittedText({ align = "center", children, lang }: FittedTextProps) {
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
        const naturalWidth = text.scrollWidth
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
  }, [children])

  const translate = align === "start" ? "translate(0, -50%)" : "translate(-50%, -50%)"

  return (
    <div className="relative min-h-0 min-w-0 overflow-hidden" ref={frameRef}>
      <div
        className={fittedTextVariants({ align })}
        ref={textRef}
        style={{
          fontSize: "100px",
          transform: `${translate} scale(${scale})`,
          visibility: scale > 0 ? "visible" : "hidden",
        }}
      >
        <EvaText as="span" className="block" lang={lang} tracking="tight" uppercase variant="interface">
          {children}
        </EvaText>
      </div>
    </div>
  )
}

export function EvaBadge({
  children,
  emphasis = "primary",
  lang = "en",
  secondary,
  separator = false,
  tone,
  size,
  className,
  style,
  width,
  height,
  ...props
}: EvaBadgeProps) {
  const hasSecondary = secondary !== undefined && secondary !== null
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
      className={evaBadgeVariants({ tone, size, className })}
      data-slot="eva-badge"
      data-size={size ?? "md"}
      lang={lang}
      style={{
        borderColor: "currentColor",
        ...style,
        ...(width !== undefined ? { width } : {}),
        ...(height !== undefined ? { height } : {}),
      }}
      {...props}
    >
      <div
        className="grid h-full min-h-0 w-full min-w-0 gap-[clamp(0.2rem,1.2cqi,0.65rem)]"
        data-slot="eva-badge-content"
        style={{ gridTemplateRows: rowSizes }}
      >
        <FittedText align={emphasis === "secondary" ? "start" : "center"} lang={lang}>
          {children}
        </FittedText>
        {hasSecondary ? (
          <>
            {separator ? (
              <span
                aria-hidden="true"
                className="h-[clamp(2px,0.8cqi,6px)] w-full rounded-full bg-current"
                data-slot="eva-badge-separator"
              />
            ) : null}
            <FittedText lang={lang}>{secondary}</FittedText>
          </>
        ) : null}
      </div>
    </div>
  )
}

export { evaBadgeVariants }
