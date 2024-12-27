import { useEffect, useState } from 'react';
import { Button } from './button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from './sheet';
import { ReloadIcon } from '@radix-ui/react-icons';
import tenderStore from '@/store/tender';
import Select from "react-dropdown-select";
import { toast } from 'sonner';


export function RecepientFormSheet({token}: {token: string}) {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<any>([]);
    const [successText, setSuccessText] = useState<boolean>(false);
    const [vendor, setVendor] = useState([]);
    const [count, setCount] = useState(0);
    const [localData, setLocalData] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/v1/vendors', {
                    headers: {
                    "content-type": "application/json",
                    "x-pol-rfx-secret": token,
                },
              }
            );
            const vendorList = await res.json();

            setVendor(vendorList)
        })();
    }, []);

    useEffect(() => {
        setCount(selected?.length < 1 ? localData?.length : selected?.length)
    }, [selected]);

    const handleAddRecepient = () => {
        setLoading(true);
        setTimeout(() => {
            tenderStore.getState().$setTender({ recepients: selected });
            window.localStorage.setItem("@recipients", JSON.stringify(selected))
            setLoading(false);
            toast.info("Recepients list updated");
            setOpen(false);
        }, 1000);
    }

    useEffect(() => {
        const data = JSON.parse(window.localStorage.getItem("@recipients"))
        setLocalData(data);
    }, [])
    

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button size="sm" className="">Choose recepients</Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Add recepients</SheetTitle>
                    <SheetDescription>
                        Select vendors you want to send this tender to
                    </SheetDescription>
                </SheetHeader>
                <div className='flex flex-col w-full'>
                    <div className='mt-6'>
                        <Select
                            options={vendor}
                            values={localData ?? selected}
                            required
                            multi
                            searchable
                            className="dark:bg-natural"
                            searchBy="companyName"
                            color='#1b1d22'
                            name="recepients"
                            labelField='companyName'
                            valueField='id'
                            onChange={setSelected}
                        />
                    </div>
                    <SheetFooter className="pt-8 flex justify-between gap-x-4">
                        <div className='font-normal flex py-1 text-foreground'>Recepient count: <p className='font-bold pl-1 '> {count}</p></div>
                        <Button size="sm" disabled={loading} onClick={handleAddRecepient}>
                            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                            Add recepient
                        </Button>
                        
                    </SheetFooter>
                    {successText && <span className='flex pt-2 text-xs text-green-600 justify-end flex-end'>Recepients list updated</span>}
                </div>
            </SheetContent>
        </Sheet>
    )
}
