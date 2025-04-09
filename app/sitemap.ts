import type { MetadataRoute } from 'next'
import {passwordGeneratorPath, qrHomePath, siteUrl} from '@/config/site-config'
import {supportedLanguages} from "@/i18n/config";

const getAlternates = (basePath: string) => ({
    languages: Object.fromEntries(
        supportedLanguages
            .filter((lang) => !lang.default) // skip default
            .map((lang) => [lang.code, `${siteUrl}/${lang.code}${basePath}`])
    ),
})

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: siteUrl,
            lastModified: new Date(),
            alternates: getAlternates(''),
        },
        {
            url: `${siteUrl}${qrHomePath}`,
            lastModified: new Date(),
            alternates: getAlternates(qrHomePath),
        },
        {
            url: `${siteUrl}${qrHomePath}/phone`,
            lastModified: new Date(),
            alternates: getAlternates(`${qrHomePath}/phone`),
        },
        {
            url: `${siteUrl}${qrHomePath}/text`,
            lastModified: new Date(),
            alternates: getAlternates(`${qrHomePath}/text`),
        },
        {
            url: `${siteUrl}${passwordGeneratorPath}`,
            lastModified: new Date(),
            alternates: getAlternates(passwordGeneratorPath),
        },
    ]
}
