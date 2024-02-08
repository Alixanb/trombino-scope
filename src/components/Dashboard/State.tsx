"user client";

import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { JSXElementConstructor, use, useEffect, useState } from "react";
const supabase = createClientComponentClient();

interface SvgType {
  LOADING: JSX.Element;
  PENDING: JSX.Element;
  UPLOADED: JSX.Element;
  ERROR: JSX.Element;
  VALID: JSX.Element;
}

const svgIcons: SvgType = {
  LOADING: <div className="spinner"></div>,
  PENDING: (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12C5.41667 12 5.77083 11.8542 6.0625 11.5625C6.35417 11.2708 6.5 10.9167 6.5 10.5C6.5 10.0833 6.35417 9.72917 6.0625 9.4375C5.77083 9.14583 5.41667 9 5 9C4.58333 9 4.22917 9.14583 3.9375 9.4375C3.64583 9.72917 3.5 10.0833 3.5 10.5C3.5 10.9167 3.64583 11.2708 3.9375 11.5625C4.22917 11.8542 4.58333 12 5 12ZM10 12C10.4167 12 10.7708 11.8542 11.0625 11.5625C11.3542 11.2708 11.5 10.9167 11.5 10.5C11.5 10.0833 11.3542 9.72917 11.0625 9.4375C10.7708 9.14583 10.4167 9 10 9C9.58333 9 9.22917 9.14583 8.9375 9.4375C8.64583 9.72917 8.5 10.0833 8.5 10.5C8.5 10.9167 8.64583 11.2708 8.9375 11.5625C9.22917 11.8542 9.58333 12 10 12ZM15 12C15.4167 12 15.7708 11.8542 16.0625 11.5625C16.3542 11.2708 16.5 10.9167 16.5 10.5C16.5 10.0833 16.3542 9.72917 16.0625 9.4375C15.7708 9.14583 15.4167 9 15 9C14.5833 9 14.2292 9.14583 13.9375 9.4375C13.6458 9.72917 13.5 10.0833 13.5 10.5C13.5 10.9167 13.6458 11.2708 13.9375 11.5625C14.2292 11.8542 14.5833 12 15 12ZM10 20.5C8.61667 20.5 7.31667 20.2375 6.1 19.7125C4.88333 19.1875 3.825 18.475 2.925 17.575C2.025 16.675 1.3125 15.6167 0.7875 14.4C0.2625 13.1833 0 11.8833 0 10.5C0 9.11667 0.2625 7.81667 0.7875 6.6C1.3125 5.38333 2.025 4.325 2.925 3.425C3.825 2.525 4.88333 1.8125 6.1 1.2875C7.31667 0.7625 8.61667 0.5 10 0.5C11.3833 0.5 12.6833 0.7625 13.9 1.2875C15.1167 1.8125 16.175 2.525 17.075 3.425C17.975 4.325 18.6875 5.38333 19.2125 6.6C19.7375 7.81667 20 9.11667 20 10.5C20 11.8833 19.7375 13.1833 19.2125 14.4C18.6875 15.6167 17.975 16.675 17.075 17.575C16.175 18.475 15.1167 19.1875 13.9 19.7125C12.6833 20.2375 11.3833 20.5 10 20.5ZM10 18.5C12.2333 18.5 14.125 17.725 15.675 16.175C17.225 14.625 18 12.7333 18 10.5C18 8.26667 17.225 6.375 15.675 4.825C14.125 3.275 12.2333 2.5 10 2.5C7.76667 2.5 5.875 3.275 4.325 4.825C2.775 6.375 2 8.26667 2 10.5C2 12.7333 2.775 14.625 4.325 16.175C5.875 17.725 7.76667 18.5 10 18.5Z"
        fill="#585858"
      />
    </svg>
  ),
  UPLOADED: (
    <svg
      width="22"
      height="19"
      viewBox="0 0 22 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 19L11 0L22 19H0ZM3.45 17H18.55L11 4L3.45 17ZM11 16C11.2833 16 11.5208 15.9042 11.7125 15.7125C11.9042 15.5208 12 15.2833 12 15C12 14.7167 11.9042 14.4792 11.7125 14.2875C11.5208 14.0958 11.2833 14 11 14C10.7167 14 10.4792 14.0958 10.2875 14.2875C10.0958 14.4792 10 14.7167 10 15C10 15.2833 10.0958 15.5208 10.2875 15.7125C10.4792 15.9042 10.7167 16 11 16ZM10 13H12V8H10V13Z"
        fill="#FED481"
      />
    </svg>
  ),
  ERROR: (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 15.5C10.2833 15.5 10.5208 15.4042 10.7125 15.2125C10.9042 15.0208 11 14.7833 11 14.5C11 14.2167 10.9042 13.9792 10.7125 13.7875C10.5208 13.5958 10.2833 13.5 10 13.5C9.71667 13.5 9.47917 13.5958 9.2875 13.7875C9.09583 13.9792 9 14.2167 9 14.5C9 14.7833 9.09583 15.0208 9.2875 15.2125C9.47917 15.4042 9.71667 15.5 10 15.5ZM9 11.5H11V5.5H9V11.5ZM10 20.5C8.61667 20.5 7.31667 20.2375 6.1 19.7125C4.88333 19.1875 3.825 18.475 2.925 17.575C2.025 16.675 1.3125 15.6167 0.7875 14.4C0.2625 13.1833 0 11.8833 0 10.5C0 9.11667 0.2625 7.81667 0.7875 6.6C1.3125 5.38333 2.025 4.325 2.925 3.425C3.825 2.525 4.88333 1.8125 6.1 1.2875C7.31667 0.7625 8.61667 0.5 10 0.5C11.3833 0.5 12.6833 0.7625 13.9 1.2875C15.1167 1.8125 16.175 2.525 17.075 3.425C17.975 4.325 18.6875 5.38333 19.2125 6.6C19.7375 7.81667 20 9.11667 20 10.5C20 11.8833 19.7375 13.1833 19.2125 14.4C18.6875 15.6167 17.975 16.675 17.075 17.575C16.175 18.475 15.1167 19.1875 13.9 19.7125C12.6833 20.2375 11.3833 20.5 10 20.5ZM10 18.5C12.2333 18.5 14.125 17.725 15.675 16.175C17.225 14.625 18 12.7333 18 10.5C18 8.26667 17.225 6.375 15.675 4.825C14.125 3.275 12.2333 2.5 10 2.5C7.76667 2.5 5.875 3.275 4.325 4.825C2.775 6.375 2 8.26667 2 10.5C2 12.7333 2.775 14.625 4.325 16.175C5.875 17.725 7.76667 18.5 10 18.5Z"
        fill="#D65050"
      />
    </svg>
  ),
  VALID: (
    <svg
      width="22"
      height="13"
      viewBox="0 0 22 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.65 12.5123L0 6.8623L1.425 5.4623L5.675 9.71231L7.075 11.1123L5.65 12.5123ZM11.3 12.5123L5.65 6.8623L7.05 5.4373L11.3 9.6873L20.5 0.487305L21.9 1.9123L11.3 12.5123ZM11.3 6.8623L9.875 5.4623L14.825 0.512305L16.25 1.9123L11.3 6.8623Z"
        fill="#8AC285"
      />
    </svg>
  ),
};

