"use client"

import * as React from "react"
import {ClipboardIcon, CheckIcon} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export function CopyButton({ value }: { value: string }) {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        if (hasCopied) {
            const timeout = setTimeout(() => setHasCopied(false), 2000)
            return () => clearTimeout(timeout)
        }
    }, [hasCopied])

    const handleCopy = () => {
        navigator.clipboard.writeText(value)
        setHasCopied(true)
    }

    return (
        <TooltipProvider delayDuration={1}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCopy}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {hasCopied ? (
                                <motion.span
                                    key="check"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <CheckIcon className="h-4 w-4" />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="clipboard"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ClipboardIcon className="h-4 w-4" />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Copy</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
