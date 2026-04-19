import { Suspense } from 'react'
import { SchemaViewerWithHighlight } from '@/components/SchemaViewerWithHighlight'
import { JsonViewer } from '@/components/JsonViewer'
import { SchemaTabs } from '@/components/SchemaTabs'
import { loadSchema } from '@/lib/loadSchemas'
import { loadExample } from '@/lib/loadExamples'
import { CollaborationSection } from '@/components/CollaborationSection'

export default async function InterviewSchemaPage() {
  const schema = loadSchema('oral_history_schema.json')
  let example = null
  try {
    example = loadExample('larry_augustin_example.json')
  } catch {
    // Example not found, continue without it
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Interview Schema</h1>
        <p className="text-lg text-muted-foreground">
          The core schema for individual oral history interviews with transcripts, metadata, clips, themes, and IIIF compatibility
        </p>
      </div>

      <CollaborationSection
        schemaName="Interview Schema"
        schemaFile="oral_history_schema.json"
      />

      <Suspense fallback={null}>
        <SchemaTabs
          interactive={
            <div className="border rounded-lg p-6 bg-card">
              <SchemaViewerWithHighlight schema={schema} />
            </div>
          }
          raw={
            <JsonViewer data={schema} title="Interview Schema JSON" defaultExpanded={false} />
          }
          example={
            example ? (
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Schema Structure</h2>
                  <div className="border rounded-lg p-4 bg-card max-h-[800px] overflow-auto">
                    <SchemaViewerWithHighlight schema={schema} />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Example Data</h2>
                  <JsonViewer data={example} title="Larry Augustin Example" defaultExpanded={false} />
                </div>
              </div>
            ) : undefined
          }
        />
      </Suspense>
    </div>
  )
}
