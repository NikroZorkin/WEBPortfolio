import Replicate from 'replicate'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// ===== НАСТРОЙКИ =====
const OUTPUT_DIR = 'C:\\Cursor Generate IMG'
// Токен читается из переменной окружения REPLICATE_API_TOKEN
// =====================

// Токен передаётся через env (установи в системе или .env.local)
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
})

async function generateImage(prompt: string, filename: string) {
  console.log(`\n🎨 Генерация: "${prompt}"`)
  console.log(`📁 Сохранение: ${OUTPUT_DIR}\\${filename}`)

  try {
    // Создаём папку если нет
    await mkdir(OUTPUT_DIR, { recursive: true })

    const output = await replicate.run('black-forest-labs/flux-2-pro', {
      input: {
        prompt,
        aspect_ratio: '16:9',
        output_format: 'webp',
        output_quality: 90,
        safety_tolerance: 2,
        prompt_upsampling: true,
      },
    })

    // Flux 2.0 Pro возвращает FileOutput с методом url()
    const imageUrl = typeof output === 'string' ? output : (output as any).url()
    console.log(`🔗 URL: ${imageUrl}`)

    // Скачиваем и сохраняем
    const response = await fetch(imageUrl)
    const buffer = Buffer.from(await response.arrayBuffer())

    const outputPath = path.join(OUTPUT_DIR, filename)
    await writeFile(outputPath, buffer)

    console.log(`\n✅ ГОТОВО: ${outputPath}`)
    return outputPath
  } catch (error) {
    console.error('\n❌ Ошибка:', error)
    throw error
  }
}

// CLI: npx tsx scripts/generate-image.ts "prompt" "filename.webp"
const args = process.argv.slice(2)
const prompt = args[0]
const filename = args[1] || `generated-${Date.now()}.webp`

if (!prompt) {
  console.log(`
Использование: npx tsx scripts/generate-image.ts "промпт" "файл.webp"

Примеры:
  npx tsx scripts/generate-image.ts "anime girl gothic style" "anime.webp"
  npx tsx scripts/generate-image.ts "minimalist dark background" "bg.webp"

Изображения сохраняются в: ${OUTPUT_DIR}
`)
  process.exit(1)
}

generateImage(prompt, filename)
