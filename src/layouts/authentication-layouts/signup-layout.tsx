import { useState } from "react"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"
import { useNavigate } from "react-router"

import InputText from "@core-components/input"
import { Button } from "@core-components/button"
import AuthSectionContainer from "@components/auth-section-container"
import { api } from "@/services/api"

const signUpSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })

export function SignUpLayout() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Now you can access the form data from state
    console.log("Sign Up submitted:", { email, password, name })
    
    try {
      setIsLoading(true)

      const data = signUpSchema.parse({
        name,
        email,
        password,
      })

      await api.post("/users", data)
      if (confirm("User created successfully! Do you want to login now?")) {
        navigate("/")
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return alert(error.issues[0].message)
      }
      if (error instanceof AxiosError) {        
          return alert(error.response?.data.message)        
      }
      alert("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <AuthSectionContainer
      title="Create Account"
      description="Need to create an account, to have access!"
      className="w-full md:max-w-[25rem] flex flex-col mt-8 "
    >
      <form className="" onSubmit={handleSubmit}>
        <InputText
          label="Name"
          type="text"          
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
        />
        <InputText
          label="Email"
          type="email"          
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <InputText
          label="Password"
          type="password"          
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={isLoading} type="submit" variant="primary" className="mt-10 w-full">
          Sign Up
        </Button>
      </form>
    </AuthSectionContainer>
  )
}
