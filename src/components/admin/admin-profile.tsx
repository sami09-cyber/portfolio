"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, FileText, Camera, Save } from "lucide-react"
import {toast} from "sonner";

interface ProfileData {
    name: string
    title: string
    email: string
    phone: string
    address: string
    bio: string
    avatarUrl: string
    socialLinks: {
        github: string
        linkedin: string
        twitter: string
    }
}

export function AdminProfile() {
    // const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    // État initial du profil (simulé)
    const [profileData, setProfileData] = useState<ProfileData>({
        name: "Votre Nom",
        title: "Développeur Web & Designer d'Expérience Utilisateur",
        email: "contact@example.com",
        phone: "+33 6 12 34 56 78",
        address: "123 Rue de l'Innovation, 75000 Paris, France",
        bio: "Je suis un développeur web passionné par la création d'expériences numériques innovantes et intuitives. Avec plus de 5 ans d'expérience dans le domaine, je combine expertise technique et sensibilité design pour réaliser des projets web qui se démarquent.\n\nMa spécialité est le développement frontend avec React et Next.js, mais je maîtrise également les technologies backend et le design UI/UX. J'aime particulièrement explorer les nouvelles technologies comme WebGL et Three.js pour créer des expériences web immersives.",
        avatarUrl: "/placeholder.svg?height=128&width=128",
        socialLinks: {
            github: "https://github.com/username",
            linkedin: "https://linkedin.com/in/username",
            twitter: "https://twitter.com/username",
        },
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        if (name.includes(".")) {
            // Gestion des champs imbriqués (comme socialLinks.github)
            const [parent, child] = name.split(".")
            // setProfileData((prev) => ({
            //     ...prev,
            //     [parent]: {
            //         ...prev[parent as keyof ProfileData],
            //         [child]: value,
            //     },
            // }))

            setProfileData((prev) => ({
                ...prev,
                [parent]: {
                    ...(prev[parent as keyof ProfileData] as object),
                    [child]: value,
                },
            }))
        } else {
            // Champs simples
            setProfileData((prev) => ({ ...prev, [name]: value }))
        }
    }

    const handleSaveProfile = () => {
        setIsLoading(true)

        // Simuler une sauvegarde
        setTimeout(() => {
            setIsLoading(false)
            toast("Profil mis à jour", { description: "Vos informations personnelles ont été mises à jour avec succès." })
        }, 1000)
    }

    const handleAvatarChange = () => {
        // Dans une implémentation réelle, ceci ouvrirait un sélecteur de fichier
        // Pour cette démo, nous allons simplement simuler un changement d'avatar
        setProfileData((prev) => ({
            ...prev,
            avatarUrl: `/placeholder.svg?height=128&width=128&text=${Math.random().toString(36).substring(7)}`,
        }))

        toast("Avatar mis à jour", { description: "Votre photo de profil a été mise à jour avec succès." })
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestion du Profil</h2>
                <Button onClick={handleSaveProfile} disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Carte de profil */}
                <Card>
                    <CardHeader>
                        <CardTitle>Votre Profil</CardTitle>
                        <CardDescription>Informations publiques affichées sur votre portfolio</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <Avatar className="h-32 w-32">
                                <AvatarImage src={profileData.avatarUrl} alt={profileData.name} />
                                <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Button
                                size="icon"
                                variant="outline"
                                className="absolute bottom-0 right-0 rounded-full"
                                onClick={handleAvatarChange}
                            >
                                <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold">{profileData.name}</h3>
                            <p className="text-muted-foreground">{profileData.title}</p>
                        </div>
                        <div className="w-full space-y-2 pt-4">
                            <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="text-sm">{profileData.email}</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="text-sm">{profileData.phone}</span>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
                                <span className="text-sm">{profileData.address}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Formulaire d'édition */}
                <div className="md:col-span-2">
                    <Tabs defaultValue="personal" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="personal">
                                <User className="h-4 w-4 mr-2" />
                                Informations personnelles
                            </TabsTrigger>
                            <TabsTrigger value="bio">
                                <FileText className="h-4 w-4 mr-2" />
                                Biographie
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="personal" className="space-y-4 mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informations personnelles</CardTitle>
                                    <CardDescription>Modifiez vos informations de contact et votre profil</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nom complet</Label>
                                        <Input id="name" name="name" value={profileData.name} onChange={handleInputChange} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="title">Titre professionnel</Label>
                                        <Input id="title" name="title" value={profileData.title} onChange={handleInputChange} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Téléphone</Label>
                                        <Input id="phone" name="phone" value={profileData.phone} onChange={handleInputChange} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Adresse</Label>
                                        <Textarea
                                            id="address"
                                            name="address"
                                            value={profileData.address}
                                            onChange={handleInputChange}
                                            rows={3}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Réseaux sociaux</CardTitle>
                                    <CardDescription>Liens vers vos profils sur les réseaux sociaux</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="github">GitHub</Label>
                                        <Input
                                            id="github"
                                            name="socialLinks.github"
                                            value={profileData.socialLinks.github}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="linkedin">LinkedIn</Label>
                                        <Input
                                            id="linkedin"
                                            name="socialLinks.linkedin"
                                            value={profileData.socialLinks.linkedin}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="twitter">Twitter</Label>
                                        <Input
                                            id="twitter"
                                            name="socialLinks.twitter"
                                            value={profileData.socialLinks.twitter}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="bio" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Biographie</CardTitle>
                                    <CardDescription>Présentez-vous et décrivez votre parcours professionnel</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Votre biographie</Label>
                                        <Textarea
                                            id="bio"
                                            name="bio"
                                            value={profileData.bio}
                                            onChange={handleInputChange}
                                            rows={10}
                                            className="min-h-[200px]"
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Utilisez ce champ pour vous présenter, décrire votre parcours, vos compétences et vos centres
                                            d'intérêt.
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={handleSaveProfile} disabled={isLoading}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {isLoading ? "Enregistrement..." : "Enregistrer la biographie"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

