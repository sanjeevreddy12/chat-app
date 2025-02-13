 import { Request,Response } from "express";
import prisma from "../config/db.config";
export async function getUsers(req : Request , res : Response){
    try{
        const {roomId} = req.query;
        const users = await prisma.groupUsers.findMany({
            where : {
                group_id : roomId as string,
            }

        })
        return res.json({
            message : "Users Fetched Successfully" , data : users
        })

    }
    catch(e){
        return (
            res.json({
                message : "Failed to fetch Users try again."
            })
        )
    }

}

export async function  CreateUser(req : Request , res :Response) {
    try {
        const body = req.body;
        const user = await prisma.groupUsers.create({
            data : body
        });
        console.log(user);
        return res.json({
            
            message : "User Created Successfully" , data:{user:user}
        })
    }
    catch(e){
        return res.json({msg : "Try Again"})
    }

}
