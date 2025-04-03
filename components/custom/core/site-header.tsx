import {MainNav} from "@/components/custom/core/main-nav";
import Link from "next/link";
import {ThemeToggle} from "@/components/theme/theme-toggle";
import Logo from "@/components/custom/core/logo";
import {navButtons} from "@/config/site-config";
import {MobileNav} from "@/components/custom/core/mobile-nav";
import IconButton from "@/components/custom/icons/icon-button";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full animate-delay-1000 animate-fade-down border-border/40 border-b
         bg-bg backdrop-blur dark:bg-bg/95 supports-[backdrop-filter]:dark:bg-bg/60 flex justify-center">
            <div className="container flex h-16 max-w-screen-2xl items-center px-6">
                <Link href="/">
                    <Logo/>
                </Link>

                <MainNav />
                <MobileNav />
                <nav className="ml-auto hidden items-center gap-1 md:flex">
                    {navButtons.map((item) => (
                        <IconButton key={`nvI-${item.icon}`} icon={item.icon} tooltip={item.tooltip}
                                    href={item.href} target={item.target}></IconButton>
                    ))}
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}