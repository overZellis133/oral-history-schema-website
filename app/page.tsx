'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileJson, FolderTree, BookOpen, Globe, Code, Search } from 'lucide-react'
import { openSearch } from '@/lib/searchTrigger'

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
        <Link href="/docs/README#4-iiif-compatibility" className="block">
          <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
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
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/schemas/collection" className="block">
          <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
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
              <Button variant="outline" className="w-full">
                View Schema
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/COLLECTIONS_GUIDE" className="block">
          <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
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
              <Button variant="outline" className="w-full">
                Read Guide
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/GLOBAL_COMMUNITY_ARCHIVES_GUIDE" className="block">
          <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
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
              <Button variant="outline" className="w-full">
                Explore
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/playground" className="block">
          <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
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
              <Button variant="outline" className="w-full">
                Try It
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Card 
          className="hover:shadow-lg transition-shadow h-full cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            openSearch()
          }}
        >
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
            <Button 
              variant="outline" 
              className="w-full"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                openSearch()
              }}
            >
              Search
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="border-t pt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Get Started</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link href="/schemas/interview" className="block">
            <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">1. Understand the Schema</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore the interactive schema viewer to understand the structure
                </p>
                <Button size="sm" className="w-full">
                  View Interview Schema
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/examples" className="block">
            <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">2. See Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse real-world examples from production platforms
                </p>
                <Button size="sm" className="w-full">
                  Browse Examples
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/docs" className="block">
            <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">3. Read Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to implement and use the schema in your projects
                </p>
                <Button size="sm" className="w-full">
                  Read Docs
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

