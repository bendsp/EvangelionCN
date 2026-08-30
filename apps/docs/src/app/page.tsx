import { EvaText } from "@eva-cn/registry/eva-text"
import Link from "next/link"

export default function Home() {
  return (
    <main className="page-shell">
      <EvaText as="p" className="eyebrow" tracking="wide" variant="data">
        EVA-CN / SHADCN REGISTRY / INITIAL RELEASE
      </EvaText>
      <EvaText as="h1" className="doc-heading" horizontalScale={0.72} tracking="tight" variant="title">
        TYPE IS THE INTERFACE.
      </EvaText>

      <div className="registry-grid">
        <Link className="registry-link" href="/components/eva-theme">
          <EvaText as="span" className="registry-link-index" tracking="wide" variant="data">
            ITEM 01 / REGISTRY:THEME
          </EvaText>
          <EvaText as="h2" horizontalScale={0.8} tracking="tight" variant="interface" uppercase>
            EVA-THEME
          </EvaText>
          <EvaText as="p" variant="interface">
            Color, typography, radius, and semantic tokens. Install this first or let Eva Text pull it in.
          </EvaText>
          <EvaText as="span" className="registry-link-arrow" tracking="wide" variant="data">OPEN ITEM →</EvaText>
        </Link>
        <Link className="registry-link" href="/components/eva-text">
          <EvaText as="span" className="registry-link-index" tracking="wide" variant="data">
            ITEM 02 / REGISTRY:UI
          </EvaText>
          <EvaText as="h2" horizontalScale={0.8} tracking="tight" variant="interface" uppercase>
            EVA-TEXT
          </EvaText>
          <EvaText as="p" variant="interface">
            English and Japanese type roles with explicit tracking and horizontal display scaling.
          </EvaText>
          <EvaText as="span" className="registry-link-arrow" tracking="wide" variant="data">OPEN LAB →</EvaText>
        </Link>
      </div>
    </main>
  )
}
