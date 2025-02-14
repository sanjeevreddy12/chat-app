"use client"
import Link from "next/link"
import { Button } from "../ui/button"
import { authoptions } from "@/lib/actions/auth";
import { getServerSession } from "next-auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

export const HiSection = () => {
    const [link, setLink] = useState<string>("");
    const router = useRouter();

    const handleJoinRoom = (e: React.FormEvent) => {
        e.preventDefault();
        if (!link) return;

        // Extract room ID from the link if it's a full URL
        const roomId = link.includes('/') ? link.split('/').pop() : link;
        router.push(`/chatroom/${roomId}`);
    };

    return(
        <section className="flex-1 flex flex-col items-center justify-center text-center p-12  ">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Chat with people</h1>
            <p className="text-xl text-gray-600 mb-8">
                Chat-app helps people to create secure chatlinks and start conversations in seconds 
            </p>
            
            <form onSubmit={handleJoinRoom} className="w-full max-w-md flex flex-col gap-4 mb-8">
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Paste your chat link or room ID here"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={!link}>
                        Join Room
                    </Button>
                </div>
            </form>

           

            <div className="mt-12 w-full max-w-5xl flex justify-center">
                
            </div>
        </section>
    )
}
