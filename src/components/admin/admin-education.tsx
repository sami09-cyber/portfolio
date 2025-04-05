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

// Type pour l'éducation
interface Education {
    id: string
    degree: string
    institution: string
    period: string
    description: string
}

export function AdminEducation() {
    // const { t } = useLanguage()
    // const { toast } = useToast()
    const [educations, setEducations] = useState<Education[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [currentEducation, setCurrentEducation] = useState<Education | null>(null)
    const [formData, setFormData] = useState({
        degree: "",
        institution: "",
        period: "",
        description: "",
    })
    const [isEditing, setIsEditing] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    // Charger les données
    useEffect(() => {
        // Simuler un chargement depuis une API
        setTimeout(() => {
            const mockData: Education[] = [
                {
                    id: "1",
                    degree: "Master en Développement Web",
                    institution: "Université Technologique",
                    period: "2014 - 2016",
                    description:
                        "Formation avancée en développement web et conception d'applications. Spécialisation en technologies frontend et expérience utilisateur.",
                },
                {
                    id: "2",
                    degree: "Licence en Informatique",
                    institution: "Université des Sciences",
                    period: "2011 - 2014",
                    description:
                        "Fondamentaux de l'informatique, algorithmes et structures de données. Introduction au développement web et à la programmation orientée objet.",
                },
                {
                    id: "3",
                    degree: "Certification UX Design",
                    institution: "Google",
                    period: "2019",
                    description:
                        "Certification professionnelle en conception d'expérience utilisateur. Méthodologies de recherche utilisateur et principes de design d'interface.",
                },
                {
                    id: "4",
                    degree: "Formation Three.js",
                    institution: "Plateforme en ligne",
                    period: "2021",
                    description:
                        "Apprentissage approfondi de la création d'expériences 3D interactives pour le web avec Three.js et WebGL.",
                },
            ]
            setEducations(mockData)
            setIsLoading(false)
        }, 1000)
    }, [])

    // Filtrer les formations en fonction de la recherche
    const filteredEducations = educations.filter(
        (edu) =>
            edu.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
            edu.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
            edu.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Gérer les changements dans le formulaire
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Ouvrir le formulaire d'édition
    const handleEdit = (education: Education) => {
        setCurrentEducation(education)
        setFormData({
            degree: education.degree,
            institution: education.institution,
            period: education.period,
            description: education.description,
        })
        setIsEditing(true)
        setDialogOpen(true)
    }

    // Ouvrir le formulaire de création
    const handleCreate = () => {
        setCurrentEducation(null)
        setFormData({
            degree: "",
            institution: "",
            period: "",
            description: "",
        })
        setIsEditing(false)
        setDialogOpen(true)
    }

    // Sauvegarder les modifications
    const handleSave = () => {
        if (isEditing && currentEducation) {
            // Mise à jour d'une formation existante
            setEducations((prev) => prev.map((edu) => (edu.id === currentEducation.id ? { ...edu, ...formData } : edu)))
            toast("Formation mise à jour", { description: "La formation académique a été mise à jour avec succès." })
        } else {
            // Création d'une nouvelle formation
            const newEducation: Education = {
                id: Date.now().toString(),
                ...formData,
            }
            setEducations((prev) => [...prev, newEducation])
            toast("Formation ajoutée", { description: "La nouvelle formation académique a été ajoutée avec succès." })
        }
        setDialogOpen(false)
    }

    // Supprimer une formation
    const handleDelete = (id: string) => {
        setEducations((prev) => prev.filter((edu) => edu.id !== id))
        toast("Formation supprimée", { description: "La formation académique a été supprimée avec succès." })
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">admin.education.title</h2>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" />
                    admin.education.add
                </Button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="admin.education.search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : filteredEducations.length > 0 ? (
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>admin.education.fields.degree</TableHead>
                                    <TableHead>admin.education.fields.institution</TableHead>
                                    <TableHead>admin.education.fields.period</TableHead>
                                    <TableHead className="w-[150px]">admin.common.actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEducations.map((education) => (
                                    <TableRow key={education.id}>
                                        <TableCell className="font-medium">{education.degree}</TableCell>
                                        <TableCell>{education.institution}</TableCell>
                                        <TableCell>{education.period}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(education)}>
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
                                                            <AlertDialogDescription>admin.education.deleteConfirm</AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>admin.common.cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(education.id)}>
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
                        <p className="text-muted-foreground mb-4">admin.education.noData</p>
                        <Button onClick={handleCreate}>
                            <Plus className="mr-2 h-4 w-4" />
                            admin.education.add
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Dialogue pour ajouter/modifier une formation */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>{isEditing ?"admin.education.edit" : "admin.education.add"}</DialogTitle>
                        <DialogDescription>"admin.education.formDescription"</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="degree" className="text-right">
                                "admin.education.fields.degree"
                            </Label>
                            <Input
                                id="degree"
                                name="degree"
                                value={formData.degree}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="institution" className="text-right">
                                admin.education.fields.institution"
                            </Label>
                            <Input
                                id="institution"
                                name="institution"
                                value={formData.institution}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="period" className="text-right">
                                admin.education.fields.period
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
                                admin.education.fields.description"
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

