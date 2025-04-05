import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminSetting } from "@/components/admin/admin-setting"
import { AuthGuard } from "@/components/auth/auth-guard"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Paramètres | Admin",
    description: "Paramètres du site",
}

export default function AdminSettingsPage() {
    return (
        <AuthGuard>
            <AdminLayout>
                <h1 className="text-3xl font-bold mb-8">Paramètres du Site</h1>
                <AdminSetting />
            </AdminLayout>
        </AuthGuard>
    )
}

