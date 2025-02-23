import Header from "@/components/header";
import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import "./globals.css";
import PageWrapper from "@/components/pageWrapper";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <Header />
          <PageWrapper>{children}</PageWrapper>
        </Provider>
      </body>
    </html>
  );
}
