 export type chatgroup = {
    id : string;
    title : string;
    password : string;
    created_at : string;
    
}
export async function fetchRooms(token : string){
    try{
    const response = await fetch("http://localhost:8000/api/chats",{
        method : "GET",

        headers : {
            Authorization : `${token}`,
        },
        next : {
            revalidate : 60*60,
            tags : ["dashboard"]
        }
    }

)
console.log(response);
if(!response.ok){
    throw new Error("Failed to fetch rooms");
}
const responseData = await response.json();
console.log(responseData);
if(responseData.chats){
   return responseData.chats;
}
return [];
}
catch(error){
    console.error("Error fetching rooms:", error);
    return [];
}


}
