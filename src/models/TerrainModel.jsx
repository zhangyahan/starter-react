import { useGLTF } from '@react-three/drei'
import * as PropTypes from 'prop-types'
import { modelIndex } from '.'

export function Terrain({ scale = [10, 10, 10], ...props }) {
  const { scene } = useGLTF(modelIndex.terrain)

  return (
    <primitive object={scene} scale={scale} {...props} />
  )
}

Terrain.propTypes = {
  scale: PropTypes.number,
}
