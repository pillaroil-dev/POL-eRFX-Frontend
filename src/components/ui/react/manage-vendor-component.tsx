import { Input } from './input'
import { Textarea } from './text-area'
import { Button } from './button'
import { BadgeCheck, BadgeX } from 'lucide-react'
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ReloadAfter } from '@/utilities/helpers/reload';
import { ReloadIcon } from '@radix-ui/react-icons';

export function ManageVendorComponent({ result, token }: { result: any;  token: string}) {

    const [loading, setLoading] = useState(false);
    const [vloading, setVLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(true);
    }, [])

    type INPUTS = {
        companyName: string;
        email: string;
        homePhone: string;
        businessPhone: string;
        address: string;
        user: {
            id: number;
            verified: boolean;
        },
        Bid: []
    };

    //get the input values when the are 
    const [vendor, setVendor] = useState<INPUTS>({
        ...result,
    });

    const handleChange = (e: { preventDefault: () => void; target: { name: string; value: string; }; }) => {
        e.preventDefault();
        setVendor({
            ...vendor,
            [e.target.name]: e.target.value
        });
    };


    //handle the edit and save buttons
    const handleEdit = () => {
        setDisabled(!disabled)
        const inputFields = document.querySelectorAll("input");
        const textareaField = document.querySelector("textarea");
        const SaveButton = document.querySelector("#save");


        inputFields.forEach((input) => {
            input.toggleAttribute("readonly", !input.hasAttribute("readonly"));
        });

        textareaField?.toggleAttribute("readonly", !textareaField?.hasAttribute("readonly")
        );

        var EditText = document.querySelector("#edit");
        EditText.textContent = !disabled ? "Edit" : "Editing...";
    };

    const handleVerify = async () => {
        setVLoading(true);
        const payload = {
            vendorId: vendor.user.id
        };
        try {
            const res = await fetch('/api/v1/vendors/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-pol-rfx-secret': token
                },
                body: JSON.stringify(payload)
            });
            const responseMessage = await res.json();
            
            if (res.status === 200) {
                setVLoading(false);
                toast.success(responseMessage.message);
                setVendor(prevState => ({
                    ...prevState,
                    user: {
                        ...prevState.user,
                        verified: true
                    }
                }));
            } else {
                setVLoading(false);
                toast.error(responseMessage.message);
            }
        } catch (error) {
            setVLoading(false);
            toast.error('An error occurred during verification');
            console.error(error);
        }
    };

    const handleSave = async () => {
        setLoading(true)
        const payload = {
            ...vendor
        }
        const res = await fetch('/api/v1/vendors/manage-vendor', {
            method: "POST",
            headers: {
                contenType: "application/json",
                'x-pol-rfx-secret': token
            },
            body: JSON.stringify(payload)
        });
        const responseMessage = await res.json();

        if (res.status === 200) {
            setLoading(false);
            toast.success(responseMessage.message);
            ReloadAfter(1000)
        } else {
            setLoading(false);
            toast.error(responseMessage.message);
        }
    };
    
  return (
      <div className="flex flex-col bg-slate-100 dark:bg-natural gap-x-4 ml-24 w-[calc(100%-7rem)] p-8 mt-24 mb-8 h-full rounded-2xl">
          <div className="flex flex-col-reverse md:flex-row gap-8">
              <div className="w-full md:w-3/5 pt-20 md:pt-0">
                  <h2 className="text-xl font-bold mb-4 text-foreground">Vendor Profile</h2>
                  <div className="space-y-4 md:my-12 md:ml-12">
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-500">Company Name</label>
                      <Input type="text" id="companyName" name="companyName" className="input text-xl font-semibold text-foreground" placeholder="Enter company name" defaultValue={vendor?.companyName} onChange={handleChange} readOnly />

                      <label htmlFor="email" className="block text-sm font-medium text-gray-500">Email</label>
                      <Input type="email" id="email" name="email" className="input text-xl font-semibold text-foreground" placeholder="Enter email" defaultValue={vendor?.email} onChange={handleChange} readOnly />

                      <label htmlFor="businessPhone" className="block text-sm font-medium text-gray-500">Phone Number</label>
                      <Input type="tel" id="businessPhone" name="businessPhone" className="input text-xl font-semibold text-foreground" placeholder="Enter phone number" defaultValue={vendor?.businessPhone ?? ""} onChange={handleChange} minLength={11} maxLength={11}  readOnly />

                      <label htmlFor="homePhone" className="block text-sm font-medium text-gray-500">Home phone</label>
                      <Input type="tel" id="homePhone" name="homePhone" className="input text-xl font-semibold text-foreground" placeholder="Enter phone number" minLength={11} maxLength={11} defaultValue={vendor?.homePhone ?? ""} onChange={handleChange}  readOnly />

                      <label htmlFor="address" className="block text-sm font-medium text-gray-500">Address</label>
                      <Textarea id="address" name="address" className="input text-xl font-semibold text-foreground" placeholder="Enter address" defaultValue={vendor?.address ?? ""} onChange={handleChange} readOnly />

                      <div className="flex space-x-4">
                          <Button id="save" className="btn bg-primary text-white px-12 py-4 rounded" onClick={handleSave} disabled={disabled}>
                              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>}
                              Save
                          </Button>
                          <Button variant='outline' id="edit" className="text-foreground px-12 py-4 rounded" onClick={handleEdit}>
                              Edit
                          </Button>
                      </div>
                  </div>
              </div>
              <div className="md:w-2/5 py-12 md:pt-8">
                  <div className="bg-gray-200 justify-center items-center dark:bg-background-color size-64 rounded-full relative">
                      {vendor?.companyName && <div className="bg-gray-200 dark:bg-background-color size-64 rounded-full relative flex items-center justify-center text-7xl font-bold text-foreground">{vendor.companyName.charAt(0)}</div>}
                      <div className="flex flex-col justify-center items-center my-8">
                          {vendor?.user?.verified ? <BadgeCheck size={40} className={`text-primary`} /> : <BadgeX size={40} className={`text-foreground`} />}
                          <p className="text-foreground">{vendor?.user?.verified ? 'Verified' : 'Not verified'}</p>
                          {!vendor?.user?.verified && <Button className='mt-4' onClick={handleVerify} disabled={vloading}>
                              {vloading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                              Verify vendor</Button>}
                      </div>
                      <div className="flex md:relative absolute -bottom-24 md:-bottom-0">
                          <div className="flex flex-col mt-12">
                              <p className="text-lg font-semibold text-foreground">Tenders</p>
                              <h1 className="text-4xl font-semibold text-foreground">{vendor?.Bid?.length}</h1>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}
