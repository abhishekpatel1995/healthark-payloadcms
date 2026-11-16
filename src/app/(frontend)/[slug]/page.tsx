import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Page, Media } from '@/payload-types'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { PageAnimator } from '@/components/PageAnimator'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    const page = result.docs[0]
    if (!page) return {}
    const ogImage = page.seo?.ogImage
    const ogImageUrl =
      ogImage && typeof ogImage === 'object' ? (ogImage as Media).url ?? undefined : undefined
    return {
      title: page.seo?.metaTitle ?? page.title,
      description: page.seo?.metaDescription ?? undefined,
      openGraph: ogImageUrl ? { images: [{ url: ogImageUrl }] } : undefined,
    }
  } catch {
    return {}
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const page = result.docs[0] as Page | undefined
  if (!page) notFound()

  const blocks = page.layout ?? []

  return (
    <>
      <PageAnimator />
      {blocks.length === 0 ? (
        <div className="max-w-2xl mx-auto px-6 py-32 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            {page.title}
          </p>
          <h1 className="text-3xl font-bold text-heading mb-4">Page is empty</h1>
          <p className="text-muted">
            Open the{' '}
            <a href="/admin/collections/pages" className="text-primary underline">
              Payload admin
            </a>{' '}
            and add blocks to this page.
          </p>
        </div>
      ) : (
        blocks.map((block, i) => (
          <BlockRenderer key={(block as { id?: string }).id ?? i} block={block} />
        ))
      )}
    </>
  )
}
