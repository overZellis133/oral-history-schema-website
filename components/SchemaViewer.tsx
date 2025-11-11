'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronRight, ChevronDown, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SchemaProperty {
  type?: string | string[]
  description?: string
  format?: string
  enum?: any[]
  default?: any
  items?: SchemaProperty
  properties?: Record<string, SchemaProperty>
  patternProperties?: Record<string, SchemaProperty>
  required?: string[]
  [key: string]: any
}

interface SchemaNode {
  name: string
  path: string
  property: SchemaProperty
  required?: boolean
}

interface SchemaViewerProps {
  schema: any
  highlight?: string
}

export function SchemaViewer({ schema, highlight }: SchemaViewerProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['root']))
  const [searchQuery, setSearchQuery] = useState('')
  const highlightRef = useRef<string | null>(null)

  // Helper function to highlight text
  const highlightText = (text: string, term: string) => {
    if (!term || !text) return text
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/50 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  // Auto-expand paths that match the highlight term
  useEffect(() => {
    if (highlight && highlight !== highlightRef.current) {
      highlightRef.current = highlight
      
      // Build root nodes for matching
      const buildRootNodes = () => {
        if (!schema.properties) return []
        return Object.entries(schema.properties).map(([key, value]) =>
          renderProperty(
            key,
            value as SchemaProperty,
            key,
            schema.required?.includes(key) || false
          )
        ).flat()
      }
      
      const rootNodes = buildRootNodes()
      const pathsToExpand = new Set<string>(['root'])
      const term = highlight.toLowerCase()

      const findMatchingPaths = (nodes: SchemaNode[], parentPath: string = '') => {
        nodes.forEach((node) => {
          const fullPath = parentPath ? `${parentPath}.${node.path}` : node.path
          if (
            node.name.toLowerCase().includes(term) ||
            node.property.description?.toLowerCase().includes(term)
          ) {
            // Expand all parent paths
            const pathParts = fullPath.split('.')
            let currentPath = ''
            pathParts.forEach((part) => {
              currentPath = currentPath ? `${currentPath}.${part}` : part
              pathsToExpand.add(currentPath)
            })
          }
          // Recursively check children
          if (node.property.properties) {
            const childNodes = Object.entries(node.property.properties).map(([key, value]) => ({
              name: key,
              path: key,
              property: value as SchemaProperty,
              required: node.property.required?.includes(key) || false,
            }))
            findMatchingPaths(childNodes, fullPath)
          }
        })
      }

      findMatchingPaths(rootNodes)
      setExpanded(pathsToExpand)

      // Scroll to first match after a brief delay
      setTimeout(() => {
        const firstMatch = document.querySelector('mark')
        firstMatch?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 300)
    }
  }, [highlight, schema])

  const toggleExpanded = (path: string) => {
    const newExpanded = new Set(expanded)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpanded(newExpanded)
  }

  const renderProperty = (
    name: string,
    property: SchemaProperty,
    path: string,
    required: boolean = false
  ): SchemaNode[] => {
    const nodes: SchemaNode[] = []
    const node: SchemaNode = {
      name,
      path,
      property,
      required,
    }
    nodes.push(node)

    if (property.properties) {
      const requiredFields = property.required || []
      Object.entries(property.properties).forEach(([key, value]) => {
        nodes.push(
          ...renderProperty(
            key,
            value as SchemaProperty,
            `${path}.${key}`,
            requiredFields.includes(key)
          )
        )
      })
    }

    if (property.items?.properties) {
      const requiredFields = property.items.required || []
      Object.entries(property.items.properties).forEach(([key, value]) => {
        nodes.push(
          ...renderProperty(
            `${name}[].${key}`,
            value as SchemaProperty,
            `${path}.items.${key}`,
            requiredFields.includes(key)
          )
        )
      })
    }

    return nodes
  }

  // Build root nodes after renderProperty is defined
  const rootNodes = schema.properties
    ? Object.entries(schema.properties).map(([key, value]) =>
        renderProperty(
          key,
          value as SchemaProperty,
          key,
          schema.required?.includes(key) || false
        )
      ).flat()
    : []

  const filteredNodes = searchQuery
    ? rootNodes.filter((node) =>
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.property.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : rootNodes

  const renderNode = (node: SchemaNode, level: number = 0) => {
    const hasChildren =
      (node.property.properties && Object.keys(node.property.properties).length > 0) ||
      (node.property.items?.properties && Object.keys(node.property.items.properties).length > 0)

    const isExpanded = expanded.has(node.path)
    const type = Array.isArray(node.property.type)
      ? node.property.type.join(' | ')
      : node.property.type || 'any'

    return (
      <div key={node.path} className="border-l-2 border-schema-light dark:border-schema-dark pl-4 ml-2">
        <div
          className={cn(
            "flex items-start gap-2 p-2 rounded-md hover:bg-schema-light/50 dark:hover:bg-schema-dark/20 transition-colors cursor-pointer group",
            level === 0 && "font-semibold"
          )}
          onClick={() => hasChildren && toggleExpanded(node.path)}
        >
          {hasChildren && (
            <button
              className="mt-0.5"
              onClick={(e) => {
                e.stopPropagation()
                toggleExpanded(node.path)
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-schema-primary" />
              ) : (
                <ChevronRight className="h-4 w-4 text-schema-primary" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-4" />}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono font-semibold text-schema-primary">
                {highlight ? highlightText(node.name, highlight) : node.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                {type}
              </span>
              {node.required && (
                <span className="text-xs px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-medium">
                  required
                </span>
              )}
              {node.property.format && (
                <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-mono">
                  {node.property.format}
                </span>
              )}
            </div>

            {node.property.description && (
              <p className="text-sm text-muted-foreground mt-1 flex items-start gap-1">
                <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>{highlight ? highlightText(node.property.description, highlight) : node.property.description}</span>
              </p>
            )}

            {node.property.enum && (
              <div className="mt-1 text-xs text-muted-foreground">
                <span className="font-semibold">Enum:</span>{' '}
                {node.property.enum.map((e: any, i: number) => (
                  <span key={i} className="font-mono bg-muted px-1 rounded mr-1">
                    {String(e)}
                  </span>
                ))}
              </div>
            )}

            {node.property.default !== undefined && (
              <div className="mt-1 text-xs text-muted-foreground">
                <span className="font-semibold">Default:</span>{' '}
                <span className="font-mono bg-muted px-1 rounded">
                  {JSON.stringify(node.property.default)}
                </span>
              </div>
            )}
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="mt-1 ml-4">
            {node.property.properties &&
              Object.entries(node.property.properties).map(([key, value]) => {
                const childPath = `${node.path}.${key}`
                const childRequired = node.property.required?.includes(key) || false
                return renderNode(
                  {
                    name: key,
                    path: childPath,
                    property: value as SchemaProperty,
                    required: childRequired,
                  },
                  level + 1
                )
              })}

            {node.property.items?.properties &&
              Object.entries(node.property.items.properties).map(([key, value]) => {
                const childPath = `${node.path}.items.${key}`
                const items = node.property.items
                const childRequired = items?.required?.includes(key) || false
                return renderNode(
                  {
                    name: `${node.name}[].${key}`,
                    path: childPath,
                    property: value as SchemaProperty,
                    required: childRequired,
                  },
                  level + 1
                )
              })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 h-10 px-4 rounded-md border border-input bg-background text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-1">
        {filteredNodes.length > 0 ? (
          filteredNodes.map((node) => renderNode(node))
        ) : (
          <p className="text-center text-muted-foreground py-8">No properties found</p>
        )}
      </div>
    </div>
  )
}

