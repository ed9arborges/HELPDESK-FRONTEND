import { useEffect, useState } from "react"
import Text from "@/components/core/text"
import MainContent from "@/components/core/main-content"
import Avatar from "@/components/core/avatar"
import IconPen from "@/assets/icons/pen-line.svg?react"
import IconTrash from "@/assets/icons/trash.svg?react"
import { AdminUserModal } from "@/components/layouts/admin-user-modal"
import { ConfirmModal } from "@/components/layouts/confirm-modal"
import {
  listUsers,
  updateUserRole,
  deleteUser,
  type SimpleUser,
} from "@/services/users"
import { Button } from "@/components/core/button"

export function PageAdminTechs() {
  const [users, setUsers] = useState<SimpleUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<SimpleUser | null>(null)
  const [confirming, setConfirming] = useState<SimpleUser | null>(null)

  async function fetchUsers() {
    try {
      setLoading(true)
      const res = await listUsers({ role: "tech", perPage: 100 })
      setUsers(res.users)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load technicians")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  async function demote(id: string) {
    await updateUserRole(id, "customer")
    await fetchUsers()
  }
  function openEdit(u: SimpleUser) {
    setSelected(u)
  }
  function closeModal() {
    setSelected(null)
  }
  async function removeUser(id: string) {
    await deleteUser(id)
    await fetchUsers()
  }

  return (
    <MainContent>
      <MainContent.Header>Manage Technicians</MainContent.Header>

      {/* Alerts */}
      {loading && (
        <Text variant="text-sm" className="text-gray-300">
          Loading...
        </Text>
      )}
      {error && (
        <Text variant="text-sm" className="text-feedback-danger">
          {error}
        </Text>
      )}

      {/* Table */}
      {!loading && (
        <section className="flex flex-col rounded-[10px] overflow-hidden border border-gray-500">
          {/* Header row */}
          <div className="flex h-12 items-center border-b border-gray-500">
            <div className="flex items-center gap-2 px-3 flex-1">
              <Text variant="text-sm" className="text-gray-400">
                Technician
              </Text>
            </div>
            <div className="flex items-center gap-2 px-3 w-[400px]">
              <Text variant="text-sm" className="text-gray-400">
                Email
              </Text>
            </div>
            <div className="w-[88px]" aria-hidden />
          </div>

          {/* Body rows */}
          {users.length === 0 ? (
            <div className="flex items-center justify-center h-16">
              <Text variant="text-sm" className="text-gray-300">
                No technicians found.
              </Text>
            </div>
          ) : (
            users.map((u) => (
              <div
                key={u.id}
                className="flex h-16 items-center border-b border-gray-500 last:border-b-0"
              >
                <div className="flex items-center gap-3 px-3 flex-1 min-w-0">
                  <Avatar size="small">
                    {u.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <Text variant="text-sm" className="text-gray-200 truncate">
                    {u.name}
                  </Text>
                </div>
                <div className="flex items-center gap-2 px-3 w-[400px] min-w-0">
                  <Text variant="text-sm" className="text-gray-300 truncate">
                    {u.email}
                  </Text>
                </div>
                <div className="w-[88px] flex items-center justify-center gap-2 px-3">
                  <Button
                    onClick={() => setConfirming(u)}
                    aria-label={`Remove ${u.name}`}
                    variant="danger"
                    icon={IconTrash}
                    size="sm"
                  />
                  <Button
                    onClick={() => openEdit(u)}
                    aria-label={`Edit ${u.name}`}
                    variant="secondary"
                    icon={IconPen}
                    size="sm"
                  />
                </div>
              </div>
            ))
          )}
        </section>
      )}

      {selected && (
        <AdminUserModal
          user={selected}
          onClose={closeModal}
          onDemote={async (id) => {
            await demote(id)
            closeModal()
          }}
        />
      )}

      {confirming && (
        <ConfirmModal
          title="Delete technician"
          description={
            <div className="flex flex-col space-y-2">
              <Text variant="text-sm" className="text-gray-200">
                Are you sure you want to delete {confirming.name}?
              </Text>
              <Text variant="text-xs" className="text-feedback-danger">
                Warning: All tickets assigned to this technician will be
                unassigned and set to Open.
              </Text>
            </div>
          }
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onCancel={() => setConfirming(null)}
          onConfirm={async () => {
            await removeUser(confirming.id)
            setConfirming(null)
          }}
        />
      )}
    </MainContent>
  )
}
