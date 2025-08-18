import { Outlet } from "react-router"
import HeadLogo from "../core-components/head-logo"
import MainContent from "../core-components/main-content"
import Footer from "../core-components/footer"
import LoginBackground from "../assets/Login_Background.png"

export function AuthLayout() {
  return (
    <div
      className="bg-login w-screen h-screen flex flex-col md:flex-row justify-center md:justify-end items-center text-gray-100 p-8 bg-cover bg-center md:p-0"
    >
      <div className="flex flex-col items-center w-full md:max-w-[680px]">
      <MainContent className="bg-gray-600 p-8 md:pt-12 rounded-[1.25rem] md:rounded-r-none md:rounded-b-none flex items-center flex-col w-full">
        <HeadLogo />
        <Outlet />
      </MainContent>
      <Footer />
      </div>
    </div>
  )
}
