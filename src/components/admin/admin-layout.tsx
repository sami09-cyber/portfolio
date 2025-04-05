"use client"

import type { ReactNode } from "react"
import { AdminSidebar } from "./admin-sidebar"

interface AdminLayoutProps {
    children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <AdminSidebar />
            <div className="md:ml-64 pt-16 md:pt-0 min-h-screen">
                <main className="container mx-auto px-4 py-8">{children}</main>
            </div>
        </div>
    )
}

