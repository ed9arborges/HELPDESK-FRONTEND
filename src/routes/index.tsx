import { BrowserRouter, Route } from "react-router";



import  AuthRoutes  from "./auth-routes";
import CustomerRoutes  from "./customer-routes";


export function Routes() {
  

  return (
    <BrowserRouter>
     
      <CustomerRoutes />
    </BrowserRouter> 
  )
}