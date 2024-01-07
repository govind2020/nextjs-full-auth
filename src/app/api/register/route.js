// connecting to DB
import { ConnectDB } from "@/app/lib/config/db";
import { UserModel } from "@/app/lib/models/User.models";
import { NextResponse } from "next/server";

ConnectDB();

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  try {
    await UserModel.create(
      {
        name,
        email,
        password
      },
      { maxTimeMS: 20000 }
    );

    return NextResponse.json({
      error: null,
      msg: "User Registered Successfully",
      status: 201
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ msg: null, error: "Internal Server Error" }, { status: 500 });
  }
};
