import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllDocs } from '@/lib/loadDocs'
import { BookOpen } from 'lucide-react'

export default function DocsPage() {
  const docs = getAllDocs()

  // Map slugs to readable titles
  const titleMap: Record<string, string> = {
    'README': 'Overview',
    'COLLECTIONS_GUIDE': 'Collections Guide',
    'IMPLEMENTATION_GUIDE': 'Implementation Guide',
    'PACKAGE_SUMMARY': 'Package Summary',
    'ARCHITECTURE_DIAGRAM': 'Architecture Diagram',
    'GLOBAL_COMMUNITY_ARCHIVES_GUIDE': 'Global Community Archives Guide',
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Documentation</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive guides and documentation for understanding and implementing the oral history schema
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc) => {
          const title = titleMap[doc.slug] || doc.title || doc.slug.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          return (
            <Card key={doc.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-doc-light dark:bg-doc-dark flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-doc-primary" />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                  {doc.data.description || 'Documentation guide'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/docs/${doc.slug}`}
                  className="text-sm font-medium text-doc-primary hover:underline"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

