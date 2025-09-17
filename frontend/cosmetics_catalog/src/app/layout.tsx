import "./globals.css";
import { Header } from './components/header'
import { Cardo
} from "next/font/google";


const font = Cardo
({ subsets: ["latin"], weight: ["400"] });


import {Metadata} from "next"

export const metadata: Metadata ={
  title: "byrose.store",
  viewport: "width=device-width, initial-scale=1" 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={font.className}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
