import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const MAX_AGE = 60 * 60;

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email } = body;
  const origin = req.headers.get("origin") as string;

  if (!name || !email) {
    return NextResponse.json({ msg: "failed" });
  }
  const token = sign({ name, email }, "jwtsecret", { expiresIn: MAX_AGE });

  const seralized = serialize("token", token, {
    secure: true,
    maxAge: MAX_AGE,
    sameSite: "none",
    path: "/",
  });

  return NextResponse.json(
    { msg: "login" },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": "true",
        "Set-Cookie": seralized,
      },
    }
  );
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin") as string;

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Max-Age": "3600",
    },
  });
}
