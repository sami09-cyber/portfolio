"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthGuardProps {
    children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Vérifier si l'utilisateur est connecté
        const checkAuth = () => {
            const loggedIn = localStorage.getItem("adminLoggedIn")
            if (loggedIn !== "true") {
                // Rediriger vers la page de connexion
                router.push("/admin/login")
            } else {
                setIsAuthenticated(true)
            }
            setIsLoading(false)
        }

        checkAuth()
    }, [router])

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Vérification de l'authentification...</CardTitle>
                    <CardDescription>Veuillez patienter pendant que nous vérifions vos identifiants.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!isAuthenticated) {
        return null // Ne rien afficher, la redirection est en cours
    }

    return <>{children}</>
}

