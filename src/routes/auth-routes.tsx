import { Routes, Route } from "react-router"
import LayoutMain from "../pages/layout-main"
import PageHome from "../pages/page-home"
import PageComponents from "../pages/page-components"
import { AuthLayout } from "../layouts/authentication-layouts/auth-layout"
import { PageLogin } from "../pages/page-login"

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<AuthLayout />}>
        <Route path="/signin" element={<PageLogin />} />
      </Route>

      <Route element={<LayoutMain />}>
        <Route index element={<PageHome />} />
        <Route path="/components" element={<PageComponents />} />
      </Route>
    </Routes>
  )
}
