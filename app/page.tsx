import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileJson, FolderTree, BookOpen, Globe, Code, Search } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-schema-primary to-doc-primary bg-clip-text text-transparent">
          Oral History Metadata Schema
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          A comprehensive, IIIF-compatible framework for preserving community voices
        </p>
        <p className="text-lg text-muted-foreground mb-8">
          Built on IIIF standards | Community-driven | Globally accessible
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild size="lg">
            <Link href="/schemas">View Schemas</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/examples">Browse Examples</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/docs">Read Documentation</Link>
          </Button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-schema-light dark:bg-schema-dark flex items-center justify-center mb-4">
              <FileJson className="h-6 w-6 text-schema-primary" />
            </div>
            <CardTitle>IIIF Compatible</CardTitle>
            <CardDescription>
              Built on international standards for interoperability with existing viewers and tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/docs">Learn More</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-example-light dark:bg-example-dark flex items-center justify-center mb-4">
              <FolderTree className="h-6 w-6 text-example-primary" />
            </div>
            <CardTitle>Collection Support</CardTitle>
            <CardDescription>
              Organize and analyze interviews across collections with hierarchical metadata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/schemas/collection">View Schema</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-doc-light dark:bg-doc-dark flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-doc-primary" />
            </div>
            <CardTitle>Research Ready</CardTitle>
            <CardDescription>
              Built-in support for themes, entities, clips, and annotations for advanced research
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/docs/collections-guide">Read Guide</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-schema-light dark:bg-schema-dark flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-schema-primary" />
            </div>
            <CardTitle>Global Framework</CardTitle>
            <CardDescription>
              Designed for diverse communities worldwide with multilingual support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/docs/global-community-archives-guide">Explore</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-example-light dark:bg-example-dark flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-example-primary" />
            </div>
            <CardTitle>Interactive Playground</CardTitle>
            <CardDescription>
              Try the schema with real-time validation and see examples in action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/playground">Try It</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-doc-light dark:bg-doc-dark flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-doc-primary" />
            </div>
            <CardTitle>Comprehensive Search</CardTitle>
            <CardDescription>
              Search across schemas, examples, and documentation with instant results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/schemas">Explore</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="border-t pt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Get Started</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">1. Understand the Schema</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Explore the interactive schema viewer to understand the structure
              </p>
              <Button asChild size="sm" className="w-full">
                <Link href="/schemas/interview">View Interview Schema</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">2. See Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Browse real-world examples from production platforms
              </p>
              <Button asChild size="sm" className="w-full">
                <Link href="/examples">Browse Examples</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">3. Read Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn how to implement and use the schema in your projects
              </p>
              <Button asChild size="sm" className="w-full">
                <Link href="/docs">Read Docs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

