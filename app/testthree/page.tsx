'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Box, CameraControls, Cylinder, PerspectiveCamera, Plane } from '@react-three/drei'

const xStart = 10;
const xRange = 50;
const yStart = 20;
const yRange = 20;
const zStart = 25;
const zRange = 50;

const rollX = () => {
    return Math.random() * xRange - (xRange/2) - xStart;
}

const rollZ = () => {
    return Math.random() * zRange - (zRange/2) - zStart;
}

const rollTimeOffset = () => {  
    return Math.random() * -3;
}

const Raindrop = ({x, z, timeOffset}: {x: number, z:number, timeOffset: number}) => {


    const speed = 30;

    const yPos = useRef(0);
    const dropRef = useRef<THREE.Mesh>();

    useFrame(({ clock }) => {
        //console.log('frame', clock.getElapsedTime(), dropRef.current);
        clock.autoStart = true;

        //It rains sideways
        const directionVector = [0.3, -1, 0];
        const mult = ((clock.getElapsedTime() - timeOffset) * speed) % yRange;

        const newX = mult * directionVector[0] + x;
        const newY = yStart + (mult * directionVector[1] % yRange);

        //When the drop wraps, reroll the x position and time offset
        if(newY > yPos.current)
        {
            x = rollX();
            z = rollZ();
            timeOffset -= Math.random() * 0.3;
            console.log('rerolling x', x);
        }

        yPos.current = newY;
        dropRef.current?.position.set(newX, newY, z);
    });

    return (
        <group>
            <Cylinder 
            ref={dropRef as any}
            material-color='#98a8fa' 
            args={[0.025, 0.025, 1]}
            rotation={[0, 0, Math.PI / 10]}
            />
        </group>
    )
}

const RainScene = () => {

    const drops = Array.from({length: 600}, (_, i) => i);

    return (
        <group>
            {drops.map((drop, index) => (
                <Raindrop key={index} x={rollX()} z={rollZ()} timeOffset={rollTimeOffset()} />
            ))}
        </group>
    )
}

const testThreePage = () => {
    return (
        <div className='flex flex-col w-full h-[90vh] p-4'>
            <p>Test new graphics for home</p>            
            <Canvas className='aspect-video h-full w-full'>
                <PerspectiveCamera makeDefault position={[0, 1, 10]} fov={75}/>
                <CameraControls />
                <RainScene />
                <Box 
                material-color='#1a1b1f'
                args={[100, 100, 1]} 
                position={[0, -5, -1]} 
                rotation={[90, 0, 0]}
                
                />
            </Canvas>
        </div>
    )
}

export default testThreePage