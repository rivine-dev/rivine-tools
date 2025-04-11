import {Card, CardContent} from "@/components/ui/card";
import {QrMenu} from "@/components/custom/qr-code/qr-menu";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="container mx-auto p-4 md:p-8">
                <Card className="overflow-hidden backdrop-blur-sm">
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
