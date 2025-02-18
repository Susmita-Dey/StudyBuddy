import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StudyBuddy - Your study companion",
  description: "A platform to help you gain knowledge and ace your exams.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header />
            <main>{children}</main>
            <Toaster />
            {/* footer */}
            <footer className="bg-muted/50 py-4 relative bottom-0 w-full">
              <div className="container mx-auto text-center text-gray-200 px-4">
                <p>
                  © {new Date().getFullYear()} StudyBuddy. Built with ❤ by
                  Susmita Dey.
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
