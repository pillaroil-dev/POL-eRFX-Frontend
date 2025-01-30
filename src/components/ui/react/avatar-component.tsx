import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

export const AvatarComponent = ({ src, alt, fallbackText, userID, email, phone, address, role }) => {
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
                    <p className="text-sm">Email: <span className="text-muted-foreground">{email}</span></p>
                    {role !== 'admin' && role !== 'operator' && (
                        <>
                            <p className="text-sm">Phone: <span className="text-muted-foreground">{phone}</span></p>
                            <p className="text-sm">User ID: <span className="text-muted-foreground">{`PUID`+userID}</span></p>
                            <p className="text-sm">Address: <span className="text-muted-foreground">{address}</span></p>
                        </>
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>

    );
};