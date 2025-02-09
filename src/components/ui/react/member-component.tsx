import React, {useState} from "react"
import {actions} from "astro:actions"
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ReloadAfter } from "@/utilities/helpers/reload";

interface Member {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    address: string;
    userId:  number;
}

export default function MemberComponent({member}: {member: Member}) {
    const [loading, setLoading] = useState(false);

    const deleteMember = async (id: number) => {
        if (confirm("Are you sure you want to delete this member?")) {
            try {
                setLoading(true)
                //@ts-ignore
                const {data, error} = await actions.createMemberAction.delete({id: id})
                if (error) throw error;
                toast.success(data.message);
                ReloadAfter(500)
            } catch (error) {
                toast.error(error);
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <>
        <div className={`w-full group`}>
          <div className={`${loading ? "bg-red-300 dark:bg-red-400 opacity-65" : "bg-background"} p-4 rounded-xl shadow-sm`}>
            <div className="flex items-center gap-x-2">
              <div className="w-full relative">
                <h4 className="text-foreground font-bold text-lg">{member.fullname}</h4>
                <div className="w-full flex justify-between relative">
                    <span className="w-3/5 flex flex-col flex-start">
                        <p className="text-foreground font-xs">{member.address}</p>
                        <p className="text-foreground font-xs">{member?.email}</p>
                        <p className="text-foreground font-xs">{member.phone}</p>
                    </span>

                    <span className="flex flex-col space-y-4 items-center">
                        <p className="text-xs text-primary font-medium">{`PUID `+member.userId}</p>
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                            <span className="uppercase text-2xl font-bold text-foreground">{member?.fullname?.charAt(0)}</span>
                        </div>
                    </span>
                </div>
                <span className="absolute -top-6 -right-5 bg-red-500 p-2 rounded-full cursor-pointer hover:bg-red-500/70 hidden group-hover:block transition-all duration-300"><Trash2 size={14} className="!text-background" onClick={() => deleteMember(member.id)} />
                </span>
              </div>
            </div>
              </div>
        </div>
        </>
    )
}