"use client";

import { motion as m } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {navLinks} from "@/config/site-config";
import {useHash} from "@/hooks/use-hash";
import {useTranslations} from "use-intl";
import {ToolsNav} from "@/components/custom/core/tools-nav";

function isActive(href: string, path: string) {
    return path.includes(href);
}

export function MainNav() {
    const pathname = usePathname();
    const hash = useHash();
    const [hoveredPath, setHoveredPath] = useState(pathname + hash);
    const t = useTranslations()

    useEffect(() => {
        setHoveredPath(pathname + hash);
    }, [pathname, hash]);

    return (
        <nav className="ml-6 hidden items-center text-sm md:flex">
            <ToolsNav/>
            {/*{navLinks.map((item) => (*/}
            {/*    <Link*/}
            {/*        key={item.href}*/}
            {/*        className="relative px-3 py-2 text-fg/60 transition-colors hover:text-fg data-[active='true']:text-fg"*/}
            {/*        data-active={isActive(item.href, pathname)}*/}
            {/*        href={item.href}*/}
            {/*        onMouseOver={() => setHoveredPath(item.href)}*/}
            {/*        onMouseLeave={() => setHoveredPath(pathname)}*/}
            {/*    >*/}
            {/*        <span>{*/}
            {/*            item.tLabel ? t(item.tLabel) : item.label*/}
            {/*        }</span>*/}
            {/*        {isActive(item.href, hoveredPath) && (*/}
            {/*            <m.div*/}
            {/*                className="-z-10 absolute bottom-0 left-0 size-full rounded-full bg-muted"*/}
            {/*                layoutId="navbar"*/}
            {/*                aria-hidden="true"*/}
            {/*                transition={{*/}
            {/*                    duration: 0.15,*/}
            {/*                }}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*        {isActive(item.href, pathname) && (*/}
            {/*            <m.div*/}
            {/*                className="-z-10 absolute bottom-0 left-0 size-full rounded-full bg-muted"*/}
            {/*                aria-hidden="true"*/}
            {/*                transition={{*/}
            {/*                    duration: 0.15,*/}
            {/*                }}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*    </Link>*/}
            {/*))}*/}
        </nav>
    );
}