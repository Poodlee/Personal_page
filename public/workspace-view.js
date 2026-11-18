// Shared by the homepage and the standalone model preview. Three.js is injected
// so the preview can use the same camera and lighting without a build step.
const isShadowNode = object => object.name === 'GroundShadow'

export function configureWorkspaceModel(object, options = {}) {
  const { receiveShadow = true, castShadow = true } = options
  const visit = (node, shadowParent = false) => {
    const isShadow = shadowParent || isShadowNode(node)
    if (node.isMesh) {
      node.castShadow = !isShadow && castShadow
      node.receiveShadow = !isShadow && receiveShadow
      if (isShadow) {
        const materials = Array.isArray(node.material)
          ? node.material
          : [node.material]
        materials.filter(Boolean).forEach(material => {
          // The embedded, unlit contact-shadow texture supplies its own alpha.
          // Avoid treating the invisible plane as a solid surface in depth.
          material.depthWrite = false
          material.toneMapped = false
        })
      }
    }
    node.children.forEach(child => visit(child, isShadow))
  }
  visit(object)
}

export function setupWorkspaceView(THREE, scene, camera) {
  // The original reference faces +Z: show the standing pinscher and laptop lid.
  camera.position.set(8, 7, 10)
  const ambient = new THREE.HemisphereLight(0xfff7ed, 0x9b8c7e, 0.8)
  const key = new THREE.DirectionalLight(0xfff0df, 1)
  // Match the embedded reference shadow, which falls toward -X / -Z.
  key.position.set(3, 8, 4)
  key.target.position.set(0, 0, 0)
  key.castShadow = true
  key.shadow.mapSize.set(2048, 2048)
  Object.assign(key.shadow.camera, {
    left: -4,
    right: 4,
    top: 4,
    bottom: -4,
    near: 0.1,
    far: 20
  })
  key.shadow.bias = -0.0001
  key.shadow.normalBias = 0.015
  const fill = new THREE.DirectionalLight(0xe4ebf0, 0.2)
  fill.position.set(-4, 4, -2)
  scene.add(ambient, key, key.target, fill)

  return {
    dispose() {
      key.shadow.map?.dispose()
      key.shadow.mapPass?.dispose()
      scene.remove(ambient, key, key.target, fill)
    }
  }
}

export function frameWorkspaceView(THREE, object, camera, controls, aspect) {
  if (!(aspect > 0)) return
  const bounds = new THREE.Box3()
  if (object) {
    object.updateWorldMatrix(true, true)
    const visit = node => {
      if (isShadowNode(node)) return
      if (node.isMesh && node.geometry) {
        if (!node.geometry.boundingBox) node.geometry.computeBoundingBox()
        const box = node.geometry.boundingBox
        if (box && !box.isEmpty()) {
          bounds.union(box.clone().applyMatrix4(node.matrixWorld))
        }
      }
      node.children.forEach(visit)
    }
    visit(object)
  }
  if (bounds.isEmpty()) {
    bounds.set(new THREE.Vector3(-2.7, 0, -2.3), new THREE.Vector3(2.9, 4.8, 2.7))
  }

  const center = bounds.getCenter(new THREE.Vector3())
  const movement = center.clone().sub(controls.target)
  camera.position.add(movement)
  controls.target.copy(center)
  controls.update()
  camera.updateMatrixWorld()
  const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0)
  const up = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1)
  let halfWidth = 0
  let halfHeight = 0
  for (const x of [bounds.min.x, bounds.max.x]) {
    for (const y of [bounds.min.y, bounds.max.y]) {
      for (const z of [bounds.min.z, bounds.max.z]) {
        const point = new THREE.Vector3(x, y, z).sub(center)
        halfWidth = Math.max(halfWidth, Math.abs(point.dot(right)))
        halfHeight = Math.max(halfHeight, Math.abs(point.dot(up)))
      }
    }
  }
  // Fit the visible model, not its much larger transparent shadow plane.
  const scale = Math.max(halfHeight, halfWidth / aspect) * 1.12
  camera.left = -scale * aspect
  camera.right = scale * aspect
  camera.top = scale
  camera.bottom = -scale
  camera.updateProjectionMatrix()
}
