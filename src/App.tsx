import { useEffect } from "react"
import { AuthProvider } from "./contexts/AuthContext"
import { Routes } from "./routes"
import { api } from "./services/api"

function App() {
  useEffect(() => {
    let cancelled = false

    async function checkApi() {
      try {
        // A simple ping to verify the API is reachable
        await api.get("/")
      } catch (err: any) {
        if (cancelled) return

        const msg =
          err?.response?.data?.message || err?.message || "Unknown error"
        alert(
          `The API is not reachable or not running. Please check the server.\n\nDetails: ${msg}`
        )
      }
    }

    void checkApi()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App
