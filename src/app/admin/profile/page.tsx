import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminProfile } from "@/components/admin/admin-profile"
import { AuthGuard } from "@/components/auth/auth-guard"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Profil | Admin",
    description: "Gestion du profil",
}

export default function AdminProfilePage() {
    return (
        <AuthGuard>
            <AdminLayout>
                <h1 className="text-3xl font-bold mb-8">Gestion du Profil</h1>
                <AdminProfile />
            </AdminLayout>
        </AuthGuard>
    )
}

