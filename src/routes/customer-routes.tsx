import { Routes, Route } from "react-router"
import { CustomerLayout } from "@layouts/customer-layouts/customer-layout"

import { PageCustomerDashboard } from "@pages/customer-pages/page-customer-dashboard"
import { PageCustomerRequest } from "@/pages/customer-pages/page-customer-ticket"
import { PageRequestCreate } from "@/pages/customer-pages/page-ticket-create"

export default function CustomerRoutes() {
  return (
    <Routes>    
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<PageCustomerDashboard />} />
  <Route path="/tickets" element={<PageCustomerRequest />} />
  <Route path="/tickets/create" element={<PageRequestCreate />} />
      </Route>
    </Routes>
  )
}
