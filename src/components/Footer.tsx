import Link from "next/link";
import { Roboto_Slab } from "next/font/google";

import GithubIcon from "./icons/GithubIcon";
import EnvelopeIcon from "./icons/EnvelopeIcon";
import CopyrightIcon from "./icons/CopyrightIcon";

const roboto = Roboto_Slab({ subsets: ["latin"] });

export default function Footer() {
  return (
    <footer
      className={`flex flex-col items-center justify-center p-8 border-t-2 border-solid border-tagBg ${roboto.className} text-text`}
    >
      <section className="flex mb-2">
        <Link href={"https://github.com/hyeju1123"}>
          <GithubIcon />
        </Link>
        <EnvelopeIcon />
      </section>
      <section className="flex items-center">
        <CopyrightIcon />
        <p>23haessi · 2024</p>
      </section>
    </footer>
  );
}
