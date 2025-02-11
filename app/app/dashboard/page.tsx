

import { CreateChat } from "@/components/chats/createchat";
import { fetchRooms } from "@/components/chats/fetchrooms";
import Appbar from "@/components/dashboard/appbar"
import { authoptions } from "@/lib/actions/auth"
import { getServerSession } from "next-auth"

export default async function dashboard(){
    const session = await getServerSession(authoptions);
    const user= session?.user;
    console.log(user);
    //@ts-ignore
    const token = user?.token ;
    const groups = await fetchRooms(token);
    console.log(groups);

    return (
        <div>
            <Appbar name = {session?.user?.name!} image={session?.user?.image!}/>
            <CreateChat user={session?.user!} />
        </div>
       
    )
}