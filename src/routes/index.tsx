import { BrowserRouter, Route } from "react-router"
import { useAuth } from "@/hooks/useAuth"

import AuthRoutes from "./auth-routes"
import CustomerRoutes from "./customer-routes"

export function Routes() {
  const { session } = useAuth()
  
  const RoutesSelect = () => {
    switch (session?.user.role) {
      case "customer":
        return <CustomerRoutes />
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
