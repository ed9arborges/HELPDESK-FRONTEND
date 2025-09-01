import { AccountAddLayout } from "../components/account-add-layout"
import { SignInLayout } from "../layouts/authentication-layouts/signin-layout"

export function PageLogin() {
  return (
    <>
      <SignInLayout />
      <AccountAddLayout />
    </>
  )
}
