import { Routes, Route } from "react-router"
import { AuthLayout } from "@/components/layouts/authentication-layouts/auth-layout"
import { PageLogin } from "@/pages/page-login"
import { PageSignUp } from "@/pages/page-signup"

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<PageLogin />} />
        <Route path="/signup" element={<PageSignUp />} />
      </Route>
    </Routes>
  )
}
