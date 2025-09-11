import { MainContentHeader } from "@components/main-content-header"
import { TicketDetailsContent } from "@/layouts/customer-layouts/ticket-details-content"

export function PageCustomerRequest() {
  return (
    <section className="flex flex-col items-start gap-6 pt-[52px] pb-12 px-6 relative bg-gray-600 w-full md:max-w-[50rem] md:mx-auto">
  <MainContentHeader backNav>Ticket Details</MainContentHeader>
  <TicketDetailsContent />
    </section>
  )
}
