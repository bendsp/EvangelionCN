# EvaBadge design QA

## Evidence

- Source visual truth: five user-supplied reference captures, preserved inside the combined comparison at their original aspect ratios.
- Implementation evidence: two live-browser captures at the 783 × 777 CSS px browser viewport, preserved inside the combined comparison.
- Durable combined comparison: `/Users/ben/Documents/Codex/2026-08-30/i/outputs/eva-badge-design-qa.png` at 1600 × 1140 px
- Browser viewport: 783 × 777 CSS px at device pixel ratio 2.
- State: `/components/eva-badge`, captured once for the complete reference-form grid and once for preset plus exact-dimension examples.
- Primary interactions tested: homepage item navigation to EvaBadge and header navigation back to the EvaBadge page.
- Browser errors checked: no runtime error overlay or console error appeared during navigation. The production build also completed without errors.

## Comparison

- Fonts and typography: English badge levels use the Archivo-backed `eva-interface` role; the Japanese example resolves the Noto Sans JP interface role. Primary, secondary, and reversed-emphasis examples reproduce the hierarchy shown in the references.
- Spacing and layout rhythm: `size` controls the complete frame, while `width` and `height` provide exact overrides. Frame padding, border weight, rounded corners, level spacing, and the optional internal rule scale with the selected preset.
- Colors and tokens: the examples use `eva-critical`, `eva-terminal`, `eva-amber`, `eva-paper`, and `eva-cyan`. Frames and text resolve to the same tone.
- Image quality and assets: EvaBadge contains no raster assets. The source glow, blur, and topographic texture belong to the surrounding footage, so the reusable component does not bake them in.
- Copy and content: `UNKNOWN`, `TOKYO-3 / TOPOGRAPHICAL MAP`, and `17TH / ANGEL` reproduce the three supplied forms.
- Full-view and focused comparison: the combined comparison shows all three source crops above the full component grid. No extra focused crop was needed because every badge remains readable at that scale.

## Comparison history

1. The first pass used the site’s generic border color instead of the badge tone. The component now sets its frame to `currentColor`; the second capture shows matching frame and text colors.
2. The first amber example put `17TH ANGEL` on one line. The component now supports `emphasis="secondary"`; the final capture shows the smaller `17TH` level above the dominant `ANGEL` level.
3. The initial sizing API changed only the type scale, so long strings escaped their frames. EvaBadge now gives each level a measured zone and uniformly scales the interface text to fit its available width and height.
4. Container-relative border and padding values were initially resolved against the parent container, which made the small preset unusably cramped. Preset-specific frame tokens now keep `sm`, `md`, and `lg` legible while inner gaps and rules remain proportional.

## Findings

No actionable P0, P1, or P2 differences remain. Browser geometry checks confirmed zero frame overflow and placed every transformed text rectangle inside its zone for all seven examples.

P3 follow-up: glow and textured backgrounds could be separate effects or layout treatments later. They should not be part of the base badge.

final result: passed
