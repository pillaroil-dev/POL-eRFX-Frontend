import React, { useState } from 'react'
import { Button } from './button'
import { Input } from './input'
import { actions } from 'astro:actions'
import { navigate } from 'astro:transitions/client';
import { toast } from 'sonner'
import { ReloadIcon, EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons"

export default function SignupForm() {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setShowConfirm(value.length >= 6);
    };

    const handleSignup = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setLoading(true);
        
        const formData = new FormData(evt.target as HTMLFormElement);
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const { data } = await actions.authAction.register(formData);
            if (data.success) {
                toast.success(data.message);
                navigate('/auth/confirm-otp');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred during signup");
        } finally {
            setLoading(false);
        }
    }
    return (
        <form
            onSubmit={handleSignup}
            className="flex flex-col h-full justify-center self-center items-center align-middle"
        >
            <h1 className="font-bold md:hidden flex justify-center my-12 text-3xl">
                POL eRFX.
            </h1>
            <div className="flex flex-col w-full justify-center self-center items-center align-middle">
                <h4 className='scroll-m-20 text-2xl font-semibold tracking-tight font-Inter text-foreground'>Create an account</h4>
                <p className="leading-7 text-foreground font-Inter muted text-[14px]">Enter your email below to create your accounts</p>
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:w-2/3 my-4"
                />
                <div className="relative md:w-2/3 mb-4">
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        {showPassword ? (
                            <EyeClosedIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                            <EyeOpenIcon className="h-4 w-4 text-gray-500" />
                        )}
                    </button>
                </div>
                {showConfirm && (
                    <div className="relative md:w-2/3 mb-4">
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showConfirmPassword ? (
                                <EyeClosedIcon className="h-4 w-4 text-gray-500" />
                            ) : (
                                <EyeOpenIcon className="h-4 w-4 text-gray-500" />
                            )}
                        </button>
                    </div>
                )}

                <Button disabled={loading} type='submit' className="w-2/3 bg-primary">
                    {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Signup
                </Button>
            </div>
        </form>
    )
}
