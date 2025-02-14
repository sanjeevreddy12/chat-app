"use client"
import { CustomUser } from "@/lib/actions/auth";
import { chatgroup } from "./fetchrooms";
import { Suspense, useState } from "react";
import { Editdetails } from "./Editdetails";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import dynamic from "next/dynamic";

// Dynamic imports with Suspense
const DeleteChat = dynamic(() => import("./deletechat").then(mod => mod.DeleteChat), {
    loading: () => <div>Loading...</div>,
    ssr: false
});

export function Editroom({
    room,
    user,
}: {
    room: chatgroup,
    user: CustomUser
}) {
    const [deleteopen, setdeleteopen] = useState(false);
    const [editopen, seteditopen] = useState(false);
    const handlecopylink = () => {
        navigator.clipboard.writeText(`http://localhost:3000/chatroom/${room.id}`);
    }
    return (
        <div className="flex items-center">
            <Suspense fallback={<div>Loading...</div>}>
                {deleteopen && (
                    <DeleteChat 
                        open={deleteopen}
                        setopen={setdeleteopen}
                        roomId={room.id}
                        token={user.token!}
                    />
                )}
                {editopen && (
                    <Editdetails
                        open={editopen}
                        setopen={seteditopen}
                        roomId={room.id}
                        user={user}
                    />
                )}
            </Suspense>
            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                    <MoreVertical className="h-5 w-7 text-gray-500 hover:text-gray-700" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handlecopylink}>
                        Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => seteditopen(true)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setdeleteopen(true)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}