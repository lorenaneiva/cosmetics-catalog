import "./globals.css";
import { Header } from './components/header'
import { Inter, Cardo } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const cardo = Cardo({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = { viewport: "width=device-width, initial-scale=1" };

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
