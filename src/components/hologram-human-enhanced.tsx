// "use client"
//
// import * as THREE from "three"
// import React, { useRef, useState, useEffect, Suspense, useMemo } from "react"
// import { Canvas, useFrame, useThree } from "@react-three/fiber"
// import { OrbitControls, useGLTF, Grid, Html, Environment, ContactShadows, useAnimations, Loader, Text, Float, PerspectiveCamera, Center } from "@react-three/drei"
// import { Slider } from "@/components/ui/slider"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { Brain, ShoppingBag, Video, Users, Layers, Maximize, Minimize, RotateCcw, Pause, Play, Rewind, FastForward, AlertTriangle, Info } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { Vector3 } from "three"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
//
// // Définition des modes d'application
// const APPLICATIONS = {
//     EDUCATION: "education",
//     COMMERCE: "commerce",
//     ENTERTAINMENT: "entertainment",
//     COMMUNICATION: "communication",
// }
//
// // Structure pour les modèles 3D
// // Le modèle de canard est inclus par défaut, les autres seront ajoutés par l'utilisateur
// const MODELS = {
//     DUCK: {
//         id: "duck",
//         name: "Canard (Démo)",
//         path: "/holograming_man.glb",
//         scale: [1, 1, 1],
//         position: [0, 0, 0],
//         rotation: [0, 0, 0],
//         description: "Modèle de démonstration inclus par défaut",
//         category: "demo",
//     },
//     // Les modèles suivants seront ajoutés par l'utilisateur
//     HUMAN_MALE: {
//         id: "human_male",
//         name: "Humain (Homme)",
//         path: "/holograming_man.glb", // Chemin à ajuster selon votre structure
//         scale: [1, 1, 1],
//         position: [0, -1, 0], // Ajustez selon la taille du modèle
//         rotation: [0, 0, 0],
//         description: "Modèle humain masculin",
//         category: "human",
//     },
//     HUMAN_FEMALE: {
//         id: "human_female",
//         name: "Humain (Femme)",
//         path: "/human_skeleton.glb", // Chemin à ajuster selon votre structure
//         scale: [1, 1, 1],
//         position: [0, -1, 0], // Ajustez selon la taille du modèle
//         rotation: [0, 0, 0],
//         description: "Modèle humain féminin",
//         category: "human",
//     },
//     ROBOT: {
//         id: "robot",
//         name: "Robot",
//         path: "/kirpi_mrap_lowpoly.glb", // Chemin à ajuster selon votre structure
//         scale: [1, 1, 1],
//         position: [0, 0, 0],
//         rotation: [0, 0, 0],
//         description: "Modèle de robot futuriste",
//         category: "robot",
//     },
//     ANATOMY: {
//         id: "anatomy",
//         name: "Anatomie",
//         path: "/low_poly_computer.glb", // Chemin à ajuster selon votre structure
//         scale: [1, 1, 1],
//         position: [0, -1, 0],
//         rotation: [0, 0, 0],
//         description: "Modèle anatomique humain",
//         category: "medical",
//     },
// }
//
// // Catégories de modèles pour l'organisation dans l'interface
// const MODEL_CATEGORIES = {
//     demo: "Démonstration",
//     human: "Humains",
//     robot: "Robots",
//     medical: "Médical",
// }
//
// export default function HologramHumanEnhanced({ minimal = false }) {
//     const [zoom, setZoom] = useState(2.5)
//     const [rotationSpeed, setRotationSpeed] = useState(0.2)
//     const [hologramOpacity, setHologramOpacity] = useState(0.8)
//     const [hologramColor, setHologramColor] = useState("#8a2be2") // Couleur violette pour correspondre au portfolio
//     const [autoRotate, setAutoRotate] = useState(true)
//     const [application, setApplication] = useState(APPLICATIONS.ENTERTAINMENT)
//     const [currentModel, setCurrentModel] = useState(MODELS.DUCK.id)
//     const [isPlaying, setIsPlaying] = useState(true)
//     const [animationSpeed, setAnimationSpeed] = useState(1)
//     const [showLabels, setShowLabels] = useState(false)
//     const [enhancedEffects, setEnhancedEffects] = useState(true)
//     const [fullscreen, setFullscreen] = useState(false)
//     const [showControls, setShowControls] = useState(!minimal)
//     const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true)
//     const [modelLoadError, setModelLoadError] = useState(false)
//     const [availableModels, setAvailableModels] = useState([MODELS.DUCK.id])
//     const [modelLoaded, setModelLoaded] = useState(false)
//
//     // Vérifier quels modèles sont disponibles
//     useEffect(() => {
//         const checkModelAvailability = async () => {
//             const available = [MODELS.DUCK.id] // Le canard est toujours disponible
//
//             // Vérifier chaque modèle
//             for (const modelKey in MODELS) {
//                 if (modelKey === "DUCK") continue // Déjà inclus
//
//                 const model = MODELS[modelKey]
//                 try {
//                     const response = await fetch(model.path, { method: "HEAD" })
//                     if (response.ok) {
//                         available.push(model.id)
//                     }
//                 } catch (error) {
//                     console.log(`Modèle ${model.name} non disponible`)
//                 }
//             }
//
//             setAvailableModels(available)
//         }
//
//         checkModelAvailability()
//     }, [])
//
//     // Gestion du plein écran
//     const toggleFullscreen = () => {
//         if (!document.fullscreenElement) {
//             document.documentElement.requestFullscreen().catch((err) => {
//                 console.error(`Erreur: ${err.message}`)
//             })
//             setFullscreen(true)
//         } else {
//             if (document.exitFullscreen) {
//                 document.exitFullscreen()
//                 setFullscreen(false)
//             }
//         }
//     }
//
//     // Obtenir les détails du modèle actuel
//     const getCurrentModelDetails = () => {
//         return Object.values(MODELS).find((model) => model.id === currentModel) || MODELS.DUCK
//     }
//
//     // Déterminer les paramètres spécifiques à l'application
//     const getApplicationSettings = () => {
//         switch (application) {
//             case APPLICATIONS.EDUCATION:
//                 return {
//                     title: "Mode Éducation",
//                     description: "Visualisation anatomique interactive",
//                     icon: <Brain className="w-5 h-5" />,
//                     color: "#00a6ff",
//                     labels: ["Tête", "Torse", "Membres", "Articulations"],
//                     cameraPosition: [0, 1.5, 2.5],
//                 }
//             case APPLICATIONS.COMMERCE:
//                 return {
//                     title: "Mode Commerce",
//                     description: "Essayage virtuel et présentation produit",
//                     icon: <ShoppingBag className="w-5 h-5" />,
//                     color: "#00d68f",
//                     labels: ["Vêtement", "Accessoire", "Taille", "Couleur"],
//                     cameraPosition: [0, 1.2, 2.2],
//                 }
//             case APPLICATIONS.ENTERTAINMENT:
//                 return {
//                     title: "Mode Divertissement",
//                     description: "Personnage interactif pour médias",
//                     icon: <Video className="w-5 h-5" />,
//                     color: "#8a2be2", // Adapté à la couleur du portfolio
//                     labels: ["Animation", "Expression", "Effet", "Scène"],
//                     cameraPosition: [0, 1.0, 3.0],
//                 }
//             case APPLICATIONS.COMMUNICATION:
//                 return {
//                     title: "Mode Communication",
//                     description: "Avatar pour téléprésence",
//                     icon: <Users className="w-5 h-5" />,
//                     color: "#a855f7",
//                     labels: ["Statut", "Geste", "Expression", "Présence"],
//                     cameraPosition: [0, 1.3, 2.0],
//                 }
//             default:
//                 return {
//                     title: "Mode Standard",
//                     description: "Hologramme interactif",
//                     icon: <Layers className="w-5 h-5" />,
//                     color: "#8a2be2",
//                     labels: [],
//                     cameraPosition: [0, 1.5, 2.5],
//                 }
//         }
//     }
//
//     const appSettings = getApplicationSettings()
//
//     // Mettre à jour la couleur de l'hologramme en fonction de l'application
//     useEffect(() => {
//         if (!minimal) {
//             setHologramColor(appSettings.color)
//         }
//     }, [application, minimal, appSettings.color])
//
//     // Désactiver les contrôles orbitaux lors de l'interaction avec l'UI
//     const handleUIInteractionStart = () => {
//         setOrbitControlsEnabled(false)
//     }
//
//     const handleUIInteractionEnd = () => {
//         setOrbitControlsEnabled(true)
//     }
//
//     // Gérer l'erreur de chargement du modèle
//     const handleModelLoadError = () => {
//         setModelLoadError(true)
//         // Revenir au modèle de canard par défaut
//         setCurrentModel(MODELS.DUCK.id)
//     }
//
//     // Réinitialiser l'erreur lors du changement de modèle
//     useEffect(() => {
//         setModelLoadError(false)
//     }, [currentModel])
//
//     // Obtenir les modèles disponibles par catégorie
//     const getModelsByCategory = () => {
//         const categories = {}
//
//         Object.values(MODELS).forEach((model) => {
//             if (availableModels.includes(model.id)) {
//                 if (!categories[model.category]) {
//                     categories[model.category] = []
//                 }
//                 categories[model.category].push(model)
//             }
//         })
//
//         return categories
//     }
//
//     const modelsByCategory = getModelsByCategory()
//     const currentModelDetails = getCurrentModelDetails()
//
//     return (
//         <div
//             className={`w-full ${fullscreen ? "h-screen fixed inset-0 z-50" : "h-full"} bg-black relative overflow-hidden`}
//         >
//             <div className="absolute inset-0 z-0">
//                 <Canvas shadows>
//                     <color attach="background" args={["#000"]} />
//                     <fog attach="fog" args={["#000", 5, 20]} />
//
//                     <PerspectiveCamera makeDefault position={appSettings.cameraPosition} fov={50} />
//
//                     <Suspense
//                         // fallback={
//                         //     <Html center>
//                         //         <div className="text-cyan-400">Chargement du modèle...</div>
//                         //     </Html>
//                         // }
//                         fallback={
//                             (
//                                 <Html center>
//                                     <div className="text-cyan-400">Chargement du modèle...</div>
//                                 </Html>
//                             ) as React.ReactNode
//                         }
//                     >
//                         <HologramScene
//                             rotationSpeed={rotationSpeed}
//                             hologramOpacity={hologramOpacity}
//                             hologramColor={hologramColor}
//                             autoRotate={autoRotate}
//                             application={application}
//                             modelDetails={currentModelDetails}
//                             isPlaying={isPlaying}
//                             animationSpeed={animationSpeed}
//                             showLabels={showLabels}
//                             enhancedEffects={enhancedEffects}
//                             appSettings={appSettings}
//                             minimal={minimal}
//                             onError={handleModelLoadError}
//                             setModelLoaded={setModelLoaded}
//                         />
//                     </Suspense>
//
//                     <OrbitControls
//                         enabled={orbitControlsEnabled}
//                         autoRotate={autoRotate}
//                         autoRotateSpeed={rotationSpeed}
//                         enableZoom={true}
//                         enablePan={true}
//                         minDistance={1.5}
//                         maxDistance={10}
//                     />
//                 </Canvas>
//             </div>
//
//             {/* Interface utilisateur - Utilisation de z-index pour s'assurer que l'UI est au-dessus du canvas */}
//             <div className="absolute top-4 left-4 text-white/80 flex items-center gap-2 z-10">
//                 <div className="bg-black/50 p-2 rounded-lg backdrop-blur-sm">{appSettings.icon}</div>
//                 <div>
//                     <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
//                         {appSettings.title}
//                         <Badge
//                             variant="outline"
//                             className="ml-2 text-xs font-normal"
//                             style={{ borderColor: appSettings.color, color: appSettings.color }}
//                         >
//                             PROTOTYPE
//                         </Badge>
//                     </h1>
//                     <p className="text-sm" style={{ color: appSettings.color }}>
//                         {appSettings.description}
//                     </p>
//                 </div>
//             </div>
//
//             {/* Affichage du modèle actuel */}
//             <div className="absolute top-4 right-16 text-white/80 z-10 bg-black/50 p-2 rounded-lg backdrop-blur-sm">
//                 <TooltipProvider>
//                     <Tooltip>
//                         <TooltipTrigger asChild>
//                             <div className="flex items-center gap-2 cursor-help">
//                                 <span className="text-sm">{currentModelDetails.name}</span>
//                                 <Info className="w-4 h-4" />
//                             </div>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                             <p>{currentModelDetails.description}</p>
//                         </TooltipContent>
//                     </Tooltip>
//                 </TooltipProvider>
//             </div>
//
//             {/* Contrôles de lecture */}
//             <div
//                 className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 p-2 rounded-full backdrop-blur-sm z-10"
//                 onMouseEnter={handleUIInteractionStart}
//                 onMouseLeave={handleUIInteractionEnd}
//                 onTouchStart={handleUIInteractionStart}
//                 onTouchEnd={handleUIInteractionEnd}
//             >
//                 <Button variant="ghost" size="icon" onClick={() => setAnimationSpeed(Math.max(0.5, animationSpeed - 0.5))}>
//                     <Rewind className="w-4 h-4" />
//                 </Button>
//                 <Button variant="ghost" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
//                     <>
//                     {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                     </>
//                 </Button>
//                 <Button variant="ghost" size="icon" onClick={() => setAnimationSpeed(Math.min(2, animationSpeed + 0.5))}>
//                     <FastForward className="w-4 h-4" />
//                 </Button>
//             </div>
//
//             {/* Bouton plein écran */}
//             <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm z-10"
//                 onClick={toggleFullscreen}
//                 onMouseEnter={handleUIInteractionStart}
//                 onMouseLeave={handleUIInteractionEnd}
//                 onTouchStart={handleUIInteractionStart}
//                 onTouchEnd={handleUIInteractionEnd}
//             >
//                 <>
//                 {fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
//                 </>
//             </Button>
//
//             {/* Panneau de contrôle */}
//             <Card
//                 className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-black/80 border-cyan-500/30 text-white backdrop-blur-sm z-20"
//                 onMouseEnter={handleUIInteractionStart}
//                 onMouseLeave={handleUIInteractionEnd}
//                 onTouchStart={handleUIInteractionStart}
//                 onTouchEnd={handleUIInteractionEnd}
//             >
//                 <CardContent className="p-4">
//                     <Tabs defaultValue="application">
//                         <TabsList className="grid grid-cols-4 mb-4">
//                             <TabsTrigger value="application">Mode</TabsTrigger>
//                             <TabsTrigger value="model">Modèle</TabsTrigger>
//                             <TabsTrigger value="controls">Contrôles</TabsTrigger>
//                             <TabsTrigger value="effects">Effets</TabsTrigger>
//                         </TabsList>
//
//                         {/* Onglet Applications */}
//                         <TabsContent value="application" className="space-y-4">
//                             <div className="grid grid-cols-2 gap-2">
//                                 <Button
//                                     variant={application === APPLICATIONS.EDUCATION ? "default" : "outline" as "default" | "outline"}
//                                     className={application === APPLICATIONS.EDUCATION ? "bg-blue-600" : ""}
//                                     onClick={() => setApplication(APPLICATIONS.EDUCATION)}
//                                 >
//                                     <Brain className="w-4 h-4 mr-2"/>
//                                     Éducation
//                                 </Button>
//                                 <Button
//                                     variant={application === APPLICATIONS.COMMERCE ? "default" : "outline" as "default" | "outline"}
//                                     className={application === APPLICATIONS.COMMERCE ? "bg-green-600" : ""}
//                                     onClick={() => setApplication(APPLICATIONS.COMMERCE)}
//                                 >
//                                     <ShoppingBag className="w-4 h-4 mr-2"/>
//                                     Commerce
//                                 </Button>
//                                 <Button
//                                     variant={application === APPLICATIONS.ENTERTAINMENT ? "default" : "outline" as "default" | "outline"}
//                                     className={application === APPLICATIONS.ENTERTAINMENT ? "bg-pink-600" : ""}
//                                     onClick={() => setApplication(APPLICATIONS.ENTERTAINMENT)}
//                                 >
//                                     <Video className="w-4 h-4 mr-2"/>
//                                     Média
//                                 </Button>
//                                 <Button
//                                     variant={application === APPLICATIONS.COMMUNICATION ? "default" : "outline" as "default" | "outline"}
//                                     className={application === APPLICATIONS.COMMUNICATION ? "bg-purple-600" : ""}
//                                     onClick={() => setApplication(APPLICATIONS.COMMUNICATION)}
//                                 >
//                                     <Users className="w-4 h-4 mr-2"/>
//                                     Communication
//                                 </Button>
//                             </div>
//
//                             <div className="flex items-center space-x-2">
//                                 <Switch id="labels" checked={showLabels} onCheckedChange={setShowLabels}/>
//                                 <Label htmlFor="labels">Afficher les étiquettes</Label>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Switch id="show-params" checked={showPanel} onCheckedChange={setShowPanel}/>
//                                 <Label htmlFor="show-params">Afficher les paramètres</Label>
//                             </div>
//                         </TabsContent>
//
//                         {/* Onglet Modèle */}
//                         <TabsContent value="model" className="space-y-4">
//                             <>
//                                 {modelLoadError && (
//                                     <Alert variant="destructive" className="mb-4">
//                                     <AlertTriangle className="h-4 w-4" />
//                                     <AlertTitle>Erreur de chargement</AlertTitle>
//                                     <AlertDescription className="text-xs">
//                                         Impossible de charger le modèle sélectionné. Vérifiez que le fichier existe et est accessible.
//                                     </AlertDescription>
//                                 </Alert>
//                             )}
//
//                             {availableModels.length <= 1 && (
//                                 <Alert variant="warning" className="bg-yellow-900/20 border-yellow-600/50 mb-4">
//                                     <AlertTriangle className="h-4 w-4" />
//                                     <AlertTitle>Modèles limités</AlertTitle>
//                                     <AlertDescription className="text-xs">
//                                         Seul le modèle de démonstration est actuellement disponible. Ajoutez vos modèles 3D dans le dossier
//                                         /public/models/.
//                                     </AlertDescription>
//                                 </Alert>
//                             )}
//                             </>
//                             {/* Sélection de modèle par catégorie */}
//                             <div className="space-y-4">
//                                 {Object.entries(modelsByCategory).map(([category, models]) => (
//                                     <div key={category} className="space-y-2">
//                                         <h3 className="text-sm font-medium">{MODEL_CATEGORIES[category] || category}</h3>
//                                         <div className="grid grid-cols-1 gap-2">
//                                             {models.map((model) => (
//                                                 <Button
//                                                     key={model.id}
//                                                     variant={currentModel === model.id ? "default" : "outline" as "default" | "outline"}
//                                                     className={`justify-start ${currentModel === model.id ? "bg-primary" : ""}`}
//                                                     onClick={() => setCurrentModel(model.id)}
//                                                 >
//                                                     {model.name}
//                                                 </Button>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//
//                             <div className="space-y-2 mt-4">
//                                 <div className="flex justify-between">
//                                     <span>Vitesse d'animation</span>
//                                     <span>{animationSpeed.toFixed(1)}x</span>
//                                 </div>
//                                 <Slider
//                                     value={[animationSpeed]}
//                                     min={0.5}
//                                     max={2}
//                                     step={0.1}
//                                     onValueChange={(value) => setAnimationSpeed(value[0])}
//                                 />
//                             </div>
//
//                             <div className="flex items-center space-x-2">
//                                 <Switch id="animation" checked={isPlaying} onCheckedChange={setIsPlaying} />
//                                 <Label htmlFor="animation">Animation active</Label>
//                             </div>
//                         </TabsContent>
//
//                         {/* Onglet Contrôles */}
//                         <TabsContent value="controls" className="space-y-4">
//                             <div className="space-y-2">
//                                 <div className="flex justify-between">
//                                     <span>Vitesse de rotation</span>
//                                     <span>{rotationSpeed.toFixed(1)}</span>
//                                 </div>
//                                 <Slider
//                                     value={[rotationSpeed]}
//                                     min={0}
//                                     max={2}
//                                     step={0.1}
//                                     onValueChange={(value) => setRotationSpeed(value[0])}
//                                 />
//                             </div>
//
//                             <div className="flex items-center space-x-2">
//                                 <Switch id="auto-rotate" checked={autoRotate} onCheckedChange={setAutoRotate} />
//                                 <Label htmlFor="auto-rotate">Rotation automatique</Label>
//                             </div>
//
//                             <Button
//                                 variant="outline"
//                                 className="w-full"
//                                 onClick={() => {
//                                     setRotationSpeed(0.2)
//                                     setAutoRotate(true)
//                                 }}
//                             >
//                                 <RotateCcw className="w-4 h-4 mr-2" />
//                                 Réinitialiser la vue
//                             </Button>
//                         </TabsContent>
//
//                         {/* Onglet Effets */}
//                         <TabsContent value="effects" className="space-y-4">
//                             <div className="space-y-2">
//                                 <div className="flex justify-between">
//                                     <span>Opacité</span>
//                                     <span>{hologramOpacity.toFixed(1)}</span>
//                                 </div>
//                                 <Slider
//                                     value={[hologramOpacity]}
//                                     min={0.3}
//                                     max={1}
//                                     step={0.1}
//                                     onValueChange={(value) => setHologramOpacity(value[0])}
//                                 />
//                             </div>
//
//                             <div className="space-y-2">
//                                 <div className="flex justify-between items-center">
//                                     <span>Couleur hologramme</span>
//                                     <input
//                                         type="color"
//                                         value={hologramColor}
//                                         onChange={(e) => setHologramColor(e.target.value)}
//                                         className="w-10 h-10 rounded-md border-none bg-transparent"
//                                     />
//                                 </div>
//                             </div>
//
//                             <div className="flex items-center space-x-2">
//                                 <Switch id="enhanced-effects" checked={enhancedEffects} onCheckedChange={setEnhancedEffects} />
//                                 <Label htmlFor="enhanced-effects">Effets avancés</Label>
//                             </div>
//                         </TabsContent>
//                     </Tabs>
//                 </CardContent>
//             </Card>
//
//             <Loader />
//         </div>
//     )
// }
//
// function HologramScene({
//                            rotationSpeed,
//                            hologramOpacity,
//                            hologramColor,
//                            autoRotate,
//                            application,
//                            modelDetails,
//                            isPlaying,
//                            animationSpeed,
//                            showLabels,
//                            enhancedEffects,
//                            appSettings,
//                            minimal,
//                            onError,
//                            setModelLoaded,
//                        }) {
//     const groupRef = useRef<THREE.Mesh>(null!)
//     const humanRef = useRef<THREE.Mesh>(null!)
//
//     // Scan effect
//     const scanRef = useRef<THREE.Mesh>(null!)
//     useFrame(({ clock }) => {
//         if (scanRef.current) {
//             scanRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.9 + 0.9
//         }
//
//         // Manual rotation if autoRotate is disabled
//         if (humanRef.current && !autoRotate) {
//             humanRef.current.rotation.y += rotationSpeed * 0.01
//         }
//     })
//
//     return (
//         <group ref={groupRef}>
//             {/* Environment */}
//             {enhancedEffects && <Environment preset="city" />}
//
//             {/* Base platform */}
//             <Grid
//                 position={[0, -0.01, 0]}
//                 args={[10, 10]}
//                 cellSize={0.5}
//                 cellThickness={0.5}
//                 cellColor={hologramColor}
//                 fadeDistance={10}
//                 fadeStrength={5}
//             />
//
//             {/* Holographic human */}
//             <group ref={humanRef} position={[0, 0, 0]} scale={0.9}>
//                 <HumanModel
//                     hologramOpacity={hologramOpacity}
//                     hologramColor={hologramColor}
//                     modelDetails={modelDetails}
//                     isPlaying={isPlaying}
//                     animationSpeed={animationSpeed}
//                     enhancedEffects={enhancedEffects}
//                     onError={onError}
//                     setModelLoaded={setModelLoaded}
//                 />
//
//                 {/* Labels for educational/commercial purposes */}
//                 {showLabels &&
//                     appSettings.labels.map((label, index) => {
//                         // Position labels around the model
//                         const angle = (index / appSettings.labels.length) * Math.PI * 2
//                         const radius = 1.2
//                         const x = Math.sin(angle) * radius
//                         const z = Math.cos(angle) * radius
//                         const y = 0.5 + index * 0.4
//
//                         return (
//                             <group key={index} position={[x, y, z]}>
//                                 <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
//                                     <Text
//                                         color={hologramColor}
//                                         fontSize={0.15}
//                                         maxWidth={2}
//                                         lineHeight={1}
//                                         letterSpacing={0.02}
//                                         textAlign="center"
//                                         font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
//                                         anchorX="center"
//                                         anchorY="middle"
//                                     >
//                                         {label}
//                                     </Text>
//                                     <mesh position={[0, 0, 0.05]}>
//                                         <planeGeometry args={[0.5, 0.15]} />
//                                         <meshBasicMaterial color={hologramColor} opacity={0.1} transparent />
//                                     </mesh>
//                                 </Float>
//
//                                 {/* Line connecting label to model */}
//                                 <Line
//                                     start={[0, 0, 0]}
//                                     end={[0, 0, 0]}
//                                     color={hologramColor}
//                                     opacity={0.5}
//                                     modelPosition={new Vector3(0, y * 0.5, 0)}
//                                 />
//                             </group>
//                         )
//                     })}
//             </group>
//
//             {/* Scanning effect */}
//             <mesh ref={scanRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
//                 <planeGeometry args={[5, 5]} />
//                 <meshBasicMaterial color={hologramColor} transparent={true} opacity={0.2} wireframe={false} />
//             </mesh>
//
//             {/* Circular base */}
//             <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
//                 <ringGeometry args={[1.5, 1.55, 64]} />
//                 <meshBasicMaterial color={hologramColor} />
//             </mesh>
//
//             {/* Enhanced effects - particles */}
//             {enhancedEffects && <Particles count={200} color={hologramColor} />}
//
//             {/* Contact shadows for enhanced realism */}
//             {enhancedEffects && (
//                 <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={10} blur={1} far={10} color={hologramColor} />
//             )}
//
//             {/* Status indicators */}
//             <Html position={[-1.8, -0.1, 0]} transform>
//                 <div className="text-xs font-mono flex items-center gap-1" style={{ color: hologramColor }}>
//                     <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: hologramColor }}></div>
//                     SCANNING
//                 </div>
//             </Html>
//
//             <Html position={[1.8, -0.1, 0]} transform>
//                 <div
//                     className="text-xs font-mono text-right flex items-center gap-1 justify-end"
//                     style={{ color: hologramColor }}
//                 >
//                     PROJECTION ACTIVE
//                     <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: hologramColor }}></div>
//                 </div>
//             </Html>
//
//             {/* Application-specific UI elements */}
//             {application === APPLICATIONS.EDUCATION && (
//                 <Html position={[0, -0.5, 0]} transform>
//                     <div className="bg-black/50 p-2 rounded text-xs backdrop-blur-sm" style={{ color: hologramColor }}>
//                         Modèle anatomique interactif - Cliquez pour plus d'informations
//                     </div>
//                 </Html>
//             )}
//
//             {application === APPLICATIONS.COMMERCE && (
//                 <Html position={[0, -0.5, 0]} transform>
//                     <div className="bg-black/50 p-2 rounded text-xs backdrop-blur-sm" style={{ color: hologramColor }}>
//                         Essayage virtuel - Faites glisser pour changer de vêtement
//                     </div>
//                 </Html>
//             )}
//         </group>
//     )
// }
//
// function HumanModel({
//                         hologramOpacity,
//                         hologramColor,
//                         modelDetails,
//                         isPlaying,
//                         animationSpeed,
//                         enhancedEffects,
//                         onError,
//                         setModelLoaded,
//                     }) {
//     const [model, setModel] = useState(null)
//
//     // Utiliser useGLTF avec gestion d'erreur
//     const { scene, animations } = (() => {
//         try {
//             const gltf = useGLTF(modelDetails.path)
//             setModelLoaded(true)
//             return gltf
//         } catch (error) {
//             console.error(`Erreur lors du chargement du modèle: ${error.message}`)
//             if (onError) onError()
//             setModelLoaded(false)
//             return { scene: null, animations: [] }
//         }
//     })()
//
//     const { actions, mixer } = useAnimations(animations, scene)
//
//     // Set up animations
//     useEffect(() => {
//         if (actions && Object.keys(actions).length > 0) {
//             // Get the first animation
//             const firstAction = Object.values(actions)[0]
//
//             if (firstAction) {
//                 // Play or pause based on isPlaying state
//                 if (isPlaying) {
//                     firstAction.reset().play()
//                 } else {
//                     firstAction.paused = true
//                 }
//
//                 // Set animation speed
//                 if (mixer) {
//                     mixer.timeScale = animationSpeed
//                 }
//             }
//         }
//     }, [actions, isPlaying, animationSpeed, mixer])
//
//     // Clone the scene to avoid modifying the original
//     useEffect(() => {
//         if (scene) {
//             try {
//                 // Create a shallow clone of the scene
//                 const clonedScene = scene.clone(false)
//                 setModel(clonedScene)
//             } catch (error) {
//                 console.error(`Erreur lors du clonage du modèle: ${error.message}`)
//                 if (onError) onError()
//             }
//         }
//     }, [scene, onError])
//
//     if (!model) return null
//
//     return (
//         <Center>
//             <group scale={modelDetails.scale} position={modelDetails.position} rotation={modelDetails.rotation}>
//                 <primitive object={model}>
//                     {/* Apply holographic material effect to the model */}
//                     <meshPhysicalMaterial
//                         color={hologramColor}
//                         opacity={hologramOpacity}
//                         transparent={true}
//                         transmission={enhancedEffects ? 1 : 0.5}
//                         thickness={0.5}
//                         roughness={0.2}
//                         metalness={0.1}
//                         clearcoat={enhancedEffects ? 1 : 0}
//                         clearcoatRoughness={0.1}
//                         emissive={hologramColor}
//                         emissiveIntensity={enhancedEffects ? 0.5 : 0.3}
//                     />
//                 </primitive>
//             </group>
//         </Center>
//     )
// }
//
// // Ligne connectant les étiquettes au modèle
// function Line({ start, end, color, opacity, modelPosition }) {
//     const ref = useRef<THREE.Matrix4>(null!)
//
//     useFrame(() => {
//         if (ref.current) {
//             // Calculer la position de fin (vers le modèle)
//             const endPosition = modelPosition || new Vector3(0, 0, 0)
//             ref.current.geometry.setFromPoints([new Vector3(...start), endPosition])
//         }
//     })
//
//     return (
//         <line ref={ref}>
//             <bufferGeometry />
//             <lineBasicMaterial color={color} opacity={opacity} transparent />
//         </line>
//     )
// }
//
// // Système de particules pour effet holographique amélioré
// function Particles({ count, color }) {
//     const mesh = useRef(new THREE.Mesh())
//     const { size, viewport } = useThree()
//     const aspect = size.width / viewport.width
//
//     // Générer des positions aléatoires pour les particules
//     const dummy = useRef(new Vector3())
//     const matrix = useRef(new THREE.Matrix4())
//
//     const particles = useMemo(() => {
//         const temp = []
//         for (let i = 0; i < count; i++) {
//             const t = Math.random() * 100
//             const factor = 20 + Math.random() * 100
//             const speed = 0.01 + Math.random() / 200
//             const xFactor = -50 + Math.random() * 100
//             const yFactor = -50 + Math.random() * 100
//             const zFactor = -50 + Math.random() * 100
//             temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
//         }
//         return temp
//     }, [count])
//
//     useFrame(() => {
//         if (!mesh.current) return
//
//         particles.forEach((particle, i) => {
//             let { t, factor, speed, xFactor, yFactor, zFactor } = particle
//             t = particle.t += speed / 2
//             const a = Math.cos(t) + Math.sin(t * 1) / 10
//             const b = Math.sin(t) + Math.cos(t * 2) / 10
//             const s = Math.cos(t)
//
//             // Mettre à jour la position de chaque particule
//             dummy.current.set(
//                 (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
//                 (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
//                 (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10,
//             )
//
//             // Limiter les particules autour du modèle
//             const distance = dummy.current.length()
//             if (distance > 2.5) {
//                 dummy.current.multiplyScalar(2.5 / distance)
//             }
//
//             dummy.current.multiplyScalar(0.5)
//
//             // Appliquer la position à la particule
//             dummy.current.y = Math.max(dummy.current.y, -0.1) // Garder au-dessus du sol
//
//             // Créer une matrice pour cette particule
//             matrix.current.makeTranslation(dummy.current.x, dummy.current.y, dummy.current.z)
//
//             // Appliquer la matrice à l'instance
//             mesh.current.setMatrixAt(i, matrix.current)
//         })
//
//         mesh.current.instanceMatrix.needsUpdate = true
//     })
//
//     return (
//         <instancedMesh ref={mesh} args={[null, null, count]}>
//             <sphereGeometry args={[0.01, 8, 8]} />
//             <meshBasicMaterial color={color} transparent opacity={0.6} />
//         </instancedMesh>
//     )
// }
//
// // Précharger le modèle de canard par défaut
// useGLTF.preload(MODELS.DUCK.path)
//
























