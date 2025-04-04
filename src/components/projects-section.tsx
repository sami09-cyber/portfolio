// "use client"
//
// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { ExternalLink, Github, Eye } from "lucide-react"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import Image from "next/image"
//
// type Project = {
//     id: number
//     title: string
//     description: string
//     image: string
//     tags: string[]
//     demoUrl?: string
//     githubUrl?: string
//     category: string
//     details: string
// }
//
// export function ProjectsSection() {
//     const [filter, setFilter] = useState("all")
//
//     const projects: Project[] = [
//         {
//             id: 1,
//             title: "Application E-commerce",
//             description: "Une application e-commerce moderne avec panier d'achat et paiement intégré.",
//             image: "/placeholder.svg?height=600&width=800",
//             tags: ["React", "Next.js", "Stripe", "Tailwind CSS"],
//             demoUrl: "https://example.com",
//             githubUrl: "https://github.com",
//             category: "web",
//             details:
//                 "Cette application e-commerce offre une expérience d'achat fluide avec une interface utilisateur intuitive. Elle intègre un système de panier, des paiements sécurisés via Stripe, et une gestion des produits dynamique. Le frontend est développé avec React et Next.js, tandis que le backend utilise Node.js et MongoDB pour stocker les données des produits et des utilisateurs.",
//         },
//         {
//             id: 2,
//             title: "Portfolio 3D",
//             description: "Un portfolio interactif avec des éléments 3D et des animations avancées.",
//             image: "/placeholder.svg?height=600&width=800",
//             tags: ["Three.js", "React", "GSAP", "WebGL"],
//             demoUrl: "https://example.com",
//             githubUrl: "https://github.com",
//             category: "3d",
//             details:
//                 "Ce portfolio 3D repousse les limites de l'expérience web traditionnelle en intégrant des éléments 3D interactifs et des animations fluides. Développé avec Three.js et React, il offre une navigation immersive à travers différentes sections. Les transitions sont gérées avec GSAP pour une expérience utilisateur optimale. Le projet utilise également des shaders personnalisés pour créer des effets visuels uniques.",
//         },
//         {
//             id: 3,
//             title: "Dashboard Analytics",
//             description: "Un tableau de bord d'analyse de données avec visualisations interactives.",
//             image: "/placeholder.svg?height=600&width=800",
//             tags: ["React", "D3.js", "TypeScript", "Firebase"],
//             demoUrl: "https://example.com",
//             githubUrl: "https://github.com",
//             category: "web",
//             details:
//                 "Ce tableau de bord d'analyse offre des visualisations de données complexes rendues accessibles grâce à une interface utilisateur intuitive. Développé avec React et TypeScript, il utilise D3.js pour créer des graphiques interactifs et informatifs. Les données sont stockées et synchronisées en temps réel via Firebase, permettant aux utilisateurs de collaborer et de partager des insights. Le projet inclut également des fonctionnalités d'exportation de rapports et d'alertes personnalisables.",
//         },
//         {
//             id: 4,
//             title: "Application Mobile Fitness",
//             description: "Une application mobile de fitness avec suivi d'activité et plans d'entraînement.",
//             image: "/placeholder.svg?height=600&width=800",
//             tags: ["React Native", "Redux", "Node.js", "MongoDB"],
//             category: "mobile",
//             details:
//                 "Cette application mobile de fitness aide les utilisateurs à suivre leurs activités physiques et à respecter leurs plans d'entraînement. Développée avec React Native pour une expérience native sur iOS et Android, elle utilise Redux pour la gestion d'état et Node.js avec MongoDB pour le backend. L'application offre des fonctionnalités comme le suivi des calories, des exercices personnalisés, et des statistiques détaillées sur les progrès de l'utilisateur.",
//         },
//         {
//             id: 5,
//             title: "Jeu Web Interactif",
//             description: "Un jeu web interactif avec des graphismes 2D et une physique réaliste.",
//             image: "/placeholder.svg?height=600&width=800",
//             tags: ["JavaScript", "Canvas API", "Matter.js", "Howler.js"],
//             demoUrl: "https://example.com",
//             category: "game",
//             details:
//                 "Ce jeu web interactif combine des graphismes 2D attrayants avec une physique réaliste pour offrir une expérience de jeu immersive directement dans le navigateur. Développé avec JavaScript vanilla et l'API Canvas pour le rendu, il utilise Matter.js pour la simulation physique et Howler.js pour les effets sonores. Le jeu propose plusieurs niveaux avec une difficulté progressive et un système de score pour encourager la rejouabilité.",
//         },
//         {
//             id: 6,
//             title: "Expérience VR Architecturale",
//             description: "Une expérience VR permettant d'explorer des modèles architecturaux en 3D.",
//             image: "/placeholder.svg?height=600&width=800",
//             tags: ["WebXR", "Three.js", "React", "Blender"],
//             demoUrl: "https://example.com",
//             category: "3d",
//             details:
//                 "Cette expérience VR architecturale permet aux utilisateurs d'explorer des bâtiments et des espaces en réalité virtuelle directement depuis leur navigateur. Développée avec WebXR et Three.js, elle offre une immersion complète dans des modèles 3D créés avec Blender. L'interface utilisateur, construite avec React, permet de naviguer facilement entre différents modèles et de personnaliser l'expérience. Le projet inclut également des fonctionnalités comme la mesure des distances et l'annotation des espaces.",
//         },
//     ]
//
//     const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)
//
//     const categories = [
//         { id: "all", name: "Tous" },
//         { id: "web", name: "Web" },
//         { id: "mobile", name: "Mobile" },
//         { id: "3d", name: "3D" },
//         { id: "game", name: "Jeux" },
//     ]
//
//     const container = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1,
//             },
//         },
//     }
//
//     const item = {
//         hidden: { opacity: 0, y: 20 },
//         show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     }
//
//     return (
//         <section id="projects" className="py-20">
//             <div className="container mx-auto px-4">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5 }}
//                     className="text-center mb-16"
//                 >
//                     <h2 className="text-3xl md:text-4xl font-bold mb-4">Mes Projets</h2>
//                     <p className="text-muted-foreground max-w-2xl mx-auto">
//                         Découvrez une sélection de mes projets récents, allant des applications web aux expériences 3D immersives.
//                     </p>
//                 </motion.div>
//
//                 <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5 }}
//                     className="flex justify-center flex-wrap gap-4 mb-12"
//                 >
//                     <>
//                         {categories.map((category) => (
//                             <Button
//                                 key={category.id}
//                                 variant={(filter === category.id ? "default" : "outline") as "default" | "outline"}
//                                 onClick={() => setFilter(category.id)}
//                                 className="rounded-full"
//                             >
//                                 {category.name}
//                             </Button>
//                         ))}
//                     </>
//                 </motion.div>
//
//                 <motion.div
//                     variants={container}
//                     initial="hidden"
//                     whileInView="show"
//                     viewport={{ once: true }}
//                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//                 >
//                     <>
//                     {filteredProjects.map((project) => (
//                         <motion.div key={project.id} variants={item}>
//                             <Card className="overflow-hidden border border-border h-full flex flex-col">
//                                 <div className="relative h-48 overflow-hidden">
//                                     <Image
//                                         src={project.image || "/placeholder.svg"}
//                                         alt={project.title}
//                                         fill
//                                         className="object-cover transition-transform duration-300 hover:scale-105"
//                                     />
//                                 </div>
//                                 <CardContent className="pt-6 flex-grow">
//                                     <h3 className="text-xl font-bold mb-2">{project.title}</h3>
//                                     <p className="text-muted-foreground mb-4">{project.description}</p>
//                                     <div className="flex flex-wrap gap-2 mb-4">
//                                         {project.tags.map((tag) => (
//                                             <Badge key={tag} variant="secondary" className="text-xs">
//                                                 {tag}
//                                             </Badge>
//                                         ))}
//                                     </div>
//                                 </CardContent>
//                                 <CardFooter className="flex justify-between pt-0">
//                                     <Dialog>
//                                         <DialogTrigger asChild>
//                                             <Button variant="outline" size="sm">
//                                                 <Eye size={16} className="mr-2" />
//                                                 Détails
//                                             </Button>
//                                         </DialogTrigger>
//                                         <DialogContent className="max-w-3xl">
//                                             <DialogHeader>
//                                                 <DialogTitle>{project.title}</DialogTitle>
//                                                 <DialogDescription>
//                                                     <>
//                                                     {project.tags.map((tag) => (
//                                                         <Badge key={tag} variant="secondary" className="mr-2 mt-2">
//                                                             {tag}
//                                                         </Badge>
//                                                     ))}
//                                                     </>
//                                                 </DialogDescription>
//                                             </DialogHeader>
//                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//                                                 <div className="relative h-64 rounded-lg overflow-hidden">
//                                                     <Image
//                                                         src={project.image || "/placeholder.svg"}
//                                                         alt={project.title}
//                                                         fill
//                                                         className="object-cover"
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <h4 className="text-lg font-semibold mb-2">Description</h4>
//                                                     <p className="text-muted-foreground">{project.details}</p>
//                                                     <div className="flex gap-4 mt-6">
//                                                         {project.demoUrl && (
//                                                             <Button size="sm" asChild>
//                                                                 <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
//                                                                     <ExternalLink size={16} className="mr-2" />
//                                                                     Démo
//                                                                 </a>
//                                                             </Button>
//                                                         )}
//                                                         {project.githubUrl && (
//                                                             <Button size="sm" variant="outline" asChild>
//                                                                 <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
//                                                                     <Github size={16} className="mr-2" />
//                                                                     Code
//                                                                 </a>
//                                                             </Button>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </DialogContent>
//                                     </Dialog>
//                                     <div className="flex gap-2">
//                                         {project.demoUrl && (
//                                             <Button variant="ghost" size="icon" asChild>
//                                                 <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label="Voir la démo">
//                                                     <ExternalLink size={18} />
//                                                 </a>
//                                             </Button>
//                                         )}
//                                         {project.githubUrl && (
//                                             <Button variant="ghost" size="icon" asChild>
//                                                 <a
//                                                     href={project.githubUrl}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     aria-label="Voir le code source"
//                                                 >
//                                                     <Github size={18} />
//                                                 </a>
//                                             </Button>
//                                         )}
//                                     </div>
//                                 </CardFooter>
//                             </Card>
//                         </motion.div>
//                     ))}
//                     </>
//                 </motion.div>
//             </div>
//         </section>
//     )
// }
//




