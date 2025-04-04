"use client"

import * as React from "react"
import { Languages } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {i18n, supportedLanguages} from "@/i18n/config";

export function LocaleSwitcher() {
    const currentLocale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    function onSelectLocale(locale: string) {
        const segments = pathname.split("/")
        if (i18n.locales.includes(segments[1])) {
            segments[1] = locale
        } else {
            segments.unshift("", locale)
        }
        router.replace(segments.join("/"))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {supportedLanguages.map((language) => (
                    <DropdownMenuItem
                        key={language.label}
                        onClick={() => onSelectLocale(language.code)}
                    >
                        {language.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