"use client"

import * as THREE from "three"
import { useRef, useState, useEffect, Suspense, useMemo, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
    OrbitControls,
    useGLTF,
    Grid,
    Html,
    Environment,
    ContactShadows,
    useAnimations,
    Loader,
    Text,
    Float,
    PerspectiveCamera,
    Center,
} from "@react-three/drei"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
    Brain,
    ShoppingBag,
    Video,
    Users,
    Layers,
    Maximize,
    Minimize,
    RotateCcw,
    Pause,
    Play,
    Rewind,
    FastForward,
    AlertTriangle,
    Info,
    Settings,
    EyeOff,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {AnimationClip, Group, Vector3} from "three"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {GLTF, GLTFLoader} from "three-stdlib";

// Définition des modes d'application
const APPLICATIONS = {
    EDUCATION: "education",
    COMMERCE: "commerce",
    ENTERTAINMENT: "entertainment",
    COMMUNICATION: "communication",
}

// Structure pour les modèles 3D
// Le modèle de canard est inclus par défaut, les autres seront ajoutés par l'utilisateur
const MODELS = {
    DUCK: {
        id: "duck",
        name: "Canard (Démo)",
        path: "/holograming_man.glb",
        scale: [1, 1, 1],
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        description: "Modèle de démonstration inclus par défaut",
        category: "demo",
    },
    // Les modèles suivants seront ajoutés par l'utilisateur
    HUMAN_MALE: {
        id: "human_male",
        name: "Humain (Homme)",
        path: "/holograming_man.glb", // Chemin à ajuster selon votre structure
        scale: [1, 1, 1],
        position: [0, -1, 0], // Ajustez selon la taille du modèle
        rotation: [0, 0, 0],
        description: "Modèle humain masculin",
        category: "human",
    },
    HUMAN_FEMALE: {
        id: "human_female",
        name: "Humain (Femme)",
        path: "/holograming_man.glb", // Chemin à ajuster selon votre structure
        scale: [1, 1, 1],
        position: [0, -1, 0], // Ajustez selon la taille du modèle
        rotation: [0, 0, 0],
        description: "Modèle humain féminin",
        category: "human",
    },
    ROBOT: {
        id: "robot",
        name: "Robot",
        path: "/holograming_man.glb", // Chemin à ajuster selon votre structure
        scale: [1, 1, 1],
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        description: "Modèle de robot futuriste",
        category: "robot",
    },
    ANATOMY: {
        id: "anatomy",
        name: "Anatomie",
        path: "/holograming_man.glb", // Chemin à ajuster selon votre structure
        scale: [1, 1, 1],
        position: [0, -1, 0],
        rotation: [0, 0, 0],
        description: "Modèle anatomique humain",
        category: "medical",
    },
}

