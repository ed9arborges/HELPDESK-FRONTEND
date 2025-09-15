import React from "react"

import { cx } from "class-variance-authority"
import { MainContentHeader } from "@components/main-content-header"

interface MainContentProps extends React.ComponentProps<"main"> {}

function MainContent({ children, className, ...props }: MainContentProps) {
  return (
    <main className={cx("mt-4 md:mt-8", className)} {...props}>
      {children}
    </main>
  )
}

// Attach header as a static subcomponent for ergonomic API: <MainContent.Header />
MainContent.Header = MainContentHeader

export default MainContent
