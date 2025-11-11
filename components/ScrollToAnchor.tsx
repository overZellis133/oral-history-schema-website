'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export function ScrollToAnchor() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash
    if (hash) {
      // Remove the # and decode
      const id = decodeURIComponent(hash.substring(1))
      
      // Try multiple ID formats that might be generated from headings
      const possibleIds = [
        id,
        id.toLowerCase(),
        id.toLowerCase().replace(/\s+/g, '-'),
        id.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ]
      
      // Wait for content to render
      setTimeout(() => {
        for (const possibleId of possibleIds) {
          const element = document.getElementById(possibleId)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            // Add a highlight effect
            element.classList.add('highlight-anchor')
            setTimeout(() => {
              element.classList.remove('highlight-anchor')
            }, 2000)
            break
          }
        }
        
        // If no exact match, try to find headings that contain the text
        if (!document.getElementById(id)) {
          const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
          const searchText = id.toLowerCase().replace(/[^a-z0-9]+/g, ' ')
          
          for (const heading of Array.from(headings)) {
            const headingText = heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, ' ') || ''
            if (headingText.includes(searchText) || searchText.includes(headingText)) {
              heading.scrollIntoView({ behavior: 'smooth', block: 'start' })
              heading.classList.add('highlight-anchor')
              setTimeout(() => {
                heading.classList.remove('highlight-anchor')
              }, 2000)
              break
            }
          }
        }
      }, 100)
    }
  }, [searchParams])
  
  return null
}

