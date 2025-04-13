"use client"

import type React from "react"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { useToast } from "@/hooks/use-toast"
import {
    Copy,
    Save,
    FileUp,
    Maximize,
    ChevronDown,
    FileText,
    AlignJustify,
    AlignLeft,
    Search,
    MoreVertical,
    Undo,
    Redo,
    ArrowLeftRight,
} from "lucide-react"

// Dynamically import JSONEditor to avoid SSR issues
const JSONEditor = dynamic(() => import("./json-editor"), {
    ssr: false,
    loading: () => <div className="h-[70vh] w-full bg-muted animate-pulse" />,
})

export default function JsonCompare() {
    // const { toast } = useToast()
    const [activeTab, setActiveTab] = useState("document1")
    const [compareMode, setCompareMode] = useState(false)
    // Update the state definition for differences to include the new structure
    const [differences, setDifferences] = useState<{ path: string; doc1Value: any; doc2Value: any }[]>([])
    const [viewMode, setViewMode] = useState<"text" | "tree" | "table">("tree")

    // JSON content for each document
    const [document1, setDocument1] = useState<any>({
        priority: 0,
        route: {
            routeId: "GET:/dev/test/headers",
            path: "/dev/test/headers",
            operation: "get-headers",
            appId: "67dba1c1b7c5938da1aa1f6",
            displayName: "get-headers",
            method: "GET",
            pathType: "combined",
            apiId: "67f3ac0741fa7e50c2fd1a4",
            fullPath: "/dev/test/headers",
            regexPath: "^/dev/test/headers$",
            parameters: [],
        },
    })

    const [document2, setDocument2] = useState<any>({
        priority: 1,
        route: {
            routeId: "GET:/dev/test/headers",
            path: "/dev/test/headers",
            operation: "get-headers",
            appId: "67dba1c1b7c5938da1aa1f6",
            displayName: "get-headers",
            method: "GET",
            pathType: "combined",
            apiId: "67f3ac0741fa7e50c2fd1a4",
            fullPath: "/dev/test/headers",
            regexPath: "^/dev/test/headers$",
            parameters: [],
        },
    })

    // Function to handle JSON changes
    const handleChange = (doc: string, value: any) => {
        if (doc === "document1") {
            setDocument1(value)
        } else {
            setDocument2(value)
        }

        if (compareMode) {
            compareDocuments()
        }
    }

    // Function to compare documents
    const compareDocuments = () => {
        try {
            const diffs = []
            const paths = findDifferingPaths(document1, document2)

            if (paths.length > 0) {
                setDifferences(
                    paths.map((path) => ({
                        path,
                        doc1Value: getValueAtPath(document1, path),
                        doc2Value: getValueAtPath(document2, path),
                    })),
                )
            } else {
                setDifferences([])
            }
        } catch (error) {
            console.error("Error comparing documents:", error)
        }
    }

    // Function to find all paths that differ between two objects
    const findDifferingPaths = (obj1: any, obj2: any, currentPath = ""): string[] => {
        // Handle primitive values or null/undefined
        if (obj1 === obj2) return []

        if (obj1 === null || obj2 === null || typeof obj1 !== "object" || typeof obj2 !== "object") {
            return [currentPath]
        }

        const paths: string[] = []

        // Handle arrays
        if (Array.isArray(obj1) && Array.isArray(obj2)) {
            // Compare array lengths
            if (obj1.length !== obj2.length) {
                paths.push(currentPath)
            }

            // Compare array items
            const maxLength = Math.max(obj1.length, obj2.length)
            for (let i = 0; i < maxLength; i++) {
                const newPath = currentPath ? `${currentPath}.${i}` : `${i}`

                // Item exists in obj1 but not in obj2
                if (i >= obj2.length) {
                    paths.push(newPath)
                    continue
                }

                // Item exists in obj2 but not in obj1
                if (i >= obj1.length) {
                    paths.push(newPath)
                    continue
                }

                // Both have the item, check if values are different
                paths.push(...findDifferingPaths(obj1[i], obj2[i], newPath))
            }

            return paths
        }

        // Handle objects
        // Get all keys from both objects
        const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])]

        for (const key of keys) {
            const newPath = currentPath ? `${currentPath}.${key}` : key

            // Key exists in obj1 but not in obj2
            if (!(key in obj2)) {
                paths.push(newPath)
                continue
            }

            // Key exists in obj2 but not in obj1
            if (!(key in obj1)) {
                paths.push(newPath)
                continue
            }

            // Both have the key, check if values are different
            const val1 = obj1[key]
            const val2 = obj2[key]

            if (typeof val1 !== typeof val2) {
                paths.push(newPath)
            } else if (typeof val1 === "object" && val1 !== null && val2 !== null) {
                // Recursively check nested objects
                paths.push(...findDifferingPaths(val1, val2, newPath))
            } else if (val1 !== val2) {
                paths.push(newPath)
            }
        }

        return paths
    }

    // Function to get a value at a specific path in an object
    const getValueAtPath = (obj: any, path: string) => {
        const parts = path.split(".")
        let current = obj

        for (const part of parts) {
            if (current === null || current === undefined || typeof current !== "object") {
                return undefined
            }
            current = current[part]
        }

        return current
    }

    // Function to copy JSON to clipboard
    const copyToClipboard = (doc: string) => {
        const content = doc === "document1" ? JSON.stringify(document1, null, 2) : JSON.stringify(document2, null, 2)
        navigator.clipboard.writeText(content).then(() => {
            // toast({
            //     title: "Copied to clipboard",
            //     description: "JSON content has been copied to your clipboard",
            // })
        })
    }

    // Function to handle file upload
    const handleFileUpload = (doc: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const content = JSON.parse(e.target?.result as string)
                if (doc === "document1") {
                    setDocument1(content)
                } else {
                    setDocument2(content)
                }
                // toast({
                //     title: "File loaded",
                //     description: `${file.name} has been loaded successfully`,
                // })
            } catch (error) {
                // toast({
                //     title: "Error parsing JSON",
                //     description: "The file does not contain valid JSON",
                //     variant: "destructive",
                // })
            }
        }
        reader.readAsText(file)
    }

    // Function to toggle fullscreen
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
    }

    // Toggle compare mode
    const toggleCompareMode = () => {
        const newCompareMode = !compareMode
        setCompareMode(newCompareMode)
        if (newCompareMode) {
            compareDocuments()
        }
    }

    // Add a useEffect to trigger comparison when compare mode is enabled
    // Add this after the toggleCompareMode function
    useEffect(() => {
        if (compareMode) {
            compareDocuments()
        }
    }, [compareMode, document1, document2])

    return (
        <main className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className={`flex-1 border rounded-lg overflow-hidden ${compareMode ? "block" : "block"}`}>
                    <div className="bg-[var(--ring)] text-white p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">New document 1</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-white">
                                <FileText className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-1">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-white">
                                            <FileUp className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Open file</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-white">
                                        <Save className="h-4 w-4" />
                                        <ChevronDown className="h-3 w-3 ml-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Save</DropdownMenuItem>
                                    <DropdownMenuItem>Save As...</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-white">
                                        <Copy className="h-4 w-4" />
                                        <ChevronDown className="h-3 w-3 ml-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => copyToClipboard("document1")}>Copy JSON</DropdownMenuItem>
                                    <DropdownMenuItem>Copy Path</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button variant="ghost" size="icon" className="h-6 w-6 text-white" onClick={toggleFullscreen}>
                                <Maximize className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="h-[70vh]">
                        <JSONEditor
                            value={document1}
                            onChange={(value) => handleChange("document1", value)}
                            mode={viewMode}
                            diffPaths={compareMode ? differences.map((diff) => diff.path) : []}
                            documentId="document1"
                        />
                    </div>
                </div>

                <div className={`flex-1 border rounded-lg overflow-hidden ${compareMode ? "block" : "hidden lg:block"}`}>
                    <div className="bg-[var(--ring)] text-white p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">New document 2</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-white">
                                <FileText className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-1">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-white">
                                            <FileUp className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Open file</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-white">
                                        <Save className="h-4 w-4" />
                                        <ChevronDown className="h-3 w-3 ml-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Save</DropdownMenuItem>
                                    <DropdownMenuItem>Save As...</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-white">
                                        <Copy className="h-4 w-4" />
                                        <ChevronDown className="h-3 w-3 ml-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => copyToClipboard("document2")}>Copy JSON</DropdownMenuItem>
                                    <DropdownMenuItem>Copy Path</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button variant="ghost" size="icon" className="h-6 w-6 text-white" onClick={toggleFullscreen}>
                                <Maximize className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="h-[70vh]">
                        <JSONEditor
                            value={document2}
                            onChange={(value) => handleChange("document2", value)}
                            mode={viewMode}
                            diffPaths={compareMode ? differences.map((diff) => diff.path) : []}
                            documentId="document2"
                        />
                    </div>
                </div>

                {compareMode && (
                    <div className="w-16 flex flex-col items-center justify-center gap-4 p-2">
                        <Button variant="outline" size="icon" className="rounded-full">
                            <ArrowLeftRight className="h-4 w-4" />
                        </Button>
                        <div className="text-center">
                            <div className="text-sm font-medium">Transform</div>
                        </div>

                        <Button variant="outline" size="icon" className="rounded-full">
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                        <div className="text-center">
                            <div className="text-sm font-medium">Differences</div>
                            <div className="text-xs text-muted-foreground">
                                {differences.length} difference{differences.length !== 1 ? "s" : ""}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input type="checkbox" id="compare" checked={compareMode} onChange={toggleCompareMode} className="mr-2" />
                            <label htmlFor="compare" className="text-sm">
                                Compare
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {!compareMode && (
                <div className="mt-4 flex justify-center">
                    <Button onClick={toggleCompareMode} className="bg-green-600 hover:bg-green-700">
                        Enable Compare Mode
                    </Button>
                </div>
            )}
        </main>
    )
}