// Catégories de modèles pour l'organisation dans l'interface
const MODEL_CATEGORIES = {
    demo: "Démonstration",
    human: "Humains",
    robot: "Robots",
    medical: "Médical",
}

export default function HologramHumanEnhanced({ minimal = false }) {
    const [zoom, setZoom] = useState(2.5)
    const [rotationSpeed, setRotationSpeed] = useState(0.2)
    const [hologramOpacity, setHologramOpacity] = useState(0.8)
    const [hologramColor, setHologramColor] = useState("#8a2be2") // Couleur violette pour correspondre au portfolio
    const [autoRotate, setAutoRotate] = useState(true)
    const [application, setApplication] = useState(APPLICATIONS.ENTERTAINMENT)
    const [currentModel, setCurrentModel] = useState(MODELS.DUCK.id)
    const [isPlaying, setIsPlaying] = useState(true)
    const [animationSpeed, setAnimationSpeed] = useState(1)
    const [showLabels, setShowLabels] = useState(false)
    const [enhancedEffects, setEnhancedEffects] = useState(true)
    const [fullscreen, setFullscreen] = useState(false)
    const [showControls, setShowControls] = useState(!minimal)
    const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true)
    const [modelLoadError, setModelLoadError] = useState(false)
    const [availableModels, setAvailableModels] = useState([MODELS.DUCK.id])
    const [modelLoaded, setModelLoaded] = useState(false)
    const [showPanel, setShowPanel] = useState(!minimal)
    // Ajouter un nouvel état pour contrôler la visibilité de tous les contrôles
    const [showAllControls, setShowAllControls] = useState(true)

    // Vérifier quels modèles sont disponibles
    const checkModelAvailability = useCallback(async () => {
        const available = [MODELS.DUCK.id] // Le canard est toujours disponible

        // Vérifier chaque modèle
        for (const modelKey in MODELS) {
            if (modelKey === "DUCK") continue // Déjà inclus

            if (modelKey in MODELS) {
                const model = MODELS[modelKey as keyof typeof MODELS];

                try {
                    const response = await fetch(model.path, { method: "HEAD" })
                    if (response.ok) {
                        available.push(model.id)
                    }
                } catch (error) {
                    console.log(`Modèle ${model.name} non disponible`)
                }
            }

            // const model = MODELS[modelKey]
            // try {
            //     const response = await fetch(model.path, { method: "HEAD" })
            //     if (response.ok) {
            //         available.push(model.id)
            //     }
            // } catch (error) {
            //     console.log(`Modèle ${model.name} non disponible`)
            // }
        }

        setAvailableModels(available)
    }, [])

    useEffect(() => {
        checkModelAvailability()
    }, [checkModelAvailability])

    // Gestion du plein écran
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Erreur: ${err.message}`)
            })
            setFullscreen(true)
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
                setFullscreen(false)
            }
        }
    }

    // Obtenir les détails du modèle actuel
    const getCurrentModelDetails = () => {
        return Object.values(MODELS).find((model) => model.id === currentModel) || MODELS.DUCK
    }

    // Déterminer les paramètres spécifiques à l'application
    const getApplicationSettings = () => {
        switch (application) {
            case APPLICATIONS.EDUCATION:
                return {
                    title: "Mode Éducation",
                    description: "Visualisation anatomique interactive",
                    icon: <Brain className="w-5 h-5" />,
                    color: "#00a6ff",
                    labels: ["Tête", "Torse", "Membres", "Articulations"],
                    cameraPosition: [0, 1.5, 2.5],
                }
            case APPLICATIONS.COMMERCE:
                return {
                    title: "Mode Commerce",
                    description: "Essayage virtuel et présentation produit",
                    icon: <ShoppingBag className="w-5 h-5" />,
                    color: "#00d68f",
                    labels: ["Vêtement", "Accessoire", "Taille", "Couleur"],
                    cameraPosition: [0, 1.2, 2.2],
                }
            case APPLICATIONS.ENTERTAINMENT:
                return {
                    title: "Mode Divertissement",
                    description: "Personnage interactif pour médias",
                    icon: <Video className="w-5 h-5" />,
                    color: "#8a2be2", // Adapté à la couleur du portfolio
                    labels: ["Animation", "Expression", "Effet", "Scène"],
                    cameraPosition: [0, 1.0, 3.0],
                }
            case APPLICATIONS.COMMUNICATION:
                return {
                    title: "Mode Communication",
                    description: "Avatar pour téléprésence",
                    icon: <Users className="w-5 h-5" />,
                    color: "#a855f7",
                    labels: ["Statut", "Geste", "Expression", "Présence"],
                    cameraPosition: [0, 1.3, 2.0],
                }
            default:
                return {
                    title: "Mode Standard",
                    description: "Hologramme interactif",
                    icon: <Layers className="w-5 h-5" />,
                    color: "#8a2be2",
                    labels: [],
                    cameraPosition: [0, 1.5, 2.5],
                }
        }
    }

    const appSettings = getApplicationSettings()

    // Mettre à jour la couleur de l'hologramme en fonction de l'application
    useEffect(() => {
        if (!minimal) {
            setHologramColor(appSettings.color)
        }
    }, [application, minimal, appSettings.color])

    // Désactiver les contrôles orbitaux lors de l'interaction avec l'UI
    const handleUIInteractionStart = () => {
        setOrbitControlsEnabled(false)
    }

    const handleUIInteractionEnd = () => {
        setOrbitControlsEnabled(true)
    }

    // Gérer l'erreur de chargement du modèle
    const handleModelLoadError = () => {
        setModelLoadError(true)
        // Revenir au modèle de canard par défaut
        setCurrentModel(MODELS.DUCK.id)
    }

    // Réinitialiser l'erreur lors du changement de modèle
    useEffect(() => {
        setModelLoadError(false)
    }, [currentModel])

    // Obtenir les modèles disponibles par catégorie
    const getModelsByCategory = () => {
        // const categories = {}
        const categories: { [key: string]: any[] } = {}

        Object.values(MODELS).forEach((model) => {
            if (availableModels.includes(model.id)) {
                if (!categories[model.category]) {
                    categories[model.category] = []
                }
                categories[model.category].push(model)
            }
        })

        return categories
    }

    const modelsByCategory = getModelsByCategory()
    const currentModelDetails = getCurrentModelDetails()

    // Mettre à jour la visibilité du panneau en fonction du mode minimal
    useEffect(() => {
        setShowPanel(!minimal)
    }, [minimal])

    return (
        <div
            className={`w-full ${fullscreen ? "h-screen fixed inset-0 z-50" : "h-full"} bg-black relative overflow-hidden`}
        >
            <div className="absolute inset-0 z-0">
                <Canvas shadows>
                    <color attach="background" args={["#000"]} />
                    <fog attach="fog" args={["#000", 5, 20]} />

                    <PerspectiveCamera makeDefault position={appSettings.cameraPosition as [number, number, number]} fov={50} />

                    <Suspense
                        fallback={
                            (
                                <Html center>
                                    <div className="text-cyan-400">Chargement du modèle...</div>
                                </Html>
                            ) as React.ReactNode
                        }
                    >
                        <HologramScene
                            rotationSpeed={rotationSpeed}
                            hologramOpacity={hologramOpacity}
                            hologramColor={hologramColor}
                            autoRotate={autoRotate}
                            application={application}
                            modelDetails={currentModelDetails}
                            isPlaying={isPlaying}
                            animationSpeed={animationSpeed}
                            showLabels={showLabels}
                            enhancedEffects={enhancedEffects}
                            appSettings={appSettings}
                            minimal={minimal}
                            onError={handleModelLoadError}
                            setModelLoaded={setModelLoaded}
                        />
                    </Suspense>

                    <OrbitControls
                        enabled={orbitControlsEnabled}
                        autoRotate={autoRotate}
                        autoRotateSpeed={rotationSpeed}
                        enableZoom={true}
                        enablePan={true}
                        minDistance={1.5}
                        maxDistance={10}
                    />
                </Canvas>
            </div>

            {/* Interface utilisateur - Utilisation de z-index pour s'assurer que l'UI est au-dessus du canvas */}
            <div className="absolute top-4 left-4 text-white/80 flex items-center gap-2 z-10">
                <div className="bg-black/50 p-2 rounded-lg backdrop-blur-sm">{appSettings.icon}</div>
                <div>
                    <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                        {appSettings.title}
                        <Badge
                            variant="outline"
                            className="ml-2 text-xs font-normal"
                            style={{ borderColor: appSettings.color, color: appSettings.color }}
                        >
                            PROTOTYPE
                        </Badge>
                    </h1>
                    <p className="text-sm" style={{ color: appSettings.color }}>
                        {appSettings.description}
                    </p>
                </div>
            </div>

            {/* Affichage du modèle actuel */}
            <div className="absolute top-4 right-16 text-white/80 z-10 bg-black/50 p-2 rounded-lg backdrop-blur-sm">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 cursor-help">
                                <span className="text-sm">{currentModelDetails.name}</span>
                                <Info className="w-4 h-4" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{currentModelDetails.description}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {/* Contrôles de lecture */}
            <div
                className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 p-2 rounded-full backdrop-blur-sm z-10"
                onMouseEnter={handleUIInteractionStart}
                onMouseLeave={handleUIInteractionEnd}
                onTouchStart={handleUIInteractionStart}
                onTouchEnd={handleUIInteractionEnd}
            >
                <Button variant="ghost" size="icon" onClick={() => setAnimationSpeed(Math.max(0.5, animationSpeed - 0.5))}>
                    <Rewind className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                    <>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setAnimationSpeed(Math.min(2, animationSpeed + 0.5))}>
                    <FastForward className="w-4 h-4" />
                </Button>
            </div>

            {/* Bouton plein écran */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm z-10"
                onClick={toggleFullscreen}
                onMouseEnter={handleUIInteractionStart}
                onMouseLeave={handleUIInteractionEnd}
                onTouchStart={handleUIInteractionStart}
                onTouchEnd={handleUIInteractionEnd}
            >
                <>
                {fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </>
            </Button>

            {/* Panneau de contrôle */}
            <Card
                className={`absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-black/80 border-cyan-500/30 text-white backdrop-blur-sm z-20 transition-all duration-300 ${
                    showPanel ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                }`}
                onMouseEnter={handleUIInteractionStart}
                onMouseLeave={handleUIInteractionEnd}
                onTouchStart={handleUIInteractionStart}
                onTouchEnd={handleUIInteractionEnd}
            >
                <CardContent className="p-4">
                    <Tabs defaultValue="application">
                        <TabsList className="grid grid-cols-4 mb-4">
                            <TabsTrigger value="application">Mode</TabsTrigger>
                            <TabsTrigger value="model">Modèle</TabsTrigger>
                            <TabsTrigger value="controls">Contrôles</TabsTrigger>
                            <TabsTrigger value="effects">Effets</TabsTrigger>
                        </TabsList>

                        {/* Onglet Applications */}
                        <TabsContent value="application" className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant={application === APPLICATIONS.EDUCATION ? "default" : "outline" as "default" | "outline"}
                                    className={application === APPLICATIONS.EDUCATION ? "bg-blue-600" : ""}
                                    onClick={() => setApplication(APPLICATIONS.EDUCATION)}
                                >
                                    <Brain className="w-4 h-4 mr-2" />
                                    Éducation
                                </Button>
                                <Button
                                    variant={application === APPLICATIONS.COMMERCE ? "default" : "outline" as "default" | "outline"}
                                    className={application === APPLICATIONS.COMMERCE ? "bg-green-600" : ""}
                                    onClick={() => setApplication(APPLICATIONS.COMMERCE)}
                                >
                                    <ShoppingBag className="w-4 h-4 mr-2" />
                                    Commerce
                                </Button>
                                <Button
                                    variant={application === APPLICATIONS.ENTERTAINMENT ? "default" : "outline" as "default" | "outline"}
                                    className={application === APPLICATIONS.ENTERTAINMENT ? "bg-pink-600" : ""}
                                    onClick={() => setApplication(APPLICATIONS.ENTERTAINMENT)}
                                >
                                    <Video className="w-4 h-4 mr-2" />
                                    Média
                                </Button>
                                <Button
                                    variant={application === APPLICATIONS.COMMUNICATION ? "default" : "outline" as "default" | "outline"}
                                    className={application === APPLICATIONS.COMMUNICATION ? "bg-purple-600" : ""}
                                    onClick={() => setApplication(APPLICATIONS.COMMUNICATION)}
                                >
                                    <Users className="w-4 h-4 mr-2" />
                                    Communication
                                </Button>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="labels" checked={showLabels} onCheckedChange={setShowLabels} />
                                <Label htmlFor="labels">Afficher les étiquettes</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="show-params" checked={showPanel} onCheckedChange={setShowPanel} />
                                <Label htmlFor="show-params">Afficher les paramètres</Label>
                            </div>
                        </TabsContent>

                        {/* Onglet Modèle */}
                        <TabsContent value="model" className="space-y-4">
                            <>
                            {modelLoadError && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Erreur de chargement</AlertTitle>
                                    <AlertDescription className="text-xs">
                                        Impossible de charger le modèle sélectionné. Vérifiez que le fichier existe et est accessible.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {availableModels.length <= 1 && (
                                <Alert variant="default" className="bg-yellow-900/20 border-yellow-600/50 mb-4">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Modèles limités</AlertTitle>
                                    <AlertDescription className="text-xs">
                                        Seul le modèle de démonstration est actuellement disponible. Ajoutez vos modèles 3D dans le dossier
                                        /public/models/.
                                    </AlertDescription>
                                </Alert>
                            )}
                            </>

                            {/* Sélection de modèle par catégorie */}
                            <div className="space-y-4">
                                {Object.entries(modelsByCategory).map(([category, models]) => (
                                    <div key={category} className="space-y-2">
                                        <h3 className="text-sm font-medium">{MODEL_CATEGORIES[category as keyof typeof MODEL_CATEGORIES] || category}</h3>
                                        <div className="grid grid-cols-1 gap-2">
                                            {models.map((model) => (
                                                <Button
                                                    key={model.id}
                                                    variant={currentModel === model.id ? "default" : "outline" as "default" | "outline"}
                                                    className={`justify-start ${currentModel === model.id ? "bg-primary" : ""}`}
                                                    onClick={() => setCurrentModel(model.id)}
                                                >
                                                    {model.name}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 mt-4">
                                <div className="flex justify-between">
                                    <span>Vitesse d'animation</span>
                                    <span>{animationSpeed.toFixed(1)}x</span>
                                </div>
                                <Slider
                                    value={[animationSpeed]}
                                    min={0.5}
                                    max={2}
                                    step={0.1}
                                    onValueChange={(value) => setAnimationSpeed(value[0])}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="animation" checked={isPlaying} onCheckedChange={setIsPlaying} />
                                <Label htmlFor="animation">Animation active</Label>
                            </div>
                        </TabsContent>

                        {/* Onglet Contrôles */}
                        <TabsContent value="controls" className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Vitesse de rotation</span>
                                    <span>{rotationSpeed.toFixed(1)}</span>
                                </div>
                                <Slider
                                    value={[rotationSpeed]}
                                    min={0}
                                    max={2}
                                    step={0.1}
                                    onValueChange={(value) => setRotationSpeed(value[0])}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="auto-rotate" checked={autoRotate} onCheckedChange={setAutoRotate} />
                                <Label htmlFor="auto-rotate">Rotation automatique</Label>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                    setRotationSpeed(0.2)
                                    setAutoRotate(true)
                                }}
                            >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Réinitialiser la vue
                            </Button>
                        </TabsContent>

                        {/* Onglet Effets */}
                        <TabsContent value="effects" className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Opacité</span>
                                    <span>{hologramOpacity.toFixed(1)}</span>
                                </div>
                                <Slider
                                    value={[hologramOpacity]}
                                    min={0.3}
                                    max={1}
                                    step={0.1}
                                    onValueChange={(value) => setHologramOpacity(value[0])}
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span>Couleur hologramme</span>
                                    <input
                                        type="color"
                                        value={hologramColor}
                                        onChange={(e) => setHologramColor(e.target.value)}
                                        className="w-10 h-10 rounded-md border-none bg-transparent"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="enhanced-effects" checked={enhancedEffects} onCheckedChange={setEnhancedEffects} />
                                <Label htmlFor="enhanced-effects">Effets avancés</Label>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Bouton pour afficher/masquer les paramètres */}
            <Button
                variant="outline"
                size="sm"
                className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm z-30 flex items-center gap-2"
                onClick={() => setShowPanel(!showPanel)}
                onMouseEnter={handleUIInteractionStart}
                onMouseLeave={handleUIInteractionEnd}
                onTouchStart={handleUIInteractionStart}
                onTouchEnd={handleUIInteractionEnd}
            >
                <>
                {showPanel ? (
                    <>
                        <EyeOff className="w-4 h-4" />
                        <span>Masquer les paramètres</span>
                    </>
                ) : (
                    <>
                        <Settings className="w-4 h-4" />
                        <span>Afficher les paramètres</span>
                    </>
                )}
                </>
            </Button>
            <Loader />
        </div>
    )
}


interface HologramSceneProps {
    rotationSpeed: number;
    hologramOpacity: number;
    hologramColor: string;
    autoRotate: boolean;
    application: any; // Remplacez "any" par le type approprié si possible
    modelDetails: any; // Remplacez "any" par le type approprié si possible
    isPlaying: boolean;
    animationSpeed: number;
    showLabels: boolean;
    enhancedEffects: boolean;
    appSettings: any; // Remplacez "any" par le type approprié si possible
    minimal: boolean;
    onError: (error: Error) => void;
    setModelLoaded: (loaded: boolean) => void;
}


function HologramScene({
                           rotationSpeed,
                           hologramOpacity,
                           hologramColor,
                           autoRotate,
                           application,
                           modelDetails,
                           isPlaying,
                           animationSpeed,
                           showLabels,
                           enhancedEffects,
                           appSettings,
                           minimal,
                           onError,
                           setModelLoaded,
                       } : HologramSceneProps) {
    // const groupRef = useRef()
    const groupRef = useRef<THREE.Group>(null!);
    // const humanRef = useRef()
    const humanRef = useRef<THREE.Object3D>(null!);

    // Scan effect
    // const scanRef = useRef()
    const scanRef = useRef<THREE.Object3D>(null!);
    useFrame(({ clock }) => {
        if (scanRef.current) {
            scanRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.9 + 0.9
        }

        // Manual rotation if autoRotate is disabled
        if (humanRef.current && !autoRotate) {
            humanRef.current.rotation.y += rotationSpeed * 0.01
        }
    })

    return (
        <group ref={groupRef}>
            {/* Environment */}
            {enhancedEffects && <Environment preset="city" />}

            {/* Base platform */}
            <Grid
                position={[0, -0.01, 0]}
                args={[10, 10]}
                cellSize={0.5}
                cellThickness={0.5}
                cellColor={hologramColor}
                fadeDistance={10}
                fadeStrength={5}
            />

            {/* Holographic human */}
            <group ref={humanRef} position={[0, 0, 0]} scale={0.9}>
                <HumanModel
                    hologramOpacity={hologramOpacity}
                    hologramColor={hologramColor}
                    modelDetails={modelDetails}
                    isPlaying={isPlaying}
                    animationSpeed={animationSpeed}
                    enhancedEffects={enhancedEffects}
                    onError={onError}
                    setModelLoaded={setModelLoaded}
                />

                {/* Labels for educational/commercial purposes */}
                {showLabels &&
                    appSettings.labels.map((label: any, index: any) => {
                        // Position labels around the model
                        const angle = (index / appSettings.labels.length) * Math.PI * 2
                        const radius = 1.2
                        const x = Math.sin(angle) * radius
                        const z = Math.cos(angle) * radius
                        const y = 0.5 + index * 0.4

                        return (
                            <group key={index} position={[x, y, z]}>
                                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                                    <Text
                                        color={hologramColor}
                                        fontSize={0.15}
                                        maxWidth={2}
                                        lineHeight={1}
                                        letterSpacing={0.02}
                                        textAlign="center"
                                        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                                        anchorX="center"
                                        anchorY="middle"
                                    >
                                        {label}
                                    </Text>
                                    <mesh position={[0, 0, 0.05]}>
                                        <planeGeometry args={[0.5, 0.15]} />
                                        <meshBasicMaterial color={hologramColor} opacity={0.1} transparent />
                                    </mesh>
                                </Float>

                                {/* Line connecting label to model */}
                                <Line
                                    start={[0, 0, 0]}
                                    end={[0, 0, 0]}
                                    color={hologramColor}
                                    opacity={0.5}
                                    modelPosition={new Vector3(0, y * 0.5, 0).toArray() as [number, number, number]}
                                    // modelPosition={new Vector3(0, y * 0.5, 0)}
                                />
                            </group>
                        )
                    })}
            </group>

            {/* Scanning effect */}
            <mesh ref={scanRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial color={hologramColor} transparent={true} opacity={0.2} wireframe={false} />
            </mesh>

            {/* Circular base */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
                <ringGeometry args={[1.5, 1.55, 64]} />
                <meshBasicMaterial color={hologramColor} />
            </mesh>

            {/* Enhanced effects - particles */}
            {enhancedEffects && <Particles count={200} color={hologramColor} />}

            {/* Contact shadows for enhanced realism */}
            {enhancedEffects && (
                <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={10} blur={1} far={10} color={hologramColor} />
            )}

            {/* Status indicators */}
            <Html position={[-1.8, -0.1, 0]} transform>
                <div className="text-xs font-mono flex items-center gap-1" style={{ color: hologramColor }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: hologramColor }}></div>
                    SCANNING
                </div>
            </Html>

            <Html position={[1.8, -0.1, 0]} transform>
                <div
                    className="text-xs font-mono text-right flex items-center gap-1 justify-end"
                    style={{ color: hologramColor }}
                >
                    PROJECTION ACTIVE
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: hologramColor }}></div>
                </div>
            </Html>

            {/* Application-specific UI elements */}
            {application === APPLICATIONS.EDUCATION && (
                <Html position={[0, -0.5, 0]} transform>
                    <div className="bg-black/50 p-2 rounded text-xs backdrop-blur-sm" style={{ color: hologramColor }}>
                        Modèle anatomique interactif - Cliquez pour plus d'informations
                    </div>
                </Html>
            )}

            {application === APPLICATIONS.COMMERCE && (
                <Html position={[0, -0.5, 0]} transform>
                    <div className="bg-black/50 p-2 rounded text-xs backdrop-blur-sm" style={{ color: hologramColor }}>
                        Essayage virtuel - Faites glisser pour changer de vêtement
                    </div>
                </Html>
            )}
        </group>
    )
}


interface HumanModelProps {
    hologramOpacity: number;
    hologramColor: string;
    modelDetails: any; // Remplacez 'any' par le type adéquat si possible
    isPlaying: boolean;
    animationSpeed: number;
    enhancedEffects: boolean;
    onError: (error: Error) => void;
    setModelLoaded: (loaded: boolean) => void;
}

interface GltfData {
    scene: Group | null;
    animations: AnimationClip[];
}

function HumanModel({
                        hologramOpacity,
                        hologramColor,
                        modelDetails,
                        isPlaying,
                        animationSpeed,
                        enhancedEffects,
                        onError,
                        setModelLoaded,
                    }: HumanModelProps) {
    // const [model, setModel] = useState(null)
    const [model, setModel] = useState<Group | null>(null);
    // const [gltfData, setGltfData] = useState({ scene: null, animations: [] })
    const [gltfData, setGltfData] = useState<GltfData>({ scene: null, animations: [] });
    // const [loadError, setLoadError] = useState(null)
    const [loadError, setLoadError] = useState<ErrorEvent | null>(null);

    // Load model using useGLTF hook
    // useEffect(() => {
    //     let gltf
    //     try {
    //         gltf = useGLTF.getState().load(
    //             modelDetails.path,
    //             undefined,
    //             (gltf) => {
    //                 setModelLoaded(true)
    //                 setGltfData({ scene: gltf.scene, animations: gltf.animations })
    //             },
    //             undefined,
    //             (error) => {
    //                 console.error(`Erreur lors du chargement du modèle: ${error.message}`)
    //                 setLoadError(error)
    //                 if (onError) onError()
    //                 setModelLoaded(false)
    //                 setGltfData({ scene: null, animations: [] })
    //             },
    //         )
    //     } catch (error) {
    //         console.error(`Erreur lors du chargement du modèle: ${error.message}`)
    //         setLoadError(error)
    //         if (onError) onError()
    //         setModelLoaded(false)
    //         setGltfData({ scene: null, animations: [] })
    //     }
    //
    //     return () => {
    //         if (gltf && gltf.dispose) {
    //             gltf.dispose()
    //         }
    //     }
    // }, [modelDetails.path, onError, setModelLoaded])

    // const gltf = useGLTF(modelDetails.path);
    //
    // useEffect(() => {
    //     if (gltf) {
    //         setModelLoaded(true);
    //         setGltfData({ scene: gltf.scene, animations: gltf.animations });
    //     }
    // }, [gltf]);


    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load(
            modelDetails.path,
            (gltf: GLTF) => {
                setModelLoaded(true);
                setGltfData({ scene: gltf.scene, animations: gltf.animations });
            },
            undefined,
            (error) => {
                console.error(`Erreur lors du chargement du modèle: ${error.message}`);
                setLoadError(error);
                if (onError) onError(new Error(error.message));
                setModelLoaded(false);
                setGltfData({ scene: null, animations: [] });
            }
        );
    }, [modelDetails.path, onError]);


    const { scene, animations } = gltfData

    const { actions, mixer } = useAnimations(animations, scene!)

    // Set up animations
    useEffect(() => {
        if (actions && Object.keys(actions).length > 0) {
            // Get the first animation
            const firstAction = Object.values(actions)[0]

            if (firstAction) {
                // Play or pause based on isPlaying state
                if (isPlaying) {
                    firstAction.reset().play()
                } else {
                    firstAction.paused = true
                }

                // Set animation speed
                if (mixer) {
                    mixer.timeScale = animationSpeed
                }
            }
        }
    }, [actions, isPlaying, animationSpeed, mixer])

    // Clone the scene to avoid modifying the original
    useEffect(() => {
        if (scene) {
            try {
                // Create a shallow clone of the scene
                const clonedScene = scene.clone(false)
                setModel(clonedScene)
            } catch (error) {
                const err = error as Error;
                console.error(`Erreur lors du clonage du modèle: ${err.message}`)
                if (onError) onError(new Error(err.message))
            }
        }
    }, [scene, onError])

    if (!model) return null

    return (
        <Center>
            <group scale={modelDetails.scale} position={modelDetails.position} rotation={modelDetails.rotation}>
                <primitive object={model}>
                    {/* Apply holographic material effect to the model */}
                    <meshPhysicalMaterial
                        color={hologramColor}
                        opacity={hologramOpacity}
                        transparent={true}
                        transmission={enhancedEffects ? 1 : 0.5}
                        thickness={0.5}
                        roughness={0.2}
                        metalness={0.1}
                        clearcoat={enhancedEffects ? 1 : 0}
                        clearcoatRoughness={0.1}
                        emissive={hologramColor}
                        emissiveIntensity={enhancedEffects ? 0.5 : 0.3}
                    />
                </primitive>
            </group>
        </Center>
    )
}


interface LineProps {
    start: [number, number, number];
    end: [number, number, number];
    color: string;
    opacity: number;
    modelPosition: [number, number, number];
}

// Ligne connectant les étiquettes au modèle
function Line({ start, end, color, opacity, modelPosition }: LineProps) {
    // const ref = useRef<THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>>(null!);
    //
    // useFrame(() => {
    //     if (ref.current) {
    //         // Calculer la position de fin (vers le modèle)
    //         const endPosition = modelPosition || new Vector3(0, 0, 0)
    //         ref.current.geometry.setFromPoints([new Vector3(...start), endPosition])
    //     }
    // })


    const ref = useRef<THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>>(null!);

    useFrame(() => {
        if (ref.current) {
            const endPosition = modelPosition || new THREE.Vector3(...end);
            // ref.current.geometry.setFromPoints([
            //     new THREE.Vector3(...start),
            //     endPosition,
            // ]);
            ref.current.geometry.setFromPoints([
                new THREE.Vector3(...start),
                new THREE.Vector3(...endPosition),
            ]);
        }
    });

    return (
        <line ref={ref as any}>
            <bufferGeometry />
            <lineBasicMaterial color={color} opacity={opacity} transparent />
        </line>
    )
}

interface ParticlesProps {
    count: number;
    color: string;
}

// Système de particules pour effet holographique amélioré
function Particles({ count, color }: ParticlesProps) {
    // const mesh = useRef(new THREE.InstancedMesh())
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width

    // Générer des positions aléatoires pour les particules
    const dummy = useRef(new Vector3())
    const matrix = useRef(new THREE.Matrix4())

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])

    useFrame(() => {
        if (!mesh.current) return

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)

            // Mettre à jour la position de chaque particule
            dummy.current.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10,
            )

            // Limiter les particules autour du modèle
            const distance = dummy.current.length()
            if (distance > 2.5) {
                dummy.current.multiplyScalar(2.5 / distance)
            }

            dummy.current.multiplyScalar(0.5)

            // Appliquer la position à la particule
            dummy.current.y = Math.max(dummy.current.y, -0.1) // Garder au-dessus du sol

            // Créer une matrice pour cette particule
            matrix.current.makeTranslation(dummy.current.x, dummy.current.y, dummy.current.z)

            // Appliquer la matrice à l'instance
            mesh.current.setMatrixAt(i, matrix.current)
        })

        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        // <instancedMesh ref={mesh} args={[null, null, count]}>
        //     <sphereGeometry args={[0.01, 8, 8]} />
        //     <meshBasicMaterial color={color} transparent opacity={0.6} />
        // </instancedMesh>

        <instancedMesh ref={mesh} count={count} args={[new THREE.BufferGeometry(), new THREE.MeshBasicMaterial(), count]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshBasicMaterial color={color} transparent={true} opacity={0.6} />
        </instancedMesh>
    )
}

// Précharger le modèle de canard par défaut
useGLTF.preload(MODELS.DUCK.path)

