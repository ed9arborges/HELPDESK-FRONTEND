import { NavLink, Outlet } from "react-router"
import Text from "./text"

export default function Footer() {
  return (
    <footer className="my-5 md:my-10">
      <nav className="flex items-center justify-center gap-4">
        <NavLink to="/">
          <Text variant="text-sm-bold" className="text-gray-300">
            Main
          </Text>
        </NavLink>
        <NavLink to="/Dashboard">
          <Text variant="text-sm-bold" className="text-gray-300">
            Dashboard
          </Text>
        </NavLink>
        <NavLink to="/signin">
          <Text variant="text-sm-bold" className="text-gray-300">
            Sign In
          </Text>
        </NavLink>
      </nav>
    </footer>
  )
}
