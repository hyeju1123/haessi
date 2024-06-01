import { Roboto_Slab } from "next/font/google";
import Link from "next/link";
import Moon from "../../public/images/moon.svg";
import { theme } from "../../colors";

const roboto = Roboto_Slab({ subsets: ["latin"] });
const {
  light: { text },
} = theme;

export default function Header() {
  return (
    <header className="flex justify-between border-2 border-solid border-rose-400 px-4 py-8">
      <Link href={"/"}>
        <h1 className={`${roboto.className} text-2xl font-medium text-text`}>
          23haessi
        </h1>
      </Link>
      <Moon width="28" height="28" fill={text} />
    </header>
  );
}
