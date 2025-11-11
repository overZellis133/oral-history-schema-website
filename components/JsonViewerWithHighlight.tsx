'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { JsonViewer } from './JsonViewer'

interface JsonViewerWithHighlightProps {
  data: any
  title?: string
  defaultExpanded?: boolean
}

function JsonViewerContent({ data, title, defaultExpanded }: JsonViewerWithHighlightProps) {
  const searchParams = useSearchParams()
  const highlight = searchParams.get('highlight') || undefined

  return <JsonViewer data={data} title={title} defaultExpanded={defaultExpanded} highlight={highlight} />
}

export function JsonViewerWithHighlight({ data, title, defaultExpanded }: JsonViewerWithHighlightProps) {
  return (
    <Suspense fallback={<JsonViewer data={data} title={title} defaultExpanded={defaultExpanded} />}>
      <JsonViewerContent data={data} title={title} defaultExpanded={defaultExpanded} />
    </Suspense>
  )
}

