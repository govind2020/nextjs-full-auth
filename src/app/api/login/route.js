import { Generationtoken } from "@/app/lib/Service/Token.service";
import { ConnectDB } from "@/app/lib/config/db";
import { UserModel } from "@/app/lib/models/User.models";
import { NextResponse } from "next/server";

ConnectDB();

export const POST = async (request) => {
  const { email, password } = await request.json();

  try {
    const userExist = await UserModel.findOne({email});

    if (!userExist) {
      return NextResponse.json(
        { msg: null, error: "User is not Exist" },
        { status: 401 }
      );
      return
    }

    const checkPassword = await userExist.ConfirmPassword(password)
    if(!checkPassword){
        return NextResponse.json(
            { msg: null, error: "Invalid Credintails" },
            { status: 401 }
          );
          return
    }

    // token
    const token = await Generationtoken(userExist)
    
    console.log('Generated Token:', token);

    const response = NextResponse.json({
        error: null,
        msg: "User Login Successfully",
        status: 200
      });

      response.cookies.set("token", token, {
        httpOnly : true,
        secure : true,
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === 'production', // Use secure in production
    });
    

    return response;

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { msg: null, error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
