"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
import { Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
// import {router} from "next/client";
import {toast} from "sonner";

export function LoginPage() {
    // const { toast } = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    // Vérifier si l'utilisateur est déjà connecté
    useEffect(() => {
        const loggedIn = localStorage.getItem("adminLoggedIn")
        if (loggedIn === "true") {
            router.push("/admin")
        }
    }, [router])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simuler une vérification d'authentification
        setTimeout(() => {
            // Identifiants de démonstration (à remplacer par une véritable authentification)
            if (formData.username === "admin" && formData.password === "password") {
                localStorage.setItem("adminLoggedIn", "true")

                toast("Connexion réussie", { description: "Vous êtes connecté en tant qu'administrateur" })

                router.push("/admin")
            } else {
                // toast("Échec de la connexion", {
                //     description: "Identifiants incorrects. Essayez admin/password",
                //     variant: "destructive",
                // })

                toast.error("Échec de la connexion", {
                    description: "Identifiants incorrects. Essayez admin/password",
                    className: "bg-red-50 text-red-600",
                });
            }
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
            <div className="w-full max-w-md">
                <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour au site
                </Link>

                <Card className="w-full">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Lock className="h-6 w-6" />
                            Connexion Administrateur
                        </CardTitle>
                        <CardDescription>Entrez vos identifiants pour accéder au tableau de bord d'administration</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Nom d'utilisateur</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="admin"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <p>Pour cette démo, utilisez :</p>
                                <p>
                                    Nom d'utilisateur : <strong>admin</strong>
                                </p>
                                <p>
                                    Mot de passe : <strong>password</strong>
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Connexion en cours..." : "Se connecter"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}

