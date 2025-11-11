import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getAllExamples } from '@/lib/loadExamples'
import { FileJson } from 'lucide-react'

export default function ExamplesPage() {
  const examples = getAllExamples()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Examples</h1>
        <p className="text-lg text-muted-foreground">
          Browse real-world examples from production platforms using the oral history schema
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {examples.map((example) => (
          <Card key={example.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-example-light dark:bg-example-dark flex items-center justify-center mb-4">
                <FileJson className="h-6 w-6 text-example-primary" />
              </div>
              <CardTitle>{example.name}</CardTitle>
              <CardDescription>
                {example.data.title || example.data.label?.en?.[0] || 'Real-world example data'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {example.data.type || 'Example'}
                </span>
                <Button asChild>
                  <Link href={`/examples/${example.id}`}>View Example</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

