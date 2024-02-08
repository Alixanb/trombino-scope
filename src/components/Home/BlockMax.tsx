"use client";

import Link from "next/link";
import { satoshi, ibm_plex_mono, clash_display } from "@/fonts";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export const BlockMax = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  const path = user ? "/dashboard" : "/register";
  const blockTitle = user ? "Continuer la démarche" : "Je m'inscris";

  return (
    <article className="lg:w-2/3 rounded-xl bg-green p-8 flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <h2 className={satoshi.className + " text-3xl lg:text-6xl font-medium"}>
          {blockTitle}
        </h2>
        <p className="normal-case lg:text-sm xl:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <Link href={path} className="flex gap-4 items-center group mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4"
          height="4"
          viewBox="0 0 4 4"
          fill="none"
          className="group-hover:h-[8px]"
        >
          <circle cx="2" cy="2" r="2" fill="black" />
        </svg>
        <span className="group-hover:underline ">C'est parti !</span>
      </Link>
    </article>
  );
};

export default BlockMax;
