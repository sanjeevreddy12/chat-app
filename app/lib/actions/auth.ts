import axios, { AxiosError } from "axios";
import { Account, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import { redirect } from "next/navigation";


export interface User {
    id?: string | null;
    name? : string | null;
    email?: string | null;
    image?: string | null;
    provider?: string | null;
    token?: string | null;

}
export interface CustomSession {
    user?: User;
    expires: ISODateString;
  }
export const authoptions = {
    
    
    providers : [
        Google({
            clientId : process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization : {
                params : {
                promt: "consent",
                access_type : "offline",
                response_type : "code",
                }
            }
        })
    ],
    pages : {
        signIn : "/",
    },

    callbacks : {
        async signIn({
            user,
            account
        }:{
            user : User;
            account : Account | null;
        }){
            try{
                const payload = {
                    email : user.email,
                    name : user.name,
                    oauth_id : account?.providerAccountId,
                    provider:account?.provider,
                    image : user.image,
                };
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, payload);
                const data = response.data;
               
                user.id = data.user.id.toString();
                user.token = data.user.token;
                return true;


            }
            catch (error) {
                if(error instanceof AxiosError){
                    return redirect(`auth/error?message=${error.message}`);
                }
                return redirect(
                    `/auth/error?message=Something went wrong.please try again!`
                  );
            }

        },
        async session({
            session,
            token,
            user,
          }: {
            session: CustomSession;
            token: JWT;
            user: User;
          }) {
            session.user = token.user as User;
            return session;
          },

    }
}