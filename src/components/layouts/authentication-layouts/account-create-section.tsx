import { useNavigate } from "react-router"

import { Button } from "@/components/core/button"
import {AuthSectionContainer} from "@layouts/auth-section-container"

export function SectionAccountCreate() {
  const navigate = useNavigate()
  function onClick() {
    navigate("/signup")
  }
  return (
    <AuthSectionContainer
      title="Create Account"
      description="Create an account now!"
      className="w-full md:max-w-[25rem] flex flex-col mt-8 "
    >
      <Button variant="secondary" className="w-full" onClick={onClick}>
        Create Account
      </Button>
    </AuthSectionContainer>
  )
}
