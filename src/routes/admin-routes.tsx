import { Routes, Route } from "react-router"
import { TechLayout } from "@layouts/tech-layouts/tech-layout.tsx"

import { PageTechDashboard } from "@pages/tech-pages/page-tech-dashboard.tsx"
import { PageTechTicket } from "@pages/tech-pages/page-tech-ticket.tsx"
import { PageAdminUsers } from "@pages/admin-pages/page-admin-users"
import { PageAdminTechs } from "@pages/admin-pages/page-admin-techs"
import { PageAdminServices } from "@pages/admin-pages/page-admin-services"

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TechLayout />}>
        <Route index element={<PageTechDashboard />} />
        <Route path="/tickets/:id" element={<PageTechTicket />} />
        <Route path="/admin/users" element={<PageAdminUsers />} />
        <Route path="/admin/techs" element={<PageAdminTechs />} />
        <Route path="/admin/services" element={<PageAdminServices />} />
      </Route>
    </Routes>
  )
}
