"use client";

import { useEffect, useState } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Link from "next/link";
import Nav from "@/components/Layout/Nav";

const supabase = createClientComponentClient();

interface ProfileProps {
  display_name: string;
  email: string;
}

export const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState<ProfileProps>({
    display_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [newPasswordLoading, setNewPasswordLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);
      setLoading(false);
      getDisplayName(user);
    }

    getUser();

    const getDisplayName = async (user: User) => {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", user.id);

      if (error) {
        console.error(error);
      }
      console.log(data);

      setProfile(data[0]);
    };
  }, []);

  const handleForgotPassword = async () => {
    setNewPasswordLoading(true);
    if (!profile.email) {
      alert("Problème sur la récupération de votre email, veuillez réessayer");
      return;
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(
      profile.email,
      {
        redirectTo: process.env.NEXT_PUBLIC_WEBSITE_URL,
      }
    );

    if (error) {
      console.error(error);
      return;
    }

    setNewPasswordLoading(false);
    alert("Un email de réinitialisation de mot de passe vous a été envoyé");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();

    setUser(null);
    router.push("/login");
  };

  if (loading) {
    return <Loader />;
  }

  console.log(profile);

  return (
    <div className="p-8">
      <Nav title="Mon Compte" />
      <main className="pt-8 flex flex-col items-start gap-8 lg:w-[30vw]">
        <form
          onSubmit={(e) => e.preventDefault}
          className="flex flex-col normal-case w-full"
        >
          <label htmlFor="display_name">Nom d'affichage</label>
          <div className="flex gap-2 ">
            <input
              type="text"
              value={profile?.display_name}
              readOnly={false}
              onChange={(e) =>
                setProfile({ ...profile, display_name: e.target.value })
              }
              className="rounded-full bg-white border-[1px] border-gray px-4 py-1 w-full"
            />
            <button
              type="submit"
              className="rounded-full border-[1px] border-gray px-4 py-1 bg-purple text-white"
            >
              Changer
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-4 w-full">
          <input
            type="text"
            readOnly
            value={profile.email}
            className="rounded-full bg-white border-[1px] border-lightGray px-4 py-1 w-full select-none text-gray"
          />
          <div className="flex flex-col gap-2">
            <input
              type="password"
              readOnly
              value="Yo mon reuf"
              className="rounded-full bg-white border-[1px] border-lightGray px-4 py-1 w-full select-none text-gray"
            />
            <button
              onClick={() => handleForgotPassword()}
              className="normal-case text-sm pl-2 underline text-link flex justify-start gap-2 items-center"
            >
              {newPasswordLoading && <div className="spinner-blue-sm"></div>}
              <span>Mot de passe oublié ?</span>
            </button>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex gap-2 rounded-full bg-white border-[1px] border-gray px-4 py-1 items-center text-gray hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
          >
            <path d="M228.309-164.001q-27.008 0-45.658-18.65-18.65-18.65-18.65-45.658v-503.382q0-27.008 18.65-45.658 18.65-18.65 45.658-18.65h252.076V-744H228.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v503.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h252.076v51.999H228.309Zm428.922-177.232-37.537-36.383 76.384-76.385H387.846v-51.998h308.232l-76.384-76.385 37.537-36.383L795.999-480 657.231-341.233Z" />
          </svg>
          <span>Se déconnecter</span>
        </button>
      </main>
    </div>
  );
};

export default AccountPage;
