'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Search as SearchIcon, X, FileJson, BookOpen, FolderTree } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setSearchTrigger } from '@/lib/searchTrigger'

interface SearchResult {
  type: 'schema' | 'example' | 'doc'
  title: string
  description?: string
  href: string
  matches?: string[]
}

export function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsOpen(true)
      }
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // Register global trigger function
  useEffect(() => {
    setSearchTrigger(() => setIsOpen(true))
    return () => {
      setSearchTrigger(null as any)
    }
  }, [])

  // Handle custom openSearch event (fallback)
  useEffect(() => {
    const handleOpenSearchEvent = () => {
      setIsOpen(true)
    }

    document.addEventListener('openSearch', handleOpenSearchEvent)
    
    return () => {
      document.removeEventListener('openSearch', handleOpenSearchEvent)
    }
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the input is rendered
      setTimeout(() => {
        const input = document.getElementById('search-input') as HTMLInputElement
        input?.focus()
      }, 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        signal: controller.signal
      })
        .then(res => res.json())
        .then(data => {
          setResults(data.results || [])
          setIsLoading(false)
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            console.error('Search error:', err)
            setIsLoading(false)
          }
        })
    }, 300) // Debounce search

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [query])

  const handleResultClick = (href: string, searchTerm: string) => {
    // Add search query as URL parameter for highlighting
    const url = new URL(href, window.location.origin)
    if (searchTerm.trim()) {
      url.searchParams.set('highlight', searchTerm.trim())
    }
    router.push(url.pathname + url.search)
    setIsOpen(false)
    setQuery('')
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'schema':
        return <FolderTree className="h-4 w-4" />
      case 'example':
        return <FileJson className="h-4 w-4" />
      case 'doc':
        return <BookOpen className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleOpenSearch = () => {
    setIsOpen(true)
  }

  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] px-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div 
        className="relative w-full max-w-2xl bg-background border rounded-lg shadow-lg z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b px-4">
          <SearchIcon className="h-5 w-5 text-muted-foreground mr-2" />
          <Input
            id="search-input"
            type="text"
            placeholder="Search schemas, examples, docs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="ml-2 p-1 hover:bg-muted rounded"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
                  {results.map((result, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleResultClick(result.href, query)}
                      className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors"
                    >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-muted-foreground">
                      {getIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{result.title}</div>
                      {result.description && (
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {result.description}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground mt-1">
                        {result.type}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="p-8 text-center text-muted-foreground">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              Start typing to search...
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={handleOpenSearch}
          className="flex items-center gap-2 px-3 py-2 rounded-md border border-input bg-background hover:bg-accent text-sm text-muted-foreground"
        >
          <SearchIcon className="h-4 w-4" />
          <span className="hidden md:inline">Search...</span>
          <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>
      {typeof window !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  )
}

