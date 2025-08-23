import { Outlet } from "react-router"
import HeadLogo from "../../core-components/head-logo"
import Footer from "../../core-components/footer"

import { PerfilDesktop } from "../PerfilDesktop"
import { NavigationMenuSection } from "../../components/NavigationMenuSection"

export function CustomerLayout() {
  return (
    <>
    
    <div className="bg-gray-100 w-screen h-screen fixed flex flex-col md:flex-row text-gray-100 md:p-0">
      {/* Mobile: logo on top, hidden on md and up */}
     
      <div className="flex md:hidden justify-center pt-3">
        <HeadLogo />
      </div>
      {/* Left section for header, only on md and up */}
      <aside className="hidden md:flex flex-col items-center justify-start w-50 h-full pt-3">
        <NavigationMenuSection />
      </aside>
      {/* Right section for main content */}
      <main className="flex flex-col items-center h-full bg-gray-600 p-6 rounded-xl md:rounded-tl-xl md:rounded-br-none md:rounded-tr-none md:rounded-bl-none md:self-end md:relative md:top-3 w-full md:w-[calc(100vw-12.5rem)]">
        <Outlet />
        
        <Footer />
      </main>
      
    </div>
     <PerfilDesktop />
    </>
  )
}
