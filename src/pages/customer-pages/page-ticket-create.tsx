import MainContent from "@core-components/main-content"
import { TicketCreate } from "@/layouts/customer-layouts/ticket-create"

export function PageRequestCreate() {
  return (
    <MainContent className="w-full md:max-w-[800px] px-4 md:px-12">
      <MainContent.Header backNav>Create Ticket</MainContent.Header>
      <TicketCreate />
    </MainContent>
  )
}
