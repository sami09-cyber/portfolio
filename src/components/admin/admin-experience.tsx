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
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { toast } from "sonner"
// import { useLanguage } from "@/contexts/language-context"
// import { useToast } from "@/hooks/use-toast"

// Type pour l'expérience professionnelle
interface Experience {
    id: string
    title: string
    company: string
    period: string
    description: string
}

export function AdminExperience() {
    // const { t } = useLanguage()
    // const { toast } = useToast()
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [currentExperience, setCurrentExperience] = useState<Experience | null>(null)
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        period: "",
        description: "",
    })
    const [isEditing, setIsEditing] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    // Charger les données
    useEffect(() => {
        // Simuler un chargement depuis une API
        setTimeout(() => {
            const mockData: Experience[] = [
                {
                    id: "1",
                    title: "Développeur Frontend Senior",
                    company: "Entreprise XYZ",
                    period: "2020 - Présent",
                    description:
                        "Développement d'applications web modernes avec React et Next.js. Implémentation de designs responsifs et d'animations avancées.",
                },
                {
                    id: "2",
                    title: "Développeur Web",
                    company: "Agence ABC",
                    period: "2018 - 2020",
                    description:
                        "Création de sites web et d'applications pour divers clients. Utilisation de technologies frontend et backend.",
                },
                {
                    id: "3",
                    title: "Designer UI/UX",
                    company: "Studio Design",
                    period: "2016 - 2018",
                    description:
                        "Conception d'interfaces utilisateur et d'expériences utilisateur pour applications web et mobiles.",
                },
            ]
            setExperiences(mockData)
            setIsLoading(false)
        }, 1000)
    }, [])

    // Filtrer les expériences en fonction de la recherche
    const filteredExperiences = experiences.filter(
        (exp) =>
            exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exp.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Gérer les changements dans le formulaire
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Ouvrir le formulaire d'édition
    const handleEdit = (experience: Experience) => {
        setCurrentExperience(experience)
        setFormData({
            title: experience.title,
            company: experience.company,
            period: experience.period,
            description: experience.description,
        })
        setIsEditing(true)
        setDialogOpen(true)
    }

    // Ouvrir le formulaire de création
    const handleCreate = () => {
        setCurrentExperience(null)
        setFormData({
            title: "",
            company: "",
            period: "",
            description: "",
        })
        setIsEditing(false)
        setDialogOpen(true)
    }

    // Sauvegarder les modifications
    const handleSave = () => {
        if (isEditing && currentExperience) {
            // Mise à jour d'une expérience existante
            setExperiences((prev) => prev.map((exp) => (exp.id === currentExperience.id ? { ...exp, ...formData } : exp)))
            toast("Expérience mise à jour", { description: "L'expérience professionnelle a été mise à jour avec succès." })
        } else {
            // Création d'une nouvelle expérience
            const newExperience: Experience = {
                id: Date.now().toString(),
                ...formData,
            }
            setExperiences((prev) => [...prev, newExperience])
            toast("Expérience ajoutée", { description: "La nouvelle expérience professionnelle a été ajoutée avec succès." })
        }
        setDialogOpen(false)
    }

    // Supprimer une expérience
    const handleDelete = (id: string) => {
        setExperiences((prev) => prev.filter((exp) => exp.id !== id))
        toast("Expérience supprimée", { description: "L'expérience professionnelle a été supprimée avec succès." })
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">admin.experience.title</h2>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" />
                    admin.experience.add
                </Button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="admin.experience.search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : filteredExperiences.length > 0 ? (
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>admin.experience.fields.title</TableHead>
                                    <TableHead>admin.experience.fields.company</TableHead>
                                    <TableHead>admin.experience.fields.period</TableHead>
                                    <TableHead className="w-[150px]">admin.common.actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredExperiences.map((experience) => (
                                    <TableRow key={experience.id}>
                                        <TableCell className="font-medium">{experience.title}</TableCell>
                                        <TableCell>{experience.company}</TableCell>
                                        <TableCell>{experience.period}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(experience)}>
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
                                                            <AlertDialogDescription>admin.experience.deleteConfirm</AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>admin.common.cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(experience.id)}>
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
                        <p className="text-muted-foreground mb-4">admin.experience.noData</p>
                        <Button onClick={handleCreate}>
                            <Plus className="mr-2 h-4 w-4" />
                            admin.experience.add
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Dialogue pour ajouter/modifier une expérience */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "admin.experience.edit" : "admin.experience.add"}</DialogTitle>
                        <DialogDescription>admin.experience.formDescription</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                admin.experience.fields.title
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
                            <Label htmlFor="company" className="text-right">
                                admin.experience.fields.company
                            </Label>
                            <Input
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="period" className="text-right">
                                admin.experience.fields.period
                            </Label>
                            <Input
                                id="period"
                                name="period"
                                value={formData.period}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                admin.experience.fields.description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="col-span-3"
                                rows={5}
                            />
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

