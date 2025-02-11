import { Dispatch, SetStateAction } from "react";
import { AlertDialog , AlertDialogContent , AlertDialogHeader , AlertDialogTitle , AlertDialogDescription , AlertDialogFooter , AlertDialogCancel , AlertDialogAction } from "../ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { clearCache } from "@/lib/actions/cache";

interface DeleteChatProps {
    open: boolean;
    setopen: (open: boolean) => void;
    roomId: string;
    token: string;
}

 export const DeleteChat = ({ open, setopen, roomId, token }: DeleteChatProps) => {
    const handleDelete = async()=>{
        try{
            const response = await fetch(`http://localhost:8000/api/chat/${roomId}`,{
                method : "DELETE",
                headers :{
                    "Authorization" : `${token}` ,


                }
        })
        if(response.ok){
            toast({
                title : "Chat deleted successfully",
                description : "Your chat has been deleted",
            })
            clearCache("dashboard");
            setopen(false);
        }
        else{
            toast({
                title : "Error",
                description : "Failed to delete chat",
            })
        }
    }
    catch(error){
        console.log(error);
        toast({
            title : "Error",
            description : "Failed to delete chat",
        })
    }
}
    return(
        <AlertDialog open={open} onOpenChange={setopen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
       
    )
}
