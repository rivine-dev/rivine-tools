export const navLinks = [
    // { href: "/projects", label: "Projects" },
    // { href: "/blog", label: "Blog" },
    // { href: "/experience", label: "Experience" },
    { href: "/about", label: "About" },
    // { href: "/contributions", label: "Contributions" },
    // { href: "/contact", label: "Contact" },
] satisfies {
    href: string;
    label: string;
}[];

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
            { label: "Home", href: "/" },
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