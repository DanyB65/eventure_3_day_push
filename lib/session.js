// import 'server-only'
import { SignJWT, jwtVerify } from "jose";
// import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";
// const key = new TextEncoder().encode(process.env.SECRET_KEY)
const key = new TextEncoder().encode('secret')
const cookie = {
    name: 'session',
    options:{
        httpOnly: true,
        secure: true,
        sameSite:'lax',
        path:'/'
    },
    duration: 24*60*60*1000,
}
export async function encrypt(payload){
    return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key)
}
export async function decrypt(session){
    try{
        const {payload} = await jwtVerify(session, key,{algorithms:['HS256']})
        return payload
    }catch(error){
        return null
    }
}

export async function createSession(id){
    const expries = new Date(Date.now() + cookie.duration)
    const session = await encrypt({id,expries})
    cookies().set(cookie.name,session,{...cookie.options,expires:expries})
    redirect("/");
}

export async function verifySession(){
    const cookie= cookie().get(cookie.name)?.value
    const session = await decrypt(cookie)
    if(!session?.id){
        redirect('/login')
    }
    return { id: session.id }
}

export async function deleteSession() {
    const cookieStore = cookies();  // Use cookies() to interact with cookies on the server
    cookieStore.delete(cookie.name);  // Delete the session cookie
}