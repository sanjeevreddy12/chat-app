

export async function fetchroom(id:string){
    const response = await fetch(`http://localhost:8000/api/chat/${id}`,{
       
        method : "GET"

    });
    if(!response.ok){
        throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    console.log(data);
    if(data?.data){
        return data.data;
    }
    return null;
}

export async function FetchUsers(id:string){
    const response = await fetch(`http://localhost:8000/api/users/${id}`,{
        cache : "no-cache",
        method : "GET"
    });
    if(!response.ok){
        throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    if(data?.data){
        return data.data;
    }   
    return [];

}
