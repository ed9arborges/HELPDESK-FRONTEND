import MainContent from "@core-components/main-content"
import { CustomerDashboardLayout } from "@layouts/customer-layouts/customer-dashboard-layout"

export function PageCustomerDashboard() {
  return (
    <MainContent>
      <MainContent.Header>My Tickets</MainContent.Header>
      <CustomerDashboardLayout />
    </MainContent>
  )
}
