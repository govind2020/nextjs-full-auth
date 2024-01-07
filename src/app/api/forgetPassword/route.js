import { GenerationForgettoken } from "@/app/lib/Service/Token.service";
import { SendEmail } from "@/app/lib/Service/Mail.service";

import { ConnectDB } from "@/app/lib/config/db";
import { UserModel } from "@/app/lib/models/User.models";
import { NextResponse } from "next/server";

ConnectDB();

export const POST = async (request) => {
  const { email } = await request.json();
  console.log('email', email)

  try {
    const userExist = await UserModel.findOne({ email });
    console.log("userExist", userExist)

    if (!userExist) {
      return NextResponse.json(
        { msg: "User is not Exist", error: "User is not Exist" },
        { status: 401 }
      );
      return;
    }

    // token
    const token = await GenerationForgettoken(userExist, email);
    console.log('token', token)

    const mailResponse = await SendEmail(userExist.name, token, email);
    console.log('mailResponse', mailResponse)

    const response = NextResponse.json({
      error: null,
      msg: "Email Send Sucessfully",
      status: 200
    });
    
    console.log('response', response)
    return response;
  } catch (error) {
    return NextResponse.json(
      { msg: null, error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
