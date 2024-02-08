"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Link from "next/link";
import Nav from "@/components/Layout/Nav";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [haveValueChange, setHaveValueChange] = useState<boolean | string>(
    false
  );
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);

  const router = useRouter();

  const supabase = createClientComponentClient();

  useEffect(() => {
    // setDisplayName();

    setLoading(false);
  }, []);

  const handleSignUp = async () => {
    const config: any = {
      email,
      password,
      options: {
        data: {
          display_name: haveValueChange
            ? haveValueChange
            : email
                .split("@")[0]
                .split(".")
                .slice(0, 2)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
        },
      },
    };

    console.log(config);
    // Code moche mais à changer
    const { data, error } = await supabase.auth.signUp(config);

    console.log(data.user);
    if (error) {
      console.log(error);
    }
    // router.push("/account");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-stretch h-screen content-stretch p-8">
      <Nav title="Créez vous un compte" />
      <div className="pt-8 flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 items-center grow">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 normal-case flex-1">
          <div>
            <p className="lg:text-lg max-w-[400px]">
              Créez votre compte avec votre adresse mail{" "}
              <span
                className="font-bold underline cursor-help"
                title="L'adresse unistra est votre adresse étudiant terminant par @(etu.)unistra.fr"
              >
                unistra
              </span>
              &nbsp;et votre mot de passe afin que nous puissons commencer ou
              coninuer la création de votre trombino-scope. Si vous avez déja un
              compte,
              <Link
                href="/login"
                className="whitespace-nowrap text-lg text-link underline"
              >
                connectez-vous.
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <form
              className="w-full flex flex-1 flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label htmlFor="email">E-mail étudiant</label>
                <input
                  className="w-full rounded-full bg-white border-[1px] border-gray px-4 py-1"
                  placeholder="jean.duval@etu.unistra.fr"
                  type="email"
                  name="email"
                  value={email}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="display_name">Nom complet</label>
                <input
                  className="w-full rounded-full bg-white border-[1px] border-gray px-4 py-1"
                  placeholder="Jean Duval"
                  type="text"
                  name="display_name"
                  id="display_name"
                  value={
                    !haveValueChange
                      ? email
                          .split("@")[0]
                          .split(".")
                          .slice(0, 2)
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")
                      : haveValueChange
                  }
                  onChange={(e) => setHaveValueChange(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Mot de passe</label>
                <input
                  className="w-full rounded-full bg-white border-[1px] border-gray px-4 py-1"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex gap-4 flex-1 pt-[20px]">
                <button
                  onClick={handleSignUp}
                  className="flex-1 bg-purple rounded-full px-4 py-1 hover:underline"
                >
                  Créer un compte
                </button>
                <button
                  type="reset"
                  className="flex-1 px-4 py-1 rounded-full border-[1px] border-gray hover:underline"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
        <Image
          src="/img/register.jpg"
          width={0}
          height={0}
          sizes="100%"
          alt=""
          className="w-[650px]"
        />
      </div>
    </div>
  );
}
