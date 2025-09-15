import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"
import { api } from "@/services/api"

import SectionContainer from "@components/section-container"
import Text from "@core-components/text"
import InputText from "@core-components/input"
import InputSelect from "@core-components/input-select"
import { Button } from "@core-components/button"
import { formatCurrency } from "@utils/format-currency"

import MainContent from "@core-components/main-content"

const ticketSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  serviceId: z.string().min(1, { message: "Please select a service" }),
  // estimate is optional and parsed from string to number
  estimate: z
    .string()
    .optional()
    .transform((v) =>
      v ? Number(v.replace(/\./g, "").replace(",", ".")) : undefined
    ),
})

export function PageTicketCreate() {
  const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [estimate, setEstimate] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [catalog, setCatalog] = useState<
      Array<{ id: string; name: string; amount: number }>
    >([])
    const [serviceId, setServiceId] = useState("")
  
    const navigate = useNavigate()
    const params = useParams<{ id: string }>()
  
    async function onSubmit(e: React.FormEvent) {
      e.preventDefault()
  
      //if (params.id) return navigate(-1)
  
      try {
        setIsLoading(true)
  
    const data = ticketSchema.parse({ title, description, estimate, serviceId })
  
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
    async function fetchCatalog() {
      try {
        const { data } = await api.get<{
          services: { id: string; name: string; amount: number }[]
        }>("/services")
        setCatalog(data.services)
      } catch (error) {
        console.log(error)
      }
    }
    async function fetchRequest(id: string) {
      try {
        const { data } = await api.get<TicketAPIResponse>(`/tickets/${id}`)
  
    setTitle(data.title)
        setEstimate(String(data.estimate))
      } catch (error) {
        console.log(error)
  
        if (error instanceof AxiosError) {
          return alert(error.response?.data.message)
        }
      }
    }
  
    useEffect(() => {
      fetchCatalog()
      if (params.id) {
        fetchRequest(params.id)
      }
    }, [params.id])
  
    const serviceItems = [
      { value: "", label: "Select a service" },
      ...catalog.map((s) => ({
        value: s.id,
        label: `${s.name} - ${formatCurrency(s.amount)}`,
      })),
    ]
    const selectedServiceName = catalog.find((c) => c.id === serviceId)?.name

  return (
    <MainContent className="w-full md:max-w-[800px] px-4 md:px-12">
      <MainContent.Header backNav>Create Ticket</MainContent.Header>
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
                  value={serviceId}
                  items={serviceItems}
                  onChange={(e) => {
                    const id = e.target.value
                    setServiceId(id)
                    const sel = catalog.find((c) => c.id === id)
                    if (sel) setEstimate(String(sel.amount).replace(".", ","))
                  }}
                  className="mb-2 mt-2 self-end"
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
                    {selectedServiceName || "-"}
                  </Text>
                </div>
                <div>
                  <Text as="h3" variant="text-xs" className=" text-gray-400">
                    Initial Cost
                  </Text>
                  <Text variant="text-lg-bold" className="text-gray-200">
                    {formatCurrency(Number(estimate || 0))}
                  </Text>
                </div>
                <Text as="span" variant="text-xs" className=" text-gray-400">
                  The ticket will be automatically assigned to an available technician
                </Text>
                <Button type="submit" disabled={isLoading}>
                  Create Ticket
                </Button>
              </div>
            </SectionContainer>
          </form>
    </MainContent>
  )
}
