import { Routes, Route } from "react-router"
import { TechLayout } from "@/components/layouts/tech-layouts/tech-layout"

import { PageTechDashboard } from "@pages/tech-pages/page-tech-dashboard.tsx"
import { PageTechTicket } from "@pages/tech-pages/page-tech-ticket.tsx"

export default function TechRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TechLayout />}>
        <Route index element={<PageTechDashboard />} />
        <Route path="/tickets/:id" element={<PageTechTicket />} />
      </Route>
    </Routes>
  )
}
