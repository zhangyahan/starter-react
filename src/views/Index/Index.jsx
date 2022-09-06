import { OrbitControls, OrthographicCamera, Sky, Stats, useGLTF, useHelper } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { useRef } from 'react'
import { SpotLightHelper } from 'three'
import { BridgeModel, modelIndex } from '@/models'

useGLTF.preload(modelIndex.bridge)
useGLTF.preload(modelIndex.terrain)

function Scene() {
  const spotLightRef = useRef()
  useHelper(spotLightRef, SpotLightHelper)

  return (
    <>
      <fog color={'#ffffff'} near={0} far={1000} />
      <Sky sunPosition={[900, 900, 0]} scale={1000} />

      <spotLight ref={spotLightRef} intensity={100}
        position={[1, 5, 3]} angle={Math.PI / 180 * 20} distance={5} />

      <BridgeModel scale={[0.1, 0.1, 0.1]} position={[0.0, 0.0, 0.0]} />

      <axesHelper args={[1000, 1000, 1000]} />
      <OrthographicCamera />
      <OrbitControls maxPolarAngle={Math.PI / 2.2} />
      <Stats />
    </>
  )
}

const onCavansClickHandler = (evt) => {
  console.log(evt)
}

export default function Index() {
  return (
    <Canvas onClick={onCavansClickHandler}>
      <Scene />
    </Canvas>
  )
}