"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ExternalLink, Github, Filter } from "lucide-react"
import Image from "next/image"

// Type pour les projets
interface Project {
    id: string
    title: string
    description: string
    image: string
    tags: string[]
    demoUrl?: string
    githubUrl?: string
    category: string
}

// Textes statiques (remplace le contexte de langue)
const texts = {
    projects: {
        title: "Mes Projets",
        subtitle:
            "Découvrez une sélection de mes projets récents, allant des applications web aux expériences 3D immersives.",
        categories: {
            all: "Tous",
            web: "Web",
            mobile: "Mobile",
            "3d": "3D",
            game: "Jeux",
        },
        search: "Rechercher par titre, technologie...",
        noResults: "Aucun projet ne correspond à votre recherche",
        inCategory: "dans la catégorie",
        resetFilters: "Réinitialiser les filtres",
        resultsCount: {
            singular: "1 projet trouvé",
            plural: "{count} projets trouvés",
        },
    },
    common: {
        demo: "Démo",
        code: "Code",
    },
}

export function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([])
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState("all")
    const [isLoading, setIsLoading] = useState(true)
    const [displayCount, setDisplayCount] = useState(6) // Nombre d'éléments à afficher par défaut
    const [maxDisplayCount, setMaxDisplayCount] = useState(6) // Nombre maximum d'éléments à afficher

    // Simuler le chargement des données
    useEffect(() => {
        setTimeout(() => {
            const mockProjects: Project[] = [
                {
                    id: "1",
                    title: "Application E-commerce",
                    description: "Une application e-commerce moderne avec panier d'achat et paiement intégré.",
                    image: "/placeholder.svg?height=600&width=800",
                    tags: ["React", "Next.js", "Stripe", "Tailwind CSS"],
                    demoUrl: "https://example.com",
                    githubUrl: "https://github.com",
                    category: "web",
                },
                {
                    id: "2",
                    title: "Portfolio 3D",
                    description: "Un portfolio interactif avec des éléments 3D et des animations avancées.",
                    image: "/placeholder.svg?height=600&width=800",
                    tags: ["Three.js", "React", "GSAP", "WebGL"],
                    demoUrl: "https://example.com",
                    githubUrl: "https://github.com",
                    category: "3d",
                },
                {
                    id: "3",
                    title: "Dashboard Analytics",
                    description: "Un tableau de bord d'analyse de données avec visualisations interactives.",
                    image: "/placeholder.svg?height=600&width=800",
                    tags: ["React", "D3.js", "TypeScript", "Firebase"],
                    demoUrl: "https://example.com",
                    githubUrl: "https://github.com",
                    category: "web",
                },
                {
                    id: "4",
                    title: "Application Mobile de Fitness",
                    description: "Une application mobile pour suivre vos activités sportives et votre progression.",
                    image: "/placeholder.svg?height=600&width=800",
                    tags: ["React Native", "Expo", "Firebase", "Redux"],
                    demoUrl: "https://example.com",
                    githubUrl: "https://github.com",
                    category: "mobile",
                },
                {
                    id: "5",
                    title: "Jeu de Plateforme 2D",
                    description: "Un jeu de plateforme 2D avec des niveaux générés procéduralement.",
                    image: "/placeholder.svg?height=600&width=800",
                    tags: ["JavaScript", "Canvas", "Phaser", "WebAudio"],
                    demoUrl: "https://example.com",
                    githubUrl: "https://github.com",
                    category: "game",
                },
                {
                    id: "6",
                    title: "Visualisation de Données 3D",
                    description: "Une visualisation 3D interactive de données scientifiques complexes.",
                    image: "/placeholder.svg?height=600&width=800",
                    tags: ["Three.js", "D3.js", "WebGL", "React"],
                    demoUrl: "https://example.com",
                    githubUrl: "https://github.com",
                    category: "3d",
                },
                {
                    id: "7",
                    title: "Site Web d'Agence Créative",
                    description: "Un site web pour une agence créative avec des animations et transitions fluides.",
                    image: "/placeholder.svg?height=600&width=800",
                    tags: ["HTML", "CSS", "JavaScript", "GSAP"],
                    demoUrl: "https://example.com",
                    githubUrl: "https://github.com",
                    category: "web",
                },
                {
                    id: "8",
                    title: "Application de Chat en Temps Réel",
                    description: "Une application de messagerie en temps réel avec support pour les médias.",
                    image: "/placeholder.svg?height=600&width=800",
                    tags: ["React", "Socket.io", "Node.js", "MongoDB"],
                    demoUrl: "https://example.com",
                    githubUrl: "https://github.com",
                    category: "web",
                },
            ]
            setProjects(mockProjects)
            setFilteredProjects(mockProjects)
            setIsLoading(false)
            setMaxDisplayCount(mockProjects.length) // Définir le maximum au nombre total de projets
        }, 1000)
    }, [])

    // Filtrer les projets en fonction de la recherche et de la catégorie
    useEffect(() => {
        let result = projects

        // Filtrer par catégorie
        if (activeCategory !== "all") {
            result = result.filter((project) => project.category === activeCategory)
        }

        // Filtrer par recherche
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(
                (project) =>
                    project.title.toLowerCase().includes(query) ||
                    project.description.toLowerCase().includes(query) ||
                    project.tags.some((tag) => tag.toLowerCase().includes(query)),
            )
        }

        setFilteredProjects(result)
    }, [projects, activeCategory, searchQuery])

    // Gérer le changement du nombre d'éléments à afficher
    const handleDisplayCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value)
        if (!isNaN(value) && value >= 1) {
            setDisplayCount(Math.min(value, filteredProjects.length))
        } else {
            setDisplayCount(1) // Valeur minimale
        }
    }

    // Fonction pour obtenir le texte avec remplacement de variables
    const getText = (path: string, replacements?: Record<string, string>) => {
        // Diviser le chemin en segments (ex: "projects.resultsCount.plural" -> ["projects", "resultsCount", "plural"])
        const segments = path.split(".")

        // Naviguer dans l'objet texts en suivant les segments
        let result: any = texts
        for (const segment of segments) {
            if (result[segment] === undefined) return path // Retourner le chemin si le segment n'existe pas
            result = result[segment]
        }

        // Si le résultat est une chaîne et qu'il y a des remplacements à faire
        if (typeof result === "string" && replacements) {
            return Object.entries(replacements).reduce((str, [key, value]) => str.replace(`{${key}}`, value), result)
        }

        return result
    }

    return (
        <section id="projects" className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-2 text-center">{getText("projects.title")}</h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">{getText("projects.subtitle")}</p>

                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                    <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveCategory}>
                        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full md:w-auto">
                            <TabsTrigger value="all">{getText("projects.categories.all")}</TabsTrigger>
                            <TabsTrigger value="web">{getText("projects.categories.web")}</TabsTrigger>
                            <TabsTrigger value="mobile">{getText("projects.categories.mobile")}</TabsTrigger>
                            <TabsTrigger value="3d">{getText("projects.categories.3d")}</TabsTrigger>
                            <TabsTrigger value="game">{getText("projects.categories.game")}</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder={getText("projects.search")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Contrôle du nombre d'éléments à afficher */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
              {filteredProjects.length === 1
                  ? getText("projects.resultsCount.singular")
                  : getText("projects.resultsCount.plural", { count: filteredProjects.length.toString() })}
                            {activeCategory !== "all" && (
                                <span>
                  {" "}
                                    {getText("projects.inCategory")} <strong>{getText(`projects.categories.${activeCategory}`)}</strong>
                </span>
                            )}
            </span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <label htmlFor="displayCount" className="text-sm whitespace-nowrap">
                            Afficher:
                        </label>
                        <Input
                            id="displayCount"
                            type="number"
                            min="1"
                            max={filteredProjects.length}
                            value={displayCount}
                            onChange={handleDisplayCountChange}
                            className="w-20"
                        />
                        <span className="text-sm text-muted-foreground whitespace-nowrap">sur {filteredProjects.length}</span>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.slice(0, displayCount).map((project) => (
                            <Card key={project.id} className="overflow-hidden h-full flex flex-col">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={project.image || "/placeholder.svg"}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform hover:scale-105 duration-300"
                                    />
                                </div>
                                <CardHeader>
                                    <CardTitle>{project.title}</CardTitle>
                                    <CardDescription>{project.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    {project.demoUrl && (
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                {getText("common.demo")}
                                            </a>
                                        </Button>
                                    )}
                                    {project.githubUrl && (
                                        <Button variant="outline" size="sm" asChild>
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center"
                                            >
                                                <Github className="mr-2 h-4 w-4" />
                                                {getText("common.code")}
                                            </a>
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">{getText("projects.noResults")}</p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery("")
                                setActiveCategory("all")
                            }}
                        >
                            {getText("projects.resetFilters")}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}

