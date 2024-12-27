import { useEffect, useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from './sheet';
import { Textarea } from './text-area';
import { toast } from 'sonner';
import { ReloadIcon } from '@radix-ui/react-icons';
import { RecepientFormSheet } from './recepient-form-sheet';
import { FileUploader } from './uploader';
import { ReloadAfter } from '@/utilities/helpers/reload';


export function TenderFormSheet({token, bucketName}: {token: string, bucketName: string}) {

    const [open, setOpen] = useState(false);
    // const [items, setItems] = useState([{ name: '', quantity: '', unit: '' }]);

    // const handleAddItem = () => {
    //     setItems([...items, { name: '', quantity: '', unit: '' }]);
    // };

    // const handleItemChange = (index, event) => {
    //     const { name, value } = event.target;
    //     const updatedItems = [...items];
    //     updatedItems[index][name] = value;
    //     setItems(updatedItems);
    // };

    const [loading, setLoading] = useState(false);

    const resolveFileAndRecepients = async () => {
        const files = await JSON.parse(window.localStorage.getItem("@files"));
        const recipientsData = await JSON.parse(window.localStorage.getItem("@recipients"));
        
        const formattedRecipients = recipientsData?.map((item) => ({
            contractorId: item.id,
            bidId: item.email
        }));
        return {
            files,
            formattedRecipients
        }
        
    };

    const addTender = async () => {
        setLoading(true)
        const { files, formattedRecipients } = await resolveFileAndRecepients();
        const payload = {
            title: (document.querySelector('input[name="title"]') as HTMLInputElement).value,
            description: (document.querySelector('textarea[name="description"]') as HTMLTextAreaElement).value,
            location: (document.querySelector('input[name="location"]') as HTMLInputElement).value,
            startDate: (document.querySelector('input[name="start-date"]') as HTMLInputElement).value,
            endDate: (document.querySelector('input[name="end-date"]') as HTMLInputElement).value,
            // items: items,
            files: files,
            recipients: formattedRecipients
        };

        if (!payload.title || !payload.description || !payload.location || !payload.startDate || !payload.endDate || !payload.files || !payload.recipients) {
            toast.error('All fields are required.');
            setLoading(false);
            return;
        }

        const res = await fetch('/api/v1/tenders/add-tender', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "x-pol-rfx-secret": token,
                "Content-type": "application/json"
            }
        });
        const responseMessage = await res.json();

        if (res?.status === 200) {
            setLoading(false);
            window.localStorage.removeItem('@files')
            window.localStorage.removeItem('@recipients')
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
                <Button size="sm" className="bg-primary">Create new tender</Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Add new tender</SheetTitle>
                    <SheetDescription>
                        Fill out the bid details correctly and save
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4">

                    <span className="w-full space-y-1">
                        <label className="text-xs text-muted-foreground" htmlFor="title">Title</label>
                        <Input type="text" name="title" placeholder="Tender title" className="border text-xs text-muted-foreground" />
                    </span>
                    <span className="w-full space-y-1">
                        <label className="text-xs text-muted-foreground" htmlFor="description">Description</label>
                        <Textarea name="description" placeholder="Write a simple description of this tender" className="text-xs border text-muted-foreground  focus-visible:ring-0 dark:border-slate-100" />
                    </span>
                    <span className="w-full space-y-1">
                        <label className="text-xs text-muted-foreground" htmlFor="location">Location</label>
                        <Input name="location" placeholder="Project location" className="text-xs border text-muted-foreground" />
                    </span>


                    <div className="flex w-full justify-between space-x-4">
                        <span className="w-1/2 space-y-1">
                            <label className="text-xs text-muted-foreground" htmlFor="start-date">Start date</label>
                            <Input type="date" name="start-date" placeholder="Start date" className="border text-xs text-muted-foreground" />
                        </span>
                        <span className="w-1/2 space-y-1">
                            <label className="text-xs text-muted-foreground" htmlFor="end-date">End date</label>
                            <Input type="date" name="end-date" placeholder="End date" className="border text-xs text-muted-foreground" />
                        </span>
                    </div>
                    {/* <div className="w-full">
                        <label className="text-xs text-muted-foreground" htmlFor="items">Item(s)</label>
                        {items.map((item, index) => (
                            <div key={index} className="flex justify-betweeen my-2 space-x-2">
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Description"
                                    value={item.name}
                                    onChange={(e) => handleItemChange(index, e)}
                                    className="item border text-xs text-muted-foreground w-[60%]"
                                />
                                <Input
                                    type="number"
                                    name="quantity"
                                    placeholder="Quantity"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, e)}
                                    className="item border text-xs text-muted-foreground w-[20%]"
                                />
                                <Input
                                    type="text"
                                    name="unit"
                                    placeholder="Unit"
                                    value={item.unit}
                                    onChange={(e) => handleItemChange(index, e)}
                                    className="item border text-xs text-muted-foreground w-[20%]"
                                />
                            </div>
                        ))}
                        <Button
                            variant="outline"
                            className="flex justify-end self-end float-end mt-2 text-[10px] text-muted-foreground"
                            size="sm"
                            onClick={handleAddItem}
                        >
                            + Add more
                        </Button>
                    </div> */}
                    <div className="w-full flex flex-col space-y-2">

                        <div className='flex justify-between my-2'>
                            <label className="text-xs text-muted-foreground font-semibold" htmlFor="items">Supporting documents</label>
                        </div>
                        <FileUploader bucketName={bucketName} />
                    </div>


                    <div className="w-full space-y-2">
                        <label className="text-xs text-muted-foreground font-bold" htmlFor="items">Upload ALL supporting documents partaining this tender</label>
                    </div>

                </div>
                <SheetFooter className="pt-8 flex flex-col">
                    <div className='w-full flex justify-end gap-x-4'>
                        {/* <p className='flex-start justify-start text-sm font-medium text-foreground mt-1'>{tenderStore.getState().$recipients.length} Recipients selected</p> */}
                        <RecepientFormSheet token={token} /> 
                        <Button size="sm" disabled={loading} onClick={addTender} className='bg-primary'>
                            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                            Add tender
                        </Button>
                    </div>
                </SheetFooter>
                <p className="text-xs mt-4 text-muted-foreground">This tender will be saved to draft until you choose to publish. You can't send out an un-published tender.</p>
            </SheetContent>
        </Sheet>
    )
}

