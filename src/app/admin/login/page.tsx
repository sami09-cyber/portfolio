import { LoginPage } from "@/components/auth/login-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Connexion Admin | Portfolio",
    description: "Connexion à l'espace d'administration du portfolio",
}

export default function AdminLoginPage() {
    return <LoginPage />
}

