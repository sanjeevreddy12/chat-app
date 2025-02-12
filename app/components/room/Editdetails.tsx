"use client"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { z } from "zod"
import { useState } from "react"
import { Dispatch, SetStateAction } from "react"
import { CustomUser } from "@/lib/actions/auth"
import { toast} from "@/hooks/use-toast"
import { clearCache } from "@/lib/actions/cache"

const createChatSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const Editdetails = ({user,roomId,open,setopen}:{user:CustomUser,roomId:string,open:boolean,setopen:Dispatch<SetStateAction<boolean>>}) => {
    
    
    const [title, setTitle] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ title?: string; password?: string }>({});
    

    const validateForm = () => {
        try {
            createChatSchema.parse({ title, password });
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formattedErrors : { title?: string; password?: string } = {};
                error.errors.forEach((err : any) => {
                    //@ts-ignore
                    formattedErrors[err.path[0]] = err.message;
                });
                setErrors(formattedErrors);
            }
            return false;
        }
    };


    
    const handleEditChat = async () => {
        if (!validateForm()) return;
        
        try {
            const response = await fetch(`http://localhost:8000/api/chat/${roomId}`, {
                method: "PUT",
                body: JSON.stringify({
                    title,
                    password
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${user.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to create chat');
            }

            const data = await response.json();
              toast ({ 
                  title: "Success",
                description: "Chat created successfully!",
            });
            clearCache("dashboard");
            setopen(false);
            setTitle("");
            setPassword("");
        } catch (error) {
            toast({ 
                title: "Error",
                description: "Failed to create chat. Please try again.",
                variant: "destructive",
            });
        }
    };

  
    return (
        <Dialog open={open} onOpenChange={setopen}>
           
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Chat</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Chat Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter chat title"
                        />
                        {errors.title && (
                            <span className="text-sm text-red-500">{errors.title}</span>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter chat password"
                        />
                        {errors.password && (
                            <span className="text-sm text-red-500">{errors.password}</span>
                        )}
                    </div>
                </div>
                <Button onClick={handleEditChat}>
                    EditChat
                </Button>
            </DialogContent>
        </Dialog>
    )
}   
