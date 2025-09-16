import "./globals.css";
import { Header } from './components/header'
import { Cardo} from "next/font/google";

const cardo = Cardo({ subsets: ["latin"], weight: ["400", "700"] });


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
      <body className={cardo.className}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
