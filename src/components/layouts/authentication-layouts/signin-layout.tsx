import { useActionState } from "react"
import { useNavigate } from "react-router"
import { ZodError, z } from "zod"

import InputText from "@components/core/input"
import { Button } from "@components/core/button"
import { AuthSectionContainer } from "@layouts/auth-section-container"
import { useAuth } from "@hooks/useAuth"

import { api } from "@services/api"
import { AxiosError } from "axios"

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
})

export function SignInLayout() {
  const [, formAction] = useActionState(signIn, null)
  const auth = useAuth()
  const navigate = useNavigate()

  async function signIn(_: any, formData: FormData) {
    try {
      const data = signInSchema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      })
      const response = await api.post("/sessions", data)
      auth.save(response.data)
      navigate("/") // Navigate to the home page after successful login
      return response.data
    } catch (error) {
      if (error instanceof ZodError) {
        return { message: error.issues[0].message }
      }
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          return { message: error.response.data.message }
        }
      }
      return { message: "Something went wrong. Please try again." }
    }
  }

  return (
    <AuthSectionContainer
      title="Portal Access"
      description="Log in to access your account."
      className="w-full md:max-w-[25rem] flex flex-col mt-8 "
    >
      <form action={formAction}>
        <InputText name="email" label="Email" type="email" className="mb-4" />
        <InputText name="password" label="Password" type="password" />
        <Button type="submit" variant="primary" className="mt-10 w-full">
          Sign In
        </Button>
      </form>
    </AuthSectionContainer>
  )
}
