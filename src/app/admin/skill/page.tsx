import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Compétences | Admin",
    description: "Gestion des compétences",
}

export default function AdminSkillPage() {
    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mt-8 mb-8">Gestion des Compétences</h1>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Compétences techniques</CardTitle>
                        <CardDescription>Gérez vos compétences techniques et professionnelles.</CardDescription>
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter une compétence
                    </Button>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Cette section vous permet d'ajouter, modifier et supprimer vos compétences techniques. Vous pouvez également
                        les organiser par catégories et définir votre niveau de maîtrise.
                    </p>
                </CardContent>
            </Card>
        </AdminLayout>
    )
}

