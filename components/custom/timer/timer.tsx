"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw, Settings } from "lucide-react"
import { TimerDialog } from "./timer-dialog"
import { Button } from "@/components/ui/button"
import { formatTime } from "@/lib/utils"
import { timer } from "@/config/i18n-constants";
import {useTranslations} from "use-intl";
// import { useToast } from "@/hooks/use-toast"

export function Timer() {
    const [duration, setDuration] = useState(5 * 60) // Default 25 minutes
    const [timeLeft, setTimeLeft] = useState(duration)
    const [isRunning, setIsRunning] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const t = useTranslations()
    // const { toast } = useToast()

    // Calculate progress percentage
    const progress = (timeLeft / duration) * 100

    // Calculate the circumference of the circle
    const radius = 45
    const circumference = 2 * Math.PI * radius

    // Calculate the stroke offset based on progress
    const strokeOffset = circumference - (circumference * progress) / 100

    // Initialize audio element
    useEffect(() => {
        audioRef.current = new Audio("/audio/ring/clock-basic.mp3")
        audioRef.current.loop = true // Set audio to loop infinitely

        return () => {
            // Cleanup function to stop and release audio when component unmounts
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
            }
        }
    }, [])

    // Handle timer completion
    useEffect(() => {
        if (timeLeft === 0 && isRunning) {
            setIsRunning(false)
            // toast({
            //     title: "Timer Complete!",
            //     description: "Your timer has finished.",
            //     duration: 5000,
            // })

            // Play sound when timer completes (will loop infinitely)
            if (audioRef.current) {
                audioRef.current.play().catch((err) => console.error("Failed to play sound:", err))
            }
        }
    }, [timeLeft, isRunning])

    // Timer logic
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
            }, 1000)
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isRunning])

    // Handle timer controls
    const toggleTimer = () => setIsRunning((prev) => !prev)

    const resetTimer = () => {
        setIsRunning(false)
        setTimeLeft(duration)

        // Stop the sound when reset button is clicked
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }
    }

    const handleSetDuration = (minutes: number) => {
        // Convert to seconds, rounding to nearest second
        const newDuration = Math.round(minutes * 60)
        setDuration(newDuration)
        setTimeLeft(newDuration)
        setIsRunning(false)
        setDialogOpen(false)

        // Stop the sound when changing timer duration
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }
    }

    return (
        <div className="flex flex-col items-center space-y-14">
            <h2 className="text-xl font-bold text-center">{t(`${timer}.label`)}</h2>
            {/* Timer Circle */}
            <div className="relative w-64 h-64">
                {/* Background Circle */}
                <div className="w-full h-full">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="8"
                        />
                    </svg>
                </div>

                {/* Progress Circle */}
                <div className="absolute top-0 left-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeOffset}
                            style={{
                                transition: 'stroke-dashoffset 0.5s ease-in-out'
                            }}
                        />
                    </svg>
                </div>

                {/* Time Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            animate={{ opacity: 1, scale: 1 }}
                            initial={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className="text-4xl font-bold"
                        >
                            {formatTime(timeLeft)}
                        </motion.div>
                    </AnimatePresence>

                    <motion.div className="text-sm mt-2" animate={{ opacity: isRunning ? 1 : 0.7 }}>
                        {isRunning ? t(`${timer}.page.running`) : t(`${timer}.page.paused`)}
                    </motion.div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={resetTimer}
                    disabled={timeLeft === duration && !isRunning}
                    className="rounded-full h-12 w-12"
                >
                    <RotateCcw className="h-5 w-5" />
                </Button>

                <Button variant="default" size="icon" onClick={toggleTimer} className="rounded-full h-16 w-16 shadow-lg">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isRunning ? "pause" : "play"}
                            initial={{ opacity: 0, rotate: -30 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 30 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                        </motion.div>
                    </AnimatePresence>
                </Button>

                <Button variant="outline" size="icon" onClick={() => setDialogOpen(true)} className="rounded-full h-12 w-12">
                    <Settings className="h-5 w-5" />
                </Button>
            </div>

            {/* Timer Settings Dialog */}
            <TimerDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSetDuration={handleSetDuration}
                currentDuration={duration / 60}
            />
        </div>
    )
}