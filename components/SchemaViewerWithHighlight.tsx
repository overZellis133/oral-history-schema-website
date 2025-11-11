'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SchemaViewer } from './SchemaViewer'

interface SchemaViewerWithHighlightProps {
  schema: any
}

function SchemaViewerContent({ schema }: SchemaViewerWithHighlightProps) {
  const searchParams = useSearchParams()
  const highlight = searchParams.get('highlight') || undefined

  return <SchemaViewer schema={schema} highlight={highlight} />
}

export function SchemaViewerWithHighlight({ schema }: SchemaViewerWithHighlightProps) {
  return (
    <Suspense fallback={<SchemaViewer schema={schema} />}>
      <SchemaViewerContent schema={schema} />
    </Suspense>
  )
}

