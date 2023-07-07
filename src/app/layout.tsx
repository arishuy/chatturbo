'use client'
import './globals.css'
import { Poppins } from 'next/font/google'
import ThemeProvider from "../theme";
import * as React from "react";
import Layout from '@/layouts';
import { SessionProvider } from "next-auth/react";
import { usePathname } from 'next/navigation'
import { ProSidebarProvider } from "react-pro-sidebar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const poppins = Poppins({
  weight: "400",
  subsets: ['latin'],
  display: "swap",
});

export default function RootLayout({
  children, session
}: {
  children: React.ReactNode,
  session: any
}) {
  const pathname = usePathname();
  if (pathname === '/login' || pathname === '/register') {
    return (
      <html lang="en">
        <body className={poppins.className}>
          <SessionProvider session={session}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider>{children}</ThemeProvider>
            </LocalizationProvider>
          </SessionProvider>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className={poppins.className}>
          <SessionProvider session={session}>
            <ThemeProvider>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ProSidebarProvider>
                  <Layout>
                    {children}
                  </Layout>
              </ProSidebarProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
    );
  }
}
