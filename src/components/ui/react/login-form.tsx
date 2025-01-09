import { useState } from 'react'
import { Button } from './button'
import { Input } from './input'
import { ReloadIcon, EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'
import { actions } from 'astro:actions'
import { navigate } from 'astro:transitions/client'
import { toast } from 'sonner'

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        try {
            const { data, error } = await actions.authAction.login(formData);
            if (error) {
                toast.error(error.message || 'Unknown error occurred');
                return;
            }
            if (data && data.success) {
                toast.success(data.message);
                navigate('/u');
            } else {
                toast.error(data?.message || 'Unknown error occurred');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('An error occurred during login. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form
                className="flex flex-col h-full justify-center self-center items-center align-middle"
                slot="auth-slot"
                onSubmit={handleSubmit}
            >
                <h1 className="font-bold md:hidden flex justify-center my-12 text-3xl">
                    POL eRFX.
                </h1>
                <div
                    className="flex flex-col w-full justify-center self-center items-center align-middle"
                >
                    <h4 className='scroll-m-20 text-2xl font-semibold tracking-tight font-Inter text-foreground'>Login your account</h4>
                    <p className="leading-7 text-foreground font-Inter muted text-[14px]">Login with your email and account password</p>
                    <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:w-2/3 my-4"
                    />
                    <div className="relative md:w-2/3 w-full">
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mb-4"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <EyeClosedIcon className="h-4 w-4" />
                            ) : (
                                <EyeOpenIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    <div className="flex w-2/3 pb-4 justify-end">
                        <a href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                        </a>
                    </div>
                    <Button disabled={loading} type='submit' className="w-2/3 bg-primary">
                        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                        Login
                    </Button>
                </div>
            </form>
        </>
    )
}
