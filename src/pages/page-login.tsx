import { SectionAccountCreate } from "@/layouts/authentication-layouts/account-create-section"
import { SignInLayout } from "@/layouts/authentication-layouts/signin-layout"

export function PageLogin() {
  return (
    <>
      <SignInLayout />
      <SectionAccountCreate />
    </>
  )
}
