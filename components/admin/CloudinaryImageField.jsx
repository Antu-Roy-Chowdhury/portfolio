"use client"

import { useId, useState } from "react"

export default function CloudinaryImageField({
  name,
  label,
  defaultValue = "",
  folder = "portfolio",
  placeholder = "https://res.cloudinary.com/...",
}) {
  const [value, setValue] = useState(defaultValue)
  const [status, setStatus] = useState("")
  const [uploading, setUploading] = useState(false)
  const inputId = useId()
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  async function handleUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setStatus("Uploading to Cloudinary...")

    try {
      const formData = new FormData()
      formData.append("file", file)
      let uploadCloudName = cloudName

      const signedConfigResponse = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folder }),
      })

      if (signedConfigResponse.ok) {
        const signedConfig = await signedConfigResponse.json()
        uploadCloudName = signedConfig.cloudName
        formData.append("api_key", signedConfig.apiKey)
        formData.append("timestamp", String(signedConfig.timestamp))
        formData.append("folder", signedConfig.folder)
        formData.append("signature", signedConfig.signature)
      } else if (preset && cloudName) {
        formData.append("upload_preset", preset)
        formData.append("folder", folder)
      } else {
        const signedError = await signedConfigResponse.json().catch(() => null)
        throw new Error(signedError?.error || "Cloudinary upload is not configured.")
      }

      const response = await fetch(`https://api.cloudinary.com/v1_1/${uploadCloudName}/image/upload`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null)
        const message = errorBody?.error?.message || "Upload failed"
        throw new Error(message)
      }

      const result = await response.json()
      setValue(result.secure_url)
      setStatus("Upload complete.")
    } catch (error) {
      console.error(error)
      setStatus(`Upload failed: ${error.message}. You can still paste the image URL manually.`)
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
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
        {!cloudName && !preset ? (
          <p className="text-xs text-amber-300/80">Add either signed Cloudinary server credentials or public upload-preset env vars to enable direct uploads.</p>
        ) : null}
        {status ? <p className="text-xs text-slate-400">{status}</p> : null}
      </div>
    </div>
  )
}
