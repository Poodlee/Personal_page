// A cube occupancy model, not a faceted anatomical mesh. Every visible face
// lies on a shared grid; internal faces are omitted, including hand/dog contact.
module.exports = function createVoxelCharacters({ within, block, polygon, centerX }) {
  const grid = require('./voxel-grid.cjs')({cell:.055,origin:[centerX,.004,0],within,polygon})
  let category = 'Voxel researcher'
  function fill(mat,x0,x1,y0,y1,z0,z1) {
    grid.fill(category,mat,x0,x1,y0,y1,z0,z1)
  }
  const pixel = (mat,x,y,z) => fill(mat,x,x,y,y,z,z)

  // One near-black material across the seat, thighs, shins and cuffs.
  fill('blackPants',-5,4,23,25,9,17)
  for(const x of [-5,1]) {
    fill('blackPants',x,x+3,22,24,2,14)
    fill('blackPants',x,x+3,3,22,0,4)
    fill('sole',x-1,x+4,0,0,-3,5)
    fill('glasses',x-1,x+4,1,2,-3,5)
    fill('coatLight',x,x+3,2,3,-2,4)
    fill('coatShade',x,x+3,2,2,-3,-3)
    fill('glasses',x+1,x+2,3,3,0,2)
    fill('coatLight',x+1,x+2,3,3,1,1)
  }

  // A deliberately simple, broad white coat. Its silhouette steps by cubes.
  fill('coat',-6,5,25,35,10,17)
  fill('coat',-7,6,33,36,11,16)
  fill('coatShade',-6,-6,26,34,10,17)
  fill('coatShade',5,5,26,34,10,17)
  fill('coatLight',-5,4,25,26,9,9)
  fill('coatShade',-6,5,24,24,10,17)
  fill('shirtBlue',-1,0,29,35,9,9)
  fill('skin',-2,1,36,40,12,15)
  fill('coatLight',-4,-2,35,37,9,12)
  fill('coatLight',1,3,35,37,9,12)
  fill('coatShade',-4,-3,34,34,9,9)
  fill('coatShade',2,3,34,34,9,9)
  // A block-pixel orange lanyard, echoing the supplied character illustration.
  for(const [x,y] of [[-3,35],[-3,34],[-2,33],[-2,32],[-1,31],[-1,30],[2,35],[2,34],[1,33],[1,32],[0,31],[0,30]])pixel('orange',x,y,8)
  fill('badge',-1,0,27,29,8,8)
  fill('coatLight',-1,0,27,28,7,7)
  pixel('shirtBlue',-1,28,6)
  fill('coatShade',-5,-3,28,29,9,9)
  fill('coatLight',-5,-3,29,29,8,8)

  // Stepped, short sleeves and mitten hands cradle the dog on both sides.
  for(const side of [-1,1]) {
    const range=(a,b)=>side<0?[-b-1,-a-1]:[a,b]
    let [a,b]=range(6,8);fill('coat',a,b,30,35,11,16)
    ;[a,b]=range(7,9);fill('coat',a,b,27,32,9,14)
    ;[a,b]=range(6,8);fill('coatLight',a,b,27,29,5,10)
    ;[a,b]=range(4,6);fill('coatLight',a,b,27,29,3,7)
    ;[a,b]=range(4,4);fill('coatShade',a,b,27,29,3,6)
    ;[a,b]=range(2,3);fill('skin',a,b,28,29,2,5)
    ;[a,b]=range(2,3);fill('skinShade',a,b,27,27,3,4)
    ;[a,b]=range(8,9);fill('coatShade',a,b,27,28,10,13)
  }

  // A voxel miniature pinscher: the body, muzzle and paws all point toward -Z.
  category='Voxel miniature pinscher'
  fill('dog',-3,2,26,29,5,10)
  fill('dog',-2,1,29,34,3,7)
  fill('dogShade',-3,-3,27,29,6,9)
  fill('dogShade',2,2,27,29,6,9)
  for(const x of [-3,1]) {
    fill('dog',x,x+1,27,32,2,4)
    fill('tan',x,x+1,26,27,1,3)
    fill('tanLight',x,x+1,26,26,0,2)
  }
  fill('tan',-1,0,29,32,2,2)
  fill('dog',-2,1,33,35,2,5)
  fill('dog',-3,2,34,38,0,5)
  fill('dog',-2,1,33,34,0,4)
  fill('dogShade',-3,-3,35,37,1,4)
  fill('dogShade',2,2,35,37,1,4)
  fill('tan',-2,1,34,35,-2,-1)
  fill('tanLight',-1,0,33,33,-2,0)
  fill('nose',-1,0,35,35,-3,-3)
  for(const x of [-2,1]) {
    pixel('tan',x,38,-1)
    pixel('eye',x,37,-1)
    pixel('white',x,37,-2)
  }
  // Small dark pupils remain dark at homepage size; a one-voxel highlight sits beside them.
  pixel('eye',-2,37,-2);pixel('eye',1,37,-2)
  pixel('tanLight',-2,36,-1);pixel('tanLight',1,36,-1)
  for(const side of [-1,1]) {
    const x=side<0?-3:1
    fill('dog',x,x+1,39,40,3,5)
    fill('dog',side<0?-3:2,side<0?-3:2,41,42,4,5)
    fill('ear',side<0?-2:1,side<0?-2:1,39,40,2,2)
  }
  // Short stepped tail along the lap rather than a floating diagonal appendage.
  fill('dog',2,4,27,27,9,10)
  fill('dog',4,4,28,29,9,10)

  grid.emit()
  require('./cute-voxel-head.cjs')({within,polygon,centerX})

  // Chair centered on the desk, facing exactly the same way as both characters.
  within('Chair',p=>[p[0]+centerX,p[1],p[2]+.83],()=>{
    block('chair',[0,1.08,0],[1.03,.13,.9])
    block('seat',[0,1.17,-.015],[.94,.07,.82])
    for(const x of [-.43,.43])for(const z of [-.35,.35])block('woodDark',[x,.54,z],[.075,1.08,.075])
    for(const x of [-.45,.45])block('chair',[x,1.55,.4],[.07,.93,.07])
    block('chair',[0,1.91,.4],[.98,.19,.075])
    for(const x of [-.25,0,.25])block('chair',[x,1.47,.4],[.04,.56,.055])
  })
}
