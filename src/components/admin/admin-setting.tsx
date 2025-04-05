"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Save, RefreshCw, Trash2, User, Globe, Palette, Database, Shield } from "lucide-react"
import { toast } from "sonner"
// import { useLanguage } from "@/contexts/language-context"
// import { useToast } from "@/hooks/use-toast"

export function AdminSetting() {
    // const { t } = useLanguage()
    // const { toast } = useToast()
    const [isSaving, setIsSaving] = useState(false)
    const [isResetting, setIsResetting] = useState(false)

    // Paramètres du site
    const [siteSettings, setSiteSettings] = useState({
        siteName: "Portfolio Futuriste",
        siteDescription: "Un portfolio moderne, interactif et futuriste",
        ownerName: "Votre Nom",
        ownerTitle: "Développeur Web & Designer d'Expérience Utilisateur",
        contactEmail: "contact@example.com",
        contactPhone: "+33 6 12 34 56 78",
        contactAddress: "123 Rue de l'Innovation, 75000 Paris, France",
        enableBlog: true,
        enableComments: true,
        enableAnalytics: true,
        maintenanceMode: false,
    })

    // Gérer les changements dans le formulaire
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setSiteSettings((prev) => ({ ...prev, [name]: value }))
    }

    // Gérer les changements de switch
    const handleSwitchChange = (name: string, checked: boolean) => {
        setSiteSettings((prev) => ({ ...prev, [name]: checked }))
    }

    // Sauvegarder les paramètres
    const handleSaveSettings = () => {
        setIsSaving(true)
        // Simuler une sauvegarde
        setTimeout(() => {
            setIsSaving(false)
            toast("Paramètres sauvegardés", { description: "Les paramètres du site ont été mis à jour avec succès." })
        }, 1500)
    }

    // Réinitialiser les paramètres
    const handleResetSettings = () => {
        setIsResetting(true)
        // Simuler une réinitialisation
        setTimeout(() => {
            setSiteSettings({
                siteName: "Portfolio Futuriste",
                siteDescription: "Un portfolio moderne, interactif et futuriste",
                ownerName: "Votre Nom",
                ownerTitle: "Développeur Web & Designer d'Expérience Utilisateur",
                contactEmail: "contact@example.com",
                contactPhone: "+33 6 12 34 56 78",
                contactAddress: "123 Rue de l'Innovation, 75000 Paris, France",
                enableBlog: true,
                enableComments: true,
                enableAnalytics: true,
                maintenanceMode: false,
            })
            setIsResetting(false)
            toast("Paramètres réinitialisés", { description: "Les paramètres du site ont été réinitialisés aux valeurs par défaut." })
        }, 1500)
    }

    // Vider la base de données
    const handleClearDatabase = () => {
        // Simuler une suppression
        setTimeout(() => {
            // toast({
            //     title: "Base de données vidée",
            //     description: "Toutes les données ont été supprimées avec succès.",
            //     variant: "destructive",
            // })
            toast.error("Base de données vidée", {
                description: "Toutes les données ont été supprimées avec succès.",
                className: "bg-red-50 text-red-600",
            })
        }, 1500)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">admin.settings.title</h2>
                <div className="flex gap-2">
                    <Button onClick={handleSaveSettings} disabled={isSaving}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSaving ? "admin.settings.saving" : "admin.settings.save"}
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" disabled={isResetting}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                {isResetting ? "admin.settings.resetting" : "admin.settings.reset"}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>admin.settings.resetConfirmTitle</AlertDialogTitle>
                                <AlertDialogDescription>admin.settings.resetConfirmDescription</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>admin.common.cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleResetSettings}>admin.settings.confirmReset</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="general" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span className="hidden sm:inline">admin.settings.tabs.general</span>
                    </TabsTrigger>
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">admin.settings.tabs.profile</span>
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        <span className="hidden sm:inline">admin.settings.tabs.appearance</span>
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <span className="hidden sm:inline">admin.settings.tabs.advanced</span>
                    </TabsTrigger>
                </TabsList>

                {/* Onglet Général */}
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>admin.settings.general.title</CardTitle>
                            <CardDescription>admin.settings.general.description</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="siteName">admin.settings.general.siteName</Label>
                                    <Input id="siteName" name="siteName" value={siteSettings.siteName} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="siteDescription">admin.settings.general.siteDescription</Label>
                                    <Input
                                        id="siteDescription"
                                        name="siteDescription"
                                        value={siteSettings.siteDescription}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="maintenanceMode">admin.settings.general.maintenanceMode</Label>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="maintenanceMode"
                                        checked={siteSettings.maintenanceMode}
                                        onCheckedChange={(checked) => handleSwitchChange("maintenanceMode", checked)}
                                    />
                                    <Label htmlFor="maintenanceMode" className="font-normal">
                                        {siteSettings.maintenanceMode
                                            ? "admin.settings.general.maintenanceModeOn"
                                            : "admin.settings.general.maintenanceModeOff"}
                                    </Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Onglet Profil */}
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>admin.settings.profile.title</CardTitle>
                            <CardDescription>admin.settings.profile.description</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="ownerName">admin.settings.profile.ownerName</Label>
                                    <Input id="ownerName" name="ownerName" value={siteSettings.ownerName} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ownerTitle">admin.settings.profile.ownerTitle</Label>
                                    <Input
                                        id="ownerTitle"
                                        name="ownerTitle"
                                        value={siteSettings.ownerTitle}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="contactEmail">admin.settings.profile.contactEmail</Label>
                                    <Input
                                        id="contactEmail"
                                        name="contactEmail"
                                        type="email"
                                        value={siteSettings.contactEmail}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contactPhone">admin.settings.profile.contactPhone</Label>
                                    <Input
                                        id="contactPhone"
                                        name="contactPhone"
                                        value={siteSettings.contactPhone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contactAddress">admin.settings.profile.contactAddress</Label>
                                <Textarea
                                    id="contactAddress"
                                    name="contactAddress"
                                    value={siteSettings.contactAddress}
                                    onChange={handleInputChange}
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Onglet Apparence */}
                <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle>admin.settings.appearance.title</CardTitle>
                            <CardDescription>admin.settings.appearance.description</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">admin.settings.appearance.comingSoon</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Onglet Avancé */}
                <TabsContent value="advanced">
                    <Card>
                        <CardHeader>
                            <CardTitle>admin.settings.advanced.title</CardTitle>
                            <CardDescription>admin.settings.advanced.description</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>admin.settings.advanced.features</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="enableBlog"
                                            checked={siteSettings.enableBlog}
                                            onCheckedChange={(checked) => handleSwitchChange("enableBlog", checked)}
                                        />
                                        <Label htmlFor="enableBlog" className="font-normal">
                                            admin.settings.advanced.enableBlog
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="enableComments"
                                            checked={siteSettings.enableComments}
                                            onCheckedChange={(checked) => handleSwitchChange("enableComments", checked)}
                                        />
                                        <Label htmlFor="enableComments" className="font-normal">
                                            admin.settings.advanced.enableComments
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="enableAnalytics"
                                            checked={siteSettings.enableAnalytics}
                                            onCheckedChange={(checked) => handleSwitchChange("enableAnalytics", checked)}
                                        />
                                        <Label htmlFor="enableAnalytics" className="font-normal">
                                            admin.settings.advanced.enableAnalytics
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border">
                                <h3 className="text-lg font-medium mb-4 flex items-center">
                                    <Shield className="mr-2 h-5 w-5 text-destructive" />
                                    admin.settings.advanced.dangerZone
                                </h3>
                                <p className="text-muted-foreground mb-4">admin.settings.advanced.dangerZoneDescription</p>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            admin.settings.advanced.clearDatabase
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>admin.settings.advanced.clearDatabaseConfirmTitle</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                admin.settings.advanced.clearDatabaseConfirmDescription
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>admin.common.cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleClearDatabase}
                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                            >
                                                admin.settings.advanced.confirmClearDatabase
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

