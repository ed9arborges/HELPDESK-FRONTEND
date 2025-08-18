import { Routes, Route } from "react-router"
import LayoutMain from "../pages/layout-main"
import PageHome from "../pages/page-home"
import PageComponents from "../pages/page-components"
import { AuthLayout } from "../components/auth-layout"
import { SignIn } from "../pages/sign-in"

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<AuthLayout />}>
        <Route path="/signin" element={<SignIn />} />
      </Route>

      <Route element={<LayoutMain />}>
        <Route index element={<PageHome />} />
        <Route path="/components" element={<PageComponents />} />
      </Route>
    </Routes>
  )
}
