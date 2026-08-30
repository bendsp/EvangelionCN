"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import {
  EvaText,
  type EvaTextLanguage,
  type EvaTextTracking,
} from "./eva-text"

const evaAutoBadgeVariants = cva(
  "inline-grid max-w-none overflow-hidden border-[length:var(--eva-auto-badge-border)] border-current bg-eva-black px-[var(--eva-auto-badge-padding-inline)] py-[var(--eva-auto-badge-padding-block)] align-middle leading-none",
  {
    variants: {
      shape: {
        rounded: "rounded-[var(--eva-auto-badge-radius)]",
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
        sm: "[--eva-auto-badge-border:2px] [--eva-auto-badge-gap:2px] [--eva-auto-badge-padding-block:4px] [--eva-auto-badge-padding-inline:8px] [--eva-auto-badge-primary-size:24px] [--eva-auto-badge-radius:6px] [--eva-auto-badge-secondary-size:12px] [--eva-auto-badge-separator:2px]",
        md: "[--eva-auto-badge-border:3px] [--eva-auto-badge-gap:3px] [--eva-auto-badge-padding-block:5px] [--eva-auto-badge-padding-inline:12px] [--eva-auto-badge-primary-size:40px] [--eva-auto-badge-radius:8px] [--eva-auto-badge-secondary-size:16px] [--eva-auto-badge-separator:2px]",
        lg: "[--eva-auto-badge-border:5px] [--eva-auto-badge-gap:4px] [--eva-auto-badge-padding-block:8px] [--eva-auto-badge-padding-inline:18px] [--eva-auto-badge-primary-size:64px] [--eva-auto-badge-radius:12px] [--eva-auto-badge-secondary-size:24px] [--eva-auto-badge-separator:4px]",
      },
    },
    defaultVariants: {
      shape: "rounded",
      tone: "amber",
      size: "md",
    },
  }
)

const contentTextVariants = cva(
  "relative block whitespace-nowrap",
  {
    variants: {
      align: {
        center: "justify-self-center",
        end: "justify-self-end",
        start: "justify-self-start",
      },
    },
    defaultVariants: {
      align: "center",
    },
  }
)

const contentTextInnerVariants = cva(
  "absolute top-0 block w-max whitespace-nowrap",
  {
    variants: {
      align: {
        center: "left-1/2 [transform-origin:center_center]",
        end: "right-0 [transform-origin:right_center]",
        start: "left-0 [transform-origin:left_center]",
      },
    },
    defaultVariants: {
      align: "center",
    },
  }
)

const separatorVariants = cva("w-full bg-current", {
  variants: {
    shape: {
      rounded: "rounded-full",
      square: "rounded-none",
    },
  },
  defaultVariants: {
    shape: "rounded",
  },
})

export type EvaAutoBadgeTone = NonNullable<VariantProps<typeof evaAutoBadgeVariants>["tone"]>
export type EvaAutoBadgeSize = NonNullable<VariantProps<typeof evaAutoBadgeVariants>["size"]>
export type EvaAutoBadgeShape = NonNullable<VariantProps<typeof evaAutoBadgeVariants>["shape"]>
export type EvaAutoBadgeAlignment = "start" | "center" | "end"

export interface EvaAutoBadgeProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children" | "lang">,
    Omit<VariantProps<typeof evaAutoBadgeVariants>, "shape" | "size" | "tone"> {
  align?: EvaAutoBadgeAlignment
  borderWidth?: React.CSSProperties["borderWidth"]
  children: React.ReactNode
  cornerRadius?: React.CSSProperties["borderRadius"]
  emphasis?: "primary" | "secondary"
  fontSize?: React.CSSProperties["fontSize"]
  gap?: React.CSSProperties["gap"]
  horizontalScale?: number
  lang?: EvaTextLanguage
  paddingBlock?: React.CSSProperties["paddingBlock"]
  paddingInline?: React.CSSProperties["paddingInline"]
  secondary?: React.ReactNode
  secondaryFontSize?: React.CSSProperties["fontSize"]
  separator?: boolean
  separatorThickness?: React.CSSProperties["height"]
  shape?: EvaAutoBadgeShape
  size?: EvaAutoBadgeSize
  tone?: EvaAutoBadgeTone
  tracking?: EvaTextTracking
  uppercase?: boolean
}

interface ContentTextProps {
  align: EvaAutoBadgeAlignment
  children: React.ReactNode
  fontSize: React.CSSProperties["fontSize"]
  horizontalScale: number
  lang: EvaTextLanguage
  tracking: EvaTextTracking
  uppercase: boolean
}

