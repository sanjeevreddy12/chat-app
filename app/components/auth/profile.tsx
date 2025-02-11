import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import {  Photoavatar } from "../dashboard/avatar";

import dynamic from "next/dynamic";
const Signout = dynamic(()=> import("../auth/Signout"),{ssr : false});
import { Suspense, useState } from "react";
export function Profile({name,image}:{
    name:string , image?:string
}){
    const [logout , setlogout] = useState(false);
    return(
        <div>
            
            {logout && <Suspense fallback={<p>loading..</p>}> 
            <Signout open = {logout} setopen={setlogout}/>
            </Suspense>}
            <DropdownMenu>
                <DropdownMenuTrigger>
                   <Photoavatar name={name} image={image}/>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        My account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator>
                        
                    </DropdownMenuSeparator>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>setlogout(true)}>
                        Logout
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
    
}