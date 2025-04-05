"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import {toast} from "sonner";

export function LogoutButton() {
    // const { toast } = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogout = () => {
        setIsLoading(true)

        // Simuler un délai pour la déconnexion
        setTimeout(() => {
            localStorage.removeItem("adminLoggedIn")

            toast("Déconnexion réussie", { description: "Vous avez été déconnecté avec succès" })

            router.push("/admin/login")
            setIsLoading(false)
        }, 500)
    }

    return (
        <Button variant="outline" size="sm" onClick={handleLogout} disabled={isLoading} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            {isLoading ? "Déconnexion..." : "Se déconnecter"}
        </Button>
    )
}

