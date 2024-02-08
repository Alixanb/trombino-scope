"use client";

import PortraitsTable from "@/components/Admin/PortraitsTable";
import Nav from "@/components/Layout/Nav";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

export const AdminPage = () => {
  const supabase = createClientComponentClient();

  const [portraits, setPortraits] = useState<Array<portraitProps>>([]);

  useEffect(() => {
    const getPortraits = async () => {
      const data = await axios
        .get("/api/admin/portraits")
        .then((response: AxiosResponse) => {
          return response.data;
        });
      return data;
    };

    getPortraits().then((data) => {
      setPortraits(data);
    });
  }, []);

  return (
    <div className="lg:h-screen p-8">
      <Nav title="Portail Admin" />
      <PortraitsTable portraits={portraits} />
    </div>
  );
};

export default AdminPage;
