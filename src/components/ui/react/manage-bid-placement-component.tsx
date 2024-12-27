import { Button } from './button'
import { Input } from './input'
import { Textarea } from './text-area'
import { Badge } from './badge'
import { useState } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'
import { FilesListComponent } from './files-list-component';
import { ReloadAfter } from '@/utilities/helpers/reload'

export function ManageBidPlacementComponent({ result, documentPassword, token, bucketPublicDomain }: { result: any, documentPassword: string, token: string, bucketPublicDomain: string }) {
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const handleBidPlacement = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const payload = {
            id: result?.id,
            email: result.contractor.email,
            companyName: result.contractor.companyName,
            title: result.tender.title,
            //@ts-ignore
            action: e?.target?.textContent.toLowerCase(),
        }
        if (payload?.action === 'accept') {
            setLoading1(true)
        } else if (payload?.action === 'reject') {
            setLoading2(true)
        };


        const res = await fetch(`/api/v1/bids/manage-bid-placement`, {
            method: "POST",
            headers: {
                "x-pol-rfx-secret": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        const responseMessage = await res.json()

        if (res.status === 200) {
            toast.success(responseMessage?.message);
            setLoading1(false)
            setLoading2(false)
            ReloadAfter(2000)
        }

    }

    return (
        <div
            className="flex flex-col bg-slate-100 dark:bg-natural gap-x-4 ml-24 w-[calc(100%-7rem)] p-4 md:p-8 mt-24 mb-8 h-full rounded-2xl">
            <div className="flex flex-row gap-8 text-foreground">
                <div className="w-full">
                    <h1 className="text-xl font-bold mb-4">Manage Bid</h1>
                    <div className="flex flex-col md:flex-row md:space-x-4 w-full">
                        <div className="md:w-3/5">
                            <h2 className="font-semibold">General information</h2>
                            <div className="flex flex-col my-8 gap-y-4">
                                <div className="flex justify-between gap-x-4 w-full">
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-500">Title</label
                                        >
                                        <Textarea
                                            className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                            defaultValue={result?.tender?.title}
                                            readOnly
                                        />
                                    </span>
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-500"
                                        >Location</label
                                        >
                                        <Input
                                            className="text-foreground font-medium text-lg w-full"
                                            defaultValue={result?.tender?.location}
                                            readOnly
                                        />
                                    </span>
                                </div>

                                <div className="flex justify-between gap-x-4 w-full">
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-500"
                                        >Start date</label
                                        >
                                        <Input
                                            className="text-foreground font-medium text-lg w-full"
                                            defaultValue={new Date(
                                                result?.tender?.startDate
                                            ).toDateString()}
                                            readOnly
                                        />
                                    </span>
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-500"
                                        >End date</label
                                        >
                                        <Input
                                            className="text-foreground font-medium text-lg w-full"
                                            defaultValue={new Date(
                                                result?.tender?.endDate
                                            ).toDateString()}
                                            readOnly
                                        />
                                    </span>
                                </div>

                                <div className="flex justify-between gap-x-4 w-full">
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-500 pb-2"
                                        >Status</label
                                        >
                                        {
                                            result?.tender?.status === "pending" ? (
                                                <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[14px] text-slate-200">
                                                    {result?.tender?.status}
                                                </Badge>
                                            ) : result?.tender?.status === "sent" ? (
                                                <Badge className="bg-primary hover:bg-primary px-4 text-[14px] text-slate-200">
                                                    {result?.tender?.status}
                                                </Badge>
                                            ) : result?.tender?.status === "closed" ? (
                                                <Badge className="bg-red-600 hover:bg-red-600 px-4 text-[14px] text-slate-200">
                                                    {result?.tender?.status}
                                                </Badge>
                                            ) : result?.tender?.status === "open" ? (
                                                <Badge className="bg-green-600 hover:bg-green-600 px-4 text-[14px] text-slate-200">
                                                    {result?.tender?.status}
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[14px] text-slate-200">
                                                    {result?.tender?.status}
                                                </Badge>
                                            )
                                        }
                                    </span>
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-500"
                                        >Last updated</label
                                        >
                                        <Input
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
                            <div className="flex flex-col">
                                <div className="flex justify-between gap-x-4 w-full">
                                    <span className="w-full">
                                        <Textarea
                                            className="text-foreground font-regular text-md w-full border-0 ring-transparent shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                            defaultValue={result?.tender?.description}
                                            rows={8}
                                            readOnly
                                        />
                                    </span>
                                </div>
                            </div>

                            <h2 className="font-semibold">Bid Document(s)</h2>
                            <FilesListComponent bucketPublicDomain={bucketPublicDomain}  data={result?.files} />
                            {/* <label className="font-semibold">Encryption Password</label>
                            <Input className="font-semibold" type='text' placeholder='Documents password' value={documentPassword} readOnly/> */}
                        </div>
                        <div
                            className="flex flex-col justify-between w-full md:w-2/5 bg-white dark:bg-background-color rounded-xl p-6 mt-4 md:mt-0"
                        >
                            <div className="w-full">
                                <h2 className="font-bold pb-4">Bid Action</h2>
                                <p className='text-sm'>Ensure to analyse and carefully scrutinize the bid documents before approval or rejection.</p>
                                <div className="w-full flex justify-center space-x-4 my-4">
                                    {(!result?.status || result?.status !== 'placed') ? "" : <>
                                        <Button
                                            size="sm"
                                            id="accept"
                                            className="lex px-12 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:text-white dark:hover:bg-green-700"
                                            disabled={(result?.status !== "placed" && true) || loading1}
                                            onClick={handleBidPlacement}>
                                            {loading1 && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                                            Accept
                                        </Button>
                                        <Button
                                            size="sm"
                                            id='reject'
                                            className="flex px-12 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
                                            disabled={(result?.status !== "placed" && true) || loading2}
                                            onClick={handleBidPlacement}>
                                            {loading2 && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                                            Reject
                                        </Button>
                                    </>}
                                </div>

                                <div className='flex justify-center mt-8'>
                                    {(!result?.status || result?.status !== 'placed') ? <h3 className={`font-semibold text-xl border-2 p-4 rounded-lg ${result?.status === 'accepted' ? 'text-green-600 border-green-600 bg-green-50' : result?.status === 'rejected' ? 'text-red-600 border-red-600 bg-red-50' :  'hidden'} `}>{result?.status.toUpperCase()}</h3> : ''}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
