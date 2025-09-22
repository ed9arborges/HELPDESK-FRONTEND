import { Routes, Route } from "react-router"
import { CustomerLayout } from "@/components/layouts/customer-layouts/customer-layout"

import { PageCustomerDashboard } from "@pages/customer-pages/page-customer-dashboard"
import { PageCustomerRequest } from "@pages/customer-pages/page-customer-ticket"
import { PageTicketCreate } from "@pages/customer-pages/page-ticket-create"

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<PageCustomerDashboard />} />
        <Route path="/tickets/:id" element={<PageCustomerRequest />} />
        <Route path="/tickets/create" element={<PageTicketCreate />} />
      </Route>
    </Routes>
  )
}
