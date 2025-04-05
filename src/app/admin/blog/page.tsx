import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog | Admin",
    description: "Gestion des articles de blog",
}

export default function AdminBlogPage() {
    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mt-8 mb-8">Gestion du Blog</h1>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Articles de blog</CardTitle>
                        <CardDescription>Gérez vos articles de blog, catégories et tags.</CardDescription>
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvel article
                    </Button>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Cette section vous permet de créer, modifier et supprimer des articles de blog. Vous pouvez également gérer
                        les catégories et les tags.
                    </p>
                </CardContent>
            </Card>
        </AdminLayout>
    )
}

