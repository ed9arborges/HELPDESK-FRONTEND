import { Routes, Route } from "react-router"

import LayoutMain from "@/pages/layout-main"
import PageComponents from "@/pages/page-components"
import { AuthLayout } from "@/layouts/authentication-layouts/auth-layout"
import { PageLogin } from "@/pages/page-login"
import { PageSignUp } from "@/pages/page-signup"

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<PageLogin />} />
        <Route path="/signup" element={<PageSignUp />} />
      </Route>

      <Route element={<LayoutMain />}>
        <Route index element={<AuthLayout />} />
        <Route path="/components" element={<PageComponents />} />
      </Route>
    </Routes>
  )
}
