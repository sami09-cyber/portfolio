"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01
            meshRef.current.rotation.y += 0.01
        }
    })

    return (
        <Sphere args={[1, 100, 200]} ref={meshRef}>
            <MeshDistortMaterial color="#8a2be2" attach="material" distort={0.5} speed={2} />
        </Sphere>
    )
}

export function HeroSection() {
    return (
        <section id="hero" className="min-h-screen pt-20 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 z-10" />
                <Canvas className="absolute inset-0">
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <AnimatedSphere />
                    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                </Canvas>
            </div>

            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-sm md:text-base text-primary font-medium mb-2"
                            >
                                Bienvenue sur mon portfolio
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="text-4xl md:text-6xl font-bold tracking-tight"
                            >
                                Je suis{" "}
                                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Votre Nom
                </span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-xl md:text-2xl text-muted-foreground mt-4"
                            >
                                Développeur Web & Designer d'Expérience Utilisateur
                            </motion.p>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-muted-foreground max-w-lg"
                        >
                            Je crée des expériences web innovantes et futuristes qui combinent design intuitif et technologies de
                            pointe.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Button size="lg" className="rounded-full">
                                Voir mes projets
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full">
                                Me contacter
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="flex items-center gap-4 pt-4"
                        >
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Twitter size={20} />
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="hidden lg:block h-[500px] relative"
                    >
                        {/* This space is filled by the 3D canvas background */}
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
                <span className="text-sm text-muted-foreground mb-2">Découvrir</span>
                <ArrowDown className="animate-bounce" size={20} />
            </motion.div>
        </section>
    )
}

