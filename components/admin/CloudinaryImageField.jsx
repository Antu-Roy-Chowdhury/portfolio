"use client"

import { useId, useState } from "react"

export default function CloudinaryImageField({
  name,
  label,
  defaultValue = "",
  folder = "portfolio",
  placeholder = "https://res.cloudinary.com/...",
  mediaType = "image",
  maxMegabytes,
  recommendedAspectRatio,
  helperText = "",
}) {
  const [value, setValue] = useState(defaultValue)
  const [status, setStatus] = useState("")
  const [uploading, setUploading] = useState(false)
  const inputId = useId()

  async function handleUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const isDocument = mediaType === "document"
    const allowedTypes = isDocument ? ["application/pdf"] : ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]
    const effectiveMaxMegabytes = maxMegabytes || (isDocument ? 15 : 10)
    const maxBytes = effectiveMaxMegabytes * 1024 * 1024
    if (!allowedTypes.includes(file.type)) {
      setStatus(isDocument ? "Upload failed: select a PDF file." : "Upload failed: select a JPG, PNG, WebP, GIF, or AVIF image.")
      event.target.value = ""
      return
    }
    if (file.size > maxBytes) {
      setStatus(`Upload failed: file must be ${effectiveMaxMegabytes} MB or smaller.`)
      event.target.value = ""
      return
    }

    let dimensionWarning = ""
    if (!isDocument && recommendedAspectRatio) {
      dimensionWarning = await new Promise((resolve) => {
        const preview = new Image()
        const objectUrl = URL.createObjectURL(file)
        preview.onload = () => {
          const actualRatio = preview.naturalWidth / preview.naturalHeight
          URL.revokeObjectURL(objectUrl)
          resolve(Math.abs(actualRatio - recommendedAspectRatio) > 0.05 ? " Warning: the image is not close to the recommended 3:2 aspect ratio." : "")
        }
        preview.onerror = () => {
          URL.revokeObjectURL(objectUrl)
          resolve(" Warning: image dimensions could not be checked.")
        }
        preview.src = objectUrl
      })
    }

    setUploading(true)
    setStatus(`Uploading to Cloudinary...${dimensionWarning}`)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", folder)
      formData.append("resourceType", isDocument ? "raw" : "image")
      const response = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null)
        const message = errorBody?.error || "Upload failed"
        throw new Error(message)
      }

      const result = await response.json()
      setValue(result.url)
      setStatus(`Upload complete.${dimensionWarning}`)
    } catch (error) {
      console.error(error)
      setStatus(`Upload failed: ${error.message}. You can still paste the URL manually.`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      <label htmlFor={inputId} className="block text-sm text-slate-300">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="form-input"
      />
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 transition hover:bg-white/10">
          {uploading ? "Uploading..." : "Upload from device"}
          <input type="file" accept={mediaType === "document" ? "application/pdf,.pdf" : "image/jpeg,image/png,image/webp,image/gif,image/avif"} className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
        {status ? <p className="text-xs text-slate-400" role="status" aria-live="polite">{status}</p> : null}
      </div>
      {helperText ? <p className="whitespace-pre-line text-xs leading-6 text-slate-500">{helperText}</p> : null}
    </div>
  )
}
