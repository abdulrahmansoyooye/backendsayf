import { Poppins, Rubik } from "next/font/google";

import "./globals.css";
import Nav from "@/components/Nav";
import MobileNav from "../components/MobileNav.jsx";
const bree_Serif = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-bree_serif",
});
export const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "600", "500", "700", "800"],

  display: "swap",
  variable: "--font-rubik",
});
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
export const metadata = {
  title: "Sayf Admin Dashboard",
  description: "Manage,Control your data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={`${rubik.variable} ${bree_Serif.variable}`}>
        <div>
          <MobileNav />
          <div className="">
            {" "}
            <Nav />
          </div>

          <main className="py-10">
            <div className="px-4 ">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
