import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";

function Geometry(props) {
  const { viewport } = useThree();
  const ref = useRef();

  useFrame(({ mouse }) => {
    const x = mouse.x / viewport.width;
    const interpolated = Math.min(Math.max(x, -0.15), 0.15);

    ref.current.rotation.y = interpolated;
  });

  return (
    <group {...props} ref={ref}>
      {props.children}
    </group>
  );
}

export default function App() {
  const { scene } = useGLTF("./Fireplace_v2.glb");
  const geo = scene.children;

  return (
    <Canvas gl={{ logarithmicDepthBuffer: true }}>
      <color attach="background" args={["#2a2a2a"]} />
      <ambientLight intensity={3} />
      <fog attach="fog" args={["#333", 50, 115]} />

      <PerspectiveCamera
        makeDefault
        fov={8}
        position={[0, 5, 70]}
        rotation={[-0.05, 0, 0]}
      />

      <Geometry>
        {geo.map((item) => (
          <mesh
            geometry={item.geometry}
            material={item.material}
            rotation={[0, -0.2, 0]}
            key={item.name}
          ></mesh>
        ))}
      </Geometry>
    </Canvas>
  );
}
