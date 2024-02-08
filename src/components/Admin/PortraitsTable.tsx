"use client";

import { useEffect, useState } from "react";
import Loader from "../Loader";
import PortraitCard from "./PortraitCard";

const PortraitsTable = ({ portraits }: { portraits: Array<portraitProps> }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!portraits || !portraits.length) {
    return (
      <div className="h-full w-full flex items-center justify-center pt-8">
        <p>Aucun portrait trouvé</p>
      </div>
    );
  }

  return (
    <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {portraits.map((portrait) => {
        return <PortraitCard key={portrait?.id} portrait={portrait} />;
      })}
    </div>
  );
};

export default PortraitsTable;
