import { CustomUser } from "@/lib/actions/auth";
import { chatgroup } from "./fetchrooms";
import { Card , CardHeader , CardTitle , CardContent } from "../ui/card";
import { Editroom } from "./Editroom";

interface ChatcardProps {
  props: {
    room: chatgroup;
    user: CustomUser | null;
  }
}

export const Chatcard = ({ props: { room, user } }: ChatcardProps) => {
    return(
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>{room.title}</CardTitle>
                <Editroom room={room} user={user!} />
            </CardHeader>
            <CardContent>
                <p>
                    password : {room.password}
                </p>
                <p>
                    created at : {new Date(room.created_at).toDateString()}
                </p>
            </CardContent>
        </Card>
    )
}