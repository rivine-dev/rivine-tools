import Image from "next/image"

export default function Logo() {
    return (
        <div className="flex row items-center justify-center">
            <Image
                className="dark:invert"
                src={"/logo/logo.png"}
                alt="Logo"
                width={30}
                height={30}
                priority
            />
            <span className="pl-2 font-semibold">Rivine</span>
        </div>
    )
}