const fs=require('node:fs')
const rgb=hex=>hex.match(/\w\w/g).map(v=>parseInt(v,16)/255).map(s=>s<=.04045?s/12.92:((s+.055)/1.055)**2.4)
const add=(a,b)=>a.map((v,i)=>v+b[i]),sub=(a,b)=>a.map((v,i)=>v-b[i])
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0)
const norm=a=>a.map(v=>v/(Math.hypot(...a)||1))
module.exports=function modelBuilder(){
  const materials=[],batches=new Map(),textures=[]
  let name='Scene',transform=p=>p
  const material=(name,hex,options={})=>{
    const {texture,unlit,glow=0,roughness=.85,metalness=0,...extras}=options
    const m={name,pbrMetallicRoughness:{baseColorFactor:[...rgb(hex),1],roughnessFactor:roughness,metallicFactor:metalness,...(texture!==undefined?{baseColorTexture:{index:texture}}:{})},...extras}
    if(unlit)m.extensions={KHR_materials_unlit:{}}
    if(glow)m.emissiveFactor=rgb(hex).map(v=>v*glow)
    materials.push(m);return materials.length-1
  }
  const triangle=(mat,a,b,c,uv,colors)=>{
    const key=name+'/'+mat
    if(!batches.has(key))batches.set(key,{name,mat,p:[],n:[],uv:[],color:[]})
    const data=batches.get(key),p=[a,b,c].map(transform),n=norm(cross(sub(p[1],p[0]),sub(p[2],p[0])))
    if(Math.hypot(...cross(sub(p[1],p[0]),sub(p[2],p[0])))<1e-10)return
    data.p.push(...p.flat());data.n.push(...n,...n,...n)
    if(uv)data.uv.push(...uv.flat())
    if(colors)data.color.push(...colors.flat())
  }
  const polygon=(mat,points,center)=>{
    let p=points
    const average=p.reduce((a,v)=>add(a,v),[0,0,0]).map(v=>v/p.length)
    if(dot(cross(sub(p[1],p[0]),sub(p[2],p[0])),sub(average,center))<0)p=[...p].reverse()
    for(let i=1;i<p.length-1;i++)triangle(mat,p[0],p[i],p[i+1])
  }
  const within=(nextName,frame,cb)=>{const oldName=name,oldTransform=transform;name=nextName;transform=p=>oldTransform(frame(p));cb();name=oldName;transform=oldTransform}
  const box=(mat,c,s)=>{
    const p=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(v=>add(c,v.map((n,i)=>n*s[i]/2)))
    for(const q of [[0,3,2,1],[4,5,6,7],[0,4,7,3],[1,2,6,5],[3,7,6,2],[0,1,5,4]])polygon(mat,q.map(i=>p[i]),c)
  }
  const line=(mat,points,width)=>{
    for(let i=1;i<points.length;i++){
      const a=points[i-1],b=points[i],axis=norm(sub(b,a)),u=norm(cross(axis,Math.abs(axis[1])>.9?[1,0,0]:[0,1,0])),v=cross(axis,u)
      const ring=p=>[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,y])=>add(p,add(u.map(n=>n*x*width/2),v.map(n=>n*y*width/2))))
      const r=ring(a),s=ring(b),center=add(a,b).map(n=>n/2)
      polygon(mat,r,center);polygon(mat,s,center)
      for(let j=0;j<4;j++)polygon(mat,[r[j],r[(j+1)%4],s[(j+1)%4],s[j]],center)
    }
  }
  const chamferBox=(mat,c,size,bevel)=>{
    const h=size.map(s=>s/2),b=Math.min(bevel,...h.map(v=>v*.8))
    for(let a=0;a<3;a++)for(const sign of [-1,1]){
      const j=(a+1)%3,k=(a+2)%3
      polygon(mat,[[-1,-1],[1,-1],[1,1],[-1,1]].map(([s,t])=>{const p=[0,0,0];p[a]=sign*h[a];p[j]=s*(h[j]-b);p[k]=t*(h[k]-b);return add(c,p)}),c)
    }
    for(let a=0;a<3;a++)for(const sj of [-1,1])for(const sk of [-1,1]){
      const j=(a+1)%3,k=(a+2)%3
      polygon(mat,[[-1,0],[-1,1],[1,1],[1,0]].map(([sa,t])=>{const p=[0,0,0];p[a]=sa*(h[a]-b);p[j]=sj*(h[j]-(t?b:0));p[k]=sk*(h[k]-(t?0:b));return add(c,p)}),c)
    }
    for(const x of [-1,1])for(const y of [-1,1])for(const z of [-1,1]){
      const signs=[x,y,z]
      polygon(mat,[0,1,2].map(a=>add(c,signs.map((s,i)=>s*(h[i]-(i===a?0:b))))),c)
    }
  }
  const texture=(buffer,mime,name)=>{textures.push({buffer,mime,name});return textures.length-1}
  const save=(output,description)=>{
    const chunks=[],bufferViews=[],accessors=[],meshes=[],nodes=[];let bytes=0
    const view=(buf,target)=>{const index=bufferViews.push({buffer:0,byteOffset:bytes,byteLength:buf.length,...(target?{target}:{})})-1;const padded=Buffer.concat([buf,Buffer.alloc((4-buf.length%4)%4)]);chunks.push(padded);bytes+=padded.length;return index}
    const accessor=(values,type,indices=false)=>{
      const a=indices?new Uint16Array(values):new Float32Array(values),dims=type==='VEC3'?3:type==='VEC2'?2:1
      const spec={bufferView:view(Buffer.from(a.buffer),indices?34963:34962),componentType:indices?5123:5126,count:values.length/dims,type}
      if(type==='VEC3'){spec.min=[Infinity,Infinity,Infinity];spec.max=[-Infinity,-Infinity,-Infinity];for(let i=0;i<values.length;i++){spec.min[i%3]=Math.min(spec.min[i%3],values[i]);spec.max[i%3]=Math.max(spec.max[i%3],values[i])}}
      return accessors.push(spec)-1
    }
    for(const b of batches.values()){
      const p=[],n=[],uv=[],color=[],indices=[],lookup=new Map()
      for(let i=0;i<b.p.length/3;i++){
        const v=b.p.slice(i*3,i*3+3),normal=b.n.slice(i*3,i*3+3),tex=b.uv.length?b.uv.slice(i*2,i*2+2):[],c=b.color.length?b.color.slice(i*3,i*3+3):[]
        const key=[...v,...normal,...tex,...c].map(n=>n.toFixed(6)).join(',')
        if(!lookup.has(key)){lookup.set(key,p.length/3);p.push(...v);n.push(...normal);uv.push(...tex);color.push(...c)}
        indices.push(lookup.get(key))
      }
      if(p.length/3>65535)throw Error('Material batch too large for Uint16 indices')
      const attributes={POSITION:accessor(p,'VEC3'),NORMAL:accessor(n,'VEC3')}
      if(uv.length)attributes.TEXCOORD_0=accessor(uv,'VEC2')
      if(color.length)attributes.COLOR_0=accessor(color,'VEC3')
      const mesh=meshes.push({name:b.name,primitives:[{attributes,indices:accessor(indices,'SCALAR',true),material:b.mat}]})-1
      nodes.push({name:b.name,mesh})
    }
    const images=textures.map(t=>({name:t.name,bufferView:view(t.buffer),mimeType:t.mime}))
    const webp=textures.some(t=>t.mime==='image/webp')
    const gltf={asset:{version:'2.0',generator:'Reference-based miniature pinscher scene v7'},scene:0,scenes:[{name:'Miniature pinscher at work',nodes:nodes.map((_,i)=>i)}],nodes,meshes,materials,accessors,bufferViews,buffers:[{byteLength:bytes}],images,samplers:[{magFilter:9729,minFilter:9987,wrapS:33071,wrapT:33071}],textures:textures.map((t,i)=>t.mime==='image/webp'?{sampler:0,extensions:{EXT_texture_webp:{source:i}}}:{source:i,sampler:0}),extensionsUsed:['KHR_materials_unlit',...(webp?['EXT_texture_webp']:[])],...(webp?{extensionsRequired:['EXT_texture_webp']}:{}),extras:{description,reference:'User-provided dog.glb; original desk, plant, mug and ground shadow retained',version:7}}
    let json=Buffer.from(JSON.stringify(gltf));json=Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,32)])
    const bin=Buffer.concat(chunks),header=Buffer.alloc(12),jh=Buffer.alloc(8),bh=Buffer.alloc(8)
    header.writeUInt32LE(0x46546c67);header.writeUInt32LE(2,4);header.writeUInt32LE(28+json.length+bin.length,8)
    jh.writeUInt32LE(json.length);jh.writeUInt32LE(0x4e4f534a,4);bh.writeUInt32LE(bin.length);bh.writeUInt32LE(0x004e4942,4)
    fs.writeFileSync(output,Buffer.concat([header,jh,json,bh,bin]))
    console.log(`Created ${output}: ${(fs.statSync(output).size/1024).toFixed(0)} KB, ${[...batches.values()].reduce((s,b)=>s+b.p.length/9,0)} triangles`)
  }
  return {material,texture,triangle,polygon,within,box,chamferBox,line,save}
}
