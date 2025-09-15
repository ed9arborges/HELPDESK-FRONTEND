import MainContent from "@core-components/main-content"
import { TicketDetailsContent } from "@/layouts/customer-layouts/ticket-details-content"

export function PageCustomerRequest() {
  return (
    <MainContent className="w-full md:max-w-[800px] px-4 md:px-12">
      <MainContent.Header backNav>Ticket Details</MainContent.Header>
      <TicketDetailsContent />
    </MainContent>
  )
}
