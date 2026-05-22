export function importWithTimeout<T>(
  loader: () => Promise<T>,
  ms = 12_000,
): Promise<T> {
  return Promise.race([
    loader(),
    new Promise<never>((_, reject) => {
      window.setTimeout(() => reject(new Error('import-timeout')), ms)
    }),
  ])
}
