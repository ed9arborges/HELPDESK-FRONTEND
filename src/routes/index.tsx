import { BrowserRouter, Route } from "react-router";



import  AuthRoutes  from "./auth-routes";
import CustomerRoutes  from "./customer-routes";


export function Routes() {
 
const session = {
  user: {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "customer",
  },
}
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