import { BrowserRouter } from "react-router"
import { useAuth } from "@/hooks/useAuth"

import AuthRoutes from "./auth-routes"
import CustomerRoutes from "./customer-routes"
import TechRoutes from "./tech-routes"
import AdminRoutes from "./admin-routes"

export function Routes() {
  const { session } = useAuth()

  const RoutesSelect = () => {
    switch (session?.user.role) {
      case "customer":
        return <CustomerRoutes />
      case "tech":
        return <TechRoutes />
      case "admin":
        return <AdminRoutes />
      default:
        return <AuthRoutes />
    }
  }

  return (
    <BrowserRouter>
      <RoutesSelect />
    </BrowserRouter>
  )
}
