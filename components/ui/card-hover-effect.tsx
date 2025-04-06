"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {useTranslations} from "use-intl";
import {Badge} from "@/components/ui/badge";

export const HoverEffect = ({
                                items,
                                className,
                            }: {
    items: {
        title: string;
        description: string;
        link: string;
        isActive?: boolean;
    }[];
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const t = useTranslations()

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
                className
            )}
        >
            {items.map((item, idx) => (
                <Link
                    href={item.isActive ? item.link : '#tools'}
                    key={item?.link}
                    className="relative group  block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-primary block rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.5 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card>
                        <span className="absolute right-0 top-0">
                            {!item.isActive && (
                                <Badge>Coming soon</Badge>
                            )}
                        </span>
                        <CardTitle>
                            {t.has(item.title) ? t(item.title) : item.title}
                        </CardTitle>
                        <CardDescription>{t.has(item.description) ? t(item.description) : item.description}</CardDescription>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export const Card = ({
                         className,
                         children,
                     }: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full p-4 overflow-hidden bg-background border border-transparent relative z-20",
                "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
                className
            )}
        >
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};
export const CardTitle = ({
                              className,
                              children,
                          }: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={cn("font-bold tracking-wide mt-4", className)}>
            {children}
        </h4>
    );
};
export const CardDescription = ({
                                    className,
                                    children,
                                }: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p
            className={cn(
                "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
                className
            )}
        >
            {children}
        </p>
    );
};
