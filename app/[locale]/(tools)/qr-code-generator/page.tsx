import QrGenerator from "@/components/custom/qr-code/qr-generator";
import {Metadata, ResolvingMetadata} from "next";
import {appName, siteUrl} from "@/config/site-config";
import {getTranslations} from "next-intl/server";
import {getLocalizedPath} from "@/i18n/get-localized-path";

export default function QRCodeGenerator() {
  return (
      <QrGenerator type="url" initialValue={siteUrl}></QrGenerator>
  );
}

type PageProps = {
  params: Promise<{
    locale: string
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export const generateMetadata = async (
    props: PageProps,
): Promise<Metadata> => {
  const { locale } = await props.params
  const t = await getTranslations({ locale})
  const url = `${siteUrl}${getLocalizedPath({ slug: '', locale })}`

  return {
    title: `${appName} | ${t('tools.qrCodeGenerator.title')}`,
    description:
        t('tools.qrCodeGenerator.description'),
    keywords: Array.from({ length: 7 }, (_, i) => t(`tools.qrCodeGenerator.keywords.${i}`)),
    openGraph: {
      title: `${t('tools.qrCodeGenerator.url.title')} | Free QR Code Generator`,
      description: t('tools.qrCodeGenerator.url.description'),
      url: `${url}/qr-code-generator`,
      siteName: appName,
      images: [
        {
          url: `${siteUrl}/logo/logo-stone.png`, // Replace with your OG image URL
          width: 1200,
          height: 630,
          alt: t('tools.qrCodeGenerator.title'),
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('tools.qrCodeGenerator.url.title'),
      description:
          t('tools.qrCodeGenerator.url.description'),
      images: [`${siteUrl}/logo/logo-stone.png`],
    },
  };
};