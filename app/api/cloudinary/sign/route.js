import { createHash } from "node:crypto"
import { NextResponse } from "next/server"
import { getAdminSession } from "@/lib/admin-auth"

function getCloudinaryConfig() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  return { cloudName, apiKey, apiSecret }
}

export async function POST(request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig()

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "Cloudinary server credentials are missing." }, { status: 400 })
  }

  const body = await request.json().catch(() => ({}))
  const folder = String(body.folder || "portfolio").trim().replace(/[^a-zA-Z0-9/_-]/g, "")
  const resourceType = body.resourceType === "raw" ? "raw" : "image"
  if (!folder.startsWith("portfolio")) {
    return NextResponse.json({ error: "Invalid upload folder." }, { status: 400 })
  }
  const timestamp = Math.floor(Date.now() / 1000)
  const signatureBase = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
  const signature = createHash("sha1").update(signatureBase).digest("hex")

  return NextResponse.json({
    cloudName,
    apiKey,
    timestamp,
    folder,
    resourceType,
    signature,
  })
}
