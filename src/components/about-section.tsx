"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AboutSection() {
    const skills = [
        { name: "HTML/CSS", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "React", level: 85 },
        { name: "Next.js", level: 80 },
        { name: "Node.js", level: 75 },
        { name: "UI/UX Design", level: 85 },
        { name: "Three.js", level: 70 },
    ]

    const experiences = [
        {
            title: "Développeur Frontend Senior",
            company: "Entreprise XYZ",
            period: "2020 - Présent",
            description:
                "Développement d'applications web modernes avec React et Next.js. Implémentation de designs responsifs et d'animations avancées.",
        },
        {
            title: "Développeur Web",
            company: "Agence ABC",
            period: "2018 - 2020",
            description:
                "Création de sites web et d'applications pour divers clients. Utilisation de technologies frontend et backend.",
        },
        {
            title: "Designer UI/UX",
            company: "Studio Design",
            period: "2016 - 2018",
            description: "Conception d'interfaces utilisateur et d'expériences utilisateur pour applications web et mobiles.",
        },
    ]

    const education = [
        {
            degree: "Master en Développement Web",
            institution: "Université Technologique",
            period: "2014 - 2016",
        },
        {
            degree: "Licence en Informatique",
            institution: "Université des Sciences",
            period: "2011 - 2014",
        },
    ]

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <section id="about" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">À Propos de Moi</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Découvrez mon parcours, mes compétences et mes expériences dans le domaine du développement web et du
                        design.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold mb-6">Qui suis-je?</h3>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Je suis un développeur web passionné par la création d'expériences numériques innovantes et intuitives.
                                Avec plus de 5 ans d'expérience dans le domaine, je combine expertise technique et sensibilité design
                                pour réaliser des projets web qui se démarquent.
                            </p>
                            <p>
                                Ma spécialité est le développement frontend avec React et Next.js, mais je maîtrise également les
                                technologies backend et le design UI/UX. J'aime particulièrement explorer les nouvelles technologies
                                comme WebGL et Three.js pour créer des expériences web immersives.
                            </p>
                            <p>
                                En dehors du code, je m'intéresse à l'art numérique, à la réalité virtuelle et à l'intelligence
                                artificielle. Ces passions nourrissent ma créativité et m'aident à concevoir des solutions web toujours
                                plus innovantes.
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-2">
                            <Badge variant="outline">React</Badge>
                            <Badge variant="outline">Next.js</Badge>
                            <Badge variant="outline">TypeScript</Badge>
                            <Badge variant="outline">Node.js</Badge>
                            <Badge variant="outline">Three.js</Badge>
                            <Badge variant="outline">UI/UX Design</Badge>
                            <Badge variant="outline">WebGL</Badge>
                            <Badge variant="outline">Tailwind CSS</Badge>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold mb-6">Mes Compétences</h3>
                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            {skills.map((skill) => (
                                <motion.div key={skill.name} variants={item} className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>{skill.name}</span>
                                        <span>{skill.level}%</span>
                                    </div>
                                    <Progress value={skill.level} className="h-2" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-20"
                >
                    <Tabs defaultValue="experience" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="experience">Expérience</TabsTrigger>
                            <TabsTrigger value="education">Formation</TabsTrigger>
                        </TabsList>
                        <TabsContent value="experience">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {experiences.map((exp, index) => (
                                    <Card key={index} className="border border-border">
                                        <CardHeader>
                                            <CardTitle>{exp.title}</CardTitle>
                                            <CardDescription>{exp.company}</CardDescription>
                                            <Badge variant="outline" className="w-fit">
                                                {exp.period}
                                            </Badge>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{exp.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="education">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {education.map((edu, index) => (
                                    <Card key={index} className="border border-border">
                                        <CardHeader>
                                            <CardTitle>{edu.degree}</CardTitle>
                                            <CardDescription>{edu.institution}</CardDescription>
                                            <Badge variant="outline" className="w-fit">
                                                {edu.period}
                                            </Badge>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>
        </section>
    )
}

