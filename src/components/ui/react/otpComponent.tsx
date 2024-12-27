import { useEffect, useState } from "react";
import OtpInput from "@/components/ui/react/otp";
import { Button } from "./button";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import Cookies from "js-cookie"

const OtpComponent = ({ otpValue, otpType }: { otpValue: number, otpType?: string }) => {
    const [otp, setOtp] = useState<number>(0);
    const [loading, setLoading] = useState(false)

    const handleOtpChange = (value: number) => {
        setOtp(value);
    };

    
    //validate otp input
    const validateOtp = async () => {
        setLoading(true)

        switch (otpType) {
            case "pass-reset-otp":
                if (otp === otpValue) {
                    Cookies.set('otp-verified', 'true', { path: '/' });
                    Cookies.remove("otp-type", { path: '/' });
                    setLoading(false);
                    toast.success("OTP Verified")
                    setTimeout(() => {
                        window.location.replace('/auth/reset-password ');
                    }, 1500);
                } else {
                    setLoading(false);
                    toast.error("OTP Verification failed")
                }
                break;
            
            case "approve-sign-in":
                if (otp === otpValue) {
                    Cookies.set('otp-verified', 'true', { path: '/' });
                    Cookies.remove("otp-type", { path: '/' });
                    setLoading(false);
                    toast.success("OTP Verified")
                    setTimeout(() => {
                        window.location.replace('/u');
                    }, 1500);
                } else {
                    setLoading(false);
                    toast.error("OTP Verification failed")
                }
                break;
            default:
                if (otp === otpValue) {
                    const data = await fetch(`/api/auth/user-verified`, {
                        method: "POST"
                    });
                    const res = data;
                    if (res.status === 200) {
                        setLoading(false)
                        toast.success("OTP Verified")
                        setTimeout(() => {
                            window.location.href = res.url;
                        }, 1000);
                    }
                }
                else {
                    /// do something else
                    setLoading(false);
                    toast.error("OTP Verification failed")
                }
                break;
        }
    };

    const resendOtp = async () => {
        const data = await fetch(`/api/auth/resend-otp`);
        const res = await data.json();

        if (res?.message) {
            console.log(res.message);
        }
    }

    return (
        <div className="flex flex-col w-full h-full justify-center align-middle">
            <h1 className="font-semibold text-3xl my-12">OTP Verification</h1>
            <OtpInput length={4} otp={otp} onOtpChange={handleOtpChange} />
            <div className="my-12">
                {otpType === "approve-sign-in" ? <p className="text text-slate-500">
                    Request OTP from the system admin!
                </p> : <Button className="bg-transparent shadow-none p-0 hover:bg-unset" onClick={resendOtp}>
                    <p className="text-xs my-2 text-slate-500">
                        Not seen? Resend it.
                    </p>
                </Button>}

                <div className="flex flex-end justify-end">
                    <Button className="px-12 bg-primary" onClick={validateOtp}>
                        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                        Verify
                    </Button>
                </div>
            </div>
        </div>
        
    );
};

export default OtpComponent;