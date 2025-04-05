import {i18n} from "@/i18n/config";

type LocalizedDocument = {
    slug: string
    locale: string
}

export const getLocalizedPath = (doc: LocalizedDocument) => {
    const locale = doc.locale

    const localePath = locale === i18n.defaultLocale ? '' : `/${locale}`

    return `${localePath}${doc.slug}`
}

export const getNonLocalizedSlug = (localizedSlug: string) => {
    const segments = localizedSlug.split('/').filter(Boolean) // remove empty segments
    const firstSegment = segments[0]

    // If the first segment is a locale and it's not the default, remove it
    if (i18n.locales.includes(firstSegment) && firstSegment !== i18n.defaultLocale) {
        return '/' + segments.slice(1).join('/')
    }

    // Otherwise, return as-is
    return localizedSlug
}