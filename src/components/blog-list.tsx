// "use client"
//
// import { useState } from "react"
// import { motion } from "framer-motion"
// import { BlogCard } from "@/components/blog-card"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { getPosts } from "@/lib/blog"
//
// export function BlogList() {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [filter, setFilter] = useState("all")
//   const postsPerPage = 6
//
//   const allPosts = getPosts()
//
//   // Filtrer les posts selon la catégorie sélectionnée
//   const filteredPosts = filter === "all" ? allPosts : allPosts.filter((post) => post.category === filter)
//
//   // Calculer les posts à afficher pour la pagination
//   const indexOfLastPost = currentPage * postsPerPage
//   const indexOfFirstPost = indexOfLastPost - postsPerPage
//   const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
//
//   // Calculer le nombre total de pages
//   const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
//
//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber)
//     // Scroll to top when changing page
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }
//
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }
//
//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   }
//
//   return (
//     <section className="py-16">
//       <div className="container mx-auto px-4">
//         <div className="mb-8 flex justify-center">
//           <Tabs
//             defaultValue="all"
//             onValueChange={(value) => {
//               setFilter(value)
//               setCurrentPage(1)
//             }}
//           >
//             <TabsList>
//               <TabsTrigger value="all">Tous</TabsTrigger>
//               <TabsTrigger value="tutorial">Tutoriels</TabsTrigger>
//               <TabsTrigger value="article">Articles</TabsTrigger>
//               <TabsTrigger value="case-study">Études de cas</TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </div>
//
//         <motion.div
//           variants={container}
//           initial="hidden"
//           animate="show"
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//         >
//           <>
//           {currentPosts.map((post) => (
//             <motion.div key={post.id} variants={item}>
//               <BlogCard post={post} />
//             </motion.div>
//           ))}
//           </>
//         </motion.div>
//
//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-12 flex justify-center gap-2">
//             <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//               Précédent
//             </Button>
//
//             {Array.from({ length: totalPages }).map((_, index) => (
//               <Button
//                 key={index}
//                 variant={currentPage === index + 1 ? "default" : "outline" as "default" | "outline"}
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </Button>
//             ))}
//
//             <Button
//               variant="outline"
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Suivant
//             </Button>
//           </div>
//         )}
//
//         {filteredPosts.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-muted-foreground">Aucun article trouvé pour cette catégorie.</p>
//           </div>
//         )}
//       </div>
//     </section>
//   )
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Filter, Search, Calendar, Clock, ArrowRight, Rss} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {motion} from "framer-motion";

// Type pour les articles de blog
interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  date: string
  readingTime: string
  author: {
    name: string
    avatar: string
  }
}

