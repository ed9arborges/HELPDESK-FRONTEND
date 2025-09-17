declare module "*.svg?react" {
  import * as React from "react"
  const ReactComponent: React.FC<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
  export default ReactComponent
}

declare module "*.svg" {
  const src: string
  export default src
}

// Also allow imports that include query-like suffixes (fallback)
declare module "*?react" {
  import * as React from "react"
  const ReactComponent: React.FC<any>
  export default ReactComponent
}

// Specific declarations for the @assets alias used in imports like:
// import Icon from "@assets/icons/clipboard-list.svg?react"
declare module "@assets/*?react" {
  import * as React from "react"
  const ReactComponent: React.FC<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
  export default ReactComponent
}

declare module "@assets/*" {
  const src: string
  export default src
}
