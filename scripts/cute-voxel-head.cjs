// A finer cube grid gives the chibi face thin frames and readable friendly eyes.
// The soft outline still consists entirely of axis-aligned voxel steps.
const voxelGrid = require('./voxel-grid.cjs')
module.exports = function cuteVoxelHead({ within, polygon, centerX }) {
  const grid=voxelGrid({cell:.0275,origin:[centerX,2.20,.385],within,polygon})
  const fill=(mat,...bounds)=>grid.fill('Cute voxel face',mat,...bounds)
  const pixel=(mat,x,y,z)=>fill(mat,x,x,y,y,z,z)

  // Short rounded chin and full cheeks, with two small ears.
  for(let y=0;y<=27;y++) {
    const radius=y===0?8:y===1?10:y<=3?12:y<=6?13:y<=23?14:y<=26?13:11
    for(let x=-radius;x<radius;x++) {
      const chamfer=Math.max(0,Math.ceil(Math.abs(x+.5)-(radius-2)))
      const front=chamfer+(y<3?2:0),back=23-chamfer
      fill(Math.abs(x+.5)>radius-1.5?'faceSide':'faceSkin',x,x,y,y,front,back)
    }
  }
  fill('faceSkin',-16,-14,11,15,10,13)
  fill('faceSkin',13,15,11,15,10,13)
  fill('earPink',-16,-16,12,14,11,12)
  fill('earPink',15,15,12,14,11,12)

  // A rounded, irregular mop of stepped locks, rather than a flat helmet cap.
  for(let x=-15;x<=14;x++)for(let z=0;z<=25;z++) {
    if(Math.abs(x+.5)>12 && (z<3 || z>22))continue
    const height=31-Math.floor((Math.abs(x+.5)/7.5)**2)-Math.floor((Math.abs(z-12.5)/8.5)**2)
    if(height<24)continue
    fill('softHair',x,x,24,height,z,z)
    if((x>=-9&&x<=-5&&z>=7&&z<=12)||(x>=3&&x<=6&&z>=14&&z<=17))pixel('softHairLight',x,height,z)
  }
  fill('softHairDark',-13,12,13,25,23,25)
  fill('softHair',-15,-13,17,25,4,21)
  fill('softHair',12,14,17,25,4,21)
  fill('softHair',-14,-13,14,18,7,12)
  fill('softHair',12,13,14,18,7,12)
  for(const [x0,x1,y0,y1] of [[-13,-10,22,25],[-10,-6,23,26],[-8,-6,21,24],[-5,-2,25,27],[1,5,24,26],[5,10,23,25],[10,12,21,24]])fill('softHair',x0,x1,y0,y1,-1,1)
  fill('softHairLight',-10,-8,25,25,-2,-2)
  fill('softHairLight',4,6,25,25,-2,-2)
  fill('softHairLight',-15,-15,20,22,10,14)
  fill('softHairLight',14,14,20,22,11,15)

  // Thin, clipped-corner glasses. Lenses use a warm skin tone so the eyes stay clear.
  for(const left of [-12,3]) {
    const inside=(u,v)=>{
      if(v<0||v>7)return false
      const inset=v===0||v===7?2:v===1||v===6?1:0
      return u>=inset&&u<=8-inset
    }
    for(let u=0;u<9;u++)for(let v=0;v<8;v++) {
      if(!inside(u,v))continue
      const rim=[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>!inside(u+dx,v+dy))
      pixel(rim?'softFrame':'warmLens',left+u,12+v,-1)
    }
    // Plain pixel eyes keep the expression relaxed without sparkles.
    fill('cuteEye',left+3,left+5,14,16,-1,-1)
  }
  fill('softFrame',-3,2,16,16,-1,-1)
  fill('softFrame',-14,-13,17,17,0,9)
  fill('softFrame',12,13,17,17,0,9)
  // A flush pixel nose and a restrained, slightly asymmetric smile.
  fill('softBrow',-10,-6,21,21,-1,-1)
  fill('softBrow',5,9,21,21,-1,-1)
  fill('faceNose',-1,0,11,12,-1,-1)
  fill('smile',-2,1,8,8,-1,-1)
  pixel('smile',2,9,-1)
  grid.emit()
}
