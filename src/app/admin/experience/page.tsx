import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminExperience } from "@/components/admin/admin-experience"
import { AuthGuard } from "@/components/auth/auth-guard"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Expérience | Admin",
    description: "Gestion de l'expérience professionnelle",
}

export default function AdminExperiencePage() {
    return (
        <AuthGuard>
            <AdminLayout>
                <h1 className="text-3xl font-bold mt-8 mb-8">Gestion de l'Expérience Professionnelle</h1>
                <AdminExperience />
            </AdminLayout>
        </AuthGuard>
    )
}

