import { Request, Response } from "express"
import prisma from "../config/db.config";

export const getchats = async(req : Request , res : Response)=>{
    try {
        //@ts-ignore
        const user = req.user;
        const chats = await prisma.chatGroups.findMany({
            where : {
                user_id : user.id
            },
            orderBy : {
                created_at : "desc"
            }
        });
        return res.status(200).json({
            message : "Chats fetched successfully",
            chats
        });
    } catch(e) {
        console.error(e);
        return res.status(500).json({
            message : "Something went wrong"
        });
    }
}
export const getchat = async(req : Request , res : Response)=>{
    try {
        const {id} = req.params;
        const chat = await prisma.chatGroups.findUnique({
            where : {
                id : id
            }
        })
        return res.status(200).json({
            message : "Chat fetched successfully",
            chat
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message : "Something went wrong when fetching "
        });
    }
}
export const updatechat = async(req : Request , res : Response)=>{

    try {
        const {id} = req.params;
        const body = req.body;
        const updatedchat = await prisma.chatGroups.update({
            where : {
                id : id
            },
            data : {
                title : body.title,
                password : body.password
            }
        })
        return res.status(200).json({
            message : "Chat updated successfully",
            updatedchat
        });
    } catch (error) {
        return res.status(500).json({
            message : "Something went wrong while updating "
        });
    }

}
export const deletechat = async(req : Request , res : Response)=>{
    try {
        const {id} = req.params;
        const deletedchat = await prisma.chatGroups.delete({
            where : {
                id : id
            }
        })
        return res.status(200).json({
            message : "Chat deleted successfully",
            deletedchat
        });
    } catch (error) {
        return res.status(500).json({
            message : "Something went wrong while deleting "
        });
    }
}

export const Chat = async (req: Request, res: Response) => {
    try {
        const { title, password ,user_id} = req.body;
    
       

        const chat = await prisma.chatGroups.create({
            data: {
                title,
                password,
                user_id: user_id  
            }
        });

        return res.status(200).json({
            message: "Chat group created successfully",
            chat
        });
    } catch(e) {
        console.error(e);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}