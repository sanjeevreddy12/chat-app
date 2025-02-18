"use client"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { signIn } from "next-auth/react";

export   default function Signin(){
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    lets Start
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Welcome to Chat-app
                    </DialogTitle>
                    <DialogDescription>
                        Chat-app makes life easy by creating links and makes conversations in seconds
                    </DialogDescription>
                </DialogHeader>
                <Button variant={"outline"} onClick={async  () => {
                    try {
                        console.log("signing in");
                        await signIn("google", {
                            redirect: true,
                            callbackUrl: "/dashboard",
                        });


                    } catch (error) {

                        console.log("cjsdclcwcwkcwkccccckmcklcmlkc");
                        console.log(error);
                        console.error("Sign in error:", error);
                    }
                }}>

                    Continue with google
                </Button>
            </DialogContent>
        </Dialog>
    )
}