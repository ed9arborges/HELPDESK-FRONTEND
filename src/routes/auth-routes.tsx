import { Routes, Route } from "react-router"
import LayoutMain from "../pages/layout-main"
import PageComponents from "../pages/page-components"
import { AuthLayout } from "../layouts/authentication-layouts/auth-layout"
import { PageLogin } from "../pages/page-login"

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<PageLogin />} />
      </Route>

      <Route element={<LayoutMain />}>
        <Route index element={<AuthLayout />} />
        <Route path="/components" element={<PageComponents />} />
      </Route>
    </Routes>
  )
}
