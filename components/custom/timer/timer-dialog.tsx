"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Coffee, Brain } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {useTranslations} from "use-intl";
import {general, timer} from "@/config/i18n-constants";

interface TimerDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSetDuration: (minutes: number) => void
    currentDuration: number
}

interface PresetOption {
    name: string
    duration: number
    icon: React.ReactNode
    color: string
}

export function TimerDialog({ open, onOpenChange, onSetDuration, currentDuration }: TimerDialogProps) {
    // Convert minutes to hours, minutes, seconds
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const t = useTranslations()


    // Update time inputs when dialog opens with current duration
    useEffect(() => {
        if (open) {
            const totalSeconds = currentDuration * 60
            setHours(Math.floor(totalSeconds / 3600))
            setMinutes(Math.floor((totalSeconds % 3600) / 60))
            setSeconds(totalSeconds % 60)
        }
    }, [open, currentDuration])

    const presets: PresetOption[] = [
        {
            name: t(`${timer}.dialog.pomodoro`),
            duration: 25,
            icon: <Clock className="h-5 w-5" />,
            color: "bg-red-100 text-red-700 border-red-200",
        },
        {
            name: t(`${timer}.dialog.short`),
            duration: 5,
            icon: <Coffee className="h-5 w-5" />,
            color: "bg-green-100 text-green-700 border-green-200",
        },
        {
            name: t(`${timer}.dialog.focus`),
            duration: 50,
            icon: <Brain className="h-5 w-5" />,
            color: "bg-blue-100 text-blue-700 border-blue-200",
        },
    ]

    const handlePresetClick = (duration: number) => {
        setHours(0)
        setMinutes(duration)
        setSeconds(0)
    }

    const handleSave = () => {
        // Convert hours, minutes, seconds to total minutes
        const totalMinutes = hours * 60 + minutes + seconds / 60
        onSetDuration(totalMinutes)
    }

    // Input handlers with validation
    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value) || 0
        setHours(Math.max(0, Math.min(23, value)))
    }

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value) || 0
        setMinutes(Math.max(0, Math.min(59, value)))
    }

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value) || 0
        setSeconds(Math.max(0, Math.min(59, value)))
    }

    // Check if any time is set
    const isTimeSet = hours > 0 || minutes > 0 || seconds > 0

    // Check which preset is active
    const getActivePreset = () => {
        if (hours === 0 && seconds === 0) {
            return minutes
        }
        return -1
    }

    const activePreset = getActivePreset()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">{t(`${timer}.dialog.title`)},</DialogTitle>
                </DialogHeader>

                <div className="py-6 space-y-6">
                    {/* Presets */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">{t(`${timer}.dialog.presets`)}</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {presets.map((preset) => (
                                <motion.button
                                    key={preset.name}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handlePresetClick(preset.duration)}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-3 rounded-lg border",
                                        "transition-colors duration-200",
                                        preset.color,
                                        activePreset === preset.duration ? "ring-2 ring-offset-2 ring-primary" : "",
                                    )}
                                >
                                    {preset.icon}
                                    <span className="mt-1 text-xs font-medium">{preset.name}</span>
                                    <span className="text-xs opacity-70">{preset.duration}m</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Custom Duration */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium">{t(`${timer}.dialog.custom`)}</h3>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="hours">{t(`${timer}.dialog.hours`)}</Label>
                                <Input
                                    id="hours"
                                    type="number"
                                    min="0"
                                    max="23"
                                    value={hours}
                                    onChange={handleHoursChange}
                                    className="text-center"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="minutes">{t(`${timer}.dialog.min`)}</Label>
                                <Input
                                    id="minutes"
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={minutes}
                                    onChange={handleMinutesChange}
                                    className="text-center"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="seconds">{t(`${timer}.dialog.sec`)}</Label>
                                <Input
                                    id="seconds"
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={seconds}
                                    onChange={handleSecondsChange}
                                    className="text-center"
                                />
                            </div>
                        </div>

                        <div className="text-center text-sm">
                            {!isTimeSet && <p className="text-red-400">{t(`${timer}.dialog.error`)}</p>}
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex justify-between sm:justify-between">
                    <DialogClose asChild>
                        <Button variant="outline">{t(`${general}.cancel`)}</Button>
                    </DialogClose>
                    <Button onClick={handleSave} disabled={!isTimeSet}>
                        {t(`${general}.save`)}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
