import { SectionAccountCreate } from "@/components/layouts/authentication-layouts/account-create-section"
import { SignInLayout } from "@/components/layouts/authentication-layouts/signin-layout"

export function PageLogin() {
  return (
    <>
      <SignInLayout />
      <SectionAccountCreate />
    </>
  )
}
