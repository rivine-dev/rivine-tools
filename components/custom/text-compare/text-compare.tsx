"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Check, ChevronRight, ChevronLeft } from "lucide-react"
import * as diff from "diff"
import {passwordGenerator, textCompare} from "@/config/i18n-constants";
import {useTranslations} from "use-intl";

type DiffLine = {
    type: "added" | "removed" | "unchanged"
    content: string
    lineNumber: number
    otherLineNumber: number | null
    selected: boolean
    // For word and character level diffs
    parts?: {
        text: string
        highlighted: boolean
    }[]
}

type DiffResult = {
    left: DiffLine[]
    right: DiffLine[]
}

export function TextDiffViewer() {
    const [leftText, setLeftText] = useState("")
    const [rightText, setRightText] = useState("")
    const [diffResult, setDiffResult] = useState<DiffResult>({ left: [], right: [] })
    const [realTimeView, setRealTimeView] = useState(false)
    const [diffMethod, setDiffMethod] = useState("lines")
    const [selectedLines, setSelectedLines] = useState<{ left: number[]; right: number[] }>({ left: [], right: [] })
    const t = useTranslations()

    const leftFileInputRef = useRef<HTMLInputElement>(null)
    const rightFileInputRef = useRef<HTMLInputElement>(null)

    // Calculate diff when text changes
    useEffect(() => {
        if (realTimeView || leftText === "" || rightText === "") {
            calculateDiff()
        }
    }, [leftText, rightText, diffMethod, realTimeView])

    const calculateDiff = () => {
        const leftLines = leftText.split("\n")
        const rightLines = rightText.split("\n")

        let result: DiffResult = { left: [], right: [] }

        if (diffMethod === "lines") {
            // Line by line diff
            const changes = diff.diffLines(leftText, rightText)
            result = processLineDiff(changes, leftLines, rightLines)
        } else if (diffMethod === "words") {
            // Word by word diff
            result = processWordDiff(leftLines, rightLines)
        } else if (diffMethod === "chars") {
            // Character by character diff
            result = processCharDiff(leftLines, rightLines)
        }

        setDiffResult(result)
    }

    const processLineDiff = (changes: diff.Change[], leftLines: string[], rightLines: string[]): DiffResult => {
        const left: DiffLine[] = []
        const right: DiffLine[] = []

        let leftLineCounter = 1
        let rightLineCounter = 1

        // This is a simplified approach - a real implementation would need more sophisticated line matching
        leftLines.forEach((line, index) => {
            if (index < rightLines.length) {
                // Lines exist on both sides
                if (line === rightLines[index]) {
                    // Unchanged line
                    left.push({
                        type: "unchanged",
                        content: line,
                        lineNumber: leftLineCounter,
                        otherLineNumber: rightLineCounter,
                        selected: false,
                    })

                    right.push({
                        type: "unchanged",
                        content: line,
                        lineNumber: rightLineCounter,
                        otherLineNumber: leftLineCounter,
                        selected: false,
                    })
                } else {
                    // Changed line
                    left.push({
                        type: "removed",
                        content: line,
                        lineNumber: leftLineCounter,
                        otherLineNumber: rightLineCounter,
                        selected: false,
                    })

                    right.push({
                        type: "added",
                        content: rightLines[index],
                        lineNumber: rightLineCounter,
                        otherLineNumber: leftLineCounter,
                        selected: false,
                    })
                }

                leftLineCounter++
                rightLineCounter++
            } else {
                // Line only exists on left side
                left.push({
                    type: "removed",
                    content: line,
                    lineNumber: leftLineCounter,
                    otherLineNumber: null,
                    selected: false,
                })
                leftLineCounter++
            }
        })

        // Add any remaining right lines
        if (rightLines.length > leftLines.length) {
            for (let i = leftLines.length; i < rightLines.length; i++) {
                right.push({
                    type: "added",
                    content: rightLines[i],
                    lineNumber: rightLineCounter,
                    otherLineNumber: null,
                    selected: false,
                })
                rightLineCounter++
            }
        }

        return { left, right }
    }

    const processWordDiff = (leftLines: string[], rightLines: string[]): DiffResult => {
        const left: DiffLine[] = []
        const right: DiffLine[] = []

        let leftLineCounter = 1
        let rightLineCounter = 1

        // Process each line
        const maxLines = Math.max(leftLines.length, rightLines.length)

        for (let i = 0; i < maxLines; i++) {
            const leftLine = i < leftLines.length ? leftLines[i] : ""
            const rightLine = i < rightLines.length ? rightLines[i] : ""

            if (leftLine === rightLine) {
                // Unchanged line
                if (leftLine !== "") {
                    left.push({
                        type: "unchanged",
                        content: leftLine,
                        lineNumber: leftLineCounter++,
                        otherLineNumber: rightLineCounter,
                        selected: false,
                    })
                }

                if (rightLine !== "") {
                    right.push({
                        type: "unchanged",
                        content: rightLine,
                        lineNumber: rightLineCounter++,
                        otherLineNumber: leftLineCounter - 1,
                        selected: false,
                    })
                }
            } else {
                // Changed line - do word-level diff
                if (leftLine !== "") {
                    const wordDiff = diff.diffWords(leftLine, rightLine)
                    const parts: { text: string; highlighted: boolean }[] = []

                    wordDiff.forEach((part) => {
                        if (!part.added) {
                            parts.push({
                                text: part.value,
                                highlighted: part.removed,
                            })
                        }
                    })

                    left.push({
                        type: "removed",
                        content: leftLine,
                        lineNumber: leftLineCounter++,
                        otherLineNumber: rightLine !== "" ? rightLineCounter : null,
                        selected: false,
                        parts: parts,
                    })
                }

                if (rightLine !== "") {
                    const wordDiff = diff.diffWords(leftLine, rightLine)
                    const parts: { text: string; highlighted: boolean }[] = []

                    wordDiff.forEach((part) => {
                        if (!part.removed) {
                            parts.push({
                                text: part.value,
                                highlighted: part.added,
                            })
                        }
                    })

                    right.push({
                        type: "added",
                        content: rightLine,
                        lineNumber: rightLineCounter++,
                        otherLineNumber: leftLine !== "" ? leftLineCounter - 1 : null,
                        selected: false,
                        parts: parts,
                    })
                }
            }
        }

        return { left, right }
    }

    const processCharDiff = (leftLines: string[], rightLines: string[]): DiffResult => {
        const left: DiffLine[] = []
        const right: DiffLine[] = []

        let leftLineCounter = 1
        let rightLineCounter = 1

        // Process each line
        const maxLines = Math.max(leftLines.length, rightLines.length)

        for (let i = 0; i < maxLines; i++) {
            const leftLine = i < leftLines.length ? leftLines[i] : ""
            const rightLine = i < rightLines.length ? rightLines[i] : ""

            if (leftLine === rightLine) {
                // Unchanged line
                if (leftLine !== "") {
                    left.push({
                        type: "unchanged",
                        content: leftLine,
                        lineNumber: leftLineCounter++,
                        otherLineNumber: rightLineCounter,
                        selected: false,
                    })
                }

                if (rightLine !== "") {
                    right.push({
                        type: "unchanged",
                        content: rightLine,
                        lineNumber: rightLineCounter++,
                        otherLineNumber: leftLineCounter - 1,
                        selected: false,
                    })
                }
            } else {
                // Changed line - do character-level diff
                if (leftLine !== "") {
                    const charDiff = diff.diffChars(leftLine, rightLine)
                    const parts: { text: string; highlighted: boolean }[] = []

                    charDiff.forEach((part) => {
                        if (!part.added) {
                            parts.push({
                                text: part.value,
                                highlighted: part.removed,
                            })
                        }
                    })

                    left.push({
                        type: "removed",
                        content: leftLine,
                        lineNumber: leftLineCounter++,
                        otherLineNumber: rightLine !== "" ? rightLineCounter : null,
                        selected: false,
                        parts: parts,
                    })
                }

                if (rightLine !== "") {
                    const charDiff = diff.diffChars(leftLine, rightLine)
                    const parts: { text: string; highlighted: boolean }[] = []

                    charDiff.forEach((part) => {
                        if (!part.removed) {
                            parts.push({
                                text: part.value,
                                highlighted: part.added,
                            })
                        }
                    })

                    right.push({
                        type: "added",
                        content: rightLine,
                        lineNumber: rightLineCounter++,
                        otherLineNumber: leftLine !== "" ? leftLineCounter - 1 : null,
                        selected: false,
                        parts: parts,
                    })
                }
            }
        }

        return { left, right }
    }

    const handleFileUpload = (side: "left" | "right", e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const content = event.target?.result as string
            if (side === "left") {
                setLeftText(content)
            } else {
                setRightText(content)
            }
        }
        reader.readAsText(file)
    }

    const toggleLineSelection = (side: "left" | "right", lineNumber: number) => {
        setSelectedLines((prev) => {
            const newSelection = { ...prev }

            if (newSelection[side].includes(lineNumber)) {
                // Deselect
                newSelection[side] = newSelection[side].filter((num) => num !== lineNumber)
            } else {
                // Select
                newSelection[side] = [...newSelection[side], lineNumber]
            }

            return newSelection
        })
    }

    const mergeToRight = () => {
        if (selectedLines.left.length === 0) return

        // Get the current lines
        const leftLines = leftText.split("\n")
        const rightLines = rightText.split("\n")
        const newRightLines = [...rightLines]

        // Sort selected lines to process them in order
        const sortedSelectedLines = [...selectedLines.left].sort((a, b) => a - b)

        // Process each selected line
        sortedSelectedLines.forEach((lineNumber) => {
            const lineIndex = lineNumber - 1

            // Make sure the line exists in the left text
            if (lineIndex >= 0 && lineIndex < leftLines.length) {
                const lineContent = leftLines[lineIndex]

                // Find the corresponding line in the diff result
                const diffLine = diffResult.left.find((line) => line.lineNumber === lineNumber)

                if (diffLine && diffLine.otherLineNumber !== null) {
                    // If there's a corresponding line on the right, replace it
                    const rightIndex = diffLine.otherLineNumber - 1
                    if (rightIndex >= 0 && rightIndex < newRightLines.length) {
                        newRightLines[rightIndex] = lineContent
                    }
                } else {
                    // If there's no corresponding line, add it to the end
                    newRightLines.push(lineContent)
                }
            }
        })

        // Update the right text
        setRightText(newRightLines.join("\n"))

        // Clear selections
        setSelectedLines({ left: [], right: [] })

        // Force recalculate diff
        setTimeout(() => {
            calculateDiff()
        }, 0)
    }

    const mergeToLeft = () => {
        if (selectedLines.right.length === 0) return

        // Get the current lines
        const leftLines = leftText.split("\n")
        const rightLines = rightText.split("\n")
        const newLeftLines = [...leftLines]

        // Sort selected lines to process them in order
        const sortedSelectedLines = [...selectedLines.right].sort((a, b) => a - b)

        // Process each selected line
        sortedSelectedLines.forEach((lineNumber) => {
            const lineIndex = lineNumber - 1

            // Make sure the line exists in the right text
            if (lineIndex >= 0 && lineIndex < rightLines.length) {
                const lineContent = rightLines[lineIndex]

                // Find the corresponding line in the diff result
                const diffLine = diffResult.right.find((line) => line.lineNumber === lineNumber)

                if (diffLine && diffLine.otherLineNumber !== null) {
                    // If there's a corresponding line on the left, replace it
                    const leftIndex = diffLine.otherLineNumber - 1
                    if (leftIndex >= 0 && leftIndex < newLeftLines.length) {
                        newLeftLines[leftIndex] = lineContent
                    }
                } else {
                    // If there's no corresponding line, add it to the end
                    newLeftLines.push(lineContent)
                }
            }
        })

        // Update the left text
        setLeftText(newLeftLines.join("\n"))

        // Clear selections
        setSelectedLines({ left: [], right: [] })

        // Force recalculate diff
        setTimeout(() => {
            calculateDiff()
        }, 0)
    }

    // Render a line with word or character level highlighting
    const renderDetailedLine = (line: DiffLine, side: "left" | "right") => {
        if (!line.parts) {
            return <span>{line.content}</span>
        }

        return (
            <>
                {line.parts.map((part, idx) => (
                    <span
                        key={idx}
                        className={part.highlighted ? (side === "left" ? "bg-red-500 text-white" : "bg-green-500 text-white") : ""}
                    >
            {part.text}
          </span>
                ))}
            </>
        )
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-center">{t(`${textCompare}.label`)}</h2>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex items-center gap-4">
                    <Select
                        value={diffMethod}
                        onValueChange={(value) => {
                            setDiffMethod(value)
                            // Force recalculate diff when method changes
                            setTimeout(calculateDiff, 0)
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Diff Method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="chars">Character by Character</SelectItem>
                            <SelectItem value="words">Word by Word</SelectItem>
                            <SelectItem value="lines">Line by Line</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex items-center space-x-2">
                        <Switch id="real-time" checked={realTimeView} onCheckedChange={setRealTimeView} />
                        <Label htmlFor="real-time">Real-time View</Label>
                    </div>
                </div>

                {!realTimeView && <Button onClick={calculateDiff}>Compare</Button>}
            </div>

            {/* Editors */}
            <div className="grid grid-cols-2 gap-4">
                {/* Left Editor */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Left Text</h3>
                        <div>
                            <input
                                type="file"
                                ref={leftFileInputRef}
                                onChange={(e) => handleFileUpload("left", e)}
                                className="hidden"
                            />
                            <Button variant="outline" size="sm" onClick={() => leftFileInputRef.current?.click()}>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                            </Button>
                        </div>
                    </div>
                    <Textarea
                        value={leftText}
                        onChange={(e) => setLeftText(e.target.value)}
                        className="font-mono h-[200px]"
                        placeholder="Enter or paste text here..."
                    />
                </div>

                {/* Right Editor */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Right Text</h3>
                        <div>
                            <input
                                type="file"
                                ref={rightFileInputRef}
                                onChange={(e) => handleFileUpload("right", e)}
                                className="hidden"
                            />
                            <Button variant="outline" size="sm" onClick={() => rightFileInputRef.current?.click()}>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                            </Button>
                        </div>
                    </div>
                    <Textarea
                        value={rightText}
                        onChange={(e) => setRightText(e.target.value)}
                        className="font-mono h-[200px]"
                        placeholder="Enter or paste text here..."
                    />
                </div>
            </div>

            {/* Diff View */}
            <div className="space-y-4 mt-4">
                <div className="flex justify-center gap-4 mb-4">
                    <Button variant="outline" onClick={mergeToLeft} disabled={selectedLines.right.length === 0}>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Merge to Left
                    </Button>

                    <Button variant="outline" onClick={mergeToRight} disabled={selectedLines.left.length === 0}>
                        Merge to Right
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Left Diff View */}
                    <div className="border rounded-md overflow-hidden">
                        <div className="bg-muted p-2 font-medium">Left</div>
                        <div className="p-2 font-mono break-all">
                            {diffResult.left.map((line, index) => (
                                <div
                                    key={`left-${index}`}
                                    className={`flex cursor-pointer ${
                                        diffMethod === "lines" && line.type === "removed"
                                            ? "bg-red-100 dark:bg-red-400"
                                            : diffMethod !== "lines" && line.type === "removed"
                                                ? "bg-red-50 dark:bg-red-300"
                                                : ""
                                    } ${selectedLines.left.includes(line.lineNumber) ? "bg-blue-200 dark:bg-blue-400" : ""}`}
                                    onClick={() => toggleLineSelection("left", line.lineNumber)}
                                >
                                    <div className="w-10 text-right pr-2 text-gray-500 select-none border-r">{line.lineNumber}</div>
                                    <div className="pl-2 flex-1">
                                        {selectedLines.left.includes(line.lineNumber) && (
                                            <Check className="inline h-4 w-4 mr-1 text-blue-600" />
                                        )}
                                        {diffMethod === "lines" || !line.parts ? line.content : renderDetailedLine(line, "left")}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Diff View */}
                    <div className="border rounded-md overflow-hidden">
                        <div className="bg-muted p-2 font-medium">Right</div>
                        <div className="p-2 font-mono break-all">
                            {diffResult.right.map((line, index) => (
                                <div
                                    key={`right-${index}`}
                                    className={`flex cursor-pointer ${
                                        diffMethod === "lines" && line.type === "added"
                                            ? "bg-green-100 dark:bg-green-400"
                                            : diffMethod !== "lines" && line.type === "added"
                                                ? "bg-green-50 dark:bg-green-300"
                                                : ""
                                    } ${selectedLines.right.includes(line.lineNumber) ? "bg-blue-200 dark:bg-blue-400" : ""}`}
                                    onClick={() => toggleLineSelection("right", line.lineNumber)}
                                >
                                    <div className="w-10 text-right pr-2 text-gray-500 select-none border-r">{line.lineNumber}</div>
                                    <div className="pl-2 flex-1">
                                        {selectedLines.right.includes(line.lineNumber) && (
                                            <Check className="inline h-4 w-4 mr-1 text-blue-600" />
                                        )}
                                        {diffMethod === "lines" || !line.parts ? line.content : renderDetailedLine(line, "right")}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
