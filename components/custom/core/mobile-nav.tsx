"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer";
import {navLinks} from "@/config/site-config";
import {PanelRightClose, PanelRightOpen} from "lucide-react"
import {ThemeToggle} from "@/components/theme/theme-toggle";

export function MobileNav() {
    const [open, setOpen] = useState(false);

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
                <div className="flex flex-col gap-4 pt-6">
                    <MobileLink
                        href="/"
                        onOpenChange={setOpen}
                    >
                        Home
                    </MobileLink>
                    {navLinks.map((item) => (
                        <MobileLink
                            key={item.href}
                            href={item.href}
                            onOpenChange={setOpen}
                        >
                            {item.label}
                        </MobileLink>
                    ))}
                </div>
                <DrawerFooter>
                    <div className="flex justify-center">
                        {/*{navButtons.map((item) => (*/}
                        {/*    <IconButton key={`nvI-${item.icon}`} icon={item.icon} tooltip={item.tooltip}*/}
                        {/*                href={item.href} target={item.target}></IconButton>*/}
                        {/*))}*/}
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
