import { readFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"
import { decodeEmail, decodePhoneNumber } from "@/utils/string"
import sharp from "sharp"
import VCard from "vcard-creator"

import { USER } from "@/features/portfolio/data/user"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export async function GET() {
  const card = new VCard()

  card
    .addName(USER.lastName, USER.firstName)
    .addAddress(USER.address)
    .addEmail(decodeEmail(USER.emailB64))
    .addURL(USER.website)

  if (USER.phoneNumberB64) {
    card.addPhoneNumber(decodePhoneNumber(USER.phoneNumberB64))
  }

  const photo = await getVCardPhoto(USER.avatar)
  if (photo) {
    card.addPhoto(photo.image, photo.mime)
  }

  if (USER.jobs.length > 0) {
    const company = USER.jobs[0]
    card.addCompany(company.company).addJobtitle(company.title)
  }

  return new NextResponse(card.toString(), {
    status: 200,
    headers: {
      "Content-Type": "text/x-vcard",
      "Content-Disposition": `attachment; filename=${USER.username}-vcard.vcf`,
    },
  })
}

async function getVCardPhoto(src: string) {
  try {
    const buffer = await readImage(src)
    if (buffer.length === 0) {
      return null
    }

    const jpegBuffer = await convertImageToJpeg(buffer)
    const image = jpegBuffer.toString("base64")

    return {
      image,
      mime: "jpeg",
    }
  } catch {
    return null
  }
}

/** Avatars in `public/` are read from disk; anything else is fetched over HTTP. */
async function readImage(src: string) {
  if (src.startsWith("/")) {
    return readFile(path.join(process.cwd(), "public", src))
  }

  const res = await fetch(src)

  if (!res.ok || !res.headers.get("Content-Type")?.startsWith("image/")) {
    return Buffer.alloc(0)
  }

  return Buffer.from(await res.arrayBuffer())
}

async function convertImageToJpeg(imageBuffer: Buffer): Promise<Buffer> {
  try {
    const jpegBuffer = await sharp(imageBuffer)
      .jpeg({
        quality: 90,
        progressive: true,
        mozjpeg: true,
      })
      .toBuffer()

    return jpegBuffer
  } catch (error) {
    console.error("Error converting image to JPEG:", error)
    throw error
  }
}
