import { Button } from './button'
import { Input } from './input'
import { Textarea } from './text-area'
import { Badge } from './badge'
import { useRef, useState } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'
import { FilesListComponent } from './files-list-component';
import { ReloadAfter } from '@/utilities/helpers/reload'
import { EditIcon } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog"
import Cookies from 'js-cookie'

// Define the main component for managing tenders
export function ManageTenderComponent({ result, token, role, bucketPublicDomain }: { result: any, token: string, role: string, bucketPublicDomain : string}) {
    // State hooks for managing component state
    const [loading, setLoading] = useState(false);
    const [showOtpField, setShowOtpField] = useState(false);
    const otpRef = useRef(null);

    // Handler for sending tender data
    const sendTenderHandler = async () => {
        setLoading(true)
        try {
            // API call to send tender
            const res = await fetch('/api/v1/tenders/send-tender', {
                method: "POST",
                body: JSON.stringify(result),
                headers: {
                    "x-pol-rfx-secret": token,
                    "Content-Type": "application/json"
                }
            });
            const response = await res.json();
            // Handle response
            if (res.status === 200) {
                setLoading(false);
                toast.success(response.message)
                ReloadAfter(1500)
            } else {
                setLoading(false);
                toast.error(response.message)
            }
        } catch (error) {
            console.log(error)
        }
        
    };

    // State for managing end date update
    const [newEndDate, setNewEndDate] = useState(null);
    const [open, setOpen] = useState(false);

    // Handler for initiating update process
    const handleUpdate = async () => {
        setLoading(true)
        // Generate OTP and set cookie
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        Cookies.set("date-change-otp", otp, { expires: 1 / 96, path: '/' });
        try {
            // API call to request OTP
            const res = await fetch('/api/v1/tenders/extend-end-date', {
                method: "POST",
                body: JSON.stringify({ otp }),
                headers: {
                    "x-pol-rfx-secret": token,
                    "Content-Type": "application/json"
                }
            });

            // Handle response
            if (res.status === 200) {
                setLoading(false)
                toast.info(`OTP verification sent.`);
                setShowOtpField(true)
            } else {
                setLoading(false)
                toast.error("Failed to send OTP");
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error("Failed to send OTP");
        }
    };

    // Handler for saving the updated end date
    const saveUpdate = async () => {
        setLoading(true)
        try {
            const otp = Cookies.get("date-change-otp");
            // Validate OTP input
            if (!otpRef.current.value) {
                setLoading(false)
                return;
            }

            if (otpRef.current.value !== otp) {
                setLoading(false)
                toast.error("Invalid OTP! Try again.")
            } else {
                // API call to verify OTP and update end date
                const res = await fetch('/api/v1/tenders/verify-otp', {
                    method: "POST",
                    body: JSON.stringify({ newEndDate, tenderId: result.tender.id }),
                    headers: {
                        "x-pol-rfx-secret": token,
                        "Content-Type": "application/json"
                    }
                });

                const response = await res.json();
                // Handle response
                if (res.status === 200) {
                    setLoading(false);
                    toast.success(response.message);
                    ReloadAfter(1500);
                } else {
                    setLoading(false);
                    toast.error(response.message);
                }
            }
            
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("An error occurred while updating the end date.");
        }
    };

    // Render component UI
    return (
        <div
            className="flex flex-col bg-slate-100 dark:bg-natural gap-x-4 ml-24 w-[calc(100%-7rem)] p-8 mt-24 mb-8 h-full rounded-2xl">
            <div className="flex flex-row gap-8 text-foreground">
                <div className="w-full">
                    <h1 className="text-xl font-bold mb-4">Manage Tender</h1>
                    <div className="flex flex-col md:flex-row space-x-4 w-full">
                        <div className="w-full md:w-3/5">
                            <h2 className="font-semibold">General information</h2>
                            <div className="flex flex-col my-8 gap-y-4">
                                <div className="flex justify-between gap-x-4 w-full">
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-500">Title</label
                                        >
                                        <Textarea
                                            id='title'
                                            className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                            defaultValue={result?.tender?.title}
                                            readOnly
                                        />
                                    </span>
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="location"
                                            className="block text-sm font-medium text-gray-500"
                                        >Location</label
                                        >
                                        <Input
                                            id='location'
                                            className="text-foreground font-medium text-lg w-full"
                                            defaultValue={result?.tender?.location}
                                            readOnly
                                        />
                                    </span>
                                </div>

                                <div className="flex justify-between gap-x-4 w-full">
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="start-date"
                                            className="block text-sm font-medium text-gray-500"
                                        >Start Date</label
                                        >
                                        <Input
                                            id='start-date'
                                            className="text-foreground font-medium text-lg w-full"
                                            defaultValue={new Date(
                                                result?.tender?.startDate
                                            ).toDateString()}
                                            readOnly
                                        />
                                    </span>
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="end-date"
                                            className="block text-sm font-medium text-gray-500"
                                        >End Date</label>
                                        <span className='flex w-3/4'>
                                            <Input
                                                id='end-date'
                                                className="text-foreground font-medium text-lg w-full"
                                                defaultValue={new Date(
                                                    result?.tender?.endDate
                                                ).toDateString()}
                                                readOnly />
                                            
                                            {/** Dialog for end date change **/}
                                            {role === 'admin' && <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                                                <DialogTrigger>
                                                    <EditIcon className='cursor-pointer' onClick={() => setOpen(true)} />
                                                </DialogTrigger>
                                                <DialogContent className='text-foreground'>
                                                    <DialogHeader>
                                                        <DialogTitle>Extend End Date</DialogTitle>
                                                        <DialogDescription>
                                                            This action cannot be undone. This will extend the tender end date.
                                                        </DialogDescription>
                                                        {showOtpField ? <>
                                                            <div className='w-1/2 mx-auto px-2 border border-foreground rounded-md'>
                                                                <input ref={otpRef} placeholder='Enter OTP' className="text-foreground text-center font-medium text-lg w-full bg-transparent outline-none p-1" maxLength={6} minLength={6} /> </div>
                                                            <div className='w-1/2 mx-auto pt-2'>
                                                                <Button className='w-full bg-primary' onClick={saveUpdate} disabled={loading}>
                                                                    {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                                                                    Save</Button>
                                                            </div>
                                                        </> : <>
                                                            <div className='w-1/2 mx-auto px-2 border border-foreground rounded-md'>
                                                                <Input
                                                                    type='date'
                                                                    className="text-foreground font-medium text-lg w-full"
                                                                    defaultValue={result?.tender?.endDate.split('T')[0]}
                                                                    onChange={(e) => setNewEndDate(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className='w-1/2 mx-auto pt-2'>
                                                                <Button className='w-full bg-primary' disabled={loading} onClick={handleUpdate}>
                                                                    {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                                                                    Update</Button>
                                                            </div>
                                                        </>}

                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>}
                                        </span>
                                    </span>
                                </div>

                                <div className="flex justify-between gap-x-4 w-full">
                                    <span className="w-1/2">
                                        <label
                                            className="block text-sm font-medium text-gray-500 pb-2"
                                        >Status</label
                                        >
                                        {
                                            // Display tender status with corresponding badge color
                                            result?.tender?.status === "pending" ? (
                                                <p className=" uppercase font-bold px-4  text-gray-500">
                                                    {result?.tender?.status}
                                                </p> ) : result?.tender?.status === "sent" ? (
                                                <p className=" uppercase font-bold px-4 text-primary">
                                                    {result?.tender?.status}
                                                </p> ) : result?.tender?.status === "closed" ? (
                                                <p className=" uppercase font-bold px-4 text-red-600">
                                                    {result?.tender?.status}
                                                </p> ) : result?.tender?.status === "open" ? (
                                                <p className=" uppercase font-bold px-4 text-green-200">
                                                    {result?.tender?.status}
                                                </p> ) : (
                                                <p className=" uppercase font-bold px-4  text-slate-500">
                                                    {result?.tender?.status}
                                                </p> )
                                        }
                                    </span>
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="updated-at"
                                            className="block text-sm font-medium text-gray-500"
                                        >Last Updated</label
                                        >
                                        <Input
                                            id='updated-at'
                                            className="text-foreground font-medium text-lg w-full"
                                            defaultValue={new Date(
                                                result?.tender?.lastUpdatedDate
                                            ).toDateString()}
                                            readOnly
                                        />
                                    </span>
                                </div>
                            </div>

                            <h2 className="font-semibold">Description</h2>
                            <div className="flex flex-col pb-4">
                                <div className="flex justify-between gap-x-4 w-full">
                                    <span className="w-full">
                                        <Textarea
                                            className="text-foreground font-regular text-md w-full border-0 ring-transparent shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                            defaultValue={result?.tender?.description}
                                            rows={5}
                                            readOnly
                                        />
                                    </span>
                                </div>
                            </div>

                            {/* <h2 className="font-semibold">Items</h2>
                            <ItemListComponent data={result?.tender?.items} /> */}
                            
                            <h2 className="font-semibold">Files</h2>
                            <FilesListComponent bucketPublicDomain={bucketPublicDomain} data={result?.tender?.files} />
                        </div>
                        <div
                            className="flex flex-col justify-between w-full md:w-2/5 bg-white dark:bg-background-color rounded-xl p-6"
                        >
                            <div className="w-full h-[85]">
                                <h2 className="font-bold pb-4">Tender Recepients</h2>
                                <div className="w-full relative overflow-y-auto h-[95%]">
                                    {
                                        // Map through tender recipients and display their details
                                        result?.recipientsWithDetails.map((item, idx) => (
                                            <div className="flex flex-col" key={idx}>
                                                <p className="text-sm font-medium py-1">
                                                    {item?.companyName}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="w-full flex max-h-[15] justify-end md:space-x-4">
                                {/* <Button
                                    size="sm"
                                    className="flex px-12 flex-end"
                                    onClick={editTenderHandler}
                                    disabled={(result?.tender?.status !== "pending" && true) || loading}>
                                    Edit
                                </Button> */}
                                <Button
                                    size="sm"
                                    className="flex px-12 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:text-white dark:hover:bg-green-700 flex-end"
                                    onClick={sendTenderHandler}
                                    disabled={(result?.tender?.status !== "pending" && true) || loading}>
                                    {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
