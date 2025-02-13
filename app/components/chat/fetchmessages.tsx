export async function fetchMessages(id:string){
    const response = await fetch(`http://localhost:8000/api/messages/${id}`,{
        cache : "no-cache",
       
    });
    console.log("response",response);
    if(!response.ok){
        throw new Error("Failed to fetch messages");
    }
    const data = await response.json();
    if(data?.data){
        return data.data;
    }
    return [];
}
