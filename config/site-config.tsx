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

export const toolsNavItems: ToolNavItem[] = [
    {
        label: "QR Code Generator",
        tLabel: "tools.qrCodeGenerator.label",
        description: "Create QR codes for URLs, text, phone numbers, and more.",
        tDescription: "tools.qrCodeGenerator.navDescription",
        featured: {
            href: "/qr-code-generator",
            label: "QR Tool Generator Suite",
            tLabel: "tools.qrCodeGenerator.subLabel",
            description: "Generate all types of QR codes in one place.",
            tDescription: "tools.qrCodeGenerator.subNavDescription",
            icon: "qr",
        },
        links: [
            {
                label: "URL",
                tLabel: "tools.qrCodeGenerator.url.label",
                href: "/qr-code-generator",
                description: "Generate QR codes for links.",
                tDescription: "tools.qrCodeGenerator.url.navDescription",
            },
            {
                label: "Text",
                tLabel: "tools.qrCodeGenerator.text.label",
                href: "/qr-code-generator/text",
                description: "Encode plain text into QR codes.",
                tDescription: "tools.qrCodeGenerator.text.navDescription",
            },
            {
                label: "Phone",
                tLabel: "tools.qrCodeGenerator.phone.label",
                href: "/qr-code-generator/phone",
                description: "Generate QR codes to dial a number.",
                tDescription: "tools.qrCodeGenerator.phone.navDescription",
            },
        ],
    },
    // Add more tools here...
];



export const navButtons = [
    // { href: '', icon: "calendar-check", target: "_blank", tooltip: "Schedule a call"  },
    { href: 'https://github.com/rivine-dev/rivine-tools', icon: "github", target: "_blank", tooltip: "Github"  },
    // { href: user.linkedIn, icon: "linkedin", target: "_blank" },
    //     tooltip: "linkedIn"}
]

export const footerMenuItems = [
    {
        title: "Site",
        links: [
            { label: "Home", tLabel: "general.home", href: "/" },
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

export const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL;

export const appName = process.env.APP_NAME || "Rivine Tools";