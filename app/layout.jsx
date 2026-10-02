import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import '@/Css/globals.css'
import { Inter } from 'next/font/google';

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
    return (
        <html lang="en">

{/*
    <body className={`${outfit.className} antialiased`}>
*/}

<body className={inter.className}  >
                    <Toaster />
                    {children}
            </body>
        </html>
    );
}
