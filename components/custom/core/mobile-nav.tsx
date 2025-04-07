"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer";
import {toolsNavItems} from "@/config/site-config";
import {ChevronRight, PanelRightClose, PanelRightOpen} from "lucide-react"
import {ThemeToggle} from "@/components/theme/theme-toggle";
import {LocaleSwitcher} from "@/components/custom/locale/locale-switcher";
import {useTranslations} from "use-intl";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton,
    SidebarMenuItem, SidebarProvider
} from "@/components/ui/sidebar";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";

export function MobileNav() {
    const [open, setOpen] = useState(false);
    const t = useTranslations()

    return (
        <Drawer open={open} onOpenChange={setOpen} direction={"right"}>
            <DrawerTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="ml-auto size-8 rounded-full md:hidden"
                    aria-label="Toggle Menu"
                >
                    <PanelRightOpen/>
                </Button>
            </DrawerTrigger>

            <DrawerContent className="w-3/4 sm:max-w-sm bg-background p-6">
                <DrawerTitle>
                    <DrawerClose asChild>
                        <PanelRightClose/>
                    </DrawerClose>
                </DrawerTitle>
                <div className="flex flex-col gap-4 pt-6 overflow-y-auto">
                    <SidebarProvider className="flex-col min-h-[30vh] h-[80vh]">
                        {toolsNavItems.map((item) =>
                            "links" in item ? (
                                <Collapsible
                                    key={item.label}
                                    defaultOpen
                                    className="group/collapsible"
                                >
                                    <SidebarGroup>
                                        <SidebarGroupLabel
                                            asChild
                                            className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                        >
                                            <CollapsibleTrigger className="flex w-full items-center justify-between">
                                                {item.tLabel ? t(item.tLabel) : item.label}
                                                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                            </CollapsibleTrigger>
                                        </SidebarGroupLabel>
                                        <CollapsibleContent>
                                            <SidebarGroupContent className="ml-2">
                                                <SidebarMenu>
                                                    {item.links?.map((link) => (
                                                        <SidebarMenuItem key={link.label}>
                                                            <SidebarMenuButton asChild isActive={false}>
                                                                <Link href={link.href}>
                                                                    {
                                                                        link.tLabel ? t(link.tLabel) : link.label
                                                                    }
                                                                </Link>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuItem>
                                                    ))}
                                                </SidebarMenu>
                                            </SidebarGroupContent>
                                        </CollapsibleContent>
                                    </SidebarGroup>
                                </Collapsible>
                            ) : (
                                <SidebarGroup key={item.label}>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild isActive={false}>
                                                    <Link href={item.href ? item.href : '/'}>
                                                        {
                                                            item.tLabel ? t(item.tLabel) : item.label
                                                        }
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            )
                        )}
                    </SidebarProvider>
                </div>
                <DrawerFooter>
                    <div className="flex justify-center">
                        {/*{navButtons.map((item) => (*/}
                        {/*    <IconButton key={`nvI-${item.icon}`} icon={item.icon} tooltip={item.tooltip}*/}
                        {/*                href={item.href} target={item.target}></IconButton>*/}
                        {/*))}*/}
                        <span className="mr-2">
                            <LocaleSwitcher/>
                        </span>
                        <ThemeToggle />
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

interface MobileLinkProps extends React.ComponentProps<typeof Link> {
    onOpenChange?: (open: boolean) => void;
}

function MobileLink({ href, onOpenChange, ...props }: MobileLinkProps) {
    const router = useRouter();

    return (
        <Link
            href={href}
            className="border-b py-3"
            onClick={() => {
                router.push(href.toString());
                onOpenChange?.(false);
            }}
            {...props}
        />
    );
}
