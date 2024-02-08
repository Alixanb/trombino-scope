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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const supabase = createClientComponentClient();

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

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
    }
    setUser(data.user);
    router.refresh();
  };

  if (loading) {
    return <Loader />;
  }

  if (user) {
    router.push("/account");
  }

  return (
    <div className="flex flex-col items-stretch h-screen content-stretch p-8">
      <Nav title="Connexion" />
      <div className="pt-8 flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 items-center grow">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 normal-case flex-1">
          <div>
            <p className="lg:text-lg max-w-[400px]">
              Connectez vous avec votre adresse mail et votre mot de passe afin
              que nous puissons commencer ou coninuer la création de votre
              trombino-scope. Si vous n'avez pas de compte,
              <br />
              <Link
                href="/register"
                className="whitespace-nowrap text-lg text-link underline"
              >
                créez vous un compte.
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
              {/* <button onClick={handleSignUp}>Sign Up</button> */}
              <div className="flex gap-4 flex-1 pt-[20px]">
                <button
                  onClick={handleSignIn}
                  className="flex-1 bg-green rounded-full px-4 py-1 hover:underline"
                >
                  Connexion
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
          src="/img/connexion.jpg"
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
