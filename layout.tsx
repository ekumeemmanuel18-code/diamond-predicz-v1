import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DIAMOND PREDICZ 💎 | Football Intelligence",
  description: "Football statistics, mathematical predictions and match analysis.",
  manifest: "/manifest.webmanifest",
  themeColor: "#07111f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
