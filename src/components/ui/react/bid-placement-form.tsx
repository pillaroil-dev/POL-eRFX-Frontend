import type { Bid } from "@/components/ui/react/bid-data-table";
import { Badge } from "./badge";
import { FilesListComponent } from "./files-list-component";
import { Button } from "./button";
import { UserFileUploader } from "./user-file-uploader";
import { Input } from "./input";
import { Eye } from "lucide-react";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { formatDate } from "@/utilities/helpers/time-formatter";
import { ReloadAfter } from "@/utilities/helpers/reload";

interface BidPlacementPageProps {
    bidData: Bid;
    bucketName: string,
    bucketPublicDomain: string,
    token: string,
};


export function BidPlacementForm({ bidData, bucketName, bucketPublicDomain, token }: BidPlacementPageProps) {

    //@ts-ignore
    const contractorId = bidData?.contractorId;
    const placementFiles = bidData?.tender?.BidPlacement[0]?.files
    const placementStatus = bidData?.tender?.BidPlacement.find(
        (x) => x.contractorId === contractorId
    )?.status;

    const handleBidSubmit = async () => {
        setLoading(true)

        const payload = {
            // documentPassword: (document.querySelector('input[name="document-password"]') as HTMLInputElement)?.value,
            files: localStorage.getItem("@user-files"),
            data: bidData
        }

        const res = await fetch(`/api/v1/bids/bid-placement`, {
            method: "POST",
            headers: {
                "x-pol-rfx-token": token, 
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const responseMessage = await res.json();
        if (res.status === 200) {
            setLoading(false)
            toast.success(responseMessage.message)
            ReloadAfter(1500)
        } else {
            setLoading(false)
            toast.error(responseMessage.message)
        }
    };

    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    // //@ts-ignore
    // const Items = bidData?.tender?.items;
    //@ts-ignore
    const Files = bidData?.tender?.files;
    return (
        <div className="bid-placement-page">
            <div className="bid-details px-4">
                <h2 className="text-lg font-medium text-foreground">Tender Details:</h2>
                <div className="flex flex-row justify-between my-4">
                    <div className="space-y-2">
                        <span className="font-bold flex gap-x-2 text-foreground">Tender ID: <p className="font-medium uppercase">{`POL eRFX-T` + bidData?.tender?.id}</p> </span>
                        <span className="font-bold flex gap-x-2 text-foreground">Status: {bidData?.status === 'pending' ? <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[10px] text-slate-200">{bidData?.status}</Badge> : bidData?.status === 'sent' ? <Badge className="bg-primary hover:bg-primary px-4 text-[10px] text-slate-200">{bidData?.status}</Badge> : bidData?.status === 'closed' ? <Badge className="bg-red-600 hover:bg-red-600 px-4 text-[10px] text-slate-200">{bidData?.status}</Badge> : bidData?.status === 'open' ? <Badge className="bg-green-600 hover:bg-green-600 px-4 text-[10px] text-slate-200">{bidData?.status}</Badge> : <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[10px] text-slate-200">{bidData?.status}</Badge>}</span>
                    </div>
                    <div className="space-y-2">
                        <span className="font-bold flex gap-x-2 text-foreground">Title: <p className="font-medium">{bidData?.tender?.title}</p></span>
                        <span className="font-bold flex gap-x-2 text-foreground">Location: <p className="font-medium">{bidData?.tender?.location}</p></span>
                    </div>
                    <div className="space-y-2">
                        <span className="font-bold flex gap-x-2 text-foreground">Start Date: <p className="font-medium">{formatDate(bidData?.tender?.startDate)}</p></span>
                        <span className="font-bold flex gap-x-2 text-foreground">End Date: <p className="font-medium">{formatDate(bidData?.tender?.endDate)}</p></span>
                    </div>
                </div>
                <div className="space-y-2">
                    <span className="font-bold flex gap-x-2 text-foreground">Description:</span>
                    <p className="font-normal text-foreground">{bidData?.tender?.description}</p>
                </div>
                {/* Supporting document */}
                <hr className="border-primary my-12" />
                <div className="my-4">
                    <h2 className="text-lg font-medium text-foreground">Supporting Document(s):</h2>

                    <div className="w-full flex flex-row justify-between my-4">
                        <div className="w-full space-y-2">
                            <FilesListComponent bucketPublicDomain={bucketPublicDomain} data={Files} />
                        </div>
                    </div>
                </div>

                {/* Bid items */}
                <hr className="border-primary my-12" />
                <div className="my-4">
                    {!placementStatus ? <>
                        <p className="text-sm font-medium text-foreground pt-4 pb-2">Bid Document(s): Ensure to upload all applicable documents before submitting this bid.</p>
                        <p className="text-xs font-normal pb-4 text-primary/90">Tip: Use a single password for all documents. You can compress multiple documents to a single document before upoading</p>
                        <UserFileUploader status={bidData?.status} bucketName={bucketName} />
                        {/* <div className="flex w-full justify-center relative">
                            <div className="flex w-1/3 gap-6">
                                <Input type={show ? `text` : `password`} name="document-password" placeholder="Document(s) password" className="border-2 border-slate-600 dark:border-slate-100 text-foreground rounded-lg p-6 mt-8 w-full mx-auto" disabled={bidData?.status !== 'open' && true} />
                                <Eye size={28} className={`${show ? 'text-primary' : 'text-foreground'} mt-11 cursor-pointer`} onClick={() => setShow(!show)} />
                            </div>
                        </div> */}
                        <hr className="border-primary my-8" />
                        <Button className="bg-primary flex mx-auto my-8 px-12 items-center" disabled={(bidData?.status !== 'open' && true) || loading} onClick={handleBidSubmit}>
                            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                            Place Bid
                        </Button></> : <>
                            <h2 className="text-lg font-medium text-foreground">Bid Document(s):</h2>

                            <div className="w-full flex flex-row justify-between my-4">
                                <div className="w-full space-y-2">
                                    <FilesListComponent bucketPublicDomain={bucketPublicDomain} data={placementFiles} />
                                </div>
                        </div></>
                    }
                    
                </div>
                
            </div>
        </div>
    );
};


