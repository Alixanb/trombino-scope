import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";
import { createClient } from "@supabase/supabase-js";

// Create a Supabase client instance
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export async function GET(request: NextRequest) {
  const { data, error } = await supabase.from("portraits").select("*");

  if (error) {
    console.log(error);
    return NextResponse.error();
  }

  return NextResponse.json(data);
}
