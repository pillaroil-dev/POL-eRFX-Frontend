import { useEffect, useRef, useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from './sheet';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { Checkbox } from './checkbox';
import { ReloadAfter } from '@/utilities/helpers/reload';

export function VendorFormSheet({token}: {token:string}) {
    const [loading, setLoading] = useState(false);
    //control sheet state
    const [open, setOpen] = useState(false);
    const [checkFalcon, setCheckFalcon] = useState(false);
    const [checkVerify, setCheckVerify] = useState(false);


    const addVendor = async () => {
        setLoading(true)
        const companyName = (document.querySelector('input[name="company_name"]') as HTMLInputElement).value;
        const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value;
        const businessPhone = (document.querySelector('input[name="business_phone"]') as HTMLInputElement).value;
        const homePhone = (document.querySelector('input[name="home_phone"]') as HTMLInputElement).value;
        const falconRegistration = checkFalcon;
        const manualVerification = checkVerify;

        const payload = {
            companyName,
            email,
            businessPhone,
            homePhone,
            falconRegistration,
            manualVerification
        }

        if (!companyName || !email || !businessPhone || !homePhone) {
            toast.error('All fields are required.');
            setLoading(false)
            return;
        }

        const res = await fetch('/api/v1/vendors/add-vendor', {
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
            setOpen(false);
            ReloadAfter(1000);
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
                    <SheetTitle>Add new vendor</SheetTitle>
                    <SheetDescription>
                        Fill out the vendor details correctly and save
                    </SheetDescription>
                </SheetHeader>
                <div className='flex flex-col w-full'>
                    <div className="flex flex-col gap-4 py-4">

                        <span className="w-full space-y-1">
                            <label className="text-xs text-muted-foreground" htmlFor="company_name">Company</label>
                            <Input required type="text" name="company_name" placeholder="Company name" className="border text-xs text-muted-foreground" />
                        </span>
                        <span className="w-full space-y-1">
                            <label className="text-xs text-muted-foreground" htmlFor="email">Email</label>
                            <Input required type='email' name="email" placeholder="Email address" className="text-xs border text-muted-foreground  focus-visible:ring-0" />
                        </span>
                        <span className="w-full space-y-1">
                            <label className="text-xs text-muted-foreground" htmlFor="business_phone">Business phone</label>
                            <Input required name="business_phone" maxLength={11} placeholder="Enter business phone" className="text-xs border text-muted-foreground" />
                        </span>
                        <span className="w-full space-y-1">
                            <label className="text-xs text-muted-foreground" htmlFor="home_phone">Home phone</label>
                            <Input name="home_phone" maxLength={11} placeholder="Enter home phone" className="text-xs border text-muted-foreground" />
                        </span>

                        <div className="w-fulll flex gap-8">
                            <div className="flex items-center space-x-2 my-2">
                                <label
                                    htmlFor="falcon_registration"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                                >
                                    JV registration?
                                </label>
                                <Checkbox checked={checkFalcon} onCheckedChange={() => setCheckFalcon(!checkFalcon)} name="falcon_registration" />
                            </div>
                            <div className="flex items-center space-x-2 my-2">
                                <label
                                    htmlFor="manual_verification"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                                >
                                    Verify and Send Password?
                                </label>
                                <Checkbox checked={checkVerify} onCheckedChange={() => setCheckVerify(!checkVerify)} name="manual_verification" />
                            </div>
                        </div>
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
