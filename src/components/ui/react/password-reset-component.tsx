import React, { useState } from 'react'
import { Input } from './input'
import { Button } from './button'
import { toast } from 'sonner';
import { ReloadIcon } from '@radix-ui/react-icons';
import Cookies from 'js-cookie';

export default function PasswordResetComponent({ user }: { user: string }) {
    
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const validatePasswords = () => {

        if (!password || !confirmPassword) {
            toast('No password input');
            setLoading(false)
            return false;
        }
        if (password !== confirmPassword) {
            toast('Passwords do not match.');
            setLoading(false)
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        setLoading(true)
        if (validatePasswords()) {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, password, confirmPassword }),
            });

            const resMessage = await res.json()
            if (res.status === 200) {
                setLoading(false)
                Cookies.remove('user', { path: '/' });
                Cookies.remove('otp-verified', { path: '/' });
                Cookies.remove('otp-type', { path: '/' });
                toast.success(resMessage.message)
                setTimeout(() => {
                    window.location.href = resMessage.url;
                }, 1500);
            } else {
                setLoading(false)
                toast.error(resMessage.message)
            }
        } else {
            setLoading(false)
        }
    };

  return (
      <>
          <div
              className="flex flex-col h-full justify-center self-center items-center align-middle"
          >
              <div
                  className="flex flex-col w-full justify-center self-center items-center align-middle"
              >
                  <h4 className='text-2xl font-medium text-foreground'>Reset your password</h4>
                  <p className='text-foreground muted text-[14px]'>Enter a matching password to reset</p>

                  <Input defaultValue={user} className="hidden" readOnly name="user" />
                  <Input
                      type="password"
                      placeholder="Password"
                      name="password"
                      required
                      className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-2/3 my-4"
                      onChange={handlePasswordChange}
                  />
                  <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      required
                      className="flex h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-2/3 mb-4"
                      onChange={handleConfirmPasswordChange}
                  />
                  <Button className="w-2/3 bg-primary" disabled={loading} onClick={() => { handleSubmit() }}>
                      {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                      Reset password
                  </Button>
              </div>
          </div>
      </>
  )
}
