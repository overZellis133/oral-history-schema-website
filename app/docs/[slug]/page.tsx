import { notFound } from 'next/navigation'
import { loadDoc, getAllDocs } from '@/lib/loadDocs'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CodeBlock } from '@/components/CodeBlock'
import { ScrollToAnchor } from '@/components/ScrollToAnchor'
import { Suspense } from 'react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const docs = getAllDocs()
  return docs.map((doc) => ({
    slug: doc.slug,
  }))
}

// Helper function to extract text from React children and generate ID
function extractText(children: any): string {
  if (typeof children === 'string') {
    return children
  }
  if (typeof children === 'number') {
    return String(children)
  }
  if (Array.isArray(children)) {
    return children.map(extractText).join(' ')
  }
  if (children && typeof children === 'object') {
    if ('props' in children && children.props.children) {
      return extractText(children.props.children)
    }
    if (children.children) {
      return extractText(children.children)
    }
  }
  return ''
}

// Helper function to generate ID from heading text
function generateId(children: any): string {
  const text = extractText(children)
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

const components = {
  // Custom heading components with IDs
  h1: (props: any) => {
    const id = props.id || generateId(props.children)
    return <h1 id={id} {...props} />
  },
  h2: (props: any) => {
    const id = props.id || generateId(props.children)
    return <h2 id={id} {...props} />
  },
  h3: (props: any) => {
    const id = props.id || generateId(props.children)
    return <h3 id={id} {...props} />
  },
  h4: (props: any) => {
    const id = props.id || generateId(props.children)
    return <h4 id={id} {...props} />
  },
  h5: (props: any) => {
    const id = props.id || generateId(props.children)
    return <h5 id={id} {...props} />
  },
  h6: (props: any) => {
    const id = props.id || generateId(props.children)
    return <h6 id={id} {...props} />
  },
  // Handle pre tags - extract code and render with CodeBlock
  // Using a wrapper to prevent p tag wrapping
  pre: (props: any) => {
    const children = props.children
    // MDX structure: <pre><code className="language-xxx">code</code></pre>
    if (children && typeof children === 'object') {
      const codeProps = 'props' in children ? children.props : children
      if (codeProps && codeProps.className) {
        const language = codeProps.className.replace('language-', '') || 'text'
        const code = codeProps.children || children
        // Return fragment with CodeBlock to prevent p wrapping
        return (
          <>
            <CodeBlock code={String(code)} language={language} />
          </>
        )
      }
    }
    // Fallback for other pre content
    return <pre className="overflow-x-auto p-4 rounded-lg bg-gray-900 dark:bg-slate-950 text-gray-100 dark:text-slate-100 text-sm font-mono my-4" {...props} />
  },
  // Handle code tags - inline code only (code blocks handled by pre)
  code: (props: any) => {
    // If it has a language class, it's a code block (should be in pre)
    if (props.className && props.className.includes('language-')) {
      // This shouldn't happen, but handle gracefully by returning the code block
      const language = props.className.replace('language-', '')
      return (
        <>
          <CodeBlock code={String(props.children)} language={language} />
        </>
      )
    }
    // Inline code - keep as code element (valid inside p)
    return <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono" {...props} />
  },
  // Override p to prevent wrapping block elements
  p: (props: any) => {
    // Check if the only child is a pre/code block - if so, don't wrap in p
    const children = props.children
    if (children && typeof children === 'object') {
      // If child is a pre or code block component, render as div
      if (children.type === 'pre' || (children.type && children.type.name === 'CodeBlock')) {
        return <div className="my-4" {...props} />
      }
    }
    return <p {...props} />
  },
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params
  const doc = loadDoc(slug)

  if (!doc) {
    notFound()
  }

  const titleMap: Record<string, string> = {
    'README': 'Overview',
    'COLLECTIONS_GUIDE': 'Collections Guide',
    'IMPLEMENTATION_GUIDE': 'Implementation Guide',
    'PACKAGE_SUMMARY': 'Package Summary',
    'ARCHITECTURE_DIAGRAM': 'Architecture Diagram',
    'GLOBAL_COMMUNITY_ARCHIVES_GUIDE': 'Global Community Archives Guide',
  }

  const title = titleMap[slug] || doc.title || slug.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Suspense fallback={null}>
        <ScrollToAnchor />
      </Suspense>
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/docs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Documentation
          </Link>
        </Button>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
      </div>

      <article className="prose prose-slate dark:prose-invert max-w-none prose-pre:!bg-gray-900 dark:prose-pre:!bg-slate-950 prose-pre:!text-gray-100 dark:prose-pre:!text-slate-100 prose-code:!bg-gray-900 dark:prose-code:!bg-slate-950 prose-code:!text-gray-100 dark:prose-code:!text-slate-100">
        <MDXRemote 
          source={doc.content} 
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [],
              rehypePlugins: [],
            },
          }}
        />
      </article>
    </div>
  )
}

