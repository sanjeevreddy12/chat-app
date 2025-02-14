
import { Sidebar } from "./Sidebar"
export default function Appbar({room , users}:{room : any,users : any}){
       console.log(room);
    return(
        <div>
           <nav className="flex justify-between items-center p-4 bg-gray-800 text-white border-b border-gray-700">
            <div className="flex space-x-4 md:space-x-0 items-center">
                <div className="md:hidden">
                    <Sidebar users={users}/>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
          {room.title}
        </h1>


               

            </div>
           
            
           </nav>
        </div>
    )
}
