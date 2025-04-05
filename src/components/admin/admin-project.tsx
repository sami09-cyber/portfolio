"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Search, X } from "lucide-react"
import {toast} from "sonner";
// import { useLanguage } from "@/contexts/language-context"
// import { useToast } from "@/hooks/use-toast"

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
    details: string
    featured?: boolean
}

export function AdminProject() {
    // const { t } = useLanguage()
    // const { toast } = useToast()
    const [projects, setProjects] = useState<Project[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [currentProject, setCurrentProject] = useState<Project | null>(null)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        tags: [] as string[],
        demoUrl: "",
        githubUrl: "",
        category: "",
        details: "",
        featured: false,
    })
    const [newTag, setNewTag] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    // Catégories disponibles
    const categories = [
        { id: "web", name: "projects.categories.web" },
        { id: "mobile", name: "projects.categories.mobile" },
        { id: "3d", name: "projects.categories.3d" },
        { id: "game", name: "projects.categories.game" },
    ]

    // Charger les données
    useEffect(() => {
        // Simuler un chargement depuis une API
        setTimeout(() => {
            const mockData: Project[] = [
                {
                    id: "1",
                    title: "Application E-commerce",
                    description: "Une application e-commerce moderne avec panier d'achat et paiement intégré.",
                    image: "/placeholder.svg?height=600&width=800",
                    tags: ["React", "Next.js", "Stripe", "Tailwind CSS"],
                    demoUrl: "https://example.com",
                    githubUrl: "https://github.com",
                    category: "web",
                    details:
                        "Cette application e-commerce offre une expérience d'achat fluide avec une interface utilisateur intuitive. Elle intègre un système de panier, des paiements sécurisés via Stripe, et une gestion des produits dynamique.",
                    featured: true,
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
                    details:
                        "Ce portfolio 3D repousse les limites de l'expérience web traditionnelle en intégrant des éléments 3D interactifs et des animations fluides.",
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
                    details:
                        "Ce tableau de bord d'analyse offre des visualisations de données complexes rendues accessibles grâce à une interface utilisateur intuitive.",
                },
            ]
            setProjects(mockData)
            setIsLoading(false)
        }, 1000)
    }, [])

    // Filtrer les projets en fonction de la recherche
    const filteredProjects = projects.filter(
        (project) =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
            project.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Gérer les changements dans le formulaire
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Gérer les changements de sélection
    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Gérer les changements de checkbox
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFormData((prev) => ({ ...prev, [name]: checked }))
    }

    // Ajouter un tag
    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()],
            }))
            setNewTag("")
        }
    }

    // Supprimer un tag
    const handleRemoveTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }))
    }

    // Ouvrir le formulaire d'édition
    const handleEdit = (project: Project) => {
        setCurrentProject(project)
        setFormData({
            title: project.title,
            description: project.description,
            image: project.image,
            tags: [...project.tags],
            demoUrl: project.demoUrl || "",
            githubUrl: project.githubUrl || "",
            category: project.category,
            details: project.details,
            featured: project.featured || false,
        })
        setIsEditing(true)
        setDialogOpen(true)
    }

    // Ouvrir le formulaire de création
    const handleCreate = () => {
        setCurrentProject(null)
        setFormData({
            title: "",
            description: "",
            image: "",
            tags: [],
            demoUrl: "",
            githubUrl: "",
            category: "",
            details: "",
            featured: false,
        })
        setIsEditing(false)
        setDialogOpen(true)
    }

    // Sauvegarder les modifications
    const handleSave = () => {
        if (isEditing && currentProject) {
            // Mise à jour d'un projet existant
            setProjects((prev) => prev.map((proj) => (proj.id === currentProject.id ? { ...proj, ...formData } : proj)))
            toast("Projet mis à jour", { description: "Le projet a été mis à jour avec succès." })
        } else {
            // Création d'un nouveau projet
            const newProject: Project = {
                id: Date.now().toString(),
                ...formData,
            }
            setProjects((prev) => [...prev, newProject])
            toast("Projet ajouté", { description: "Le nouveau projet a été ajouté avec succès." })
        }
        setDialogOpen(false)
    }

    // Supprimer un projet
    const handleDelete = (id: string) => {
        setProjects((prev) => prev.filter((proj) => proj.id !== id))
        toast("Projet supprimé", { description: "Le projet a été supprimé avec succès." })
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">admin.projects.title</h2>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" />
                    admin.projects.add
                </Button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="admin.projects.search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : filteredProjects.length > 0 ? (
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>admin.projects.fields.title</TableHead>
                                    <TableHead>admin.projects.fields.category</TableHead>
                                    <TableHead>admin.projects.fields.tags</TableHead>
                                    <TableHead>admin.projects.fields.featured</TableHead>
                                    <TableHead className="w-[150px]">admin.common.actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProjects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">{project.title}</TableCell>
                                        <TableCell>
                                            {categories.find((cat) => cat.id === project.category)?.name || project.category}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {project.tags.map((tag) => (
                                                    <Badge key={tag} variant="secondary" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {project.featured ? <Badge variant="default">Oui</Badge> : <Badge variant="outline">Non</Badge>}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>admin.common.confirmDelete</AlertDialogTitle>
                                                            <AlertDialogDescription>admin.projects.deleteConfirm</AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>admin.common.cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(project.id)}>
                                                                admin.common.delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <p className="text-muted-foreground mb-4"> admin.projects.noData</p>
                        <Button onClick={handleCreate}>
                            <Plus className="mr-2 h-4 w-4" />
                             admin.projects.add
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Dialogue pour ajouter/modifier un projet */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>{ isEditing ? "admin.projects.edit" : "admin.projects.add" }</DialogTitle>
                        <DialogDescription> admin.projects.formDescription</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                admin.projects.fields.title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                admin.projects.fields.description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="col-span-3"
                                rows={2}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                                admin.projects.fields.image
                            </Label>
                            <Input
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                className="col-span-3"
                                placeholder="/placeholder.svg?height=600&width=800"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                admin.projects.fields.category
                            </Label>
                            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="admin.projects.selectCategory" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="tags" className="text-right pt-2">
                                admin.projects.fields.tags
                            </Label>
                            <div className="col-span-3 space-y-2">
                                <div className="flex gap-2">
                                    <Input
                                        id="newTag"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        placeholder="admin.projects.addTag"
                                        className="flex-1"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault()
                                                handleAddTag()
                                            }
                                        }}
                                    />
                                    <Button type="button" onClick={handleAddTag} variant="outline">
                                        admin.common.add
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="text-muted-foreground hover:text-foreground"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="demoUrl" className="text-right">
                                admin.projects.fields.demoUrl
                            </Label>
                            <Input
                                id="demoUrl"
                                name="demoUrl"
                                value={formData.demoUrl}
                                onChange={handleInputChange}
                                className="col-span-3"
                                placeholder="https://example.com"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="githubUrl" className="text-right">
                                admin.projects.fields.githubUrl
                            </Label>
                            <Input
                                id="githubUrl"
                                name="githubUrl"
                                value={formData.githubUrl}
                                onChange={handleInputChange}
                                className="col-span-3"
                                placeholder="https://github.com/username/repo"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="details" className="text-right">
                                admin.projects.fields.details
                            </Label>
                            <Textarea
                                id="details"
                                name="details"
                                value={formData.details}
                                onChange={handleInputChange}
                                className="col-span-3"
                                rows={5}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="featured" className="text-right">
                                admin.projects.fields.featured
                            </Label>
                            <div className="col-span-3 flex items-center">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleCheckboxChange}
                                    className="mr-2 h-4 w-4"
                                />
                                <Label htmlFor="featured" className="font-normal">
                                    admin.projects.markAsFeatured
                                </Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            admin.common.cancel
                        </Button>
                        <Button onClick={handleSave}>admin.common.save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

