import React from 'react'
import type { Page } from '@/payload-types'
import { sectionBg } from './blockUtils'
import { AwardsClient, type AwardItem } from './AwardsClient'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'awards' }>

export function AwardsBlock(block: Props) {
  const { heading, items, variant = 'dark', cardSize = 'medium', columns = '3', respectReducedMotion = false } = block

  const clientItems: AwardItem[] = (items ?? []).map((it, i) => ({
    id: it.id ?? String(i),
    title: it.title,
    detail: it.detail,
    linkLabel: it.linkLabel,
    linkUrl: it.linkUrl,
    color: it.color ?? 'blue',
    position: it.position ?? 'auto',
  }))

  if (clientItems.length === 0) return null

  return (
    <AwardsClient
      heading={heading}
      items={clientItems}
      background={sectionBg[variant ?? 'dark']}
      isDark={variant === 'dark'}
      cardSize={cardSize ?? 'medium'}
      columns={columns ?? '3'}
      respectReducedMotion={Boolean(respectReducedMotion)}
    />
  )
}
