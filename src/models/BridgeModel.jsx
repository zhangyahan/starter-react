import { useGLTF } from '@react-three/drei'
import { applyProps } from '@react-three/fiber'
import { useMemo } from 'react'
import { Mesh } from 'three'
import { modelIndex } from '.'

export function BridgeModel(props) {
  const { scene, nodes } = useGLTF(modelIndex.bridge)
  useMemo(() => {
    Object.keys(nodes).forEach((key) => {
      const node = nodes[key]
      if (node instanceof Mesh) {
        // 更改材质的
        applyProps(node.material, {
          roughness: 0.3,
        })
      }
    })
  })
  return (
    <primitive object={scene} {...props} useData={{ data: 'userData' }} />
  )
}
