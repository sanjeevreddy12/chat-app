import {Request,Response} from "express";
import prisma from "../config/db.config";
import jwt from "jsonwebtoken";
interface signinBody{
    email : string;
    name : string;
    provider : string;
    oauth_id : string;
    image?:string;

}


const signin = async(req : Request , res : Response)=>{
    try {
        const body:signinBody = req.body;
        const user = await prisma.user.findUnique({
            where:{
                email : body.email

            }
        })
        if(!user){
            await prisma.user.create({
                data : body

                

            })
            
        }
        const jwtpayload ={
            name : body.name,
            email : body.email,
            id : user?.id,

        }
        const token = jwt.sign(jwtpayload , process.env.JWTSECRET as string);
        return res.json({
            message : "User Loggedin Successfully",
            user : {
                ...user,
                token : `Bearer ${token}`
            }
        })
    }
    catch(e){
        return res.json({
            message : "Internal Server Error"
        })
    }

}