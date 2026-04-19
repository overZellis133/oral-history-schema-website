import { Suspense } from 'react'
import { SchemaViewerWithHighlight } from '@/components/SchemaViewerWithHighlight'
import { JsonViewer } from '@/components/JsonViewer'
import { SchemaTabs } from '@/components/SchemaTabs'
import { loadSchema } from '@/lib/loadSchemas'
import { loadExample } from '@/lib/loadExamples'
import { CollaborationSection } from '@/components/CollaborationSection'

export default async function CollectionSchemaPage() {
  const schema = loadSchema('collection_schema.json')
  let example = null
  try {
    example = loadExample('collection_example_open_source_pioneers.json')
  } catch {
    // Example not found, continue without it
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Collection Schema</h1>
        <p className="text-lg text-muted-foreground">
          Schema for organizing multiple interviews into collections with aggregated metadata, themes, and entities
        </p>
      </div>

      <CollaborationSection
        schemaName="Collection Schema"
        schemaFile="collection_schema.json"
      />

      <Suspense fallback={null}>
        <SchemaTabs
          interactive={
            <div className="border rounded-lg p-6 bg-card">
              <SchemaViewerWithHighlight schema={schema} />
            </div>
          }
          raw={
            <JsonViewer data={schema} title="Collection Schema JSON" defaultExpanded={false} />
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
                  <JsonViewer data={example} title="Open Source Pioneers Collection" defaultExpanded={false} />
                </div>
              </div>
            ) : undefined
          }
        />
      </Suspense>
    </div>
  )
}
