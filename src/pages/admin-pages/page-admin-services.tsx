import React from "react"
import Text from "@/core-components/text"
import { Button } from "@/core-components/button"
import InputText from "@/core-components/input"
import IconPlus from "@/assets/icons/plus.svg?react"
import IconPen from "@/assets/icons/pen-line.svg?react"
import IconX from "@/assets/icons/x.svg?react"
import { formatCurrency } from "@/utils/format-currency"
import { api } from "@/services/api"

type Service = {
  id: string
  name: string
  amount: number
}

type FormState = {
  title: string
  value: string // masked like 180,00
}

export function PageAdminServices() {
  const [services, setServices] = React.useState<Service[]>([])

  const [isOpen, setIsOpen] = React.useState(false)
  const [mode, setMode] = React.useState<"create" | "edit">("create")
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<FormState>({ title: "", value: "" })
  const [errors, setErrors] = React.useState<{
    title?: string
    value?: string
  }>({})

  // helpers
  const openCreate = () => {
    setMode("create")
    setEditingId(null)
    setForm({ title: "", value: "" })
    setErrors({})
    setIsOpen(true)
  }
  const openEdit = (item: Service) => {
    setMode("edit")
    setEditingId(item.id)
    setForm({
      title: item.name,
      value: centsToMasked(Math.round(item.amount * 100)),
    })
    setErrors({})
    setIsOpen(true)
  }
  const closeModal = () => setIsOpen(false)

  // value mask: allow digits, auto comma two decimals
  function maskCurrencyBRL(input: string): string {
    const digits = input.replace(/\D/g, "")
    const padded = digits.replace(/^0+(\d)/, "$1")
    const int = padded.length === 0 ? "0" : padded
    const cents = int.padStart(3, "0")
    const v = `${cents.slice(0, -2)},${cents.slice(-2)}`
    // remove leading zeros from reais part
    return v.replace(/^0+(\d)/, "$1")
  }

  function maskedToCents(masked: string): number | null {
    if (!masked) return null
    const norm = masked.replace(/\./g, "").replace(/,/g, ".")
    const n = Number(norm)
    if (Number.isNaN(n)) return null
    return Math.round(n * 100)
  }

  function centsToMasked(cents: number): string {
    const v = (cents / 100).toFixed(2)
    return v.replace(".", ",")
  }

  function validate(f: FormState) {
    const e: { title?: string; value?: string } = {}
    if (!f.title.trim()) e.title = "Informe o título"
    const cents = maskedToCents(f.value)
    if (cents === null || cents <= 0) e.value = "Informe um valor válido"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate(form)) return
    const price = maskedToCents(form.value)!
    if (mode === "create") {
      // create catalog service (isBasic=true) via API
      api
        .post<{ message: string; service: Service }>("/services", {
          name: form.title.trim(),
          amount: price / 100,
        })
        .then(({ data }) => {
          setServices((prev) => [data.service, ...prev])
          closeModal()
        })
    } else if (mode === "edit" && editingId) {
      api
        .patch<{ message: string; service: Service }>(
          `/services/${editingId}`,
          {
            name: form.title.trim(),
            amount: price / 100,
          }
        )
        .then(({ data }) => {
          setServices((prev) =>
            prev.map((s) => (s.id === editingId ? data.service : s))
          )
          closeModal()
        })
    }
  }

  React.useEffect(() => {
    // load catalog services
    api
      .get<{ services: Service[] }>("/services")
      .then(({ data }) => setServices(data.services))
      .catch((err) => console.log(err))
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal()
    }
    if (isOpen) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen])

  return (
    <section className="flex flex-col gap-6 pt-[52px] pb-12 px-6 w-full">
      <header className="flex items-center gap-3 w-full">
        <Text as="h2" variant="text-xl-bold" className="text-blue-dark">
          Serviços
        </Text>
        <Button onClick={openCreate} icon={IconPlus}>
          Novo
        </Button>
      </header>

      {/* table */}
      <section
        className="flex flex-col rounded-[10px] overflow-hidden border border-gray-500"
        role="region"
        aria-label="Lista de serviços"
      >
        <div className="flex h-12 items-center border-b border-gray-500">
          <div className="flex items-center gap-2 px-3 flex-1">
            <Text variant="text-sm" className="text-gray-400">
              Título
            </Text>
          </div>
          <div className="flex items-center gap-2 px-3 w-[328px]">
            <Text variant="text-sm" className="text-gray-400">
              Valor
            </Text>
          </div>
          <div className="w-[52px]" aria-hidden />
        </div>

        {services.map((s) => (
          <div
            key={s.id}
            className="flex h-16 items-center border-b border-gray-500 last:border-b-0"
          >
            <div className="flex items-center gap-2 px-3 flex-1">
              <Text variant="text-sm" className="text-gray-200 truncate">
                {s.name}
              </Text>
            </div>
            <div className="flex items-center gap-2 px-3 w-[328px]">
              <Text variant="text-sm" className="text-gray-200">
                {formatCurrency(s.amount)}
              </Text>
            </div>
            <div className="w-[52px] flex items-center justify-center px-3">
              <button
                type="button"
                onClick={() => openEdit(s)}
                aria-label={`Editar ${s.name}`}
                className="w-7 h-7 flex items-center justify-center bg-gray-500 hover:bg-gray-400 rounded-[5px]"
              >
                <IconPen className="w-3.5 h-3.5 fill-gray-200" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-20"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onMouseDown={(e) => {
            if (e.currentTarget === e.target) closeModal()
          }}
        >
          <div className="flex flex-col w-[440px] bg-gray-600 rounded-[10px] overflow-hidden border border-gray-500">
            <header className="flex items-center gap-3 p-5">
              <h3 id="modal-title" className="m-0 p-0">
                <Text as="span" variant="text-md" className="text-gray-200">
                  {mode === "create" ? "Cadastro de serviço" : "Editar serviço"}
                </Text>
              </h3>
              <button
                type="button"
                className="ml-auto w-6 h-6 flex items-center justify-center rounded hover:bg-gray-500"
                aria-label="Fechar modal"
                onClick={closeModal}
              >
                <IconX className="w-4.5 h-4.5 fill-gray-300" />
              </button>
            </header>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 px-7 pb-8 pt-7 border-y border-gray-500"
            >
              <div className="flex flex-col gap-4">
                <InputText
                  label="TÍTULO"
                  placeholder="Nome do serviço"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  error={!!errors.title}
                  helperText={errors.title}
                />

                <div>
                  <Text variant="text-xxs" className="text-gray-300 block">
                    VALOR
                  </Text>
                  <div className="flex items-center gap-2 border-b border-gray-200 focus-within:border-pink-base h-10">
                    <Text variant="text-md" className="text-gray-100">
                      R$
                    </Text>
                    <input
                      inputMode="decimal"
                      aria-describedby="value-error"
                      className="flex-1 bg-transparent outline-none text-md text-gray-200"
                      placeholder="0,00"
                      value={form.value}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          value: maskCurrencyBRL(e.target.value),
                        }))
                      }
                    />
                  </div>
                  {errors.value && (
                    <span id="value-error">
                      <Text
                        variant="text-xs"
                        className="text-feedback-danger italic"
                      >
                        {errors.value}
                      </Text>
                    </span>
                  )}
                </div>
              </div>
            </form>

            <footer className="flex items-center justify-center gap-2 p-7">
              <Button
                type="submit"
                onClick={
                  handleSubmit as unknown as React.MouseEventHandler<HTMLButtonElement>
                }
                className="flex-1"
              >
                Salvar
              </Button>
            </footer>
          </div>
        </div>
      )}
    </section>
  )
}
