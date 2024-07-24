'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Cylinder } from '@react-three/drei'

/*
function RainScene() {
    const cloudParticles = useRef([]);
    const flash = useRef();
    const rain = useRef();
    const [rainGeo] = useState(() => new THREE.BufferGeometry());
    const [vertices, setVertices] = useState([]);
    const rainCount = 15000;
  
    useEffect(() => {
      const rainVertices = [];
      for (let i = 0; i < rainCount; i++) {
        const rainDrop = new THREE.Vector3(
          Math.random() * 400 - 200,
          Math.random() * 500 - 250,
          Math.random() * 400 - 200
        );
        rainDrop.velocity = 0;
        rainVertices.push(rainDrop.x, rainDrop.y, rainDrop.z);
      }
      setVertices(rainVertices);
  
      new THREE.TextureLoader().load('smoke.png', texture => {
        for (let p = 0; p < 25; p++) {
          const cloud = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(500, 500),
            new THREE.MeshLambertMaterial({
              map: texture,
              transparent: true,
            })
          );
          cloud.position.set(
            Math.random() * 800 - 400,
            500,
            Math.random() * 500 - 450
          );
          cloud.rotation.set(1.16, -0.12, Math.random() * 360);
          cloud.material.opacity = 0.6;
          cloudParticles.current.push(cloud);
        }
      });
    }, []);
  
    useFrame(({ scene, camera }) => {
      cloudParticles.current.forEach(p => {
        p.rotation.z -= 0.002;
      });
      rain.current.geometry.attributes.position.array.forEach((v, index) => {
        if (index % 3 === 1) {
          rain.current.geometry.attributes.position.array[index] +=
            rain.current.geometry.attributes.velocity.array[index];
          rain.current.geometry.attributes.velocity.array[index] -= 0.1 + Math.random() * 0.1;
          if (rain.current.geometry.attributes.position.array[index] < -200) {
            rain.current.geometry.attributes.position.array[index] = 200;
            rain.current.geometry.attributes.velocity.array[index] = 0;
          }
        }
      });
      rain.current.geometry.attributes.position.needsUpdate = true;
      rain.current.rotation.y += 0.002;
      if (Math.random() > 0.93 || flash.current.power > 100) {
        if (flash.current.power < 100)
          flash.current.position.set(
            Math.random() * 400,
            300 + Math.random() * 200,
            100
          );
        flash.current.power = 50 + Math.random() * 500;
      }
    });
  
    return (
        <group>

        <ambientLight intensity={0.555} />
        <directionalLight
          color={0xffeedd}
          position={[0, 0, 1]}
        />
        <pointLight
          ref={flash}
          color={0x062d89}
          intensity={30}
          distance={500}
          decay={1.7}
          position={[200, 300, 100]}
        />
        {cloudParticles.current.map((cloud, index) => (
          <primitive key={index} object={cloud} />
        ))}
        <points ref={rain}>
          <bufferGeometry>
            <bufferAttribute
              attachObject={['attributes', 'position']}
              array={new Float32Array(vertices)}
              count={vertices.length / 3}
              itemSize={3}
            />
            <bufferAttribute
              attachObject={['attributes', 'velocity']}
              array={new Float32Array(vertices.length).fill(0)}
              count={vertices.length / 3}
              itemSize={1}
            />
          </bufferGeometry>
          <pointsMaterial
            color={0xaaaaaa}
            size={0.1}
            transparent
          />
        </points>
        </group>
    );
  }
*/

const Raindrop = ({x, timeOffset}: {x: number, timeOffset: number}) => {

    const startY = 10;
    const range = 25
    const speed = 25;

    const yPos = useRef(0);
    const dropRef = useRef<THREE.Mesh>();

    useFrame(({ clock }) => {
        console.log('frame', clock.getElapsedTime(), dropRef.current);
        clock.autoStart = true;


        const position = startY - (( (clock.getElapsedTime() - timeOffset) * speed) % range);
        yPos.current = position;


        dropRef.current?.position.set(x, yPos.current, 0);
    });

    return (
        <group>
            <Cylinder 
            ref={dropRef as any}
            material-color='white' 
            args={[0.03, 0.03, 1]}
            />
        </group>
    )
}

const RainScene = () => {

    const drops = Array.from({length: 100}, (_, i) => i);

    return (
        <group>
            {drops.map((drop, index) => (
                <Raindrop key={index} x={Math.random() * 10 - 5} timeOffset={Math.random() * 10 - 5} />
            ))}
        </group>
    )
}

const testThreePage = () => {
    return (
        <div className='flex flex-col w-full h-[90vh] p-4'>
            <p>Test new graphics for home</p>            
            <Canvas camera={{ position: [0, 1, 10], fov: 60 }} className='aspect-video h-full w-full'>
                <RainScene />
            </Canvas>
        </div>
    )
}

export default testThreePage