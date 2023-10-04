import { NextResponse } from "next/server";

const MAX_AGE = 60 * 60;

export async function GET(req: Request) {
  return NextResponse.json(
    { msg: "getgata", cookie: req.headers },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": "true",
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
