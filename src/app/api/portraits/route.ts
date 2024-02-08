import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";
import { createClient } from "@supabase/supabase-js";

// Create a Supabase client instance
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

// Insert a new portrait
export async function POST(request: NextRequest) {
  const { data, error } = await supabase.from("portraits").insert(request.body);

  if (error) {
    console.log(error);
    return NextResponse.error();
  }

  return NextResponse.json(data);
}
