const prefetched = new Set<string>()

export function prefetchUrl(href: string) {
  if (!href.startsWith('http')) return
  if (prefetched.has(href)) return

  prefetched.add(href)
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  link.as = 'document'
  document.head.append(link)
}

export function prefetchIntentHandlers(href: string | undefined) {
  if (!href?.startsWith('http')) return {}

  return {
    onMouseEnter: () => prefetchUrl(href),
    onFocus: () => prefetchUrl(href),
  }
}
