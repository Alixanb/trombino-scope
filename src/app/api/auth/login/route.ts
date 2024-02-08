import { error } from "console";
import supabase from "../../../../supabase";
import { isEmailValid, isPasswordValid } from "../utils";
import { NextResponse } from "next/server";

interface Request {
  body: {
    email: string;
    password: string;
  };
}

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  console.log("login", email, password);

  if (error) {
    throw new Error(error.message);
  }

  return NextResponse.json({ data });
}
