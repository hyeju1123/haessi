import { Roboto_Slab } from "next/font/google";
import Github from "../../public/images/github.svg";
import Envelope from "../../public/images/envelope.svg";
import Copyright from "../../public/images/copyright.svg";
import { theme } from "../../colors";
import Link from "next/link";

const roboto = Roboto_Slab({ subsets: ["latin"] });

export default function Footer() {
  const {
    light: { text },
  } = theme;
  return (
    <footer
      className={`flex flex-col items-center justify-center p-8 border-t-2 border-solid border-tagBg ${roboto.className} text-text`}
    >
      <section className="flex mb-2">
        <Link href={"https://github.com/hyeju1123"}>
          <Github className="mx-2" width="26" height="26" fill={text} />
        </Link>
        <Envelope className="mx-2" width="24" height="26" fill={text} />
      </section>
      <section className="flex items-center">
        <Copyright className="mx-1" width="12" height="12" fill={text} />
        <p>23haessi · 2024</p>
      </section>
    </footer>
  );
}
