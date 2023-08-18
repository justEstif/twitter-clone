import { NavBar } from "@/components/organisms/nav-bar";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Supabase + Next",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="container flex flex-col m-auto max-w-2xl min-h-screen">
        <NavBar />
        <main className="flex-1">{children}</main>
        <footer className="p-4 footer footer-center text-base-content">
          <div>
            <p>github.com/justEstif</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
