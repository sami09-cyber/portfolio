"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/lib/i18n"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

const languages = {
    fr: "Français",
    en: "English",
}

export function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const switchLanguage = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Switch language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {Object.entries(languages).map(([key, label]) => (
                    <DropdownMenuItem key={key} onClick={() => switchLanguage(key)} className={locale === key ? "bg-muted" : ""}>
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

