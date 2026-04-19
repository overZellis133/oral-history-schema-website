"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const VALID_TABS = ['interactive', 'raw', 'example'] as const
type TabValue = (typeof VALID_TABS)[number]

interface SchemaTabsProps {
  interactive: React.ReactNode
  raw: React.ReactNode
  example?: React.ReactNode
}

export function SchemaTabs({ interactive, raw, example }: SchemaTabsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tabParam = searchParams.get('tab')
  const isValid =
    tabParam !== null &&
    (VALID_TABS as readonly string[]).includes(tabParam) &&
    (tabParam !== 'example' || Boolean(example))
  const current: TabValue = isValid ? (tabParam as TabValue) : 'interactive'

  const handleChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === 'interactive') {
        params.delete('tab')
      } else {
        params.set('tab', value)
      }
      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [router, pathname, searchParams]
  )

  return (
    <Tabs value={current} onValueChange={handleChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="interactive">Interactive View</TabsTrigger>
        <TabsTrigger value="raw">Raw JSON</TabsTrigger>
        {example && <TabsTrigger value="example">With Example</TabsTrigger>}
      </TabsList>

      <TabsContent value="interactive" className="mt-6">
        {interactive}
      </TabsContent>

      <TabsContent value="raw" className="mt-6">
        {raw}
      </TabsContent>

      {example && (
        <TabsContent value="example" className="mt-6">
          {example}
        </TabsContent>
      )}
    </Tabs>
  )
}
