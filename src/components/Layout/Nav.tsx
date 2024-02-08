import { satoshi } from "@/fonts";
import Link from "next/link";

export const Nav = ({ title }: { title: string }) => {
  return (
    <div className="lg:flex-shrink-0 flex flex-col lg:flex-row justify-between gap-4 lg:items-end">
      <nav className="flex gap-8 ">
        <ul className="flex flex-col gap-0 flex-grow ">
          <li>
            <Link
              href="/"
              className="hover:text-black text-gray flex gap-2 items-center"
            >
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.08331 11.6602H3.37179V7.37817C3.37179 7.18837 3.43599 7.02928 3.56438 6.9009C3.69276 6.77251 3.85186 6.70831 4.04167 6.70831H7.12496C7.31476 6.70831 7.47386 6.77251 7.60225 6.9009C7.73064 7.02928 7.79483 7.18837 7.79483 7.37817V11.6602H10.0833V4.53844C10.0833 4.4957 10.074 4.45697 10.0553 4.42225C10.0366 4.38753 10.0112 4.35681 9.97915 4.3301L5.73556 1.1394C5.69283 1.10201 5.64208 1.08331 5.58331 1.08331C5.52455 1.08331 5.4738 1.10201 5.43106 1.1394L1.18748 4.3301C1.15544 4.35681 1.13006 4.38753 1.11135 4.42225C1.09266 4.45697 1.08331 4.4957 1.08331 4.53844V11.6602ZM0 11.4102V4.53844C0 4.3298 0.0464097 4.13215 0.139229 3.94548C0.232049 3.7588 0.36566 3.59642 0.540062 3.45833L4.78365 0.259624C5.03299 0.0865412 5.29912 0 5.58202 0C5.86492 0 6.13191 0.0865412 6.38298 0.259624L10.6266 3.45833C10.801 3.59642 10.9346 3.7588 11.0274 3.94548C11.1202 4.13215 11.1666 4.3298 11.1666 4.53844V11.4102C11.1666 11.774 11.0353 12.0871 10.7728 12.3497C10.5102 12.6123 10.197 12.7435 9.83331 12.7435H7.3814C7.1916 12.7435 7.03251 12.6793 6.9041 12.5509C6.77572 12.4225 6.71152 12.2635 6.71152 12.0737V7.7916H4.4551V12.0737C4.4551 12.2635 4.39091 12.4225 4.26252 12.5509C4.13412 12.6793 3.97502 12.7435 3.78523 12.7435H1.33331C0.96959 12.7435 0.656444 12.6123 0.393875 12.3497C0.131291 12.0871 0 11.774 0 11.4102Z"
                  fill="black"
                />
              </svg>

              <span>Trombino Scope</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Section FAQ
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              À propos
            </Link>
          </li>
          <li className="h-4 flex items-center">
            <hr className="w-8" />
          </li>
          <li className="flex items-center gap-4 group relative">
            <Link href="/account" className="hover:underline relative">
              Mon compte
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                viewBox="0 0 24 18"
                fill="none"
                className="top-1/2 -translate-y-1/2 pointer-events-none select-none group-hover:-right-10 ease-out duration-100 absolute -right-8"
              >
                <path
                  d="M24 8.17921V9.82079C19.6273 9.82079 16.0703 13.4897 16.0703 18H14.4788C14.4788 14.5896 16.1737 11.5814 18.7401 9.82079H0V8.17921H18.7361C16.1698 6.4186 14.4788 3.4104 14.4788 0H16.0703C16.0703 4.51026 19.6273 8.17921 24 8.17921Z"
                  fill="#1D1D1B"
                />
              </svg>
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-0 text-gray uppercase flex-grow">
          <li className="hover:underline">
            <Link href="/login">Portail étudiant</Link>
          </li>
          <li className="hover:underline">
            <Link href="/admin">Portail admin</Link>
          </li>
        </ul>
      </nav>
      <h1
        className={`text-5xl lg:text-6xl font-medium lg:font-thin ${satoshi.className}`}
      >
        {title}
      </h1>
    </div>
  );
};

export default Nav;
