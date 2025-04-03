import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="relative flex h-40 items-center justify-center">
                        <span className="absolute text-9xl font-extrabold opacity-10">404</span>
                        <CardTitle className="relative text-5xl font-bold">404</CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="text-center space-y-4">
                    <h2 className="text-xl font-semibold">Page Not Found</h2>
                    <p className="opacity-75">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="outline" asChild>
                        <Link href="javascript:history.back()">Go Back</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/">Go Home</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}