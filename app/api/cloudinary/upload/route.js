import { createHash } from "node:crypto"
import { NextResponse } from "next/server"
import { getAdminSession } from "@/lib/admin-auth"

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"])

function getConfig() {
  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  }
}

export async function POST(request) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 })

  try {
    const body = await request.formData()
    const file = body.get("file")
    const resourceType = body.get("resourceType") === "raw" ? "raw" : "image"
    const folder = String(body.get("folder") || "portfolio").trim().replace(/[^a-zA-Z0-9/_-]/g, "")
    const { cloudName, apiKey, apiSecret, uploadPreset } = getConfig()

    if (!(file instanceof File) || !file.size) return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 })
    if (!folder.startsWith("portfolio")) return NextResponse.json({ error: "Invalid upload folder." }, { status: 400 })
    if (resourceType === "raw" && file.type !== "application/pdf") {
      return NextResponse.json({ error: "Document uploads must be PDF files." }, { status: 415 })
    }
    if (resourceType === "image" && !IMAGE_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Images must be JPG, PNG, WebP, GIF, or AVIF files." }, { status: 415 })
    }
    const maxMegabytes = resourceType === "raw" ? 15 : folder === "portfolio/projects" ? 5 : 10
    const maxBytes = maxMegabytes * 1024 * 1024
    if (file.size > maxBytes) return NextResponse.json({ error: `File must be ${maxMegabytes} MB or smaller.` }, { status: 413 })
    if (!cloudName || (!uploadPreset && !(apiKey && apiSecret))) {
      return NextResponse.json({ error: "Cloudinary upload is not configured." }, { status: 503 })
    }

    const upload = new FormData()
    upload.append("file", file)
    upload.append("folder", folder)

    if (apiKey && apiSecret) {
      const timestamp = Math.floor(Date.now() / 1000)
      const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest("hex")
      upload.append("api_key", apiKey)
      upload.append("timestamp", String(timestamp))
      upload.append("signature", signature)
    } else {
      upload.append("upload_preset", uploadPreset)
    }

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
      method: "POST",
      body: upload,
      cache: "no-store",
    })
    const result = await response.json().catch(() => null)
    if (!response.ok) {
      console.error("Cloudinary upload failed:", result?.error?.message || response.statusText)
      return NextResponse.json({ error: result?.error?.message || "Cloudinary rejected the upload." }, { status: 502 })
    }

    return NextResponse.json({
      url: result.secure_url,
      resourceType: result.resource_type,
      format: result.format,
    })
  } catch (error) {
    console.error("Cloudinary upload route failed:", error)
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 })
  }
}
