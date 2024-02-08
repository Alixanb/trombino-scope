"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Nav from "@/components/Layout/Nav";
import Photo from "@/components/Dashboard/Photo";
import { UploadButton } from "@/utils/uploadthings";
import { OurFileRouter } from "../api/uploadthing/core";
import { UploadFileResponse } from "uploadthing/client";
import axios, { isCancel, AxiosError } from "axios";
import State from "@/components/Dashboard/State";

const supabase = createClientComponentClient();

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userImage, setUserImage] = useState<any>(undefined);
  const [waitingForAI, setWaitingForAI] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(undefined);

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

  const getUserImage = async (user: User | null) => {
    if (!user) return;
    const { data } = await supabase
      .from("profile")
      .select("image")
      .eq("id", user.id);

    if (!data[0].image) return;
    setUserImage(data[0].image.url);
  };

  getUserImage(user);

  const insertImage = async (
    file: UploadFileResponse<{ uploadedBy: string }>[]
  ) => {
    if (!user?.id) return;

    setProfile(
      await supabase
        .from("profile")
        .update({
          imageUploaded: true,
          imageVerified: false,
          imageConform: false,
        })
        .eq("id", user.id)
        .select()
    );

    const { data } = await supabase
      .from("profile")
      .select("image")
      .eq("id", user.id);

    if (data[0].image) {
      await axios.delete("api/uploadthing", {
        data: {
          url: data[0].image.url,
        },
      });
    }

    const { error } = await supabase
      .from("profile")
      .update({ image: file[0] })
      .eq("id", user.id);

    console.log({ file, error });
    setUserImage(file[0].url);

    if (error) {
      console.error(error);
    }
  };

  const deletePortraitWithID = async (id: string) => {
    const { data: deleteData, error: deleteError } = await supabase
      .from("portraits")
      .delete()
      .eq("id", id);
    console.log({ deleteData, deleteError, id });
  };

  const updateUserImage = async (verified: boolean) => {
    if (verified) {
      await supabase
        .from("profile")
        .select("portrait_id")
        .eq("id", user?.id)
        .then((res) => {
          deletePortraitWithID(res.data[0].portrait_id);
        });

      const { data: insertData, error } = await supabase
        .from("portraits")
        .insert({
          user_name: user?.user_metadata.display_name,
          user_email: user?.email,
          url: userImage,
          size: 0,
        })
        .select();

      console.log({ insertData, error, userImage });

      setProfile(
        await supabase
          .from("profile")
          .update({
            imageVerified: true,
            imageConform: true,
            portrait_id: insertData[0].id,
          })
          .eq("id", user?.id)
          .select()
      );
      console.log(data);
    } else {
      setProfile(
        await supabase
          .from("profile")
          .update({ imageVerified: true, imageConform: false })
          .eq("id", user?.id)
          .select()
      );
    }
  };

  const handleButtonSubmit = async () => {
    const minResultToPass = 0.8;
    const aiURI =
      process.env.NEXT_PUBLIC_DOCKER_URL + "/?image=" + encodeURI(userImage);

    setWaitingForAI(true);
    await axios.get(aiURI).then((res) => {
      setWaitingForAI(false);
      const result = parseFloat(res.data[0]);

      console.log(result > minResultToPass);

      if (result > minResultToPass) {
        updateUserImage(true);
      } else {
        updateUserImage(false);
      }
    });
  };

  return (
    <div className="p-8 lg:h-screen">
      <Nav title="Mon Trombino-scope" />
      <div className="flex gap-8 pt-8  flex-col lg:flex-row">
        <div className=" normal-case text-lg flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="shrink">
              Avant de capturer L’image, veille à consacrer le temps nécessaire
              à une préparation minutieuse, de manière à ce que ta photographie
              puisse pleinement répondre aux critères qui suivent :
            </p>
            <ul className="text-gray list-disc ml-4 ">
              <li>Mur blanc en arrière-plan.</li>
              <li>Éclairage neutre.</li>
              <li>Cadre depuis le haut du buste avec visage visible.</li>
              <li>Choisis une mise au point précise</li>
            </ul>
          </div>
          <div className="mt-2">
            <span className="text-2xl">
              {loading ? (
                <div className="flex gap-4">
                  <div className="spinner"></div>
                  Photo en chargement...
                </div>
              ) : (
                "Ma photo"
              )}
            </span>
            <Photo src={userImage} onImageLoad={() => setLoading(false)} />
          </div>
        </div>
        <div id="buttons" className="w-full flex flex-col gap-4 text-lg">
          <div className={loading ? "pointer-events-none opacity-50" : ""}>
            <UploadButton
              endpoint="imageUploader"
              appearance={{
                container: "p-0",
              }}
              onUploadBegin={(name) => {
                setLoading(true);
              }}
              onClientUploadComplete={(res) => {
                insertImage(res);
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              className="upload-thing-button border-[1px] text-black px-4 py-2 rounded border-none cursor-pointer transition-colors duration-200"
              content={{
                button: (args) => (
                  <div className="border-[1px] border-black rounded-full px-4 py-2 hover:underline flex justify-center gap-2 items-center normal-case w-full">
                    {args.uploadProgress ? (
                      args.uploadProgress + "%"
                    ) : (
                      <>
                        {!userImage
                          ? "Importer un portrait"
                          : "Modifiez votre portrait"}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            y="0.5"
                            width="18"
                            height="18"
                            rx="9"
                            fill="black"
                          />
                          <path
                            d="M11.2829 7.71912L6.60956 12.3924C6.53785 12.4641 6.45418 12.5 6.35857 12.5C6.26295 12.5 6.17928 12.4641 6.10757 12.3924C6.03586 12.3207 6 12.2371 6 12.1414C6 12.0458 6.03586 11.9622 6.10757 11.8904L10.7809 7.21713H6.62151C6.51992 7.21713 6.43476 7.18257 6.36604 7.11345C6.29731 7.04431 6.26295 6.95866 6.26295 6.85647C6.26295 6.75428 6.29731 6.66932 6.36604 6.60159C6.43476 6.53386 6.51992 6.5 6.62151 6.5H11.6414C11.743 6.5 11.8282 6.53436 11.8969 6.60309C11.9656 6.67181 12 6.75697 12 6.85857V11.8785C12 11.9801 11.9654 12.0652 11.8963 12.134C11.8272 12.2027 11.7415 12.2371 11.6393 12.2371C11.5372 12.2371 11.4522 12.2027 11.3845 12.134C11.3167 12.0652 11.2829 11.9801 11.2829 11.8785V7.71912Z"
                            fill="white"
                          />
                        </svg>
                      </>
                    )}
                  </div>
                ),
              }}
            />
          </div>
          <p className="normal-case mb-8">
            Veuillez s'il vous plaît importer la photo, lorsqu'elle sera envoyé,
            nous pourrons executer la vérification de la comformité de votre
            photo sur nos serveurs
          </p>
          <State
            user={user}
            onSubmit={() => handleButtonSubmit()}
            reloader={profile}
            waitingForAI={waitingForAI}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
