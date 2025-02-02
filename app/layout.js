// We pass all the Providers from AuthProvider to this script
import { AuthProvider } from "./Providers"; // import from Providers the children from Authprovider
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "strMaps App",
  description: "Generated by STR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>  
      </body>
    </html>
  );
}
