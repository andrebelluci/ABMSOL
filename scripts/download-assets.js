/**
 * Template para baixar assets do site atual do cliente para public/
 * Edite a lista `assets` e rode: npm run download:assets
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

const assets = [
  // { url: 'https://exemplo.com.br/wp-content/uploads/logo.png', dest: 'public/images/logo/logo.png' },
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '..', dest)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })

    const file = fs.createWriteStream(filePath)
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close()
          fs.unlinkSync(filePath)
          return download(res.headers.location, dest).then(resolve).catch(reject)
        }
        if (res.statusCode !== 200) {
          file.close()
          reject(new Error(`${url} → HTTP ${res.statusCode}`))
          return
        }
        res.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve(dest)
        })
      })
      .on('error', reject)
  })
}

async function main() {
  if (!assets.length) {
    console.log('Nenhum asset configurado. Edite scripts/download-assets.js')
    return
  }

  let ok = 0
  let fail = 0

  for (const asset of assets) {
    try {
      await download(asset.url, asset.dest)
      console.log(`✅ ${asset.dest}`)
      ok++
    } catch (err) {
      console.error(`❌ ${asset.dest}: ${err.message}`)
      fail++
    }
  }

  console.log(`\nConcluído: ${ok} ok, ${fail} falhas`)
  if (fail) process.exit(1)
}

main()
