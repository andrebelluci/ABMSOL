import fs from 'node:fs'

const file = process.argv[2]
if (!file) process.exit(1)

let src = fs.readFileSync(file, 'utf8')
if (src.includes('__DL_ASSET_BASE__')) {
  console.log('Já patchado:', file)
  process.exit(0)
}

const header = `const __asset = (p) => {
  const base = globalThis.__DL_ASSET_BASE__
  return base && String(p).startsWith('assets/') ? \`\${base}/\${String(p).slice(7)}\` : p
}

`

src = src.replace(/"assets\/([^"]+)"/g, '__asset("assets/$1")')
src = src.replace(/`assets\/([^`]+)`/g, '__asset(`assets/$1`)')

fs.writeFileSync(file, header + src, 'utf8')
console.log('Patchado:', file)
