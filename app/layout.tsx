
import type { Metadata } from "next";
import { Geist, Geist_Mono, Patrick_Hand, Pixelify_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LogoLoader from "@/components/LogoLoader";
import FloatingNav from "@/components/FloatingNav";
import GradualBlur from "@/components/GradualBlur";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  weight: "400",
  variable: "--font-patrick-hand",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Nazyx | Portfolio",
  description: "Portfolio of Nazyx - Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Arya:wght@400;700&family=Cactus+Classical+Serif&family=Noto+Kufi+Arabic:wght@100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Patrick+Hand&family=Pixelify+Sans:wght@400..700&family=Zalando+Sans+SemiExpanded:ital,wght@0,200..900;1,200..900&family=Amiri:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${patrickHand.variable} ${pixelifySans.variable} ${notoSerif.variable} antialiased bg-white dark:bg-black text-black dark:text-white min-h-screen w-screen flex overflow-hidden transition-colors duration-300`}
      >
        <LogoLoader />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <main className="w-screen h-screen bg-white dark:bg-black">
            <div className="h-full w-full">
              {children}
            </div>
          </main>

          {/* Floating Dock Navigation */}
          <GradualBlur
            target="page"
            position="bottom"
            height="6rem"
            strength={2}
            divCount={5}
            curve="bezier"
            exponential={true}
            opacity={1}
            zIndex={-60}
          />
          <FloatingNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
