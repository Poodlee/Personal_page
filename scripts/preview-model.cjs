const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')
const root = path.resolve(__dirname, '..')
const reference = process.argv[2] ? path.resolve(process.argv[2]) : null
http.createServer((req, res) => {
  if(req.method === 'POST' && req.url === '/reference-data') {
    const chunks=[]
    req.on('data',c=>chunks.push(c))
    req.on('end',()=>{fs.writeFileSync(path.join(__dirname,'reference-model.json'),Buffer.concat(chunks));res.end('Saved')})
    return
  }
  if (req.method === 'POST' && req.url === '/capture') {
    const chunks=[]
    req.on('data', c=>chunks.push(c))
    req.on('end',()=>{fs.writeFileSync(path.join(root,'doc/workspace-preview.png'),Buffer.concat(chunks));res.end('Saved')})
    return
  }
  const url = new URL(req.url, 'http://127.0.0.1:4318')
  const file=url.pathname==='/' ? path.join(__dirname,'preview-model.html') : url.pathname==='/inspect-reference' ? path.join(__dirname,'inspect-reference.html') : url.pathname==='/dj_park.glb' ? path.join(root,'public/dj_park.glb') : url.pathname==='/workspace-view.js' ? path.join(root,'public/workspace-view.js') : url.pathname==='/reference.glb' ? reference : null
  if (!file) {res.writeHead(404);res.end();return}
  res.setHeader('Content-Type',file.endsWith('.glb')?'model/gltf-binary':file.endsWith('.js')?'text/javascript':'text/html; charset=utf-8')
  res.setHeader('Cache-Control','no-store')
  const stream = fs.createReadStream(file)
  stream.on('error', () => {res.writeHead(404);res.end('File not found')})
  stream.pipe(res)
}).listen(4318,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4318'))
