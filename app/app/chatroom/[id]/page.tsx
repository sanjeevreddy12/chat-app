import  {Chatbase } from "@/components/chat/chatbase"
import { fetchMessages } from "@/components/chat/fetchmessages";
import { fetchroom, FetchUsers } from "@/components/chat/fetchusers";


 const Chatroom = async ({params} : {params : {id :String}})=>{
    const  id = await params.id;
    console.log(id);
    if(id.length!=36){
        return(
            <div>
                <h1>Invalid Room ID</h1>
            </div>
        )
    }
    const room  = await fetchroom(id as string);
    console.log(room);
    if(!room){
        return(
            <div>
                <h1>Room not found</h1>
            </div>
        )
    }
    const users : any = await FetchUsers(id as string);
    console.log(users);
    const messages : any = await fetchMessages(id as string);
   console.log("messages123455",messages);
    
   
    return(
        <div className="bg-gradient-to-b from-gray-50 to-white no-scrollbar" suppressHydrationWarning>
    
            <Chatbase room={room} users={users} messages={messages}/>
           

        </div>
    )


}
export default Chatroom;
