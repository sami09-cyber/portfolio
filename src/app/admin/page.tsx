import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminDashboard } from "@/components/admin-dashboard"
import { AuthGuard } from "@/components/auth/auth-guard"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Admin Dashboard | Portfolio",
    description: "Tableau de bord d'administration du portfolio",
}

export default function AdminPage() {
    return (
        <AuthGuard>
            <AdminLayout>
                <h1 className="text-3xl font-bold mb-8">Tableau de Bord d'Administration</h1>
                <AdminDashboard />
            </AdminLayout>
        </AuthGuard>
    )
}

