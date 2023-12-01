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
  icons: {
    icon: "/C2G.png",
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
