"use client";

import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {Ban, Loader2} from "lucide-react";
import {useTranslations} from "use-intl";
import {general} from "@/config/i18n-constants";

type QRCodeCanvasProps = {
    url?: string;
    fileExt?: "png" | "jpeg" | "webp";
    dotType?: "square" | "dots" | "rounded";
    dotColor?: string;
    cornerType?: "square" | "dot" | "extra-rounded";
    cornerColor?: string;
    bgColor?: string;
    errorCorrection?: "L" | "M" | "Q" | "H";
    image?: string | null;
    onDownload?: () => void;
};

export default function QRCodeCanvas({
                                         url = "https://tools.rivine.dev",
                                         dotType = "square",
                                         dotColor = "#000000",
                                         cornerType = "square",
                                         cornerColor = "#000000",
                                         bgColor = "#ffffff",
                                         errorCorrection = "M",
                                         image = null,
                                         onDownload,
                                     }: QRCodeCanvasProps) {
    const qrRef = useRef<HTMLDivElement | null>(null);
    const qrCode = useRef<QRCodeStyling | null>(null);
    const [fileType, setFileType] = useState<"png" | "jpeg">("png");
    const [loading, setLoading] = useState(true);
    const t = useTranslations()

    useEffect(() => {
        if (!url) {
            setLoading(false);
            return;
        }

        setLoading(true);

        qrCode.current = new QRCodeStyling({
            width: 300,
            height: 300,
            margin: 2,
            data: url,
            qrOptions: {
                errorCorrectionLevel: errorCorrection,
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 1,
                imageSize: 0.4,
                hideBackgroundDots: true,
            },
            dotsOptions: {
                color: dotColor,
                type: dotType,
            },
            cornersSquareOptions: {
                type: cornerType,
                color: cornerColor,
            },
            backgroundOptions: {
                color: bgColor,
            },
            image: image || undefined,
        });

        if (qrRef.current && qrCode.current) {
            qrCode.current.append(qrRef.current);
        }

        setTimeout(() => setLoading(false), 500); // Simulate loading effect
    }, []);

    useEffect(() => {
        if (!qrCode.current) return;

        if (!url) {
            // Clear the QR code when URL is empty
            if (qrRef.current) qrRef.current.innerHTML = "";
            setLoading(false);
            return;
        }

        setLoading(true);
        qrCode.current.update({
            data: url,
            qrOptions: { errorCorrectionLevel: errorCorrection },
            dotsOptions: { color: dotColor, type: dotType },
            cornersSquareOptions: { type: cornerType, color: cornerColor },
            backgroundOptions: { color: bgColor },
            image: image || undefined,
        });

        setTimeout(() => setLoading(false), 100);
    }, [url, errorCorrection, dotType, dotColor, cornerType, cornerColor, bgColor, image]);

    const onDownloadClick = () => {
        if (qrCode.current && url) {
            qrCode.current.download({ extension: fileType });
            if (onDownload) {
                onDownload();
            }
        }
    };

    return (
        <div className="flex flex-col items-center">
            {/* Wrapper to contain the QR code */}
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
                {/* Static QR Code container */}
                <div ref={qrRef} className="absolute w-full h-full" />

                {/* Loading spinner overlay */}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
                        <Loader2 className="animate-spin" size={40} />
                    </div>
                )}

                {/* Empty state when URL is missing */}
                {!url && !loading && (
                    <Card className="absolute inset-0 flex items-center justify-center">
                        <Ban className="size-10" color="red"/>
                    </Card>
                )}
            </div>

            <div className="py-4 flex justify-between items-center w-[100%]">
                <Select value={fileType} onValueChange={(e) => setFileType(e as "png" | "jpeg")}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="File Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>File Type</SelectLabel>
                            <SelectItem value="png">PNG</SelectItem>
                            <SelectItem value="jpeg">JPEG</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button onClick={onDownloadClick} disabled={!url}>{t(`${general}.download`)}</Button>
            </div>
        </div>
    );
}
