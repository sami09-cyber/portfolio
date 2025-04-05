import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminProject } from "@/components/admin/admin-project"
import { AuthGuard } from "@/components/auth/auth-guard"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Projets | Admin",
    description: "Gestion des projets",
}

export default function AdminProjectPage() {
    return (
        <AuthGuard>
            <AdminLayout>
                <h1 className="text-3xl font-bold mt-8 mb-8">Gestion des Projets</h1>
                <AdminProject />
            </AdminLayout>
        </AuthGuard>
    )
}

