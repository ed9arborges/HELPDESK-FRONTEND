import InputText from "./input"

import Button from "./button"
import AuthSectionContainer from "./auth-section-container"

export function SignInLayout() {
  return (
    <AuthSectionContainer title="Portal Access" description="Log in to access your account." className="w-full md:max-w-[25rem] flex flex-col mt-8 ">
      <form className="">
        <InputText label="Email" type="email" className="mb-4" />
        <InputText label="Password" type="password" />
        <Button variant="primary" className="mt-10 w-full">
          Sign In
        </Button>
      </form>
    </AuthSectionContainer>
  )
}
