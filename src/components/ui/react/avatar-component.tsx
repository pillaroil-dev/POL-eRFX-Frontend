import { Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';


interface AVATAR_PROPS {
    src?: string
    alt?: string
    fallbackText?: string
    userID?: number 
    email?: string
    phone?: string
    address?: string
    role?: string
    fullName?: string
}

export const AvatarComponent = ({ src, alt, fallbackText, userID, email, phone, address, role, fullName }: AVATAR_PROPS) => {

    return (
        
        <HoverCard openDelay={200}>
            <HoverCardTrigger>
                <Avatar>
                    <AvatarImage src={src} alt={alt} />
                    <AvatarFallback>{fallbackText?.charAt(0) ?? "Fx"}</AvatarFallback>
                </Avatar>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex flex-col space-y-1">
                    <p className="text-lg"><span className="text-primary !font-semibold">{fallbackText ?? `Fx Admin`}</span></p>
                    {fullName && <p className="text-sm">Name: <span className="text-muted-foreground">{fullName}</span></p>}
                    <p className="text-sm">Email: <span className="text-muted-foreground">{email}</span></p>
                    {role === 'user' && (
                        <>
                            <p className="text-sm">Phone: <span className="text-muted-foreground">{phone}</span></p>
                            <p className="text-sm">User ID: <span className="text-muted-foreground">{`PUID`+userID}</span></p>
                            <p className="text-sm">Address: <span className="text-muted-foreground">{address}</span></p>
                            <hr />
                            {!fullName && (<a href={`/u/${role}/members`} className="text-xs uppercase hover:text-primary/90 font-bold mt-2 pt-2 flex gap-x-2">
                                View Members <Users size={14} />
                            </a>)
                            }
                        </>
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>

    );
};