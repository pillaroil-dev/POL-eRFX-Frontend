import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader } from './dialog'
import { Button } from './button'
import { useRef, useState } from 'react'
import { toast } from 'sonner';
import { ReloadIcon } from '@radix-ui/react-icons';
import {actions} from 'astro:actions'

export default function BidControlComponent({bidId, status, operatorEmail, role}: {bidId: number, status: string, operatorEmail: string; role: string}) {
    const [open, setOpen] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [showOtpField, setShowOtpField] = useState(false);
    const otpRef = useRef<HTMLInputElement>(null);

    const handleGetAccessToken = async () => {
        setLoading(true);
        //@ts-ignore
        const {data, error} = await actions.bidAccessAction.create({bidId, operatorEmail});
        if(!error){
            toast.success(data?.message);
            setLoading(false);
            setShowOtpField(true);
        }else toast.error(data?.message);
    };

    const handleConfirmAccessToken = async () => {
        setLoading(true);
        const otp = otpRef.current?.value;
        //@ts-ignore
        const {data, error} = await actions.bidAccessAction.verify({operatorEmail, otp: parseInt(otp)});
        if(!error){
            toast.success(data?.message);
            setLoading(false);
            window.location.replace(`/u/${role}/bids/view/${bidId}`); //redirect to view page if otp valid
        }else toast.error(data?.message);
    }
  return (
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            {status !== "closed" ? (<p className="opacity-50 cursor-not-allowed pointer-events-none px-2 py-1 text-sm hover:opacity-80">
                View Bids
            </p> ) : <DialogTrigger>
            <p className="px-2 py-1 text-sm hover:opacity-80">
                View Bids
            </p> 
          </DialogTrigger> 
          }
          <DialogContent className="text-center text-foreground" onInteractOutside={(e) => {
          e.preventDefault();
        }}>
              <DialogHeader>
                  
                  <div className="w-1/2 mx-auto pt-2">
                    {!showOtpField ? (
                        <>
                            <DialogTitle className="text-center">PTID{bidId} Bids</DialogTitle>
                            <DialogDescription className="text-center">
                                Generate Access Token to View Bids
                            </DialogDescription>
                            <Button 
                                disabled={loading} 
                                className="w-full" 
                                variant={'default'} 
                                size={'sm'} 
                                onClick={handleGetAccessToken}
                                >
                                {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}  
                                    Get Access Token 
                            </Button>
                        </>
                    ) : (
                        <>
                            <DialogTitle className="text-center">Confirm OTP</DialogTitle>
                            <DialogDescription className="text-center">
                                OTP has been sent to your email.
                            </DialogDescription>
                            <div className='w-full mx-auto px-2 my-4 border border-foreground rounded-md'>
                                <input ref={otpRef} placeholder='Enter OTP' className="text-foreground text-center font-bold w-full bg-transparent outline-none p-1 spacing-5" maxLength={6} minLength={6} /> 
                            </div>
                            <Button 
                                disabled={loading} 
                                className="w-full" 
                                variant={'default'} 
                                size={'sm'} 
                                onClick={handleConfirmAccessToken}
                                >
                                {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}  
                                    View Bids 
                            </Button>
                        </>
                    )}
                  </div>
              </DialogHeader>
          </DialogContent>
      </Dialog>
  )
}
