import { Chatbase } from "@/components/chat/chatbase"

 const Chatroom = ({params} : {params : {id :String}})=>{
    return(
        <div>
            `id of you is ${params.id}`
            <Chatbase/>

        </div>
    )


}
export default Chatroom;
