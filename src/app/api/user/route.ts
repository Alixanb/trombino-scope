import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!isEmailValid(body.email)) {
    return errorFactory("Email invalide");
  }

  if (!isPasswordValid(body.password)) {
    return errorFactory("Mot de passe invalide");
  }

  const { data, error } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
    options: {
      // emailRedirectTo: "https://example.com/welcome",
    },
  });

  console.log(data, error);

  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  if (!isEmailValid(body.email)) {
    return errorFactory("Email invalide");
  }

  const { data, error } = await supabase.auth.update({
    email: body.email,
  });

  console.log(data, error);

  return NextResponse.json(data);
}

// TODO : POST, PUT, DELETE
