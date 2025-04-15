import type { MetadataRoute } from "next";
import {siteUrl} from "@/config/site-config";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}