// Textes statiques (remplace le contexte de langue)
const texts = {
  blog: {
    title: "Blog",
    subtitle:
        "Découvrez mes articles, tutoriels et réflexions sur le développement web, le design et les technologies émergentes.",
    searchPlaceholder: "Rechercher un article...",
    categories: {
      all: "Tous",
      tutorials: "Tutoriels",
      articles: "Articles",
      caseStudies: "Études de cas",
    },
    featured: "À la une",
    readingTime: "min de lecture",
    noArticles: "Aucun article trouvé pour cette catégorie.",
    backToArticles: "Retour aux articles",
    relatedArticles: "Articles similaires",
    fullResponse: "Réponse complète",
    resultsCount: {
      singular: "1 article trouvé",
      plural: "{count} articles trouvés",
    },
    display: "Afficher",
    of: "sur",
    total: "articles au total",
  },
}

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [displayCount, setDisplayCount] = useState(6) // Nombre d'éléments à afficher par défaut
  const [totalCount, setTotalCount] = useState(0) // Nombre total d'articles

  // Empêcher le défilement automatique lors des changements d'état
  const preventAutoScroll = (callback: Function) => {
    // Mémoriser la position de défilement actuelle
    const scrollPosition = window.scrollY

    // Exécuter le callback
    callback()

    // Restaurer la position de défilement
    setTimeout(() => {
      window.scrollTo({ top: scrollPosition })
    }, 0)
  }

  // Modifier les gestionnaires d'événements pour utiliser preventAutoScroll
  const handleCategoryChange = (value: string) => {
    preventAutoScroll(() => setActiveCategory(value))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    preventAutoScroll(() => setSearchQuery(e.target.value))
  }

  const handleDisplayCountChange = (value: string) => {
    preventAutoScroll(() => {
      setDisplayCount(Number.parseInt(value))
    })
  }

  // Simuler le chargement des données
  useEffect(() => {
    setTimeout(() => {
      const mockPosts: BlogPost[] = [
        {
          id: "1",
          title: "Comment créer une animation 3D avec Three.js",
          excerpt: "Découvrez comment créer des animations 3D impressionnantes pour le web avec Three.js et WebGL.",
          content: "Contenu complet de l'article...",
          image: "/placeholder.svg?height=600&width=800",
          category: "tutorials",
          tags: ["Three.js", "WebGL", "Animation", "JavaScript"],
          date: "2023-11-15",
          readingTime: "8",
          author: {
            name: "Jean Dupont",
            avatar: "/placeholder.svg?height=100&width=100",
          },
        },
        {
          id: "2",
          title: "Les meilleures pratiques pour l'accessibilité web en 2023",
          excerpt:
              "Un guide complet sur les meilleures pratiques d'accessibilité pour rendre vos sites web utilisables par tous.",
          content: "Contenu complet de l'article...",
          image: "/placeholder.svg?height=600&width=800",
          category: "articles",
          tags: ["Accessibilité", "UX", "HTML", "ARIA"],
          date: "2023-10-28",
          readingTime: "12",
          author: {
            name: "Marie Martin",
            avatar: "/placeholder.svg?height=100&width=100",
          },
        },
        {
          id: "3",
          title: "Étude de cas : Refonte d'une application e-commerce avec Next.js",
          excerpt:
              "Analyse détaillée d'un projet de refonte d'une application e-commerce avec Next.js et Tailwind CSS.",
          content: "Contenu complet de l'article...",
          image: "/placeholder.svg?height=600&width=800",
          category: "caseStudies",
          tags: ["Next.js", "E-commerce", "Tailwind CSS", "Performance"],
          date: "2023-10-10",
          readingTime: "15",
          author: {
            name: "Thomas Bernard",
            avatar: "/placeholder.svg?height=100&width=100",
          },
        },
        {
          id: "4",
          title: "Introduction à l'API Intersection Observer",
          excerpt:
              "Apprenez à utiliser l'API Intersection Observer pour créer des effets de défilement et améliorer les performances.",
          content: "Contenu complet de l'article...",
          image: "/placeholder.svg?height=600&width=800",
          category: "tutorials",
          tags: ["JavaScript", "Performance", "Animation", "API Web"],
          date: "2023-09-22",
          readingTime: "10",
          author: {
            name: "Sophie Dubois",
            avatar: "/placeholder.svg?height=100&width=100",
          },
        },
        {
          id: "5",
          title: "L'avenir du développement web : tendances à surveiller",
          excerpt: "Un aperçu des technologies et tendances émergentes qui façonneront l'avenir du développement web.",
          content: "Contenu complet de l'article...",
          image: "/placeholder.svg?height=600&width=800",
          category: "articles",
          tags: ["Tendances", "Web Components", "WebAssembly", "AI"],
          date: "2023-09-05",
          readingTime: "9",
          author: {
            name: "Lucas Petit",
            avatar: "/placeholder.svg?height=100&width=100",
          },
        },
        {
          id: "6",
          title: "Optimisation des performances d'une application React",
          excerpt: "Stratégies et techniques pour améliorer les performances de vos applications React.",
          content: "Contenu complet de l'article...",
          image: "/placeholder.svg?height=600&width=800",
          category: "tutorials",
          tags: ["React", "Performance", "Optimisation", "JavaScript"],
          date: "2023-08-18",
          readingTime: "11",
          author: {
            name: "Emma Leroy",
            avatar: "/placeholder.svg?height=100&width=100",
          },
        },
        {
          id: "7",
          title: "Étude de cas : Création d'un portfolio interactif avec GSAP",
          excerpt:
              "Découvrez comment nous avons créé un portfolio interactif avec des animations fluides grâce à GSAP.",
          content: "Contenu complet de l'article...",
          image: "/placeholder.svg?height=600&width=800",
          category: "caseStudies",
          tags: ["GSAP", "Animation", "Portfolio", "JavaScript"],
          date: "2023-08-02",
          readingTime: "13",
          author: {
            name: "Alexandre Moreau",
            avatar: "/placeholder.svg?height=100&width=100",
          },
        },
        {
          id: "8",
          title: "Comment implémenter l'authentification avec NextAuth.js",
          excerpt:
              "Un guide étape par étape pour mettre en place l'authentification dans vos applications Next.js avec NextAuth.js.",
          content: "Contenu complet de l'article...",
          image: "/placeholder.svg?height=600&width=800",
          category: "tutorials",
          tags: ["Next.js", "Authentification", "NextAuth.js", "Sécurité"],
          date: "2023-07-15",
          readingTime: "14",
          author: {
            name: "Julie Blanc",
            avatar: "/placeholder.svg?height=100&width=100",
          },
        },
        {
          id: "9",
          title: "Les principes du design éthique dans le développement web",
          excerpt:
              "Exploration des principes éthiques à considérer lors de la conception et du développement de sites web.",
          content: "Contenu complet de l'article...",
          image: "/placeholder.svg?height=600&width=800",
          category: "articles",
          tags: ["Éthique", "Design", "UX", "Accessibilité"],
          date: "2023-06-30",
          readingTime: "10",
          author: {
            name: "Paul Roux",
            avatar: "/placeholder.svg?height=100&width=100",
          },
        },
        {
          id: "10",
          title: "Étude de cas : Migration d'une application legacy vers React",
          excerpt:
              "Analyse du processus de migration d'une application legacy vers une architecture moderne avec React.",
          content: "Contenu complet de l'article...",
          image: "/placeholder.svg?height=600&width=800",
          category: "caseStudies",
          tags: ["React", "Migration", "Architecture", "Legacy"],
          date: "2023-06-12",
          readingTime: "16",
          author: {
            name: "Nathalie Durand",
            avatar: "/placeholder.svg?height=100&width=100",
          },
        },
      ]
      setPosts(mockPosts)
      setFilteredPosts(mockPosts)
      setTotalCount(mockPosts.length)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filtrer les articles en fonction de la recherche et de la catégorie
  useEffect(() => {
    let result = posts

    // Filtrer par catégorie
    if (activeCategory !== "all") {
      result = result.filter((post) => post.category === activeCategory)
    }

    // Filtrer par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
          (post) =>
              post.title.toLowerCase().includes(query) ||
              post.excerpt.toLowerCase().includes(query) ||
              post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    setFilteredPosts(result)
  }, [posts, activeCategory, searchQuery])

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("fr-FR", options)
  }

  // Fonction pour obtenir le texte avec remplacement de variables
  const getText = (path: string, replacements?: Record<string, string>) => {
    // Diviser le chemin en segments (ex: "blog.resultsCount.plural" -> ["blog", "resultsCount", "plural"])
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
      <section className="py-16 bg-background" id="blog-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">{getText("blog.title")}</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">{getText("blog.subtitle")}</p>


          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={handleCategoryChange}>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
                <TabsTrigger value="all">{getText("blog.categories.all")}</TabsTrigger>
                <TabsTrigger value="tutorials">{getText("blog.categories.tutorials")}</TabsTrigger>
                <TabsTrigger value="articles">{getText("blog.categories.articles")}</TabsTrigger>
                <TabsTrigger value="caseStudies">{getText("blog.categories.caseStudies")}</TabsTrigger>
              </TabsList>
            </Tabs>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center"
            >
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Rss size={16} />
                S'abonner au flux RSS
              </Button>
            </motion.div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                  placeholder={getText("blog.searchPlaceholder")}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10"
              />
            </div>
          </div>

          {/* Contrôle du nombre d'éléments à afficher et affichage du total */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
              {filteredPosts.length === 1
                  ? getText("blog.resultsCount.singular")
                  : getText("blog.resultsCount.plural", { count: filteredPosts.length.toString() })}
                {activeCategory !== "all" && (
                    <span>
                  {" "}
                      dans la catégorie <strong>{getText(`blog.categories.${activeCategory}`)}</strong>
                </span>
                )}
            </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm whitespace-nowrap">{getText("blog.display")}:</span>
              <Select value={displayCount.toString()} onValueChange={handleDisplayCountChange}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder={displayCount.toString()} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value={totalCount.toString()}>Tous</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
              {getText("blog.of")} {totalCount} {getText("blog.total")}
            </span>
            </div>
          </div>

          {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
          ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.slice(0, displayCount).map((post) => (
                    <Card key={post.id} className="overflow-hidden h-full flex flex-col">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant="secondary">{getText(`blog.categories.${post.category}`)}</Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>
                        {post.readingTime} {getText("blog.readingTime")}
                      </span>
                          </div>
                        </div>
                        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                        <CardDescription className="flex items-center text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.date)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                          ))}
                          {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 3}
                              </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="ghost" className="ml-auto" asChild>
                          <Link href={`/blog/${post.id}`}>
                            Lire l'article <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                ))}
              </div>
          ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">{getText("blog.noArticles")}</p>
                <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setActiveCategory("all")
                    }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
          )}
        </div>
      </section>
  )
}

