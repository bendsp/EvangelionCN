import type { CSSProperties, ReactNode } from "react"

export type EvaTextElement = "span" | "p" | "div" | "h1" | "h2" | "h3"
export type EvaTextVariant = "title" | "interface" | "roman" | "data"
export type EvaTextLanguage = "en" | "ja"
export type EvaTextTracking = "tight" | "normal" | "wide"

export type EvaTextProps = {
  as?: EvaTextElement
  variant?: EvaTextVariant
  lang?: EvaTextLanguage
  horizontalScale?: number
  tracking?: EvaTextTracking
  uppercase?: boolean
  className?: string
  children: ReactNode
}

const fontFamilies = {
  title: {
    en: "var(--font-eva-title-en, 'Besley', 'Century Schoolbook', serif)",
    ja: "var(--font-eva-title-ja, 'Noto Serif JP', serif)",
  },
  interface: {
    en: "var(--font-eva-interface-en, 'Archivo', 'Helvetica Neue', Arial, sans-serif)",
    ja: "var(--font-eva-interface-ja, 'Noto Sans JP', sans-serif)",
  },
  roman: {
    en: "var(--font-eva-roman-en, 'Tinos', 'Times New Roman', serif)",
    ja: "var(--font-eva-roman-ja, 'Noto Serif JP', serif)",
  },
  data: {
    en: "var(--font-eva-data, 'M PLUS 1 Code', ui-monospace, monospace)",
    ja: "var(--font-eva-data, 'M PLUS 1 Code', ui-monospace, monospace)",
  },
} satisfies Record<EvaTextVariant, Record<EvaTextLanguage, string>>

const fontWeights = {
  title: { en: 700, ja: 900 },
  interface: { en: 700, ja: 700 },
  roman: { en: 400, ja: 400 },
  data: { en: 500, ja: 500 },
} satisfies Record<EvaTextVariant, Record<EvaTextLanguage, number>>

const letterSpacing = {
  tight: "-0.045em",
  normal: "0em",
  wide: "0.12em",
} satisfies Record<EvaTextTracking, string>

const lineHeights = {
  title: 0.9,
  interface: 0.95,
  roman: 1.2,
  data: 1.1,
} satisfies Record<EvaTextVariant, number>

function normalizeScale(horizontalScale: number) {
  if (!Number.isFinite(horizontalScale) || horizontalScale <= 0) {
    return 1
  }

  return horizontalScale
}

export function EvaText({
  as: Component = "span",
  variant = "interface",
  lang = "en",
  horizontalScale = 1,
  tracking = "normal",
  uppercase = false,
  className,
  children,
}: EvaTextProps) {
  const scale = normalizeScale(horizontalScale)
  const scaledStyle: CSSProperties =
    scale === 1
      ? {}
      : {
          display: "inline-block",
          transform: `scaleX(${scale})`,
          transformOrigin: "left center",
        }

  return (
    <Component
      className={className}
      data-eva-text=""
      data-language={lang}
      data-tracking={tracking}
      data-variant={variant}
      lang={lang}
      style={{
        fontFamily: fontFamilies[variant][lang],
        fontWeight: fontWeights[variant][lang],
        letterSpacing: letterSpacing[tracking],
        lineHeight: lineHeights[variant],
        textTransform: uppercase ? "uppercase" : undefined,
        ...scaledStyle,
      }}
    >
      {children}
    </Component>
  )
}
