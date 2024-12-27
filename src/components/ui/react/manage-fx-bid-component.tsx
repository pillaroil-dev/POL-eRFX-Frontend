import { Input } from './input'
import { formatCurrency } from '@/utilities/helpers/formatCurrency'
import { formatTime } from '@/utilities/helpers/time-formatter'
import { Button } from './button'
import { Badge } from './badge'
import { Textarea } from './text-area'
import { toast } from 'sonner'
import { useRef, useState } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'
import { ReloadAfter } from '@/utilities/helpers/reload'
import { NairaSign } from '@/utilities/helpers/nairaSign'

export function ManageFxBidComponent({ data, token }: { data: any, token: string }) {
    const acceptRef = useRef(null)
    const rejectRef = useRef(null)
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    
    const bidData = data[0];

    const handleFxBidApproval = async (action: string) => {  
        if (action === 'accepted') {
            setLoading1(true);
        } else if (action === 'rejected') {
            setLoading2(true);
        }

        const res = await fetch(`/api/v1/fx/manage-fx-bid`, {
            method: "POST", 
            headers: {
                "content-type": "application/json",
                "x-pol-rfx-secret": token,
            },
            body: JSON.stringify({...bidData, approval: action})
        })
        if (res.status === 200) {
            toast.success(`Operation successful`);
            setLoading1(false);
            setLoading2(false);
            ReloadAfter(1500)
        } else {
            toast.success(`Operation failed. Try again.`);
            setLoading1(false);
            setLoading2(false);
            ReloadAfter(1500)
        }


    }

    return (
        <>
            <div
                className="flex flex-col bg-slate-100 dark:bg-natural gap-x-4 ml-24 w-[calc(100%-7rem)] p-8 mt-24 mb-8 h-full rounded-2xl"
            >
                <div className="flex flex-row gap-8 text-foreground">
                    <div className="w-full">
                        <h1 className="text-xl font-bold mb-4">{bidData?.fxBid?.fx?.title}</h1>
                        <div className="flex flex-row space-x-4 w-full">
                            <div className="w-3/5">
                                <h2 className="font-semibold">General information</h2>
                                <div className="flex flex-col my-8 gap-y-2">
                                    <div className="flex justify-between gap-x-4 w-full">
                                        <span className="w-1/2">
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium text-gray-500">Full Name</label
                                            >
                                            <Textarea
                                                className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                defaultValue={bidData?.bidder?.firstName + ' ' + bidData?.bidder?.lastName}
                                                readOnly
                                            />
                                        </span>
                                        <span className="w-1/2">
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium text-gray-500"
                                            >Amount</label>
                                            <Input
                                                className="text-foreground font-medium text-lg w-full"
                                                defaultValue={bidData?.fxBid?.fx?.currency.toUpperCase() +
                                                    " " +
                                                    formatCurrency(Number(bidData?.fxBid?.fx?.amount))}
                                                readOnly
                                            />
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-x-4 w-full">
                                        <span className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-500"
                                            >Start Time</label>
                                            <Input
                                                className="text-foreground font-medium text-lg w-full"
                                                defaultValue={formatTime(bidData?.fxBid?.fx?.startTime)}
                                                readOnly
                                            />
                                        </span>
                                        <span className="w-1/2">
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium text-gray-500"
                                            >End Time</label>
                                            <Input
                                                className="text-foreground font-medium text-lg w-full"
                                                defaultValue={formatTime(bidData?.fxBid?.fx?.endTime)}
                                                readOnly
                                            />
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-x-4 w-full">
                                        <span className="w-1/2">
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium text-gray-500 pb-2"
                                            >Bid Order</label
                                            >
                                            {
                                                bidData?.status === "pending" ? (
                                                    <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[14px] text-slate-200 uppercase">
                                                        {bidData?.status}
                                                    </Badge>
                                                ) : bidData?.status === "sent" ? (
                                                        <Badge className="bg-primary hover:bg-primary px-4 text-[14px] text-slate-200 uppercase">
                                                        {bidData?.status}
                                                    </Badge>
                                                ) : bidData?.status === "rejected" ? (
                                                            <Badge className="bg-red-600 hover:bg-red-600 px-4 text-[14px] text-slate-200 uppercase">
                                                        {bidData?.status}
                                                    </Badge>
                                                ) : bidData?.status === "accepted" ? (
                                                                <Badge className="bg-green-600 hover:bg-green-600 px-4 text-[14px] text-slate-200 uppercase">
                                                        {bidData?.status}
                                                    </Badge>
                                                ) : (
                                                                    <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[14px] text-slate-200 uppercase">
                                                        {bidData?.status}
                                                    </Badge>
                                                )
                                            }
                                        </span>
                                    </div>
                                </div>

                                <h2 className="font-semibold">Note</h2>
                                <div className="flex flex-col">
                                    <div className="flex justify-between gap-x-4 w-full">
                                        <span className="w-full">
                                            <Textarea
                                                className="text-foreground font-regular text-md w-full border-0 ring-transparent shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                defaultValue={bidData?.fxBid?.fx?.note}
                                                rows={5}
                                                readOnly
                                            />
                                        </span>
                                    </div>
                                    <div className='flex flex-col items-center justify-center'>
                                        <p>Offer Amount</p>
                                        <h1 className='text-3xl font-semibold py-2'>{NairaSign() +  formatCurrency(bidData?.amount)}</h1>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex flex-col justify-between w-2/5 bg-white dark:bg-background-color rounded-xl p-6"
                            >
                                <div className="w-full h-[85]">
                                    <div className="w-full">
                                        <h2 className="font-bold pb-4">Fx Bid Action</h2>
                                        <p className='text-sm'>Ensure to analyze and carefully scrutinize the fx bid (amount and exchange rate) before approval or rejection.</p>
                                        <div className="w-full flex justify-center space-x-4 my-4">
                                            {(!bidData?.status || bidData?.status !== 'placed') ? "" : <>
                                                <Button
                                                    size="sm"
                                                    id="accept"
                                                    className="lex px-12 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:text-white dark:hover:bg-green-700"
                                                    disabled={bidData?.status !== "placed" || loading1}
                                                    onClick={() => handleFxBidApproval('accepted')}
                                                    ref={acceptRef}>
                                                    {loading1 && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                                                    Accept
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    id='reject'
                                                    className="flex px-12 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
                                                    disabled={bidData?.status !== "placed" || loading2}
                                                    onClick={() => handleFxBidApproval('rejected')}
                                                    ref={rejectRef}>
                                                    {loading2 && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                                                    Reject
                                                </Button>
                                            </>}
                                        </div>

                                        <div className='flex justify-center mt-8'>
                                            {(!bidData?.status || bidData?.status !== 'placed') ? <h3 className={`font-semibold text-xl border-2 p-4 rounded-lg ${bidData?.status === 'accepted' ? 'text-green-600 border-green-600 bg-green-50' : bidData?.status === 'rejected' ? 'text-red-600 border-red-600 bg-red-50' : 'hidden'} `}>{bidData?.status.toUpperCase()}</h3> : ''}
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
