import { notFound } from 'next/navigation'
import { JsonViewerWithHighlight } from '@/components/JsonViewerWithHighlight'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getExampleById, getAllExamples } from '@/lib/loadExamples'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const examples = getAllExamples()
  return examples.map((example) => ({
    id: example.id,
  }))
}

export default async function ExamplePage({ params }: PageProps) {
  const { id } = await params
  const example = getExampleById(id)

  if (!example) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/examples">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Examples
          </Link>
        </Button>
        <h1 className="text-4xl font-bold mb-4">{example.name}</h1>
        <p className="text-lg text-muted-foreground">
          {example.data.title || example.data.label?.en?.[0] || 'Example data'}
        </p>
      </div>

      <Tabs defaultValue="formatted" className="w-full">
        <TabsList>
          <TabsTrigger value="formatted">Formatted View</TabsTrigger>
          <TabsTrigger value="raw">Raw JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="formatted" className="mt-6">
          <JsonViewerWithHighlight data={example.data} title={example.name} defaultExpanded={true} />
        </TabsContent>

        <TabsContent value="raw" className="mt-6">
          <div className="border rounded-lg bg-card p-4">
            <pre className="overflow-auto max-h-[800px] text-sm font-mono">
              {JSON.stringify(example.data, null, 2)}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

