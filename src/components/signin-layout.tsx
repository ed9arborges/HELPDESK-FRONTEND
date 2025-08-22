import { useState } from "react"
import InputText from "./input"

import {Button} from "./button"
import AuthSectionContainer from "./auth-section-container"

export function SignInLayout() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle sign-in logic here ##############
  }

  return (
    <AuthSectionContainer title="Portal Access" description="Log in to access your account." className="w-full md:max-w-[25rem] flex flex-col mt-8 ">
      <form className="" onSubmit={handleSubmit}>
        <InputText label="Email" type="email" className="mb-4" />
        <InputText label="Password" type="password" />
        <Button type="submit" variant="primary" className="mt-10 w-full">
          Sign In
        </Button>
      </form>
    </AuthSectionContainer>
  )
}