const State = ({
  user,
  onSubmit,
  reloader,
  waitingForAI,
}: {
  user: User;
  onSubmit: () => void;
  reloader: any;
  waitingForAI: boolean;
}) => {
  if (!user) return;

  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const [imageVerified, setimageVerified] = useState<boolean>(false);
  const [imageConform, setimageConform] = useState<boolean>(false);

  useEffect(() => {
    const setData = async () => {
      let { data } = await supabase
        .from("profile")
        .select("imageUploaded, imageVerified, imageConform")
        .eq("id", user.id);

      console.log("uvc", data);

      if (!data) return;
      setImageUploaded(data[0].imageUploaded);
      setimageVerified(data[0].imageVerified);
      setimageConform(data[0].imageConform);
    };

    setData();
  }, [reloader]);

  const handleOnSubmit = () => {
    onSubmit();
  };

  const submitButton = (disabled: boolean) => {
    return (
      <button
        disabled={disabled}
        className={`flex items-center gap-4 w-full justify-center text-lg  rounded-full border-[1px] py-2 px-4 ${
          disabled
            ? "cursor-not-allowed bg-white border-lightGray text-lightGray"
            : "cursor-pointer bg-green border-black"
        }`}
        onClick={() => handleOnSubmit()}
      >
        <svg
          width="23"
          height="13"
          viewBox="0 0 23 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.1998 12.5125L0.549805 6.86255L1.9748 5.46255L6.2248 9.71255L7.6248 11.1125L6.1998 12.5125ZM11.8498 12.5125L6.1998 6.86255L7.5998 5.43755L11.8498 9.68755L21.0498 0.487549L22.4498 1.91255L11.8498 12.5125ZM11.8498 6.86255L10.4248 5.46255L15.3748 0.512549L16.7998 1.91255L11.8498 6.86255Z"
            fill="black"
          />
        </svg>

        <span>Valider ma photo</span>
      </button>
    );
  };

  const stateLabel = (label: string, svg: JSX.Element) => {
    return (
      <div className="flex gap-4 text-gray text-xl items-center font-medium">
        {svg}
        <span>{label}</span>
      </div>
    );
  };

  if (waitingForAI) {
    return (
      <>
        {stateLabel("État : L'IA traite votre portrait", svgIcons.LOADING)}
        {submitButton(false)}
      </>
    );
  }

  if (imageUploaded && imageVerified && imageConform) {
    return (
      <>
        {stateLabel("État : Photo Validée", svgIcons.VALID)}
        {submitButton(false)}
      </>
    );
  }

  if (imageUploaded && imageVerified && !imageConform) {
    return (
      <>
        {stateLabel("État : Photo Non Conforme", svgIcons.ERROR)}
        <Link
          href="mailto:alixanb@orange.fr"
          className="text-sm normal-case text-gray hover:text-black hover:underline -mt-3 ml-2"
        >
          Vous pensez que c'est une erreur ?
        </Link>
        {submitButton(false)}
      </>
    );
  }

  if (!imageUploaded) {
    return (
      <>
        {stateLabel("Importer une photo...", svgIcons.PENDING)}
        {submitButton(true)}
      </>
    );
  } else {
    return (
      <>
        {stateLabel("État : Photo Non Verifiée", svgIcons.UPLOADED)}
        {submitButton(false)}
      </>
    );
  }
};

export default State;
