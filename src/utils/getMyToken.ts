import { decode } from "next-auth/jwt";
import { cookies } from "next/headers"


export default async function getMyToken(){
    const myCookies = await cookies();

    const tokenFromCookies = myCookies.get("next-auth.session-token");
    console.log("token from cookies", tokenFromCookies);

    const TokenAfterDecoding = await decode( { token: tokenFromCookies?.value, secret: process.env.BETTER_AUTH_SECRET! } )
    console.log( "My Token after Decoding: " ,TokenAfterDecoding);
}