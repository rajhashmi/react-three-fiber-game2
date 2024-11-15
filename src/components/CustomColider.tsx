import { RigidBody, CuboidCollider } from '@react-three/rapier'

const CustomCollider = () => {
  return (
    <RigidBody position={[0,-2.6,3]} type="fixed">
      <CuboidCollider args={[2,0.1,8]}  />
    </RigidBody>
  )
}

export default CustomCollider
