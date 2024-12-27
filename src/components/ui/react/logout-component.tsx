import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader } from './dialog'
import { Button } from './button'
import { useState } from 'react'

export default function LogoutComponent() {
    const [open, setOpen] = useState(false)
  return (
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
          <DialogTrigger>
              <svg width={24} height={24} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={() => setOpen(true)}>
                  <path fillRule="evenodd" d="M6 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H6Zm10.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L18.586 13H10a1 1 0 1 1 0-2h8.586l-2.293-2.293a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
              </svg>
          </DialogTrigger>
          <DialogContent className="text-center text-foreground">
              <DialogHeader>
                  <DialogTitle className="text-center">Are you sure?</DialogTitle>
                  <DialogDescription className="text-center">
                      You are signing out of POL eRFX
                  </DialogDescription>
                  <div className="w-1/2 mx-auto pt-2">
                      <Button
                          variant='destructive'
                          className="w-full"
                          asChild
                      >
                          <a href='/api/auth/logout'>Log out</a>
                      </Button>
                  </div>
              </DialogHeader>
          </DialogContent>
      </Dialog>
  )
}
