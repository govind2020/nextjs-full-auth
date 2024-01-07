// connecting to DB
import { VerifyToken } from "@/app/lib/Service/Token.service";
import { ConnectDB } from "@/app/lib/config/db";
import { UserModel } from "@/app/lib/models/User.models";
import { NextResponse } from "next/server";

ConnectDB();

export const GET = async (request) => {
  const auth = request.cookies.get("token") || "";

  if (!auth) {
    return NextResponse.json(
      { msg: null, error: "Please Logn First" },
      {
        status: 401
      }
    );
    return;
  }

  const { userId } = await VerifyToken(auth.value);

  if (!userId) {
    return NextResponse.json(
      { msg: null, error: "Invalid User" },
      {
        status: 401
      }
    );
    return;
  }

  const existUser = await UserModel.findById(userId).select("-password");

  if (!existUser) {
    return NextResponse.json(
      { msg: null, error: "User Does not Exist" },
      {
        status: 401
      }
    );
    return;
  }

  return NextResponse.json(
    { error: null, msg: "Data fetched", user: existUser },
    {
      status: 200
    }
  );
};
