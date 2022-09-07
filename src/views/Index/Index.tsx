import { OrbitControls, OrthographicCamera, Sky, Stats, useHelper } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { useRef } from 'react'
import type { SpotLight } from 'three'
import { SpotLightHelper } from 'three'

function Scene(): JSX.Element {
  const spotLightRef = useRef<SpotLight>(null)
  useHelper(spotLightRef, SpotLightHelper)

  return (
    <>
      <fog color={'#ffffff'} near={0} far={1000} />
      <Sky sunPosition={[900, 900, 0]} />
      <spotLight ref={spotLightRef} intensity={100} position={[1, 5, 3]} angle={Math.PI / 180 * 20} distance={5} />
      <axesHelper args={[1000]} />
      <OrthographicCamera />
      <OrbitControls maxPolarAngle={Math.PI / 2.2} />
      <Stats />
    </>
  )
}

const onCavansClickHandler = (evt: any) => {
  console.log(evt)
}

export default function Index(): JSX.Element {
  return (
    <Canvas onClick={onCavansClickHandler}>
      <Scene />
    </Canvas>
  )
}
