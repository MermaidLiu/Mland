import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mland - 企业级 AI 智能体解决方案市场",
    template: "%s | Mland",
  },
  description:
    "将复杂的 AI 智能体和行业应用打包成开箱即用的解决方案。已服务长庚医院、航天中心医院，支持私有化部署。",
  keywords: [
    "AI 智能体",
    "私有化部署",
    "医疗 AI",
    "医院信息化",
    "Mland",
    "开源解决方案",
  ],
  openGraph: {
    title: "Mland - 企业级 AI 智能体解决方案市场",
    description: "让每个行业，都拥有专属的 AI 大脑",
    siteName: "Mland",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
