'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Box, CameraControls, Cylinder, OrbitControls, PerspectiveCamera, Plane, Sphere, Torus } from '@react-three/drei'

const xStart = 10;
const xRange = 50;
const yStart = 20;
const yRange = 20;
const zStart = 20;
const zRange = 50;

const speed = 25;
const dropCount = 250;
const splashDuration = 0.25;

const dropSplashCount = 3;
const splashRadius = 0.5;


const rollX = () => {
    return Math.random() * xRange - (xRange/2) - xStart;
}

const rollZ = () => {
    return Math.random() * zRange - (zRange/2) - zStart;
}

const rollTimeOffset = () => {  
    return Math.random() * 1;
}

const Raindrop = ({x, z, initialDelay}: {x: number, z:number, initialDelay: number}) => {


    const timerOffset = useRef(initialDelay);
    const splashTimer = useRef(0);

    const yPos = useRef(0);
    const dropRef = useRef<THREE.Mesh>();
    const torusRef = useRef<THREE.Mesh>();

    const [showSplash, setShowSplash] = useState(false);
    const [splashPosition, setSplashPosition] = useState([0, 0, 0]);

    const splashDropVectors = useRef<any[]>([]);
    const splashDrops = useRef<any[]>([]);

    useFrame(({ clock }) => {

        /*
        To simulate rain, raindrops fall from the start of the screen
        timerOffset is used to stagger the drops.
        */
       

        const currentTime = clock.getElapsedTime();
        const progressTime = clock.getElapsedTime() - timerOffset.current;

        const distance = progressTime * speed;
        const directionVector = [0.3, -1, 0];

        const newX = x + (distance * directionVector[0]);
        const newY = yStart + (distance * directionVector[1]);

        //Start the splash just before the drop disappears into the ground
        if(newY <= -0.5)
        {
            setSplashPosition([newX, newY, z]);
            setShowSplash(true);
            splashTimer.current = currentTime;

            //When we hit the ground, create a splash -- each drop gets a random direction
            for(let i = 0; i < dropSplashCount; i++)
            {
                const splashRange = 0.5;
                const splashDirection = [Math.random() * splashRange - splashRange / 2, 0, Math.random() * splashRange - splashRange / 2];
                const splashDirectionVector = new THREE.Vector3(splashDirection[0], splashDirection[1], splashDirection[2]).normalize();
                splashDropVectors.current.push(splashDirectionVector);
            }

        }
        //When the drop goes beneath the floor, wrap it back to the top
        if(newY <= -1)
        {
            timerOffset.current = currentTime + initialDelay;
            x = rollX();
            z = rollZ();
            console.log('splash');
        }
        else
        {
            yPos.current = newY;
            dropRef.current?.position.set(newX, newY, z);
        }

        if(showSplash)
        {
            console.log('showing splash', currentTime, torusRef.current);

            //Get time offset from splash
            const splashTime = currentTime - splashTimer.current;

            const factor = splashTime / splashDuration;
            const baseScale = 0.5
            torusRef.current?.scale.set(baseScale * factor, baseScale * factor, 0.02);

            //Reduce opacity over time as well
            const opacity = 0.4 * (1 - factor);
            (torusRef.current as any).material = new THREE.MeshBasicMaterial({color: 'white', transparent: true, opacity: opacity});

            //Height should start at 0, then go up, then back down
            const period = splashDuration ;
            const heightRange = 0.25;
            const height = -0.5 + Math.sin(splashTime / period * Math.PI) * heightRange;

            splashDrops.current.forEach((drop, index) => {
                console.log('drop', drop, height);
                //return;

                const direction: THREE.Vector3 = splashDropVectors.current[index];
                const dropX = splashPosition[0] + direction.x * factor * splashRadius;
                const dropY = height;
                const dropZ = splashPosition[2] + direction.z * factor * splashRadius;

                drop.position.set(dropX, dropY, dropZ);
            });
        }

    });

    useEffect(() => {
        //When the drop hits the ground, show a splash, wait a bit then hide it
        if(showSplash)
        {
            setTimeout(() => {
                setShowSplash(false);
                splashDrops.current = [];
                splashDropVectors.current = [];
            }, splashDuration * 1000);
        }
    }, [showSplash]);

    const dropMaterial = new THREE.MeshBasicMaterial({color: '#98a8fa'});
    const splashMaterial = new THREE.MeshBasicMaterial({color: 'white', transparent: true, opacity: 0.4});
    const splashDropMaterial = new THREE.MeshBasicMaterial({color: '#98a8fa', transparent: true, opacity: 1});
    
    return (
        <group>
            <Cylinder 
            ref={dropRef as any}
            material-color='#98a8fa' 
            args={[0.025, 0.025, 1]}
            rotation={[0, 0, Math.PI / 10]}
            />
            {showSplash && <Torus
                ref={torusRef as any} 
                material-color='white'
                position={[dropRef.current!.position.x, -0.5, dropRef.current!.position.z]}
                args={[1, 0.1, 20, 20]}
                rotation={[Math.PI / 2, 0, 0]}
            />}
            {showSplash && Array.from({length: dropSplashCount}, (_, i) => (
                <Sphere 
                key={i}
                ref={(ref) => {
                    splashDrops.current[i] = ref;
                    //splashDrops.current.push(ref);
                }}
                args={[0.02, 10, 10]}
                material={splashDropMaterial}
                />
            ))}
        </group>
    )
}

const RainScene = () => {

    const drops = Array.from({length: dropCount}, (_, i) => i);

    return (
        <group>
            {drops.map((drop, index) => (
                <Raindrop key={index} x={rollX()} z={rollZ()} initialDelay={rollTimeOffset()} />
            ))}
        </group>
    )
}

const testThreePage = () => {
    return (
        <div className='flex flex-col w-full h-[90vh] p-4'>
            <p>Test new graphics for home</p>            
            <Canvas className='aspect-video h-full w-full'>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75}/>
                <OrbitControls />
                <RainScene />
                <Box 
                material-color='#1a1b1f'
                args={[100, 100, 1]} 
                position={[0, -1, 0]} 
                rotation={[Math.PI / 2, 0, 0]}
                />
            </Canvas>
        </div>
    )
}

/*

                <Box 
                material-color='#1a1b1f'
                args={[100, 100, 1]} 
                position={[0, -1, 0]} 
                rotation={[Math.PI / 2, 0, 0]}
                />
*/

export default testThreePage