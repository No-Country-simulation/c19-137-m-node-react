import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import { GraphQlApolloProvider } from "@/context/GraphQlApolloProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ThemeProvider } from "@/context/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Talks",
  description: "Book Talks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <SessionAuthProvider session={session}>
      <html lang="es" className='dark:bg-black dark:text-white'>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system">
          <GraphQlApolloProvider>{children}</GraphQlApolloProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </SessionAuthProvider>
  );
}
