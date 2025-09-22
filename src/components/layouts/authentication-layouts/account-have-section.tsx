import { useNavigate } from "react-router"

import { Button } from "@core-components/button"
import {AuthSectionContainer} from "@layouts/auth-section-container"

export function SectionAccountHave() {
  const navigate = useNavigate()
  function onClick() {
    navigate("/")
  }
  return (
    <AuthSectionContainer
      title="Already have an Account?"
      description="Signin now!"
      className="w-full md:max-w-[25rem] flex flex-col mt-8 "
    >
      <Button variant="secondary" className="w-full" onClick={onClick}>
        Sign In
      </Button>
    </AuthSectionContainer>
  )
}
