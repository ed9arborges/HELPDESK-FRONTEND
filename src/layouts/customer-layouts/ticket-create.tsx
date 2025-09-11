import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"
import { api } from "@/services/api"

import SectionContainer from "@components/section-container"
import IconQuestion from "@assets/icons/circle-help.svg?react"
import Tag from "@core-components/tag"
import Text from "@core-components/text"
import Avatar from "@/core-components/avatar"
import InputText from "@/core-components/input"
import InputSelect from "@/core-components/input-select"
import { Button } from "@/core-components/button"
import { formatCurrency } from "@/utils/format-currency"

/*interface TicketData {
  id: string
  title: string
  description: string
  category: CategoriesAPIEnum
  estimate: number
  status: string
  createdAt: string
  updatedAt: string
}*/

const ticketSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  category: z.enum(
    [
      "hardware",
      "data",
      "software",
      "web",
      "network",
      "virus",
      "peripherals",
      "systems",
    ],
    { message: "Invalid category" }
  ),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  
})

export function TicketCreate() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [estimate, setEstimate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState("")

  const navigate = useNavigate()
  const params = useParams<{ id: string }>()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    //if (params.id) return navigate(-1)

    try {
      setIsLoading(true)

  const data = ticketSchema.parse({
        title,
        category,
        description,
        estimate: estimate.replace(",", "."),
      })

  await api.post("/tickets", {
        ...data,
      })

      navigate("/", { state: { fromSubmit: true } })
    } catch (error) {
      console.log(error)
      if (error instanceof ZodError) {
        return alert(error.issues[0].message)
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message)
      }

  alert("Could not create ticket. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  async function fetchRequest(id: string) {
    try {
  const { data } = await api.get<TicketAPIResponse>(`/tickets/${id}`)

      setTitle(data.title)
      setCategory(data.category)
      setEstimate(formatCurrency(data.estimate))
    } catch (error) {
      console.log(error)

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message)
      }
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchRequest(params.id)
    }
  }, [params.id])

  const items = [
    { value: "", label: "Select a category" },
    { value: "hardware", label: "Hardware" },
    { value: "data", label: "Data" },
    { value: "software", label: "Software" },
    { value: "web", label: "Web" },
    { value: "network", label: "Network" },
    { value: "virus", label: "Virus" },
    { value: "peripherals", label: "Peripherals" },
    { value: "systems", label: "Systems" },
  ]

  return (
    <form onSubmit={onSubmit} className="flex flex-row gap-6 flex-wrap w-full">
      <SectionContainer
  title="Create Ticket"
        description="Please fill out the form below to create a new request."
        variant="large"
        className="flex flex-col justify-start min-h-100 w-full"
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-4">
            <InputText
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <InputText
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <InputSelect
            label="Service Category"
            value={category}
            items={items}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-2 mt-auto self-end"
          />
        </div>
      </SectionContainer>
      <SectionContainer
        title="Resume"
        description="Values and Details."
        variant="small"
      >
        <div className="flex flex-col gap-6">
          <div>
            <Text as="h3" variant="text-xs" className=" text-gray-400">
              Service Category
            </Text>
            <Text variant="text-sm" className="text-gray-200">
              {category}
            </Text>
          </div>
          <div>
            <Text as="h3" variant="text-xs" className=" text-gray-400">
              Initial Cost
            </Text>
            <Text variant="text-lg-bold" className="text-gray-200">
              {estimate}
            </Text>
          </div>
          <Text as="span" variant="text-xs" className=" text-gray-400">
            The ticket will be automatically assigned to an available
            technician
          </Text>
          <Button type="submit" disabled={isLoading}>
            Create Ticket
          </Button>
        </div>
      </SectionContainer>
    </form>
  )
}
