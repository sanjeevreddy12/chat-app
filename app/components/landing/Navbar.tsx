
import Link from "next/link"
import Signin  from "../auth/Signin"
import { Button } from "../ui/button"
import { CustomUser } from "@/lib/actions/auth"

interface NavbarProps {
  user: CustomUser | null;
}

export const Navbar = ({ user }: NavbarProps) => {
    return(
        <div className=" p-6 flex justify-between bg-white ">
            <h1 className="text-xl md:text-2xl font-extrabold">
                chat-app
            </h1>
            <div className="flex items-center gap-2 md:gap-6 text-gray-500">
                <Link href={"/"}>Home</Link>
                <Link href={"#features"} >Features</Link>
                {
                    !user ? (
                        <Signin/>

                    ):
                    (
                        <Link href={"/dashboard"}>
                            <Button>Dashboard</Button>
                        </Link>
                    )
                }
                

            </div>

        </div>
    )
}