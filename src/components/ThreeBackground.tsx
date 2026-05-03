'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ThreeBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const scene = new THREE.Scene()
        
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        // Camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.z = 4
        scene.add(camera)

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        /**
         * Galaxy / Vortex System
         */
        const parameters = {
            count: 20000,
            size: 0.015,
            radius: 12,
            branches: 3,
            spin: 1.5,
            randomness: 0.35,
            randomnessPower: 4,
            insideColor: '#00F2FF',
            outsideColor: '#7A00FF'
        }

        let geometry: THREE.BufferGeometry | null = null
        let material: THREE.PointsMaterial | null = null
        let points: THREE.Points | null = null

        const generateGalaxy = () => {
            if (points !== null) {
                geometry?.dispose()
                material?.dispose()
                scene.remove(points)
            }

            geometry = new THREE.BufferGeometry()
            const positions = new Float32Array(parameters.count * 3)
            const colors = new Float32Array(parameters.count * 3)

            const colorInside = new THREE.Color(parameters.insideColor)
            const colorOutside = new THREE.Color(parameters.outsideColor)

            for (let i = 0; i < parameters.count; i++) {
                const i3 = i * 3

                // Position
                const radius = Math.random() * parameters.radius
                const spinAngle = radius * parameters.spin
                const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

                const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
                const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
                const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius

                positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
                positions[i3 + 1] = randomY
                positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

                // Color
                const mixedColor = colorInside.clone()
                mixedColor.lerp(colorOutside, radius / parameters.radius)

                colors[i3] = mixedColor.r
                colors[i3 + 1] = mixedColor.g
                colors[i3 + 2] = mixedColor.b
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

            material = new THREE.PointsMaterial({
                size: parameters.size,
                sizeAttenuation: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true,
                transparent: true,
                opacity: 0.6
            })

            points = new THREE.Points(geometry, material)
            scene.add(points)
        }

        generateGalaxy()

        // Interaction
        const mouse = { x: 0, y: 0 }
        const onMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / sizes.width) - 0.5
            mouse.y = (event.clientY / sizes.height) - 0.5
        }
        window.addEventListener('mousemove', onMouseMove)

        const onResize = () => {
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }
        window.addEventListener('resize', onResize)

        let scrollY = 0
        const onScroll = () => {
            scrollY = window.scrollY
        }
        window.addEventListener('scroll', onScroll)

        // Loop
        const clock = new THREE.Clock()
        let requestID: number

        const animate = () => {
            const elapsedTime = clock.getElapsedTime()

            if (points) {
                // Smooth vortex rotation
                points.rotation.y = elapsedTime * 0.05
                
                // Mouse follow
                const targetX = mouse.x * 0.2
                const targetY = -mouse.y * 0.2
                points.rotation.x += (targetY - points.rotation.x) * 0.02
                points.rotation.z += (targetX - points.rotation.z) * 0.02

                // Scroll responsiveness
                points.position.y = -scrollY * 0.002
            }

            renderer.render(scene, camera)
            requestID = window.requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('resize', onResize)
            window.removeEventListener('scroll', onScroll)
            window.cancelAnimationFrame(requestID)
            
            geometry?.dispose()
            material?.dispose()
            renderer.dispose()
        }
    }, [])

    return <canvas ref={canvasRef} className="webgl-canvas" />
}

export default ThreeBackground
