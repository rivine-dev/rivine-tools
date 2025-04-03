"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {DynamicIcon} from "lucide-react/dynamic";
import {HTMLAttributeAnchorTarget} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface IconButtonProps {
    icon: any;
    target?: HTMLAttributeAnchorTarget | undefined;
    href?: string;
    tooltip?: string,
    variant?: "ghost" | "link" | "default" | "destructive" | "outline" | "secondary";
}

const IconButton: React.FC<IconButtonProps> = ({
                                                   icon,
                                                   target = "_self",
                                                   href = "/",
                                                   tooltip,
                                                   variant = "ghost",
                                               }) => {

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button variant={variant} asChild>
                        <Link target={target} href={href}>
                            <DynamicIcon name={icon} size={48} />
                        </Link>
                    </Button>
                </TooltipTrigger>
                {tooltip &&
                    <TooltipContent >
                        <p>{tooltip}</p>
                    </TooltipContent>
                }

            </Tooltip>
        </TooltipProvider>
    );
};

export default IconButton;
