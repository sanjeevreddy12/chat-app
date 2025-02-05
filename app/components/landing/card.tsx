import { Card } from "../ui/card";

export function Fcard( {icon,title,description} : {
    icon:string;
    title:string;
    description:string;
}){
    return(
        <Card className="p-6 bg-card">
            <div className="text-3xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </Card>
    )

}