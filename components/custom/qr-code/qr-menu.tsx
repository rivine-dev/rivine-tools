"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {Type, LinkIcon, PhoneIcon} from "lucide-react"
import * as React from "react";
import {MenuButton, MenuItem} from "@/components/ui/menu-button";
import {Card} from "@/components/ui/card";
import {getNonLocalizedSlug} from "@/i18n/get-localized-path";
import {useTranslations} from "use-intl";
import {qrMenuItems} from "@/config/site-config";

export function QrMenu() {
    const pathname = usePathname()
    const t = useTranslations()

    return (
        <div className="p-2 min-w-[10rem]">
            <Card className="py-0 h-[100%]">
                <div className="flex overflow-x-auto md:flex-col md:overflow-visible px-2 lg:py-2">
                    {qrMenuItems.map((item) => {
                        const isActive = getNonLocalizedSlug(pathname) === `/${item.href}` || getNonLocalizedSlug(pathname) === item.href

                        return (
                            <MenuItem className="py-1" key={item.title}>
                                <MenuButton size="lg" isActive={isActive} asChild>
                                    <Link href={item.href}>
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                            <item.icon className="size-4"/>
                                        </div>
                                        <div className="flex flex-col gap-0.5 leading-none">
                                            <span className="font-semibold">{t(item.title)}</span>
                                        </div>
                                    </Link>
                                </MenuButton>
                            </MenuItem>
                        )
                    })}
                </div>
            </Card>
        </div>
    )
}
