"use client"

import { useEffect, useRef } from "react"
import {createJSONEditor, JSONEditor as VanillaJSONEditor} from "vanilla-jsoneditor"
import "./json-editor.css";

interface JSONEditorProps {
    value: any
    onChange: (value: any) => void
    mode: "text" | "tree" | "table"
    diffPaths?: string[] // Add diffPaths prop
    documentId: string // Add documentId to identify which document this is
}

export default function JSONEditor({ value, onChange, mode, diffPaths = [], documentId }: JSONEditorProps) {
    const refContainer = useRef<HTMLDivElement>(null)
    const refEditor = useRef<any>(null)

    useEffect(() => {
        // Dispose the editor when the component unmounts
        return () => {
            if (refEditor.current) {
                refEditor.current.destroy()
                refEditor.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (refContainer.current) {
            if (refEditor.current) {
                refEditor.current.destroy()
            }

            const content = { json: value }

            // Define custom styling function for the editor
            const getStyle = (path: string, value: any) => {
                if (diffPaths.length === 0 || mode !== "tree") return {}

                // Check if this path is in diffPaths
                const normalizedPath = path.replace(/\[(\d+)\]/g, ".$1") // Convert array notation to dot notation
                const isInDiff = diffPaths.some((diffPath) => {
                    return (
                        normalizedPath === diffPath ||
                        normalizedPath.startsWith(`${diffPath}.`) ||
                        diffPath.startsWith(`${normalizedPath}.`)
                    )
                })

                if (isInDiff) {
                    return {
                        value: {
                            color: "#e11d48",
                            fontWeight: "bold",
                            backgroundColor: "rgba(225, 29, 72, 0.1)",
                        },
                    }
                }

                return {}
            }

            refEditor.current = createJSONEditor({
                target: refContainer.current,
                props: {
                    content,
                    mode,
                    onChange: (updatedContent: any) => {
                        if (updatedContent.json !== undefined) {
                            onChange(updatedContent.json)
                        }
                    },
                    askToFormat: true,
                    navigationBar: true,
                    statusBar: true,
                    mainMenuBar: true,
                    readOnly: false,
                    getStyle,
                },
            })
        }
    }, [refContainer, value, onChange, mode, diffPaths, documentId])

    // Update the editor when mode changes
    useEffect(() => {
        if (refEditor.current) {
            refEditor.current.updateProps({
                mode,
            })
        }
    }, [mode])

    // Update styling when diffPaths change
    useEffect(() => {
        if (refEditor.current && mode === "tree") {
            refEditor.current.refresh()
        }
    }, [diffPaths, mode])

    return <div ref={refContainer} className="h-full w-full" />
}
