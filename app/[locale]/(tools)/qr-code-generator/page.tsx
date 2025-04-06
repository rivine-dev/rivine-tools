import QrGenerator from "@/components/custom/qr-code/qr-generator";
import {Metadata} from "next";
import {appName, qrHomePath, siteUrl} from "@/config/site-config";
import {getTranslations} from "next-intl/server";
import {getLocalizedPath} from "@/i18n/get-localized-path";
import {qrCodeGenerator, qrCodeUrl} from "@/config/i18n-constants";

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
    title: `${appName} | ${t(`${qrCodeGenerator}.title`)}`,
    description:
        t(`${qrCodeGenerator}.description`),
    keywords: Array.from({ length: 7 }, (_, i) => t(`${qrCodeGenerator}.keywords.${i}`)),
    openGraph: {
      title: `${t(`${qrCodeUrl}.title`)} | Free QR Code Generator`,
      description: t(`${qrCodeUrl}.description`),
      url: `${url}${qrHomePath}`,
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
      title: t(`${qrCodeUrl}.title`),
      description:
          t(`${qrCodeUrl}.description`),
      images: [`${siteUrl}/logo/logo-stone.png`],
    },
  };
};