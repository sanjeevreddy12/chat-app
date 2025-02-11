import {Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Photoavatar({name , image} :{
    name : string , image? : string
}){
    return(
        <>
        <Avatar>
            <AvatarImage src={image} >

            </AvatarImage>
            <AvatarFallback>
                {name[0]}

            </AvatarFallback>

        </Avatar>
        </>
    )
}