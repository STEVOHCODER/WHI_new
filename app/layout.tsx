import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatbotShell from "@/components/chatbot/ChatbotShell";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://whi-sl.org"),
  title: {
    default: "Women's Health Initiative (WHI-SL) | Sierra Leone",
    template: "%s | WHI-SL",
  },
  description:
    "WHI-SL is a community-based organisation dedicated to empowering vulnerable young people and communities in Sierra Leone through health, gender equity, human rights, and research.",
  keywords: [
    "WHI-SL",
    "Women's Health Initiative",
    "Sierra Leone",
    "community health",
    "gender empowerment",
    "human rights",
    "Bo City",
    "nonprofit Sierra Leone",
  ],
  icons: {
    icon: "/site-icon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://whi-sl.org",
    siteName: "Women's Health Initiative - Sierra Leone",
    title: "Women's Health Initiative (WHI-SL) | Sierra Leone",
    description:
      "Empowering communities. Improving health. Creating opportunities in Sierra Leone since 2010.",
    images: [
      {
        url: "/images/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Women's Health Initiative Sierra Leone logo and brand preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Women's Health Initiative (WHI-SL)",
    description:
      "Community-based health and empowerment organisation in Sierra Leone.",
    images: ["/images/og-default.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth`}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatbotShell />
      </body>
    </html>
  );
}