function ContentText({
  align,
  children,
  fontSize,
  horizontalScale,
  lang,
  tracking,
  uppercase,
}: ContentTextProps) {
  const textRef = React.useRef<HTMLDivElement>(null)
  const [naturalSize, setNaturalSize] = React.useState({ height: 0, width: 0 })

  React.useLayoutEffect(() => {
    const text = textRef.current
    if (!text) return

    let active = true
    let animationFrame = 0

    const measure = () => {
      if (!active) return

      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const height = text.scrollHeight
        const width = text.scrollWidth
        if (!active || height === 0 || width === 0) return

        setNaturalSize((current) =>
          current.height === height && current.width === width
            ? current
            : { height, width }
        )
      })
    }

    const observer = new ResizeObserver(measure)
    observer.observe(text)
    void document.fonts?.ready.then(() => {
      if (active) measure()
    })
    measure()

    return () => {
      active = false
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [children, fontSize, lang, tracking, uppercase])

  const translate = align === "center" ? "translateX(-50%) " : ""
  const measured = naturalSize.height > 0 && naturalSize.width > 0

  return (
    <div
      className={contentTextVariants({ align })}
      data-slot="eva-auto-badge-text"
      style={{
        height: measured ? naturalSize.height : 0,
        width: measured ? naturalSize.width * horizontalScale : 0,
      }}
    >
      <div
        className={contentTextInnerVariants({ align })}
        ref={textRef}
        style={{
          fontSize,
          transform: `${translate}scaleX(${horizontalScale})`,
          visibility: measured ? "visible" : "hidden",
        }}
      >
        <EvaText
          as="span"
          className="block"
          lang={lang}
          tracking={tracking}
          uppercase={uppercase}
          variant="interface"
        >
          {children}
        </EvaText>
      </div>
    </div>
  )
}

export function EvaAutoBadge({
  align = "center",
  borderWidth,
  children,
  cornerRadius,
  emphasis = "primary",
  fontSize,
  gap,
  horizontalScale = 0.86,
  lang = "en",
  paddingBlock,
  paddingInline,
  secondary,
  secondaryFontSize,
  separator = false,
  separatorThickness,
  shape,
  size,
  tone,
  tracking = "tight",
  uppercase = true,
  className,
  style,
  ...props
}: EvaAutoBadgeProps) {
  const hasSecondary = secondary !== undefined && secondary !== null
  const safeHorizontalScale = Number.isFinite(horizontalScale) && horizontalScale > 0
    ? horizontalScale
    : 1
  const primaryFontSize = fontSize
    ?? (hasSecondary && emphasis === "secondary"
      ? "var(--eva-auto-badge-secondary-size)"
      : "var(--eva-auto-badge-primary-size)")
  const resolvedSecondaryFontSize = secondaryFontSize
    ?? (emphasis === "secondary"
      ? "var(--eva-auto-badge-primary-size)"
      : "var(--eva-auto-badge-secondary-size)")

  return (
    <div
      className={evaAutoBadgeVariants({ shape, size, tone, className })}
      data-shape={shape ?? "rounded"}
      data-size={size ?? "md"}
      data-slot="eva-auto-badge"
      lang={lang}
      style={{
        borderColor: "currentColor",
        ...style,
        contain: "none",
        containerType: "normal",
        ...(paddingInline !== undefined ? { paddingInline } : {}),
        ...(paddingBlock !== undefined ? { paddingBlock } : {}),
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
        className="inline-grid w-max max-w-none items-center gap-[var(--eva-auto-badge-gap)]"
        data-slot="eva-auto-badge-content"
        style={gap !== undefined ? { gap } : undefined}
      >
        <ContentText
          align={align}
          fontSize={primaryFontSize}
          horizontalScale={safeHorizontalScale}
          lang={lang}
          tracking={tracking}
          uppercase={uppercase}
        >
          {children}
        </ContentText>
        {hasSecondary ? (
          <>
            {separator ? (
              <span
                aria-hidden="true"
                className={separatorVariants({ shape })}
                data-slot="eva-auto-badge-separator"
                style={{
                  height: separatorThickness
                    ?? "var(--eva-auto-badge-separator)",
                }}
              />
            ) : null}
            <ContentText
              align={align}
              fontSize={resolvedSecondaryFontSize}
              horizontalScale={safeHorizontalScale}
              lang={lang}
              tracking={tracking}
              uppercase={uppercase}
            >
              {secondary}
            </ContentText>
          </>
        ) : null}
      </div>
    </div>
  )
}

export { evaAutoBadgeVariants }
