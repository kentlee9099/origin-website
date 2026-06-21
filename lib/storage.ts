import { createAdminClient } from './supabase-admin'

const db = createAdminClient()

export interface UploadResult {
  publicUrl: string
  storagePath: string
  width: number
  height: number
  sizeBytes: number
}

export async function uploadImage(file: File, section: string, altText?: string): Promise<UploadResult> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const sharp = (await import('sharp')).default
  const { data: imgData, info } = await sharp(buffer)
    .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer({ resolveWithObject: true })

  const month = new Date().toISOString().slice(0, 7)
  const uuid = crypto.randomUUID()
  const bucket = section === 'avatars' ? 'avatars' : 'images'
  const storagePath = section === 'avatars'
    ? `avatars/${uuid}.webp`
    : `images/${section}/${month}/${uuid}.webp`

  const { error: uploadError } = await db.storage
    .from(bucket)
    .upload(storagePath, imgData, { contentType: 'image/webp', cacheControl: '31536000', upsert: false })
  if (uploadError) throw new Error(uploadError.message)

  const { data: { publicUrl } } = db.storage.from(bucket).getPublicUrl(storagePath)

  await createAdminClient().from('media_assets').insert({
    bucket, storage_path: storagePath, public_url: publicUrl,
    original_name: file.name, mime_type: 'image/webp',
    size_bytes: info.size, width: info.width, height: info.height,
    alt_text: altText ?? null,
  })

  return { publicUrl, storagePath, width: info.width, height: info.height, sizeBytes: info.size }
}

export async function deleteImage(storagePath: string): Promise<void> {
  const bucket = storagePath.startsWith('avatars/') ? 'avatars' : 'images'
  await Promise.all([
    db.storage.from(bucket).remove([storagePath]),
    createAdminClient().from('media_assets').delete().eq('storage_path', storagePath),
  ])
}
