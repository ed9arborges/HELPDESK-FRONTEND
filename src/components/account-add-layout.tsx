import InputText from "../core-components/input"

import {Button} from "../core-components/button"
import AuthSectionContainer from "./auth-section-container"

export function AccountAddLayout() {
  return (
    <AuthSectionContainer title="Create Account" description="Create an account now!" className="w-full md:max-w-[25rem] flex flex-col mt-8 ">
      <form className="">
        <Button variant="secondary" className="w-full" >
          Create Account
        </Button>
      </form>
    </AuthSectionContainer>
  )
}
