import { useEffect, useMemo, useState } from "react"
import { api } from "@/services/api"

export type ServiceItem = { id: string; name: string; amount: number }

type ServicesResponse = { services: ServiceItem[] }

export function useServicesCatalog() {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function fetchServices() {
      try {
        setLoading(true)
        const { data } = await api.get<ServicesResponse>("/services")
        if (!mounted) return
        setServices(data.services ?? [])
      } catch (e: any) {
        if (!mounted) return
        setError(e?.message ?? "Failed to load services")
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    }
    fetchServices()
    return () => {
      mounted = false
    }
  }, [])

  const byId = useMemo(() => {
    const map = new Map<string, ServiceItem>()
    for (const s of services) map.set(s.id, s)
    return map
  }, [services])

  return { services, byId, loading, error }
}
