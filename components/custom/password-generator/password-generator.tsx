"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Copy, RefreshCcw } from 'lucide-react';
import {CopyButton} from "@/components/ui/copy-button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useTranslations} from "use-intl";
import {passwordGenerator} from "@/config/i18n-constants";

interface PasswordOptions {
    uppercase: boolean,
    lowercase: boolean,
    numbers: boolean,
    symbols: boolean,
}

const generatePassword = (length: number, options: PasswordOptions) => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let chars = '';

    if (options.uppercase) chars += upper;
    if (options.lowercase) chars += lower;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    if (!chars) return '';

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

const getStrength = (password: string) => {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (password.length >= 12 && strength >= 3) return 'strong';
    if (password.length >= 8 && strength >= 2) return 'moderate';
    return 'weak';
};

export default function PasswordGenerator() {
    const [length, setLength] = useState(9);
    const [options, setOptions] = useState<PasswordOptions>({
        uppercase: true,
        lowercase: false,
        numbers: true,
        symbols: true,
    });
    const [password, setPassword] = useState(generatePassword(length, options));
    const t = useTranslations()

    const optionKeys: (keyof PasswordOptions)[] = ['uppercase', 'lowercase', 'numbers', 'symbols'];

    const regenerate = () => {
        setPassword(generatePassword(length, options));
    };

    return (
        <div>
            <h2 className="text-xl font-bold text-center">{t(`${passwordGenerator}.label`)}</h2>
            <p className="text-center text-sm text-muted-foreground">{t(`${passwordGenerator}.page.description`)}</p>
            <div className="flex items-center py-4 space-x-2">
                <Input value={password} readOnly className="flex-1" />
                <CopyButton value={password}></CopyButton>
                <Tooltip delayDuration={500}>
                    <TooltipTrigger asChild>
                        <Button size="icon" variant="outline" onClick={regenerate}><RefreshCcw size={16} /></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{t(`${passwordGenerator}.page.generatePwd`)}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <div className="text-center text-sm text-yellow-600">
                <strong>{t(`${passwordGenerator}.page.${getStrength(password)}.label`)}:</strong> {t(`${passwordGenerator}.page.${getStrength(password)}.message`)}
            </div>
            <div className="py-4">
                <label className="block font-medium pb-2">{t(`${passwordGenerator}.page.pwLength`)}: {length}</label>
                <Slider
                    min={4}
                    max={100}
                    value={[length]}
                    onValueChange={([val]) => {
                        setLength(val);
                        setPassword(generatePassword(val, options));
                    }}
                />
            </div>
            <div className="py-4">
                {optionKeys.map((key) => (
                    <div key={key} className="flex items-center justify-between py-2">
                        <span>{t(`${passwordGenerator}.page.form.${key}`)}</span>
                        <Switch
                            checked={options[key]}
                            onCheckedChange={(checked) => {
                                const newOptions = { ...options, [key]: checked };
                                setOptions(newOptions);
                                setPassword(generatePassword(length, newOptions));
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
