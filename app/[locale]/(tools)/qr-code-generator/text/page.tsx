import QrGenerator from "@/components/custom/qr-code/qr-generator";
import { Metadata } from "next";
import { appName, qrHomePath, siteUrl } from "@/config/site-config";
import { getTranslations } from "next-intl/server";
import { getLocalizedPath } from "@/i18n/get-localized-path";
import { qrCodeGenerator, qrCodePhone, qrCodeText } from "@/config/i18n-constants";
import JsonLd from "@/components/custom/core/json-ld";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>; // Optional, as it's not used
};

export default async function QRCodeGenerator({ params }: PageProps) {
  const resolvedParams = await params; // Await the Promise
  const { locale } = resolvedParams; // Extract locale from resolved params
  const t = await getTranslations({ locale });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t(`${qrCodeGenerator}.label`),
    url: `${siteUrl}${getLocalizedPath({ slug: `${qrHomePath}/text`, locale })}`,
    applicationCategory: "Utility",
    operatingSystem: "All",
    description: t(`${qrCodeText}.description`),
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: appName,
      url: siteUrl,
    },
  };

  return (
      <>
        <JsonLd data={jsonLd} />
        <QrGenerator type="text" initialValue="Hello"></QrGenerator>
      </>
  );
}

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const resolvedParams = await props.params; // Await the Promise
  const { locale } = resolvedParams; // Extract locale from resolved params
  const t = await getTranslations({ locale });
  const url = `${siteUrl}${getLocalizedPath({ slug: "", locale })}`;

  return {
    title: `${appName} | ${t(`${qrCodeGenerator}.title`)}`,
    description: t(`${qrCodeGenerator}.description`),
    keywords: Array.from({ length: 7 }, (_, i) => t(`${qrCodeGenerator}.keywords.${i}`)),
    openGraph: {
      title: `${t(`${qrCodeText}.title`)} | Free QR Code Generator`,
      description: t(`${qrCodeText}.description`),
      url: `${url}${qrHomePath}/text`,
      siteName: appName,
      images: [
        {
          url: `${siteUrl}/logo/logo-stone.png`, // Replace with your OG image URL
          width: 1200,
          height: 630,
          alt: t(`${qrCodeGenerator}.title`),
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t(`${qrCodeText}.title`),
      description: t(`${qrCodeText}.description`),
      images: [`${siteUrl}/logo/logo-stone.png`],
    },
  };
};