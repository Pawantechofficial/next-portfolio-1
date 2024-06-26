import ReduxProvider from "../provider/redux/ReduxProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import MainLayout from "../layout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pawan Rai",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <MainLayout>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </MainLayout>
    </ReduxProvider>
  );
}
