import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {SiteHeader} from "@/components/custom/core/site-header";
import {SiteFooter} from "@/components/custom/core/site-footer";
import {ThemeProvider} from "@/components/theme/theme-provider";
import "../globals.css";
import {i18n} from "@/i18n/config";
import PagesTopLoaderProvider from "@/components/providers/pages-top-loader-provider";

export default async function LocaleLayout({
                                               children,
                                               params
                                           }: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}) {
    // Ensure that the incoming `locale` is valid
    const {locale} = await params;
    if (!hasLocale(i18n.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NextIntlClientProvider>
                        <PagesTopLoaderProvider>
                            <div className="flex flex-col min-h-screen">
                                <SiteHeader />
                                <div className="flex-grow">
                                    {children}
                                </div>
                                <SiteFooter />
                            </div>
                        </PagesTopLoaderProvider>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}