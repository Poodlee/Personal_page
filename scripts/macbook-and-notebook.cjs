module.exports=function macbookAndNotebook(build){
  const black=build.material('MacBook style / satin black aluminum','191b20',{roughness:.48,metalness:.28})
  const edge=build.material('MacBook style / beveled black edges','35383f',{roughness:.42,metalness:.35})
  const rubber=build.material('Rubber feet','111316')
  const key=build.material('Black keyboard keycaps','101216',{roughness:.8})
  const keyPrint=build.material('Keyboard legends','afb3b8',{unlit:true})
  const screen=build.material('Dark laptop screen','101d25',{unlit:true})
  const trackpad=build.material('Large black glass trackpad','282b32',{roughness:.38,metalness:.10})
  const wave=build.material('High contrast mint waveform','63ffda',{unlit:true})
  const mutedBlue=build.material('Screen secondary signals','8dbce0',{unlit:true})
  const cover=build.material('Notebook dark cover','354451')
  const paper=build.material('Notebook warm paper','f0e7cf')
  const pages=build.material('Notebook page edges','cec6b4')
  const ruling=build.material('Notebook pale ruling','acaeaa')
  const binding=build.material('Notebook spiral binding','555b63',{roughness:.4,metalness:.5})
  const metal=build.material('Pen metal details','a8adb6',{roughness:.3,metalness:.6})
  const pencil=build.material('Pencil golden barrel','c99b49')
  const tip=build.material('Pencil wood tip','debd87')

  // Thin aluminum chassis with a large palm rest, not the original thick block.
  build.within('Slim black MacBook style base',p=>p,()=>{
    for(const x of [-.63,1.00])for(const z of [.73,1.77])build.box(rubber,[x,1.727,z],[.13,.054,.13])
    build.chamferBox(edge,[.186,1.80,1.30],[2.20,.10,1.60],.035)
    build.chamferBox(black,[.186,1.852,1.30],[2.12,.012,1.51],.005)
    // Trackpad rim and inset, centered on the palm rest.
    build.chamferBox(edge,[.186,1.862,.83],[.85,.009,.35],.004)
    build.chamferBox(trackpad,[.186,1.868,.83],[.815,.007,.319],.003)
    for(let row=0;row<5;row++)for(let col=0;col<14;col++){
      const x=-.69+col*.135,z=1.12+row*.135
      build.chamferBox(key,[x,1.868,z],[.105,.021,.095],.007)
      if(row<4)build.box(keyPrint,[x-.02,1.880,z+.015],[.014,.002,.018])
    }
    build.chamferBox(key,[.186,1.882,1.115],[.56,.012,.093],.004)
    // Fine side speaker perforations and two small USB-C style slots.
    for(const x of [-.82,1.19])for(let i=0;i<12;i++)build.box(rubber,[x,1.861,1.11+i*.056],[.035,.003,.015])
    for(const z of [1.41,1.63])build.box(rubber,[-.916,1.805,z],[.008,.025,.12])
    build.box(edge,[.186,1.852,.497],[.34,.008,.012])
    build.box(rubber,[.186,1.885,1.87],[1.60,.06,.07])
  })

  // A lightly reclined, thin screen lid with rounded/chamfered corners.
  const a=12*Math.PI/180,c=Math.cos(a),s=Math.sin(a)
  const lid=p=>[.186+p[0],1.872+c*p[1]-s*p[2],1.875+s*p[1]+c*p[2]]
  build.within('Thin black MacBook style lid',lid,()=>{
    build.chamferBox(edge,[0,.765,0],[2.20,1.53,.07],.028)
    build.chamferBox(black,[0,.765,.037],[2.11,1.44,.009],.004)
    build.chamferBox(screen,[0,.775,-.039],[2.055,1.365,.009],.004)
    build.chamferBox(rubber,[0,1.435,-.048],[.20,.075,.008],.003)
    build.box(metal,[0,1.445,-.054],[.014,.014,.004])
    // Preserve the requested bright waveform as the personal mark on the lid.
    const trace=[[-.78,.74,.051],[-.52,.74,.051],[-.43,.81,.051],[-.32,.65,.051],[-.20,1.02,.051],[-.09,.47,.051],[.03,.74,.051],[.27,.74,.051],[.39,.82,.051],[.52,.74,.051],[.78,.74,.051]]
    build.line(wave,trace,.035)
    for(let row=0;row<3;row++){
      const points=[]
      for(let i=0;i<=56;i++)points.push([-.88+i*.031, .36+row*.33+Math.sin(i*.38+row)*.065,-.052])
      build.line(row===1?mutedBlue:wave,points,.015)
    }
  })

  // Right-hand tabletop accessories, clear of both the laptop and original mug.
  build.within('Right side spiral notebook',p=>p,()=>{
    build.chamferBox(cover,[2.02,1.73,1.96],[.99,.06,1.10],.018)
    build.box(pages,[2.025,1.774,1.955],[.945,.031,1.047])
    build.box(paper,[2.025,1.792,1.955],[.945,.006,1.047])
    for(let i=0;i<8;i++)build.box(ruling,[2.07,1.796,1.55+i*.115],[.68,.002,.006])
    for(let i=0;i<7;i++)build.line(binding,[[1.51,1.75,1.56+i*.13],[1.51,1.81,1.56+i*.13],[1.63,1.81,1.56+i*.13],[1.63,1.795,1.56+i*.13]],.014)
    build.box(cover,[2.29,1.718,2.54],[.09,.012,.11])
  })
  build.within('Right side pen and pencil',p=>p,()=>{
    build.line(black,[[2.60,1.73,1.64],[2.68,1.73,2.27]],.036)
    build.line(metal,[[2.68,1.73,2.27],[2.691,1.73,2.35]],.018)
    build.line(metal,[[2.60,1.751,1.64],[2.625,1.751,1.86]],.012)
    build.line(pencil,[[2.76,1.723,1.72],[2.79,1.723,2.27]],.028)
    build.line(tip,[[2.79,1.723,2.27],[2.793,1.723,2.32]],.022)
    build.line(rubber,[[2.793,1.723,2.32],[2.795,1.723,2.35]],.010)
  })
}
