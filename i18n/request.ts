import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {i18n} from "@/i18n/config";

export default getRequestConfig(async ({requestLocale}) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(i18n.locales, requested)
        ? requested
        : i18n.defaultLocale;

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
    };
});