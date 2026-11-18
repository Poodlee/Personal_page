import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { configureWorkspaceModel } from '../public/workspace-view'

export function loadGLTFModel(
  scene,
  glbPath,
  options = {}
) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()

    loader.load(
      glbPath,
      gltf => {
        const obj = gltf.scene
        obj.name = 'miniature-pinscher-workspace'
        configureWorkspaceModel(obj, options)
        scene.add(obj)
        resolve(obj)
      },
      undefined,
      function (error) {
        reject(error)
      }
    )
  })
}
