import QrGenerator from "@/components/custom/qr-code/qr-generator";
import {Metadata} from "next";
import {appName, siteUrl} from "@/config/site-config";

export default function QRCodeGenerator() {
  return (
      <QrGenerator type="url" initialValue={siteUrl}></QrGenerator>
  );
}

export const generateMetadata = (): Metadata => {
  return {
    title: `${appName} | QR Code Generator`,
    description:
        "Generate QR codes instantly with our free online QR code generator. Customize with colors, logos, and high-quality downloads.",
    keywords: [
      "QR Code Generator",
      "Free QR Code Maker",
      "Custom QR Code",
      "Create QR Code",
      "Generate QR Code",
      "URL QR Code",
      "Generate QR Code Online",
    ],
    openGraph: {
      title: "Free QR Code Generator | Generate Custom QR Codes Online",
      description:
          "Easily generate and customize QR codes for URLs, websites, and links. Ideal for sharing online content," +
          " directing traffic, or enhancing print materials. Fast, free, and no signup required.",
      url: `${siteUrl}/qr-code-generator`,
      siteName: appName,
      images: [
        {
          url: `${siteUrl}/logo/logo-stone.png`, // Replace with your OG image URL
          width: 1200,
          height: 630,
          alt: "Free QR Code Generator",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Free QR Code Generator - Create QR Codes Instantly",
      description:
          "Generate custom QR codes online for free. Download high-quality QR codes for websites, businesses, and more.",
      images: [`${siteUrl}/logo/logo-stone.png`],
    },
  };
};