import Link from "next/link"
import { Button } from "../ui/button"
import { authoptions } from "@/lib/actions/auth";
import { getServerSession } from "next-auth";
import  Signin  from "../auth/Signin";

export const HiSection=(async ()=>{
    const session = await getServerSession(authoptions);
    const user = session?.user;

    
    return(
        <section className="flex-1 flex flex-col items-center justify-center  text-center p-12 bg-gradient-to-b from-gray-50 to-white">
            <h1 className="text-5xl fonr-extrabold text-gray-900 mb-4">Chat with people </h1>
            <p className="text-xl text-gray-600 mb-8">
                Chat-app helps people to create secure chatlinks and start conversations in seconds 
            </p>
            <Link href={user ? "/dashboard" : "api/auth/signin"}> 
            {user ? (
                <Button size={"lg"} className="animate-pulse">Continue Your Conversation </Button>
            ) : (
                <Button size={"lg"} className="animate-pulse">Start Your Conversation </Button>
            )}
            </Link>
            <div className="mt-12 w-full max-w-5xl flex justify-center">

                <img src = "/images/photo.svg" alt = "Illustration" className="w-full h-auto"></img>
            </div>
        </section>
    )
})
