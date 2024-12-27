import { useEffect } from 'react'

export default function Redirector({ role }: { role: string }) {
    useEffect(() => {
        switch (role) {
            case "admin":
                window.location.replace('/u/admin');
                break;
            case "operator":
                window.location.replace('/u/operator');
                break;
            case "user":
                window.location.replace('/u/user');
                break;
            case "fx":
                window.location.replace('/u/fx');
                break;
            default:
                window.location.replace('/u');
                break;
        }
    }, []);
    
  return (
    <></>
  )
}
