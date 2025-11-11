'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronRight, ChevronDown, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface JsonViewerProps {
  data: any
  title?: string
  defaultExpanded?: boolean
  highlight?: string
}

export function JsonViewer({ data, title, defaultExpanded = false, highlight }: JsonViewerProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    defaultExpanded ? new Set(['root']) : new Set()
  )
  const [copied, setCopied] = useState(false)
  const highlightRef = useRef<string | null>(null)

  // Helper function to highlight text
  const highlightText = (text: string, term: string) => {
    if (!term || !text) return text
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = String(text).split(regex)
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

  // Auto-expand paths that contain the highlight term
  useEffect(() => {
    if (highlight && highlight !== highlightRef.current) {
      highlightRef.current = highlight
      const pathsToExpand = new Set<string>(['root'])
      const term = highlight.toLowerCase()

      const findMatchingPaths = (obj: any, path: string = 'root') => {
        if (typeof obj === 'object' && obj !== null) {
          if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
              const itemPath = `${path}[${index}]`
              if (JSON.stringify(item).toLowerCase().includes(term)) {
                pathsToExpand.add(path)
                pathsToExpand.add(itemPath)
              }
              findMatchingPaths(item, itemPath)
            })
          } else {
            Object.keys(obj).forEach((key) => {
              const keyPath = path === 'root' ? key : `${path}.${key}`
              const value = obj[key]
              
              if (
                key.toLowerCase().includes(term) ||
                (typeof value === 'string' && value.toLowerCase().includes(term)) ||
                (typeof value === 'object' && JSON.stringify(value).toLowerCase().includes(term))
              ) {
                // Expand all parent paths
                const pathParts = keyPath.split('.')
                let currentPath = 'root'
                pathParts.forEach((part) => {
                  if (part !== 'root') {
                    currentPath = currentPath === 'root' ? part : `${currentPath}.${part}`
                    pathsToExpand.add(currentPath)
                  }
                })
              }
              findMatchingPaths(value, keyPath)
            })
          }
        }
      }

      findMatchingPaths(data)
      setExpanded(pathsToExpand)

      // Scroll to first match after a brief delay
      setTimeout(() => {
        const firstMatch = document.querySelector('mark')
        firstMatch?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 300)
    }
  }, [highlight, data])

  const toggleExpanded = (path: string) => {
    const newExpanded = new Set(expanded)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpanded(newExpanded)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const renderValue = (value: any, path: string, key?: string): React.ReactNode => {
    if (value === null) {
      return <span className="text-gray-500 font-mono">null</span>
    }

    if (value === undefined) {
      return <span className="text-gray-400 font-mono">undefined</span>
    }

    const type = Array.isArray(value) ? 'array' : typeof value

    if (type === 'object' && !Array.isArray(value)) {
      const keys = Object.keys(value)
      const isExpanded = expanded.has(path)
      const hasChildren = keys.length > 0

      return (
        <div className="ml-4">
          <div className="flex items-center gap-1">
            {hasChildren && (
              <button
                onClick={() => toggleExpanded(path)}
                className="p-0.5 hover:bg-muted rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
            )}
            {!hasChildren && <div className="w-4" />}
            <span className="text-gray-600 dark:text-gray-400">{'{'}</span>
            {!isExpanded && hasChildren && (
              <span className="text-gray-400 text-sm ml-1">
                {keys.length} {keys.length === 1 ? 'key' : 'keys'}...
              </span>
            )}
            <span className="text-gray-600 dark:text-gray-400">{'}'}</span>
          </div>

          {isExpanded && (
            <div className="ml-6 mt-1 space-y-1">
              {keys.map((k) => (
                <div key={k} className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-mono font-semibold">
                    {highlight ? highlightText(`"${k}":`, highlight) : `"${k}":`}
                  </span>
                  <div className="flex-1">{renderValue(value[k], `${path}.${k}`, k)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    if (type === 'array') {
      const isExpanded = expanded.has(path)
      const hasItems = value.length > 0

      return (
        <div className="ml-4">
          <div className="flex items-center gap-1">
            {hasItems && (
              <button
                onClick={() => toggleExpanded(path)}
                className="p-0.5 hover:bg-muted rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
            )}
            {!hasItems && <div className="w-4" />}
            <span className="text-gray-600 dark:text-gray-400">{'['}</span>
            {!isExpanded && hasItems && (
              <span className="text-gray-400 text-sm ml-1">
                {value.length} {value.length === 1 ? 'item' : 'items'}...
              </span>
            )}
            <span className="text-gray-600 dark:text-gray-400">{']'}</span>
          </div>

          {isExpanded && (
            <div className="ml-6 mt-1 space-y-1">
              {value.map((item: any, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-gray-500 font-mono text-sm">[{index}]:</span>
                  <div className="flex-1">{renderValue(item, `${path}[${index}]`)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    if (type === 'string') {
      const stringValue = String(value)
      return (
        <span className="text-green-600 dark:text-green-400 font-mono">
          "{highlight ? highlightText(stringValue, highlight) : stringValue}"
        </span>
      )
    }

    if (type === 'number') {
      return <span className="text-purple-600 dark:text-purple-400 font-mono">{value}</span>
    }

    if (type === 'boolean') {
      return (
        <span className="text-orange-600 dark:text-orange-400 font-mono">
          {String(value)}
        </span>
      )
    }

    return <span className="font-mono">{String(value)}</span>
  }

  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      {(title || true) && (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
          <h3 className="font-semibold text-sm">{title || 'JSON Data'}</h3>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title="Copy JSON"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        </div>
      )}
      <div className="p-4 overflow-auto max-h-[600px] font-mono text-sm">
        <pre className="whitespace-pre-wrap">
          {renderValue(data, 'root')}
        </pre>
      </div>
    </div>
  )
}

