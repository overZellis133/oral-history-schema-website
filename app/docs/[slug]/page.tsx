import { notFound } from 'next/navigation'
import { loadDoc, getAllDocs } from '@/lib/loadDocs'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CodeBlock } from '@/components/CodeBlock'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const docs = getAllDocs()
  return docs.map((doc) => ({
    slug: doc.slug,
  }))
}

const components = {
  pre: (props: any) => <div {...props} />,
  code: (props: any) => {
    const { children, className } = props
    const language = className?.replace('language-', '') || 'text'
    return <CodeBlock code={String(children)} language={language} />
  },
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params
  const doc = loadDoc(slug)

  if (!doc) {
    notFound()
  }

  const titleMap: Record<string, string> = {
    'readme': 'Overview',
    'collections-guide': 'Collections Guide',
    'implementation-guide': 'Implementation Guide',
    'package-summary': 'Package Summary',
    'architecture-diagram': 'Architecture Diagram',
    'global-community-archives-guide': 'Global Community Archives Guide',
  }

  const title = titleMap[slug] || doc.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/docs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Documentation
          </Link>
        </Button>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
      </div>

      <article className="prose prose-slate dark:prose-invert max-w-none">
        <MDXRemote source={doc.content} components={components} />
      </article>
    </div>
  )
}

