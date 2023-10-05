import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

const MAX_AGE = 60 * 60;

export async function GET(req: NextRequest) {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  const origin = req.headers.get("origin") as string;
  return NextResponse.json(
    { msg: "getgata", token: token },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": "true",
      },
    }
  );
}

// export async function OPTIONS(req: Request) {
//   const origin = req.headers.get("origin") as string;

//   return new NextResponse(null, {
//     status: 200,
//     headers: {
//       "Access-Control-Allow-Origin": origin,
//       "Access-Control-Allow-Credentials": "true",
//       "Access-Control-Allow-Headers": "content-type",
//       "Access-Control-Max-Age": "3600",
//     },
//   });
// }
