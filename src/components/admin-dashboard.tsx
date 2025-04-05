"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts"
import {
    Eye,
    Users,
    Clock,
    Globe,
    Download,
    RefreshCw,
    Briefcase,
    GraduationCap,
    FolderKanban,
    FileText,
    Award,
} from "lucide-react"

// Données simulées pour les statistiques
const visitData = [
    { name: "Lun", visits: 120 },
    { name: "Mar", visits: 150 },
    { name: "Mer", visits: 180 },
    { name: "Jeu", visits: 140 },
    { name: "Ven", visits: 200 },
    { name: "Sam", visits: 160 },
    { name: "Dim", visits: 130 },
]

const pageViewsData = [
    { name: "Accueil", views: 450 },
    { name: "À propos", views: 320 },
    { name: "Projets", views: 380 },
    { name: "Contact", views: 250 },
]

const deviceData = [
    { name: "Desktop", value: 65 },
    { name: "Mobile", value: 30 },
    { name: "Tablet", value: 5 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]

// Données simulées pour les éléments du portfolio
const portfolioElementsData = [
    { name: "Projets", count: 8 },
    { name: "Expériences", count: 3 },
    { name: "Formations", count: 4 },
    { name: "Compétences", count: 12 },
    { name: "Articles", count: 5 },
]

// Données simulées pour les tendances de visites
const visitTrendsData = [
    { name: "Jan", visits: 400 },
    { name: "Fév", visits: 300 },
    { name: "Mar", visits: 500 },
    { name: "Avr", visits: 280 },
    { name: "Mai", visits: 590 },
    { name: "Juin", visits: 320 },
    { name: "Juil", visits: 350 },
    { name: "Août", visits: 420 },
    { name: "Sep", visits: 510 },
    { name: "Oct", visits: 580 },
    { name: "Nov", visits: 620 },
    { name: "Déc", visits: 700 },
]

// Données simulées pour les sources de trafic
const trafficSourcesData = [
    { name: "Recherche", value: 45 },
    { name: "Direct", value: 30 },
    { name: "Réseaux sociaux", value: 15 },
    { name: "Référents", value: 10 },
]

export function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(false)
    const [stats, setStats] = useState({
        totalVisits: 1280,
        uniqueVisitors: 845,
        avgTimeOnSite: "2m 45s",
        bounceRate: "32%",
    })

    const refreshStats = () => {
        setIsLoading(true)
        // Simuler un chargement de données
        setTimeout(() => {
            // Générer de nouvelles statistiques aléatoires
            setStats({
                totalVisits: Math.floor(1000 + Math.random() * 500),
                uniqueVisitors: Math.floor(700 + Math.random() * 300),
                avgTimeOnSite: `${Math.floor(1 + Math.random() * 3)}m ${Math.floor(10 + Math.random() * 50)}s`,
                bounceRate: `${Math.floor(25 + Math.random() * 15)}%`,
            })
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Vue d'ensemble du portfolio</h2>
                <div className="flex flex-wrap gap-2">
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Exporter les statistiques
                    </Button>
                    <Button onClick={refreshStats} disabled={isLoading}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        {isLoading ? "Actualisation..." : "Actualiser les données"}
                    </Button>
                </div>
            </div>

            {/* Résumé des éléments du portfolio */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Projets</CardTitle>
                        <FolderKanban className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{portfolioElementsData[0].count}</div>
                        <p className="text-xs text-muted-foreground">+2 ce mois-ci</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Expériences</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{portfolioElementsData[1].count}</div>
                        <p className="text-xs text-muted-foreground">Dernière mise à jour il y a 2 semaines</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Formations</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{portfolioElementsData[2].count}</div>
                        <p className="text-xs text-muted-foreground">Dernière mise à jour il y a 1 mois</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Compétences</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{portfolioElementsData[3].count}</div>
                        <p className="text-xs text-muted-foreground">+3 ce mois-ci</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Articles</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{portfolioElementsData[4].count}</div>
                        <p className="text-xs text-muted-foreground">+1 cette semaine</p>
                    </CardContent>
                </Card>
            </div>

            {/* Graphique des éléments du portfolio */}
            <Card>
                <CardHeader>
                    <CardTitle>Répartition des éléments du portfolio</CardTitle>
                    <CardDescription>Vue d'ensemble des différents types de contenu</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={portfolioElementsData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Statistiques de visiteurs */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Statistiques des visiteurs</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Visites totales</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalVisits}</div>
                        <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Visiteurs uniques</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.uniqueVisitors}</div>
                        <p className="text-xs text-muted-foreground">+8% par rapport au mois dernier</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Temps moyen sur le site</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.avgTimeOnSite}</div>
                        <p className="text-xs text-muted-foreground">+5% par rapport au mois dernier</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Taux de rebond</CardTitle>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.bounceRate}</div>
                        <p className="text-xs text-muted-foreground">-3% par rapport au mois dernier</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tendances des visites */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tendances des visites</CardTitle>
                        <CardDescription>Évolution des visites sur les 12 derniers mois</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={visitTrendsData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Sources de trafic */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sources de trafic</CardTitle>
                        <CardDescription>Répartition des sources de trafic vers votre portfolio</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={trafficSourcesData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {trafficSourcesData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="visits" className="w-full overflow-hidden">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="visits">Visites quotidiennes</TabsTrigger>
                    <TabsTrigger value="pages">Pages vues</TabsTrigger>
                    <TabsTrigger value="devices">Appareils</TabsTrigger>
                </TabsList>
                <TabsContent value="visits" className="overflow-hidden">
                    <Card>
                        <CardHeader>
                            <CardTitle>Visites par jour</CardTitle>
                            <CardDescription>Nombre de visites quotidiennes sur les 7 derniers jours</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px] overflow-hidden">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={visitData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="pages" className="overflow-hidden">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pages les plus visitées</CardTitle>
                            <CardDescription>Nombre de vues par page sur le site</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px] overflow-hidden">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={pageViewsData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="views" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="devices" className="overflow-hidden">
                    <Card>
                        <CardHeader>
                            <CardTitle>Répartition par appareil</CardTitle>
                            <CardDescription>Types d'appareils utilisés pour accéder au site</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px] overflow-hidden">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={deviceData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={150}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {deviceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/*<Card>*/}
            {/*    <CardHeader>*/}
            {/*        <CardTitle>Actions rapides</CardTitle>*/}
            {/*        <CardDescription>Gérez votre site et exportez les données</CardDescription>*/}
            {/*    </CardHeader>*/}
            {/*    <CardContent className="flex flex-wrap gap-4">*/}
            {/*        <Button>*/}
            {/*            <Download className="mr-2 h-4 w-4" />*/}
            {/*            Exporter les statistiques*/}
            {/*        </Button>*/}
            {/*        <Button variant="outline">Mettre à jour le contenu</Button>*/}
            {/*        <Button variant="outline">Gérer les utilisateurs</Button>*/}
            {/*        <Button variant="outline">Paramètres du site</Button>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}
        </div>
    )
}

