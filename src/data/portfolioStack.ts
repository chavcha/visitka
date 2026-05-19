export type StackItem = {
  name: string
  size: 'lg' | 'md' | 'sm'
}

/** Stack used to build https://chavcha.github.io/visitka/ */
export const PORTFOLIO_STACK: StackItem[] = [
  { name: 'React 19', size: 'lg' },
  { name: 'TypeScript', size: 'md' },
  { name: 'Vite 8', size: 'md' },
  { name: 'Three.js', size: 'md' },
  { name: 'CSS', size: 'md' },
  { name: 'GitHub Pages', size: 'sm' },
  { name: 'GitHub Actions', size: 'sm' },
]

export const PORTFOLIO_STACK_LINE = PORTFOLIO_STACK.map((item) => item.name).join(
  ' · ',
)
