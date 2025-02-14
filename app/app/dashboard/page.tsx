import { Chatcard } from "@/components/room/chatcard";
import { CreateChat } from "@/components/room/createchat";
import { chatgroup, fetchRooms } from "@/components/room/fetchrooms";
import Appbar from "@/components/dashboard/appbar"
import { authoptions } from "@/lib/actions/auth"
import { getServerSession } from "next-auth"
import { CustomUser } from "@/lib/actions/auth";

export default async function dashboard(){
    const session = await getServerSession(authoptions);
    const user= session?.user;
    console.log(user);
    
    //@ts-ignore
    const token = user?.token ;
    const rooms = await fetchRooms(token);
    console.log(rooms);

    return (
        <div  className="h-screen bg-amber-300">
            <Appbar name = {session?.user?.name!} image={session?.user?.image!} user={session?.user!}/>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-amber-300 p-4">
               {rooms.map((room: chatgroup) => (
                  <Chatcard key={room.id} props={{ room, user : user! }} />
               ))}
            </div>
        </div>
        
       
    )
}