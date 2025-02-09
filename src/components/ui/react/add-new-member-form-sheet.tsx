import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from './sheet';
import { toast } from 'sonner';
import { ReloadIcon } from '@radix-ui/react-icons';
import { actions } from 'astro:actions';
import { ReloadAfter } from '@/utilities/helpers/reload';


export function AddNewMemberFormSheet({contractorId}: {contractorId: number}) {

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        fullname: '',
        email: '',
        memberAddress: '',
        memberPhone: '',
        userId: contractorId
    })

    const addMember = async () => {
        setLoading(true);
        try {
            //@ts-ignore
            const {data, error} = await actions.createMemberAction.create(payload);
            if (error) throw error;
            toast.success(data.message);
            setOpen(false);
            ReloadAfter(500);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button size="sm" className="bg-primary">Add New Member</Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Add New Member</SheetTitle>
                    <SheetDescription>
                        Fill out the details correctly and save
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4">

                    <span className="w-full space-y-1">
                        <label className="text-xs text-muted-foreground" htmlFor="title">Full Name</label>
                        <Input type="text" value={payload.fullname} onChange={(e) => setPayload({ ...payload, fullname: e.target.value })} name="fullname" placeholder="Member Full Name" className="border text-xs text-muted-foreground" />
                    </span>
                    <span className="w-full space-y-1">
                        <label className="text-xs text-muted-foreground" htmlFor="description">Email</label>
                        <Input type="email" value={payload.email} onChange={(e) => setPayload({ ...payload, email: e.target.value })} name="email" placeholder="Email Address" className="border text-xs text-muted-foreground" />
                    </span>
                    <span className="w-full space-y-1">
                        <label className="text-xs text-muted-foreground" htmlFor="location">Address</label>
                        <Input name="address" value={payload.memberAddress} onChange={(e) => setPayload({ ...payload, memberAddress: e.target.value })} placeholder="Address" className="text-xs border text-muted-foreground" />
                    </span>
                    <span className="w-full space-y-1">
                        <label className="text-xs text-muted-foreground" htmlFor="location">Phone</label>
                        <Input name="phone" value={payload.memberPhone} onChange={(e) => setPayload({ ...payload, memberPhone: e.target.value })} placeholder="Phone Number" className="text-xs border text-muted-foreground" />
                    </span>

                </div>
                <SheetFooter className="pt-8 flex flex-col">
                    <div className='w-full flex justify-end gap-x-4'>
                        <Button size="sm" disabled={loading} onClick={addMember} className='bg-primary'>
                            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? 'Adding...' : 'Add Member'}
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
};