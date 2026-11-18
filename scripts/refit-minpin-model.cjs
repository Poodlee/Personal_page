// Preserve the supplied scene's furniture, layout and baked shadow; edit only
// the breed, laptop finish/logo and the floating notification.
const fs=require('node:fs'),path=require('node:path')
const build=require('./model-builder.cjs')()
const sourcePath=path.join(__dirname,'reference-assets/dog-original.glb')
const file=fs.readFileSync(sourcePath),jsonLength=file.readUInt32LE(12),source=JSON.parse(file.subarray(20,20+jsonLength)),binStart=28+jsonLength
const decoded=JSON.parse(fs.readFileSync(path.join(__dirname,'reference-model.json'),'utf8'))
for(const image of source.images){const v=source.bufferViews[image.bufferView];build.texture(file.subarray(binStart+v.byteOffset,binStart+v.byteOffset+v.byteLength),image.mimeType,image.name||'Original baked texture')}
const palette=build.material('Original furniture / baked palette','ffffff',{texture:0,unlit:true,doubleSided:true})
const shadow=build.material('Original transparent shadow','ffffff',{texture:1,unlit:true,alphaMode:'BLEND',doubleSided:true})
const dog=build.material('Pinscher black coat','292725')
const dogSide=build.material('Pinscher side shade','232322')
const tan=build.material('Pinscher tan markings','bd8954')
const tanLight=build.material('Pinscher warm muzzle','c99b67')
const nose=build.material('Pinscher nose and eyes','11191c')
const sparkle=build.material('Eye sparkle','fff0d6',{unlit:true})
const ear=build.material('Warm inner ears','916143')
const badge=build.material('Notification charcoal','414956',{unlit:true})
const yellow=build.material('Yellow star plus one','ffda47',{unlit:true})

const original=decoded.find(m=>m.name==='main')
const dogIds=new Set([...Array.from({length:11},(_,i)=>i),...Array.from({length:429},(_,i)=>i+54),883,885])
const badgeIds=new Set([...Array.from({length:43},(_,i)=>i+11),884])
const laptopIds=new Set([730,731,732,734,735,736,737,739,740,741,742,743,745,746,747,748,749,750,751,752])
let keptFurniture=0,keptBody=0
for(let t=0;t<original.indices.length/3;t++){
  const ids=original.indices.slice(t*3,t*3+3),p=ids.map(i=>original.positions.slice(i*3,i*3+3)),uv=ids.map(i=>original.uv.slice(i*2,i*2+2))
  if(badgeIds.has(t))continue
  if(dogIds.has(t)){
    if(Math.max(...p.map(v=>v[1]))>2.4002)continue
    const center=[0,1,2].map(a=>p.reduce((s,v)=>s+v[a],0)/3)
    const mat=center[1]<.45 || center[2]>.25 ? tan : dog
    const shade=.60+.40*Math.max(...original.triColors[t].slice(0,3))/255
    build.within('Standing miniature pinscher body',v=>v,()=>build.triangle(mat,...p,undefined,Array(3).fill([shade,shade,shade])))
    keptBody++;continue
  }
  if(laptopIds.has(t)||t===733||t===738)continue
  build.within('Original desk plant and mug',v=>v,()=>build.triangle(palette,...p,uv));keptFurniture++
}
const ground=decoded.find(m=>m.name==='Plane')
build.within('GroundShadow',v=>v,()=>{
  for(let i=0;i<ground.indices.length;i+=3){const ids=ground.indices.slice(i,i+3);build.triangle(shadow,...ids.map(j=>ground.positions.slice(j*3,j*3+3)),ids.map(j=>ground.uv.slice(j*2,j*2+2)))}
})

// Pointed ears, black-and-tan face and a longer muzzle identify the new breed.
const centerX=.186
build.within('Pinscher neck',p=>p,()=>build.box(dog,[centerX,2.29,-.87],[1.2,.72,1.1]))
const grid=require('./voxel-grid.cjs')({cell:.1,origin:[centerX,2.4,-.6],within:build.within,polygon:build.polygon})
const fill=(mat,...bounds)=>grid.fill('Miniature pinscher head',mat,...bounds)
fill(dog,-6,5,0,3,-5,6)
fill(dog,-7,6,4,12,-6,7)
fill(dog,-6,5,13,14,-5,6)
fill(dogSide,-7,-7,5,11,-5,5)
fill(dogSide,6,6,5,11,-5,5)
fill(tan,-6,-4,5,7,7,8)
fill(tan,3,5,5,7,7,8)
fill(tan,-4,3,3,6,7,10)
fill(tanLight,-3,2,3,4,10,10)
fill(nose,-2,1,5,6,11,11)
fill(nose,-1,0,3,4,11,11)
fill(nose,-2,1,3,3,11,11)
fill(nose,-3,-3,4,4,11,11)
fill(nose,2,2,4,4,11,11)
for(const x of [-5,3]){
  fill(nose,x,x+1,9,10,8,8)
  fill(sparkle,x,x,10,10,9,9)
  fill(tan,x,x+2,12,12,8,8)
}
for(const side of [-1,1])for(let y=13;y<=21;y++){
  const width=y<=15?4:y<=17?3:y<=19?2:1
  const x=side<0?-7:7-width
  fill(dog,x,x+width-1,y,y,-3,1)
  if(y>=15&&y<=18){const ix=side<0?-6:5;fill(ear,ix,ix+(y<=16?1:0),y,y,2,2)}
}
grid.emit()

// Custom slim black laptop and right-hand notebook/writing tools.
require('./macbook-and-notebook.cjs')(build)

// Replace the original heart panel completely with a yellow ★ + 1 bubble.
build.within('Yellow star plus one notification',p=>p,()=>{
  build.box(badge,[.186,4.0,2.0],[1.4,.60,.16])
  build.box(badge,[.186,3.64,2.0],[.20,.14,.16])
  const center=[-.22,4.0,2.09],points=[]
  for(let i=0;i<10;i++){const a=Math.PI/2+i*Math.PI/5,r=i%2?.092:.218;points.push([center[0]+Math.cos(a)*r,center[1]+Math.sin(a)*r,center[2]])}
  for(let i=0;i<10;i++)build.triangle(yellow,center,points[i],points[(i+1)%10])
  build.box(yellow,[.24,4.0,2.096],[.26,.055,.018])
  build.box(yellow,[.24,4.0,2.096],[.055,.26,.018])
  build.box(yellow,[.62,3.99,2.096],[.055,.35,.018])
  build.box(yellow,[.58,4.15,2.096],[.13,.055,.018])
  build.box(yellow,[.62,3.82,2.096],[.19,.055,.018])
})
build.save(path.join(__dirname,'../public/dj_park.glb'),'Original dog.glb furniture and shadow retained; standing black-and-tan miniature pinscher, slim satin-black MacBook-style laptop, right-hand spiral notebook, pen and pencil, vivid mint rear waveform and a yellow star + 1 badge. No person or chair.')
console.log(`Preserved ${keptFurniture} original furniture triangles and ${keptBody} original standing-body triangles`)
