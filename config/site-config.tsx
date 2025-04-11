import {LinkIcon, PhoneIcon, Type} from "lucide-react";
import {
    clock,
    general,
    passwordGenerator,
    qrCodeGenerator,
    qrCodePhone,
    qrCodeText,
    qrCodeUrl, textToHandwriting,
    timer
} from "@/config/i18n-constants";

interface ToolLink {
    href: string;
    label?: string;
    tLabel?: string;
    description?: string;
    tDescription?: string;
}

interface FeaturedTool {
    href?: string;
    label?: string;
    tLabel?: string;
    description?: string;
    tDescription?: string;
    icon?: string;
}

interface ToolNavItem {
    href?: string;
    label?: string;
    tLabel?: string;
    description?: string;
    tDescription?: string;
    featured?: FeaturedTool;
    links?: ToolLink[];
}

export const qrHomePath = "/qr-code-generator";
export const qrMenuItems = [
    {
        icon: LinkIcon,
        title: `${qrCodeUrl}.label`,
        href: `${qrHomePath}`,
    },
    {
        icon: Type,
        title: `${qrCodeText}.label`,
        href: `${qrHomePath}/text`,
    },
    {
        icon: PhoneIcon,
        title: `${qrCodePhone}.label`,
        href: `${qrHomePath}/phone`,
    },
]

export const passwordGeneratorPath = "/password-generator";

export const timerPath = "/timer";

export const toolsNavItems: ToolNavItem[] = [
    {
        label: "QR Code Generator",
        tLabel: `${qrCodeGenerator}.label`,
        description: "Create QR codes for URLs, text, phone numbers, and more.",
        tDescription: `${qrCodeGenerator}.navDescription`,
        featured: {
            href: qrHomePath,
            label: "QR Tool Generator Suite",
            tLabel: `${qrCodeGenerator}.subLabel`,
            description: "Generate all types of QR codes in one place.",
            tDescription: `${qrCodeGenerator}.subNavDescription`,
            icon: "qr",
        },
        links: [
            {
                label: "URL",
                tLabel: `${qrCodeUrl}.label`,
                href: qrHomePath,
                description: "Generate QR codes for links.",
                tDescription: `${qrCodeUrl}.navDescription`,
            },
            {
                label: "Text",
                tLabel: `${qrCodeText}.label`,
                href: `${qrHomePath}/text`,
                description: "Encode plain text into QR codes.",
                tDescription: `${qrCodeText}.navDescription`,
            },
            {
                label: "Phone",
                tLabel: `${qrCodePhone}.label`,
                href: `${qrHomePath}/phone`,
                description: "Generate QR codes to dial a number.",
                tDescription: `${qrCodePhone}.navDescription`,
            },
        ],
    },
    {
        label: "Password generator",
        tLabel: `${passwordGenerator}.label`,
        description: "Create secure passwords.",
        tDescription: `${passwordGenerator}.navDescription`,
        featured: {
            href: passwordGeneratorPath,
            label: "QR Tool Generator Suite",
            tLabel: `${passwordGenerator}.subLabel`,
            description: "Generate various passwords.",
            tDescription: `${passwordGenerator}.subNavDescription`,
            icon: "qr",
        },
        links: [
            {
                label: "Password Generator",
                tLabel: `${passwordGenerator}.label`,
                href: passwordGeneratorPath,
                description: "Generate QR codes for links.",
                tDescription: `${passwordGenerator}.navDescription`,
            },
        ],
    },
    {
        label: "Clock",
        tLabel: `${clock}.label`,
        description: "Clocks",
        tDescription: `${clock}.navDescription`,
        featured: {
            href: timerPath,
            label: "Clock Suite",
            tLabel: `${clock}.subLabel`,
            description: "clocks.",
            tDescription: `${clock}.subNavDescription`,
        },
        links: [
            {
                label: "Timer",
                tLabel: `${timer}.label`,
                href: timerPath,
                description: "clocks.",
                tDescription: `${timer}.navDescription`,
            },
        ],
    }
    // Add more tools here...
];



export const navButtons = [
    // { href: '', icon: "calendar-check", target: "_blank", tooltip: "Schedule a call"  },
    { href: 'https://github.com/rivine-dev/rivine-tools', icon: "github", target: "_blank", tooltip: "Github"  },
    // { href: user.linkedIn, icon: "linkedin", target: "_blank" },
    //     tooltip: "linkedIn"}
]

export const navLinks = [
    // { href: "/projects", label: "Projects" },
    // { href: "/blog", label: "Blog" },
    // { href: "/experience", label: "Experience" },
    // { href: "/about", label: "About", tLabel: "general.about" },
    // { href: "/contributions", label: "Contributions" },
    // { href: "/contact", label: "Contact" },
] satisfies {
    href: string;
    label?: string;
    tLabel?: string;
}[];

export const footerMenuItems = [
    {
        title: "Site",
        links: [
            { label: "Home", tLabel: `${general}.home`, href: "/" },
            ...navLinks
        ],
    },
    // {
    //     title: "Support me",
    //     links: [
    //         { href: user.buymecoffee, label: 'Buy me a coffee', blank: true },
    //     ],
    // },
    // {
    //     title: "Talk to me",
    //     links: [
    //         { href: user.cal, label: 'Schedule a call', blank: true  },
    //     ],
    // },
    // {
    //     title: "Social",
    //     links: [
    //         { href: user.instagram, label: 'Instagram', blank: true  },
    //         { href: user.github, label: 'Github', blank: true  },
    //         { href: user.linkedIn, label: 'Linkedin', blank: true  },
    //     ],
    // },
]

export const footerBottomLinks = [
    // { label: "Terms and Conditions", url: "http://www.example.com/terms-and-conditions" },
    // { label: "Privacy Policy", url: "#" },
]

export const publicUrl = process.env.PUBLIC_SITE_URL;

export const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL || "https://tools.rivine.dev";

export const appName = process.env.APP_NAME || "Rivine Tools";

export const toolsCards = [
    {
        title: `${qrCodeGenerator}.label`,
        description: `${qrCodeGenerator}.description`,
        isActive: true,
        link: `${qrHomePath}`,
    },
    {
        title: `${passwordGenerator}.label`,
        description: `${passwordGenerator}.description`,
        isActive: true,
        link: `${passwordGeneratorPath}`,
    },
    {
        title: `${timer}.label`,
        description: `${timer}.description`,
        isActive: true,
        link: "/timer",
    },
    {
        title: `${textToHandwriting}.label`,
        description: `${textToHandwriting}.description`,
        isActive: false,
        link: "/text-to-handwriting",
    },
];