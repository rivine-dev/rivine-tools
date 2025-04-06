"use client";
import React from "react";
import {Spotlight} from "@/components/ui/spotlight";
import {appName} from "@/config/site-config";
import {HoverBorderGradient} from "@/components/ui/hover-border-gradient";
import {HoverEffect} from "@/components/ui/card-hover-effect";
import Link from "next/link";

export default function Home() {
    return (
        <div className="relative z-0 -mt-20">
            <div className="h-[90vh] w-full rounded-md flex items-center justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
                <Spotlight />
                <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20">
                    <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b
                    from-neutral-800 to-neutral-400
                     dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50">
                        {appName}
                    </h1>
                    <p className="mt-4 font-normal text-base dark:text-neutral-300 max-w-lg text-center mx-auto">
                        A growing suite of fast, reliable tools
                    </p>
                    <p className="mt-4 font-normal text-base dark:text-neutral-300 max-w-lg text-center mx-auto">
                        Built for simplicity and performance. New tools are added regularly to help users stay
                        productive and get things done—without distractions or clutter
                    </p>
                    <div className="mt-4 flex justify-center text-center">
                        <HoverBorderGradient containerClassName="rounded-full" className="flex items-center space-x-2">
                            <Link href="#tools" scroll={true}>
                                <span className="block px-4 py-2">Explore Tools</span>
                            </Link>
                        </HoverBorderGradient>
                    </div>
                </div>
            </div>

            <div id="tools" className="py-20">
                <div className="max-w-5xl mx-auto px-8">
                    <HoverEffect items={projects} />
                </div>
            </div>
        </div>
    );
}

const projects = [
    {
        title: "Stripe",
        description:
            "A technology company that builds economic infrastructure for the internet.",
        link: "https://stripe.com",
    },
    {
        title: "Netflix",
        description:
            "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
        link: "https://netflix.com",
    },
];