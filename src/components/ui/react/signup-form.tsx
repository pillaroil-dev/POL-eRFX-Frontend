import React, { useState } from 'react'
import { Button } from './button'
import GoogleAuth from './google-auth'
import { Input } from './input'
import { toast } from 'sonner'
import { ReloadIcon } from "@radix-ui/react-icons"

export default function SignupForm() {
    const [loading, setLoading] = useState(false);
    const handleSignup = async (evt: { preventDefault: () => void }) => {
        evt.preventDefault();
        setLoading(true)
        const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value;
        const password = (document.querySelector('input[name="password"]') as HTMLInputElement).value;

        (async () => {
            const data = await fetch('/api/auth/signup', {
                method: "POST",
                body: JSON.stringify({
                    email: email.toLowerCase(),
                    password
                })
            });
            const res = data;

            const responseMessage = await res.json();
            if (res.status === 200) {
                setLoading(false)
                toast.success(responseMessage.message);
                setTimeout(() => {
                    window.location.replace('/auth/confirm-otp');
                }, 1500);
            } else {
                setLoading(false)
                toast.error(responseMessage.message);
            }
        })();

    }
    return (
        <form
            className="flex flex-col h-full justify-center self-center items-center align-middle"
        >
            <h1 className="font-bold md:hidden flex justify-center my-12 text-3xl">
                POL eRFX.
            </h1>
            <div
                className="flex flex-col w-full justify-center self-center items-center align-middle"
            >
                <h4 className='scroll-m-20 text-2xl font-semibold tracking-tight font-Inter text-foreground'>Create an account</h4>
                <p className="leading-7 text-foreground font-Inter muted text-[14px]">Enter your email below to create your accounts</p>
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:w-2/3 my-4"
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="flex h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:w-2/3 mb-4"
                />

                <Button disabled={loading} type='submit' className="w-2/3 bg-primary" onClick={handleSignup}>
                    {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Signup</Button>
            </div>

            <div className="relative my-4">
                <div className="flex items-center mt-4"><span className="w-full"></span></div><div
                    className="relative flex justify-center text-xs uppercase"
                >
                    {/* <span className="px-2 text-muted-foreground">Or continue with</span> */}
                </div>
            </div>

            {/* <form
                action="/api/auth/google/google-auth"
                className="flex justify-center w-full"
            >
                <GoogleAuth />
            </form> */}
        </form>
    )
}
