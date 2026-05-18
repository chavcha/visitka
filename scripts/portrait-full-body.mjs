import { Jimp } from 'jimp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const inputPath = join(root, 'public', 'portrait-source.png')
const outputPath = join(root, 'public', 'portrait.png')

const image = await Jimp.read(inputPath)
const { width, height } = image.bitmap

image.scan(0, 0, width, height, function (x, y, idx) {
  const r = this.bitmap.data[idx]
  const g = this.bitmap.data[idx + 1]
  const b = this.bitmap.data[idx + 2]

  const isGreenBg =
    g > 65 &&
    g > r + 22 &&
    g > b + 16 &&
    g - Math.max(r, b) > 14

  const isBrightLeaf = g > 130 && g > r + 30 && b < 145

  if (isGreenBg || isBrightLeaf) {
    this.bitmap.data[idx + 3] = 0
  } else if (g > r + 8 && g > b + 8 && g > 90) {
    this.bitmap.data[idx + 3] = Math.min(
      this.bitmap.data[idx + 3],
      Math.max(0, 255 - (g - Math.max(r, b)) * 8),
    )
  }
})

image.blur(2)

await image.write(outputPath)
console.log(`Saved ${outputPath} (${width}x${height})`)
