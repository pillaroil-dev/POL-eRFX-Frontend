import { useEffect, useRef, useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from './sheet';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { Checkbox } from './checkbox';

export function FxVendorFormSheet({ token }: { token: string }) {
    const [loading, setLoading] = useState(false);
    //control sheet state
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);


    const addVendor = async () => {
        setLoading(true)
        const firstName = (document.querySelector('input[name="first_name"]') as HTMLInputElement).value;
        const lastName = (document.querySelector('input[name="last_name"]') as HTMLInputElement).value;
        const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value;
        const businessPhone = (document.querySelector('input[name="business_phone"]') as HTMLInputElement).value;

        const payload = {
            firstName,
            lastName,
            email,
            businessPhone,
        }

        if (!firstName || !lastName || !email || !businessPhone) {
            toast.error('All fields are required.');
            setLoading(false)
            return;
        }

        const res = await fetch('/api/v1/fx/add-fx-vendor', {
            method: 'post',
            body: JSON.stringify(payload),
            headers: {
                "x-pol-rfx-secret": token,
                "Content-Type": "application/json"
            }
        })
        const responseMessage = await res.json();

        if (res.status === 200) {
            setLoading(false);
            toast.success(responseMessage.message);
            setOpen(false)
        } else {
            setLoading(false);
            toast.error(responseMessage.message);
        }
    };


    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button size="sm" className="bg-primary">Add vendor</Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Add new fx vendor</SheetTitle>
                    <SheetDescription>
                        Fill out the vendor details correctly and save
                    </SheetDescription>
                </SheetHeader>
                <div className='flex flex-col w-full'>
                    <div className="flex flex-col gap-4 py-4">

                        <span className="w-full space-y-1">
                            <label className="text-xs text-muted-foreground" htmlFor="first_name">First name</label>
                            <Input required type="text" name="first_name" placeholder="First name" className="border text-xs text-muted-foreground" />
                        </span>
                        <span className="w-full space-y-1">
                            <label className="text-xs text-muted-foreground" htmlFor="last_name">Last name</label>
                            <Input required type="text" name="last_name" placeholder="Last name" className="border text-xs text-muted-foreground" />
                        </span>
                        <span className="w-full space-y-1">
                            <label className="text-xs text-muted-foreground" htmlFor="email">Email</label>
                            <Input required type='email' name="email" placeholder="Email address" className="text-xs border text-muted-foreground  focus-visible:ring-0" />
                        </span>
                        <span className="w-full space-y-1">
                            <label className="text-xs text-muted-foreground" htmlFor="business_phone">Business phone</label>
                            <Input required name="business_phone" maxLength={11} placeholder="Enter business phone" className="text-xs border text-muted-foreground" />
                        </span>
                    </div>
                    <SheetFooter className="pt-8 flex flex-row">
                        <Button size="sm" disabled={loading} onClick={addVendor}>
                            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                            Add vendor
                        </Button>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    )
}
