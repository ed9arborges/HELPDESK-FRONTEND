import * as React from "react"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router"
import { NavigationMenuSection } from "../../components/layouts/NavigationMenuSection"
import { AuthProvider } from "../../contexts/AuthContext"

// Mock the useAuth hook
jest.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    session: {
      user: {
        role: "customer",
        name: "Test User",
        email: "test@example.com",
        avatarImg: "test-avatar.png",
      },
    },
    signOut: jest.fn(),
  }),
}))

// Mock the icons
jest.mock("@assets/icons/clipboard-list.svg?react", () => () => (
  <svg data-testid="icon-clipboard" />
))
jest.mock("@assets/icons/briefcase-business.svg?react", () => () => (
  <svg data-testid="icon-customers" />
))
jest.mock("@assets/icons/wrench.svg?react", () => () => (
  <svg data-testid="icon-services" />
))
jest.mock("@assets/icons/users.svg?react", () => () => (
  <svg data-testid="icon-techs" />
))
jest.mock("@assets/icons/plus.svg?react", () => () => (
  <svg data-testid="icon-add" />
))
jest.mock("../assets/icons/menu.svg?react", () => () => (
  <svg data-testid="icon-menu" />
))
jest.mock("../assets/icons/x.svg?react", () => () => (
  <svg data-testid="icon-x" />
))

// Setup wrapper component
const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  )
}

describe("NavigationMenuSection", () => {
  it("renders correctly for customer role", () => {
    renderWithProviders(<NavigationMenuSection />)

    // Check if customer navigation items are rendered
    expect(screen.getByText("My Requests")).toBeInTheDocument()
    expect(screen.getByText("New Request")).toBeInTheDocument()
  })
})
