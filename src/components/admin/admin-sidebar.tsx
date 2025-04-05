"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    BarChart2,
    User,
    FolderKanban,
    FileText,
    Briefcase,
    GraduationCap,
    Award,
    Settings,
    Menu,
    X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LogoutButton } from "@/components/auth/logout-button"

interface AdminSidebarProps {
    className?: string
}

export function AdminSidebar({ className }: AdminSidebarProps) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const menuItems = [
        { href: "/admin", label: "Dashboard", icon: BarChart2 },
        { href: "/admin/profile", label: "Profil", icon: User },
        { href: "/admin/projects", label: "Projets", icon: FolderKanban },
        { href: "/admin/blog", label: "Blog", icon: FileText },
        { href: "/admin/experience", label: "Expérience", icon: Briefcase },
        { href: "/admin/education", label: "Formation", icon: GraduationCap },
        { href: "/admin/skills", label: "Compétences", icon: Award },
        { href: "/admin/settings", label: "Paramètres", icon: Settings },
    ]

    return (
        <>
            {/* Mobile menu button */}
            <Button
                variant="outline"
                size="icon"
                className="fixed top-4 left-4 z-50 md:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
            </Button>

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    className,
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-border">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                            Admin
                        </h2>
                    </div>

                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                                        isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted text-muted-foreground hover:text-foreground",
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="p-4 border-t border-border space-y-4">
                        <LogoutButton />
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                            <span>← Retour au site</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

