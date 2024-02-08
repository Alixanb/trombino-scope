"use client";

import Image from "next/image";
import Link from "next/link";
import acios, { AxiosResponse } from "axios";
import axios from "axios";

const PortraitCard = ({ portrait }: { portrait: portraitProps }) => {
  const handleDelete = async () => {
    console.log(await axios.delete(`/api/admin/portraits/${portrait.id}/`));
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(portrait.url, {
        responseType: "blob", // spécifier le type de réponse comme blob (pour les fichiers binaires)
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      let portraitDate: Date = new Date(portrait.created_at);
      let dateFormatted: string = `${
        portraitDate.getDate() < 10
          ? "0" + portraitDate.getDate()
          : portraitDate.getDate()
      }-${
        portraitDate.getMonth() < 9
          ? "0" + (portraitDate.getMonth() + 1)
          : portraitDate.getMonth() + 1
      }-${portraitDate.getFullYear()}`;

      link.setAttribute(
        "download",
        `${portrait.user_name.replace(" ", "_")}_portrait_${dateFormatted}.jpg`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image :", error);
    }
  };

  return (
    <div className="border-[1px] border-black rounded-2xl">
      <div className="relative w-full h-[200px]">
        <Image
          src={portrait.url}
          fill={true}
          alt={"Portrait de " + portrait.user_name}
          className="rounded-2xl object-cover"
          sizes="128vw"
        />
      </div>
      <div className="p-4">
        <div className="flex flex-col normal-case ">
          <div className="whitespace-nowrap">{portrait.user_name}</div>
          <Link
            href={"mailto:" + portrait.user_email}
            className="text-sm text-gray hover:underline"
          >
            {portrait.user_email}
          </Link>
        </div>
        <hr className="my-4  " />
        <div className="text-sm flex justify-end gap-4">
          <button
            onClick={handleDownload}
            className=" py-2 px-4 rounded-full hover:underline border-[1px] border-black"
          >
            Télécharger
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortraitCard;
