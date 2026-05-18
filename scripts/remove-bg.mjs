import { removeBackground } from '@imgly/background-removal-node'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const inputPath = join(root, 'public', 'portrait-source.png')
const outputPath = join(root, 'public', 'portrait.png')

const input = readFileSync(inputPath)
const blob = new Blob([input], { type: 'image/png' })
const result = await removeBackground(blob, {
  model: 'medium',
  output: { format: 'image/png', quality: 1 },
})
const buffer = Buffer.from(await result.arrayBuffer())
writeFileSync(outputPath, buffer)
console.log(`Saved ${outputPath} (${buffer.length} bytes)`)
