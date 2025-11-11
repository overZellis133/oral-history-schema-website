import { SchemaViewerWithHighlight } from '@/components/SchemaViewerWithHighlight'
import { loadSchema } from '@/lib/loadSchemas'

export default async function CompareSchemasPage() {
  const interviewSchema = loadSchema('oral_history_schema.json')
  const collectionSchema = loadSchema('collection_schema.json')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Schema Comparison</h1>
        <p className="text-lg text-muted-foreground">
          Compare the Interview and Collection schemas side-by-side to understand their relationships and differences
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-schema-primary">Interview Schema</h2>
          <div className="border rounded-lg p-4 bg-card max-h-[800px] overflow-auto">
            <SchemaViewerWithHighlight schema={interviewSchema} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-example-primary">Collection Schema</h2>
          <div className="border rounded-lg p-4 bg-card max-h-[800px] overflow-auto">
            <SchemaViewerWithHighlight schema={collectionSchema} />
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-muted rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Key Differences</h3>
        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
          <li>
            <strong className="text-foreground">Interview Schema</strong> focuses on individual interviews with transcripts, clips, and participant metadata
          </li>
          <li>
            <strong className="text-foreground">Collection Schema</strong> aggregates multiple interviews with collection-level themes, entities, and statistics
          </li>
          <li>
            Collections reference interviews through the <code className="bg-background px-1 rounded">interviews</code> array
          </li>
          <li>
            Both schemas share IIIF compatibility and support multilingual labels and metadata
          </li>
        </ul>
      </div>
    </div>
  )
}

