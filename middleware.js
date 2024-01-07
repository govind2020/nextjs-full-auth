import { NextResponse } from "next/server";

export const middleware = (request) =>{
    const pathVariable = request.nextUrl?.pathname;

    const publicPath = ['/register', '/update-password','/forgot', '/login'];

    const auth = request.cookies.get("token") || '';

    // checking the auth
 
    if(publicPath.includes(pathVariable) && auth){
        return NextResponse.redirect(new URL('/', request.url))
    }

    if(!auth){
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/update-profil',
        '/forgot',
        '/update-password'
    ]
}