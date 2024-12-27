import { useEffect, useState } from 'react';
import { Button } from './button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from './sheet';
import { ReloadIcon } from '@radix-ui/react-icons';
import Select from "react-dropdown-select";
import { toast } from 'sonner';


export function FXRecepientFormSheet({token}: {token:string}) {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<any>([]);
    const [successText, setSuccessText] = useState<boolean>(false);
    const [fxbidders, setFxbidders] = useState([]);
    const [count, setCount] = useState(0);
    const [localData, setLocalData] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/v1/fx/fx-bidders', {
                headers: {
                    "x-pol-rfx-secret": token,
                    "Content-Type": "application/json"
                }
            });
            const fxbiddersList = await res.json();
            const filteredFxbiddersList = fxbiddersList.filter(bidder => bidder.user.role === 'fx-user');
            const modifiedFxBiddersList = filteredFxbiddersList.map(bidder => ({
                ...bidder,
                fullName: `${bidder.firstName} ${bidder.lastName ?? ""}` 
            }));
            setFxbidders(modifiedFxBiddersList)
        })();
    }, []);

    useEffect(() => {
        setCount(selected?.length < 1 ? localData?.length : selected?.length);
    }, [selected]);

    const handleAddRecepient = () => {
        setLoading(true);
        setTimeout(() => {
            window.localStorage.setItem("@fx-recipients", JSON.stringify(selected))
            setLoading(false);
            toast.info("Fx bidders list updated");
            setOpen(false);
        }, 1000);
    }

    useEffect(() => {
        const data = JSON.parse(window.localStorage.getItem("@fx-recipients"))
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
                            options={fxbidders}
                            values={localData ?? selected}
                            required
                            multi
                            searchable
                            className="dark:bg-natural"
                            searchBy="firstName"
                            color='#1b1d22'
                            name="recepients"
                            labelField={`fullName`}
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
