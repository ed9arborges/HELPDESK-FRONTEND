import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react"
import type { ReactElement } from "react"
// Adjust this import to match the actual location of your Button component in the project
import { Button } from "@core-components/button"
import Avatar from "@/core-components/avatar"
import IconUpload from "@assets/icons/upload.svg?react"
import IconTrash from "@assets/icons/trash.svg?react"
import { useAuth } from "@hooks/useAuth"
import { api } from "@services/api"
import { uploadAvatar, deleteAvatar } from "@/services/avatar"
import { AlertModal } from "@/components/alert-modal"
import { getInitials } from "@/utils/get-initials"
import { getAvatarUrl } from "@/utils/get-avatar-url"
import { z } from "zod"

export type ProfileFormSectionRef = {
  save: () => Promise<boolean>
}

export const ProfileFormSection = forwardRef<ProfileFormSectionRef, object>(
  function ProfileFormSection(_, ref): ReactElement {
    const { session, updateUser } = useAuth()
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    })
    const [alertMsg, setAlertMsg] = useState<string | null>(null)
    const [alertTitle, setAlertTitle] = useState("Alert")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPasswordFields, setShowPasswordFields] = useState(false)

    useEffect(() => {
      if (session?.user) {
        setFormData((prev) => ({
          ...prev,
          name: session.user.name ?? "",
          email: session.user.email ?? "",
        }))

        // Set avatar URL if available
        if (session.user.avatarImg) {
          setAvatarUrl(getAvatarUrl(session.user.avatarImg) || null)
        } else {
          setAvatarUrl(null)
        }
      }
    }, [session?.user])

    const handleInputChange = (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleImageUpload = () => {
      fileInputRef.current?.click()
    }

    const handleFileSelect = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files?.[0]
      if (!file) return

      // Check file size (4MB limit)
      if (file.size > 4 * 1024 * 1024) {
        setAlertTitle("Error")
        setAlertMsg("Image size exceeds 4MB limit")
        return
      }

      try {
        const response = await uploadAvatar(file)
        updateUser(response.user)
        setAvatarUrl(getAvatarUrl(response.user.avatarImg) || null)

        setAlertTitle("Success")
        setAlertMsg("Avatar updated successfully")
      } catch (error) {
        console.error("Error uploading avatar:", error)
        setAlertTitle("Error")
        setAlertMsg("Failed to upload avatar")
      }
    }

    const handleImageDelete = async () => {
      try {
        const response = await deleteAvatar()
        updateUser(response.user)
        setAvatarUrl(null)

        setAlertTitle("Success")
        setAlertMsg("Avatar removed successfully")
      } catch (error) {
        console.error("Error deleting avatar:", error)
        setAlertTitle("Error")
        setAlertMsg("Failed to delete avatar")
      }
    }

    const handlePasswordChange = () => {
      // Toggle password fields visibility
      const newState = !showPasswordFields
      setShowPasswordFields(newState)

      // If hiding the password fields, clear any password data
      if (!newState) {
        setFormData((prev) => ({
          ...prev,
          password: "",
          passwordConfirm: "",
        }))
      }
    }

    useImperativeHandle(ref, () => ({
      async save() {
        try {
          setIsSubmitting(true)

          // Validate password match only if a new password has been entered
          if (formData.password && formData.password.trim() !== "") {
            if (formData.password !== formData.passwordConfirm) {
              setAlertTitle("Error")
              setAlertMsg("Password and confirmation do not match")
              return false
            }

            if (formData.password.length < 6) {
              setAlertTitle("Error")
              setAlertMsg("Password must be at least 6 characters")
              return false
            }
          }

          // Build payload: only send fields that have changed and are provided
          const payload: { name?: string; email?: string; password?: string } =
            {}

          // Only update name if provided
          if (formData.name && formData.name.trim() !== "") {
            payload.name = formData.name
          }

          // Only update email if provided
          if (formData.email && formData.email.trim() !== "") {
            payload.email = formData.email
          }

          // Only include password if it's actually been entered
          if (formData.password && formData.password.trim() !== "") {
            payload.password = formData.password
          }

          // If no changes were made, show a message and return
          if (Object.keys(payload).length === 0) {
            setAlertTitle("Info")
            setAlertMsg("No changes to save")
            return true // Still return true as this isn't an error
          }

          const response = await api.put("/users/me", payload)

          // Update user in context
          updateUser(response.data.user)

          // Reset password fields
          setFormData((prev) => ({
            ...prev,
            password: "",
            passwordConfirm: "",
          }))

          setShowPasswordFields(false)
          setAlertTitle("Success")
          setAlertMsg("Profile updated successfully")
          return true
        } catch (error: any) {
          // Type assertion for error
          console.error("Error updating profile:", error)
          setAlertTitle("Error")
          setAlertMsg(
            error.response?.data?.message || "Failed to update profile"
          )
          return false
        } finally {
          setIsSubmitting(false)
        }
      },
    }))

    return (
      <section className="flex flex-col gap-5 pt-7 pb-8 px-7 w-full ">
        {alertMsg && (
          <AlertModal
            title={alertTitle}
            description={alertMsg}
            onClose={() => setAlertMsg(null)}
          />
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
          title="Upload profile image"
        />

        <div className="flex items-center gap-3">
          <Avatar imageUrl={avatarUrl || undefined}>
            <span className="text-xs text-gray-600 font-normal">
              {getInitials(session?.user?.name || "")}
            </span>
          </Avatar>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              aria-label="Upload new profile image"
              onClick={handleImageUpload}
              className=""
              icon={IconUpload}
            >
              <span className="text-xs font-text-xxs text-gray-200">
                Nova imagem
              </span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              type="button"
              aria-label="Delete profile image"
              onClick={handleImageDelete}
              icon={IconTrash}
              className=""
              disabled={!avatarUrl}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="w-full">
            <label
              htmlFor="name-input"
              className="block text-xs text-gray-300 font-text-xxs"
            >
              NaME
            </label>

            <div className="flex items-center h-10 gap-2 border-b border-gray-500">
              <input
                id="name-input"
                type="text"
                aria-label="Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="flex-1 bg-transparent border-0 p-0 text-base text-[#1e1f24] focus:outline-none"
              />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="email-input"
              className="block text-xs text-gray-300 font-text-xxs"
            >
              E-MAIL
            </label>

            <div className="flex items-center h-10 gap-2 border-b border-gray-500">
              <input
                id="email-input"
                type="email"
                aria-label="Email"
                placeholder="seuemail@exemplo.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="flex-1 bg-transparent border-0 p-0 text-sm text-gray-200 focus:outline-none font-text-md"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <div className="flex-1">
              <label
                htmlFor="password-input"
                className="block text-xs text-gray-300 font-text-xxs"
              >
                Password
              </label>

              {showPasswordFields ? (
                <div className="flex items-center h-10 gap-2 border-b border-gray-500">
                  <input
                    id="password-input"
                    type="password"
                    aria-label="New Password"
                    placeholder="New Password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="flex-1 bg-transparent border-0 p-0 text-sm text-gray-200 focus:outline-none font-text-md"
                  />
                </div>
              ) : (
                <div className="flex items-center h-10 gap-2 border-b border-gray-500">
                  <span className="flex-1 text-sm text-gray-400">••••••••</span>
                </div>
              )}
            </div>

            <div className="flex-shrink-0">
              <Button
                variant="secondary"
                size="sm"
                aria-label={
                  showPasswordFields
                    ? "Cancel password change"
                    : "Change password"
                }
                onClick={handlePasswordChange}
                className="h-7 px-2 bg-gray-500 rounded-md hover:bg-gray-400 focus:outline-2 focus:outline-bluebase transition-colors text-xs text-gray-200"
              >
                {showPasswordFields ? "Cancel" : "Change"}
              </Button>
            </div>
          </div>

          {showPasswordFields && (
            <div className="w-full">
              <label
                htmlFor="password-confirm-input"
                className="block text-xs text-gray-300 font-text-xxs"
              >
                CONFIRMAR SENHA
              </label>

              <div className="flex items-center h-10 gap-2 border-b border-gray-500">
                <input
                  id="password-confirm-input"
                  type="password"
                  aria-label="Password Confirmation"
                  placeholder="Confirmar nova senha"
                  value={formData.passwordConfirm}
                  onChange={(e) =>
                    handleInputChange("passwordConfirm", e.target.value)
                  }
                  className="flex-1 bg-transparent border-0 p-0 text-sm text-gray-200 focus:outline-none font-text-md"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }
)
