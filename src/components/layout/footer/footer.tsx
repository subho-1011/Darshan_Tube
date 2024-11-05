import Link from "next/link";
import { HelpCircleIcon } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-background pb-16 md:pb-4 flex w-full border-t py-4 mt-auto">
            <div className="container mx-auto px-4 md:ml-64">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} DarshanTube. All rights reserved.
                        </p>
                    </div>
                    <nav className="flex space-x-4">
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                            Privacy Policy
                        </Link>
                        <Link
                            href="/help-and-support"
                            className="text-sm text-muted-foreground hover:text-foreground flex items-center"
                        >
                            <HelpCircleIcon className="mr-1 h-4 w-4" />
                            Help and Support
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
