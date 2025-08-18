
import { Routes, Route } from "react-router";
import LayoutMain from "../pages/layout-main";
import PageHome from "../pages/page-home";
import PageComponents from "../pages/page-components";

export default function AuthRoutes() {
  return (
    
      <Routes>
        <Route element={<LayoutMain />}>
          <Route index element={<PageHome />} />
          <Route path="/components" element={<PageComponents />} />
        </Route>
      </Routes>
     
  )
}