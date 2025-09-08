import { Outlet } from "react-router"
import HeadLogo from "@/core-components/head-logo"

export function AuthLayout() {
  return (
    <div className="bg-login w-screen h-screen fixed flex flex-col justify-center items-center md:justify-end text-gray-100 bg-cover bg-center md:p-0">
      <main className="flex flex-col items-center w-full md:max-w-[680px] bg-gray-600 p-6 rounded-[1.25rem] md:rounded-tl-[1.25rem] md:rounded-tr-none md:rounded-bl-none md:rounded-br-none md:self-end">
        <HeadLogo />
        <Outlet />        
      </main>
    </div>
  )
}
