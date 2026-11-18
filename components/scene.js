import { useEffect, useRef, useState } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '../lib/model'
import { frameWorkspaceView, setupWorkspaceView } from '../public/workspace-view'
import { SceneSpinner, SceneContainer } from './load_scene'

const Scene = () => {
  const containerRef = useRef()
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let disposed = false
    let requestId
    let renderer
    let controls
    let observer
    let lighting
    let model
    const scene = new THREE.Scene()
    const disposeModel = object => {
      const geometries = new Set()
      const materials = new Set()
      const textures = new Set()
      object.traverse(child => {
        if (child.geometry) geometries.add(child.geometry)
        const meshMaterials = child.material
          ? Array.isArray(child.material) ? child.material : [child.material]
          : []
        meshMaterials.forEach(material => {
          materials.add(material)
          Object.values(material).forEach(value => {
            if (value?.isTexture) textures.add(value)
          })
        })
      })
      textures.forEach(texture => texture.dispose())
      materials.forEach(material => material.dispose())
      geometries.forEach(geometry => geometry.dispose())
    }
    setLoading(true)
    setFailed(false)

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      renderer.outputEncoding = THREE.sRGBEncoding
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.domElement.setAttribute('role', 'img')
      renderer.domElement.setAttribute('aria-label', 'A standing voxel miniature pinscher works behind a desk with a slim black MacBook-style laptop, a notebook and writing tools on the right, a bright waveform on the lid and a yellow star plus one badge. Drag to rotate the 3D scene.')
      container.appendChild(renderer.domElement)
      const camera = new THREE.OrthographicCamera(-5, 5, 4, -4, .1, 100)
      lighting = setupWorkspaceView(THREE, scene, camera)
      controls = new OrbitControls(camera, renderer.domElement)
      controls.target.set(0, 2, 0)
      controls.enableDamping = true
      controls.enablePan = false
      controls.enableZoom = false
      controls.minPolarAngle = .25
      controls.maxPolarAngle = Math.PI / 2 - .05
      controls.update()

      const resize = () => {
        const width = container.clientWidth
        const height = container.clientHeight
        if (!width || !height) return
        frameWorkspaceView(THREE, model, camera, controls, width / height)
        renderer.setSize(width, height)
      }
      observer = new ResizeObserver(resize)
      observer.observe(container)
      resize()

      const animate = () => {
        if (disposed) return
        requestId = requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }
      loadGLTFModel(scene, '/dj_park.glb?v=black-macbook-v7').then(object => {
        if (disposed) {
          scene.remove(object)
          disposeModel(object)
          return
        }
        model = object
        resize()
        setLoading(false)
        animate()
      }).catch(() => {
        if (!disposed) { setLoading(false); setFailed(true) }
      })
    } catch {
      setLoading(false)
      setFailed(true)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(requestId)
      observer?.disconnect()
      controls?.dispose()
      disposeModel(scene)
      lighting?.dispose()
      renderer?.domElement.remove()
      renderer?.dispose()
    }
  }, [attempt])

  return (
    <SceneContainer ref={containerRef}>
      {loading && <SceneSpinner />}
      {failed && (
        <Box position="absolute" inset={0} display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={3}>
          <Text>The 3D scene could not be loaded.</Text>
          <Button size="sm" onClick={() => setAttempt(value => value + 1)}>Try again</Button>
        </Box>
      )}
    </SceneContainer>
  )
}

export default Scene
