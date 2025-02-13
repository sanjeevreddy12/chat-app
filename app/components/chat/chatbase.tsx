"use client"
import { Getsocket } from "@/lib/socket"
import { useEffect, useMemo, useState } from "react"
import {v4 as uuidV4} from "uuid"
import { Button } from "../ui/button"
import Appbar from "./Appbar"
import { Sidebar } from "./Sidebar"
import Enterroom from "./Enterroom"
import Chats  from "./Chats"
export const Chatbase = ({room,users,messages}:{room : any,users : any,messages : any})=>{
    const [open, setOpen] = useState(true);
    const [chatUser, setChatUser] = useState<any>();
    useEffect(() => {
      const data = localStorage.getItem(room.id);
      if (data) {
        const pData = JSON.parse(data);
        setChatUser(pData);
      }
    }, [room.id]);
    
    
    return (
        <div className=" flex no-scrollbar">
            <Sidebar users={users}/>
            <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
        {open ? (
          < Enterroom open={open} setOpen={setOpen} group={room} />
        ) : (
          <Appbar room={room} users={users} />
        )}
        <Chats group={room} oldMessages={messages} chatUser={chatUser}/>
        </div>
        </div>
    )

}