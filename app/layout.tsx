import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DELITE | Wear Your Mindset.",
  description: "Motivational performance apparel designed as a personal reminder.",
  openGraph: { title: "DELITE | Wear Your Mindset.", description: "More than what you wear.", type: "website" },
  icons: { icon: "/icon.svg" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
