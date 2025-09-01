import { Routes, Route } from "react-router"
import { CustomerLayout } from "../layouts/customer-layouts/customer-layout"
import { PageLogin } from "../pages/page-login"
import { PageCustomerDashboard } from "../pages/customer-pages/page-customer-dashboard"
import { PageCustomerRequest } from "../pages/customer-pages/page-customer-request"
import { PageRequestCreate } from "../pages/customer-pages/page-request-create"

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route path="/signin" element={<PageLogin />} />
      </Route>

      <Route path="/" element={<CustomerLayout />}>
        <Route path="/dashboard" element={<PageCustomerDashboard />} />
        <Route path="/requests" element={<PageCustomerRequest />} />
        <Route path="/requests/create" element={<PageRequestCreate />} />
      </Route>
    </Routes>
  )
}
