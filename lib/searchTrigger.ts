// Global search trigger utility
let searchTrigger: (() => void) | null = null

export function setSearchTrigger(trigger: () => void) {
  searchTrigger = trigger
}

export function openSearch() {
  if (searchTrigger) {
    searchTrigger()
  } else {
    // Fallback to custom event
    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('openSearch', { bubbles: true }))
    }
  }
}

