import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileJson, GitCompare } from 'lucide-react'

export default function SchemasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Schemas</h1>
        <p className="text-lg text-muted-foreground">
          Explore the JSON schemas that define the structure of oral history metadata
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-schema-light dark:bg-schema-dark flex items-center justify-center mb-4">
              <FileJson className="h-6 w-6 text-schema-primary" />
            </div>
            <CardTitle>Interview Schema</CardTitle>
            <CardDescription>
              The core schema for individual oral history interviews with transcripts, metadata, clips, themes, and IIIF compatibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/schemas/interview">View Schema</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-schema-light dark:bg-schema-dark flex items-center justify-center mb-4">
              <FileJson className="h-6 w-6 text-schema-primary" />
            </div>
            <CardTitle>Collection Schema</CardTitle>
            <CardDescription>
              Schema for organizing multiple interviews into collections with aggregated metadata, themes, and entities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/schemas/collection">View Schema</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="w-12 h-12 rounded-lg bg-schema-light dark:bg-schema-dark flex items-center justify-center mb-4">
            <GitCompare className="h-6 w-6 text-schema-primary" />
          </div>
          <CardTitle>Schema Comparison</CardTitle>
          <CardDescription>
            Compare the Interview and Collection schemas side-by-side to understand their relationships and differences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="w-full">
            <Link href="/schemas/compare">Compare Schemas</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

