import { ConnectDB } from "@/app/lib/config/db";
import { VerifyToken } from "@/app/lib/Service/Token.service";
import { UserModel } from "@/app/lib/models/User.models";
import { NextResponse } from "next/server";

ConnectDB();
export const PUT = async(request)=>{
    
const {name,email} =await request.json()

    const auth = request.cookies.get("token") || '';

    if(!auth){
        return NextResponse.json({msg:null,error:"Please login First"},{
            status:401
        })
        return
    }
    const {userId} = await VerifyToken(auth.value);
    if(!userId){
        return NextResponse.json({msg:null,error:"Invalid Token"},{
            status:401
        })
        return
    }

    const existUser = await UserModel.findByIdAndUpdate(userId,{
        $set:{name,email}
    });
    
    if(!existUser){
        return NextResponse.json({msg:null,error:"User Does not Exist"},{
            status:401
        })
        return
    }

    return NextResponse.json({error:null,msg:"Profile Updated"},{
        status:200
    })
}