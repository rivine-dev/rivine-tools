'use client';

import { LoadingBarContainer } from 'react-top-loading-bar';
import RouteChangeLoader from "@/components/providers/route-change-loader";
import { useEffect, useState } from "react";

export default function PagesTopLoader() {
    const [primaryColor, setPrimaryColor] = useState<string | null>(null);

    useEffect(() => {
        const cssPrimary = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary')
            .trim();
        setPrimaryColor(cssPrimary || '#938e8e'); // fallback
    }, []);

    if (!primaryColor) return null; // wait for color before rendering container

    return (
        <LoadingBarContainer>
            <RouteChangeLoader color={primaryColor} />
        </LoadingBarContainer>
    );
}
