import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminEducation } from "@/components/admin/admin-education"
import { AuthGuard } from "@/components/auth/auth-guard"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Formation | Admin",
    description: "Gestion de la formation académique",
}

export default function AdminEducationPage() {
    return (
        <AuthGuard>
            <AdminLayout>
                <h1 className="text-3xl font-bold mt-8 mb-8">Gestion de la Formation Académique</h1>
                <AdminEducation />
            </AdminLayout>
        </AuthGuard>
    )
}

