import "@/styles/globals.css";

import clsx from "clsx";
import { Metadata } from "next";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "teal-dark",
            themes: ["light", "dark", "teal-light", "teal-dark"],
          }}
        >
          <div className="relative flex flex-col h-screen">
            <main className="flex-grow">{children}</main>
          </div>
        </Providers>

        <Toaster />
      </body>
    </html>
  );
}
