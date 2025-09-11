import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { AxiosError } from "axios"

import { MainContentHeader } from "@/components/main-content-header"
import SectionContainer from "@/components/section-container"

import Input from "@/core-components/input"
import InputSelect from "@/core-components/input-select"
import { Button } from "@/core-components/button"
import Text from "@/core-components/text"

import { api } from "@/services/api"
import { useAuth } from "@/hooks/useAuth"

const statusItems = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In progress" },
  { value: "closed", label: "Closed" },
]

const categoryItems = [
  { value: "hardware", label: "Hardware" },
  { value: "data", label: "Data" },
  { value: "software", label: "Software" },
  { value: "web", label: "Web" },
  { value: "network", label: "Network" },
  { value: "virus", label: "Virus" },
  { value: "peripherals", label: "Peripherals" },
  { value: "systems", label: "Systems" },
]

export function PageTechTicket() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { session } = useAuth()
  const role = session?.user.role
  const isAdmin = role === "admin"
  const isTech = role === "tech"

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "hardware",
    status: "open",
    estimate: 0,
  })
  const [techId, setTechId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [assigning, setAssigning] = useState(false)

  useEffect(() => {
    async function load() {
      if (!id) return
      try {
        setIsLoading(true)
        const { data } = await api.get<TicketAPIResponse>(`/tickets/${id}`)
        setForm({
          title: data.title,
          description: data.description || "",
          category: data.category,
          status: data.status,
          estimate: data.estimate,
        })
        setTechId((data as any).tech?.id ?? null)
      } catch (error) {
        console.log(error)
        if (error instanceof AxiosError) {
          alert(error.response?.data.message)
        } else {
          alert("Failed to load ticket")
        }
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [id])

  async function handleSave() {
    if (!id || !isAdmin) return
    try {
      setSaving(true)
      await api.patch(`/tickets/${id}`, {
        ...form,
        estimate: Number(form.estimate) || 0,
        techId, // admin can set/unset
      } as TechTicketUpdate)
      alert("Ticket updated")
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        return alert(error.response?.data.message)
      alert("Failed to update ticket")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!id || !isAdmin) return
    if (!confirm("Delete this ticket?")) return
    try {
      setDeleting(true)
      await api.delete(`/tickets/${id}`)
      navigate("/")
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        return alert(error.response?.data.message)
      alert("Failed to delete ticket")
    } finally {
      setDeleting(false)
    }
  }

  async function handleAssignSelf() {
    if (!id || !isTech) return
    try {
      setAssigning(true)
      const { data } = await api.post(`/tickets/${id}/assign-self`)
      setTechId(data.ticket.tech?.id ?? null)
      alert("You are now assigned to this ticket")
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        return alert(error.response?.data.message)
      alert("Failed to assign")
    } finally {
      setAssigning(false)
    }
  }

  if (isLoading) {
    return (
      <section className="flex flex-col items-start gap-6 pt-[52px] pb-12 px-6 relative bg-gray-600 w-full md:max-w-[50rem] md:mx-auto">
        <MainContentHeader backNav>Ticket</MainContentHeader>
        <SectionContainer variant="large">
          <Text variant="text-sm" className="text-gray-300">
            Loading...
          </Text>
        </SectionContainer>
      </section>
    )
  }

  const canEdit = isAdmin

  return (
    <section className="flex flex-col items-start gap-6 pt-[52px] pb-12 px-6 relative bg-gray-600 w-full md:max-w-[50rem] md:mx-auto">
      <MainContentHeader backNav>Ticket</MainContentHeader>
      <SectionContainer variant="large">
        <div className="flex flex-col gap-4">
          <Input
            label="Title"
            value={form.title}
            disabled={!canEdit}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <Input
            label="Description"
            value={form.description}
            disabled={!canEdit}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
          />
          <InputSelect
            label="Category"
            items={categoryItems}
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value }))
            }
            disabled={!canEdit}
          />
          <InputSelect
            label="Status"
            items={statusItems}
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            disabled={!canEdit}
          />
          <Input
            label="Estimate"
            type="number"
            value={String(form.estimate)}
            disabled={!canEdit}
            onChange={(e) =>
              setForm((f) => ({ ...f, estimate: Number(e.target.value) }))
            }
          />
        </div>

        <div className="flex gap-3 mt-6">
          {isAdmin && (
            <>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={handleDelete}
                variant="primary"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </>
          )}
          {isTech && (
            <Button onClick={handleAssignSelf} disabled={assigning}>
              {assigning
                ? "Assigning..."
                : techId
                ? "Reassign to me"
                : "Assign to me"}
            </Button>
          )}
        </div>
      </SectionContainer>
    </section>
  )
}
