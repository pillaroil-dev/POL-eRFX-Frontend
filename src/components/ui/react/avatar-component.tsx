import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

export const AvatarComponent = ({ src, alt, fallbackText }) => {
    return (
        
        <HoverCard openDelay={200}>
            <HoverCardTrigger>
                <Avatar>
                    <AvatarImage src={src} alt={alt} />
                    <AvatarFallback>{fallbackText?.charAt(0) ?? "Fx"}</AvatarFallback>
                </Avatar>
            </HoverCardTrigger>
            <HoverCardContent>
                {fallbackText ?? `Fx Admin`}
            </HoverCardContent>
        </HoverCard>

    );
};