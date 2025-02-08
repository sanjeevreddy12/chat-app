import { Dispatch, SetStateAction } from "react";
import { AlertDialog,AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { signOut } from "next-auth/react";

export function Signout({
    open,setopen 
}:{
    open : boolean , setopen : Dispatch<SetStateAction<boolean>>
;}){

    return(
        <AlertDialog open={open} onOpenChange={setopen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        You will be logged out
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={()=>{
                        signOut({
                            callbackUrl:"/",
                            redirect:true,
                        })
                    }}>
                        Continue

                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )


}