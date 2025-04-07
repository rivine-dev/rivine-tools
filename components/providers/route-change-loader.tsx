'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLoadingBar } from 'react-top-loading-bar';

export default function RouteChangeLoader({ color }: { color: string }) {
    const pathname = usePathname();
    const previousPath = useRef(pathname);
    const isNavigating = useRef(false);

    const { start, complete } = useLoadingBar({
        color,
        height: 2,
    });

    useEffect(() => {
        const handleLinkClick = (event: MouseEvent) => {
            const link = (event.target as HTMLElement)?.closest('a');
            if (!link) return;

            if (
                link.target === '_blank' ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) return;

            const url = new URL(link.href, window.location.href);
            const isInternal = url.origin === window.location.origin;

            if (isInternal && url.pathname !== window.location.pathname) {
                start();
                isNavigating.current = true;
            }
        };

        document.addEventListener('click', handleLinkClick, { capture: true });
        return () => document.removeEventListener('click', handleLinkClick, { capture: true });
    }, [start]);

    useEffect(() => {
        if (isNavigating.current && previousPath.current !== pathname) {
            isNavigating.current = false;
            previousPath.current = pathname;
            complete();
        }
    }, [pathname, complete]);

    return null;
}
