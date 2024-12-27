import { Poppins, Inika } from "next/font/google";

import "./globals.css";
import Nav from "@/components/Nav";
import MobileNav from "../components/MobileNav.jsx";
const bree_Serif = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-bree_serif",
});
export const rubik = Inika({
  subsets: ["latin"],
  weight: [ "400", "700"],

  display: "swap",
  variable: "--font-rubik",
});

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

          <main className="py-10 sm:ml-60 ">
            <div className=" sm:ml-20">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
