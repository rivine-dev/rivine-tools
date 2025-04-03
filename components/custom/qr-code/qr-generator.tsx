"use client";

import { Input } from "@/components/ui/input";
import QRCodeCanvas from "@/components/custom/qr-code/qr-canvas";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

type QrGeneratorProps = {
    type: "url" | "text" | "phone";
    initialValue?: string;
    onChange?: (value: string) => void;
};

export default function QrGenerator({ type = "url", initialValue = "", onChange }: QrGeneratorProps) {
    const [input, setInput] = useState<string>(initialValue);

    useEffect(() => {
        setInput(initialValue);
    }, [initialValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value;

        // Ensure valid phone number format for "phone" type
        if (type === "phone") {
            newValue = newValue.replace(/[^0-9+]/g, ""); // Remove non-numeric and non-`+` characters
        }

        setInput(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className="flex min-h-[500px] flex-col md:flex-row">
            <InputSection type={type} input={input} handleInputChange={handleInputChange} />
            <QRCodeSection type={type} input={input} />
        </div>
    );
}

type InputSectionProps = {
    type: "url" | "text" | "phone";
    input: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputSection({ type, input, handleInputChange }: InputSectionProps) {
    const placeholderText =
        type === "text" ? "Enter your text here" : type === "phone" ? "Enter your phone number here" : "Enter your website URL here";

    return (
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <h2 className="mb-2 text-xl font-light">{placeholderText}</h2>
            <p className="mb-4 text-sm">Your QR Code will be generated automatically</p>
            <Input
                value={input}
                onChange={handleInputChange}
                placeholder={type === "text" ? "Text" : type === "phone" ? "+1234567890" : "URL"}
                className="mb-4 max-w-md text-center"
            />
        </div>
    );
}

type QRCodeSectionProps = {
    type: "url" | "text" | "phone";
    input: string;
};

function QRCodeSection({ type, input }: QRCodeSectionProps) {
    // Convert phone number to `tel:` format
    const qrData = type === "phone" ? `tel:${input}` : input;

    return (
        <div className="p-2">
            <div className="space-y-4 h-[100%]">
                <Card className="h-[100%] p-4 min-w-[20rem]">
                    <QRCodeCanvas url={qrData} />
                </Card>
            </div>
        </div>
    );
}
