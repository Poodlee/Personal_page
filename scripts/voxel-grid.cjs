// Shared occupancy grid. Adjacent cells share a silhouette without internal faces.
module.exports = function voxelGrid({ cell, origin, within, polygon }) {
  const cells = new Map()
  const key = (x,y,z) => `${x},${y},${z}`
  const faces = [
    {d:[-1,0,0],p:[[0,0,0],[0,0,1],[0,1,1],[0,1,0]]},
    {d:[1,0,0],p:[[1,0,0],[1,1,0],[1,1,1],[1,0,1]]},
    {d:[0,-1,0],p:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]]},
    {d:[0,1,0],p:[[0,1,0],[0,1,1],[1,1,1],[1,1,0]]},
    {d:[0,0,-1],p:[[0,0,0],[0,1,0],[1,1,0],[1,0,0]]},
    {d:[0,0,1],p:[[0,0,1],[1,0,1],[1,1,1],[0,1,1]]}
  ]
  return {
    fill(category,mat,x0,x1,y0,y1,z0,z1) {
      for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++)for(let z=z0;z<=z1;z++)
        cells.set(key(x,y,z),{x,y,z,mat,category})
    },
    emit() {
      for(const v of cells.values()) {
        const center=[(v.x+.5)*cell,(v.y+.5)*cell,(v.z+.5)*cell]
        within(v.category,p=>p.map((n,i)=>n+origin[i]),()=>{
          for(const face of faces) {
            if(cells.has(key(v.x+face.d[0],v.y+face.d[1],v.z+face.d[2])))continue
            polygon(v.mat,face.p.map(p=>[(v.x+p[0])*cell,(v.y+p[1])*cell,(v.z+p[2])*cell]),center)
          }
        })
      }
    }
  }
}
