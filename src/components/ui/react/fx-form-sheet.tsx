import { useEffect, useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from './sheet';
import { Textarea } from './text-area';
import { toast } from 'sonner';
import { FXRecepientFormSheet } from './fx-recipient-form-sheet';
import { ReloadIcon } from '@radix-ui/react-icons';
import { ReloadAfter } from '@/utilities/helpers/reload';


export function FxFormSheet({token}:{token: string}) {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [currency, setCurrency] = useState('usd');

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    const getRecipients = () => {
        const recipientsData = JSON.parse(window.localStorage.getItem("@fx-recipients"));
        if (!recipientsData) {
            return;
        };
        const formattedRecipients = recipientsData.map(({ id }: { id: number }) => ({
            fxBidder: id
        }));
        return {
            recipients: formattedRecipients
        }
    }

    const addFx = async () => {
        setLoading(true)
        const { recipients } = getRecipients();
        
        const payload = {
            title: (document.querySelector('input[name="title"]') as HTMLInputElement)?.value,
            currency: currency,
            amount: (document.querySelector('input[name="amount"]') as HTMLInputElement)?.value,
            startTime: (document.querySelector('input[name="start-time"]') as HTMLInputElement)?.value,
            endTime: (document.querySelector('input[name="end-time"]') as HTMLInputElement)?.value,
            note: (document.querySelector('textarea[name="note"]') as HTMLInputElement)?.value,
            recipients: recipients
        } as const;

        if (!payload.title || !payload.currency || !payload.amount || !payload.startTime || !payload.endTime || payload.recipients.length < 1 ) {
            toast.error('All fields are required.');
            setLoading(false);
            return;
        }

        const res = await fetch('/api/v1/fx/add-new-fx', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "x-pol-rfx-secret": token,
                "Content-Type": "application/json"
            }
        });
        const responseMessage = await res.json();

        if (res?.status === 200) {
            setLoading(false);
            window.localStorage.removeItem('@fx-recipients')
            toast.success(responseMessage.message);
            setOpen(false)
            ReloadAfter(1500)
        } else {
            setLoading(false);
            toast.error(responseMessage.message);
        };
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button size="sm" className="bg-primary">Add New Fx</Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Add new fx</SheetTitle>
                    <SheetDescription>
                        Fill out the bid details correctly and save
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4">

                    <span className="w-full space-y-1">
                        <label className="text-xs text-muted-foreground" htmlFor="title">Title</label>
                        <Input type="text" name="title" placeholder="Fx bid title" className="border text-xs text-muted-foreground" />
                    </span>
                    <span className="w-full space-y-1">
                        <label className="text-xs text-muted-foreground" htmlFor="description">Currency</label>
                        <div className='flex flex-row gap-4'>
                            <select name="currency" className="border text-xs text-muted-foreground bg-transparent rounded-lg px-2" value={currency} onChange={handleCurrencyChange}>
                                <option value="usd">USD</option>
                                <option value="gbp">GBP</option>
                                <option value="euro">Euro</option>
                            </select>
                            <Input type="text" name="amount" placeholder="Fx amount" className="border text-xs text-muted-foreground" />
                        </div>
                    </span>
                    <div className="flex w-full justify-between space-x-4">
                        <span className="w-1/2 space-y-1">
                            <label className="text-xs text-muted-foreground" htmlFor="start-date">Start time</label>
                            <Input type="datetime-local" name="start-time" placeholder="Start date" className="border text-xs text-muted-foreground" />
                        </span>
                        <span className="w-1/2 space-y-1">
                            <label className="text-xs text-muted-foreground" htmlFor="end-date">End time</label>
                            <Input type="datetime-local" name="end-time" placeholder="End date" className="border text-xs text-muted-foreground" />
                        </span>
                    </div>

                    <div className="w-full space-y-1">
                        <label className="text-xs text-muted-foreground" htmlFor="end-date">Note</label>
                        <Textarea name="note" placeholder="Note" className="focus-visible:ring-0 dark:border-slate-100 text-xs text-muted-foreground focus:border-none focus:ring-0" />
                    </div>

                </div>
                <SheetFooter className="pt-8 flex flex-col">
                    <div className='w-full flex justify-end gap-x-4'>
                        <FXRecepientFormSheet token={token} />
                        <Button disabled={loading} size="sm" className='bg-primary px-6' onClick={addFx}>
                            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                            Add Fx
                        </Button>
                    </div>
                </SheetFooter>
                <p className="text-xs mt-4 text-muted-foreground">This fx will be saved to draft until you choose to publish. You can't send out an un-published fx.</p>
            </SheetContent>
        </Sheet>
    )
}

