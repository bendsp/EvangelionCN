import { EvaText } from "@evangelioncn/registry/eva-text"
import Link from "next/link"

export default function Home() {
  return (
    <main className="page-shell">
      <p className="eyebrow">EVANGELIONCN / SHADCN REGISTRY / INITIAL RELEASE</p>
      <EvaText as="h1" className="doc-heading" horizontalScale={0.72} tracking="tight" variant="title">
        TYPE IS THE INTERFACE.
      </EvaText>
      <p className="lede">
        Two foundations for building Evangelion-inspired interfaces: a tokenized visual theme and a display-typography primitive.
      </p>

      <div className="registry-grid">
        <Link className="registry-link" href="/components/eva-theme">
          <span className="registry-link-index">ITEM 01 / REGISTRY:THEME</span>
          <EvaText as="h2" horizontalScale={0.8} tracking="tight" variant="interface" uppercase>
            EVA-THEME
          </EvaText>
          <p>Color, typography, radius, and semantic tokens. Install this first or let Eva Text pull it in.</p>
          <span className="registry-link-arrow">OPEN ITEM →</span>
        </Link>
        <Link className="registry-link" href="/components/eva-text">
          <span className="registry-link-index">ITEM 02 / REGISTRY:UI</span>
          <EvaText as="h2" horizontalScale={0.8} tracking="tight" variant="interface" uppercase>
            EVA-TEXT
          </EvaText>
          <p>English and Japanese type roles with explicit tracking and horizontal display scaling.</p>
          <span className="registry-link-arrow">OPEN LAB →</span>
        </Link>
      </div>
    </main>
  )
}
