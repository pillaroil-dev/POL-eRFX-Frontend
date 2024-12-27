import React, { useState } from 'react'
import { Input } from './input'
import Select from 'react-dropdown-select'
import { Button } from './button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { ReloadAfter } from '@/utilities/helpers/reload';

type UserData = {
    id: number;
    email: string;
}

export default function SettingsComponent({ usersData, settings, token }: { usersData: { adminUsers: UserData[], operatorUsers: UserData[], users: UserData[] }, settings: any[], token: string }) {

    const [selected, setSelected] = useState<UserData[]>([]);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [selectedRole, setSelectedRole] = useState(''); 
    const [loading, setLoading] = useState(false);

    const data = settings[0];

    const handleRoleChange = (value: string) => {
        setSelectedRole(value);
    };

    const [payload, setPayload] = useState({
        ...data
    });


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreviewUrl(event.target.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handlePayloadChange = (e: { preventDefault: () => void; target: { name: string; value: string; }; }) => {
        e.preventDefault()
        setPayload({
            ...payload,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        setLoading(true)
        const res = await fetch('/api/v1/settings', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "x-pol-rfx-secret": token,
            },
            body: JSON.stringify({ payload, role: selectedRole, user: selected[0], appLogo: imagePreviewUrl }),
        });
        const {message} = await res.json();
        if (res.status === 200) {
            setLoading(false)
            toast.success(message);
            ReloadAfter(1500)
        } else {
            setLoading(false)
            toast.success(message);
        }
    };
    
  return (
      <>
          <div
              className="flex flex-col gap-x-4 ml-24 w-[calc(100%-7rem)] p-4 md:p-8 mt-24 mb-8 h-full rounded-2xl"
          >
              <h1 className="text-xl font-bold mb-4 text-foreground">Settings</h1>
              <div className="flex flex-col my-8 gap-y-4 ">
                  <div className="flex flex-col md:flex-row justify-between gap-x-4 w-full">
                      <span className="md:w-1/2">
                          <h1 className="text-2xl font-bold mb-4 text-foreground">POL eRFX</h1>
                          <label className="block text- font-medium text-gray-600 dark:text-gray-400"
                          >4 Justice Rose Ukeje St, Lekki Phase I, Lekki 106104, Lagos</label
                          >
                      </span>
                      <span className="md:w-1/2 mt-12 md:mt-0 relative">
                          <h1 className="text-[16px] font-bold mb-4 text-foreground">
                              APP Settings
                          </h1>
                          <label htmlFor="appName" className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                          >App Name
                          </label>
                          <Input
                              name='appName'
                              className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                              defaultValue={payload?.appName}
                              onChange={handlePayloadChange}
                          />
                          <label htmlFor="appUrl" className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                          >App Url</label>
                          <Input
                              name='appUrl'
                              className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                              defaultValue={payload?.appUrl}
                              onChange={handlePayloadChange}
                          />
                          <label
                              className="block text-sm font-medium text-gray-600 dark:text-gray-400 text-foreground"
                          >App Logo</label>
                          <Input
                              type="file"
                              id="app-image"
                              className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                              onChange={handleImageChange}
                          />
                          <img
                              src={imagePreviewUrl || payload?.appLogo}
                              width="60px"
                              height="60px"
                              alt="app-logo"
                              id="image-preview"
                              className="absolute top-1 right-5"
                          />
                      </span>
                  </div>
                  <hr />
                  <div className="flex flex-col md:flex-row justify-between gap-x-4 w-full mt-8">
                      <span className="md:w-1/2">
                          <h1 className="text-[16px] font-bold mb-4 text-foreground">
                              System Administrators
                          </h1>
                          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                          >Admin</label>
                          {
                              usersData?.adminUsers?.map((item: UserData) => (
                                  <Input
                                      key={item?.id}
                                      className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                                      defaultValue={item?.email}
                                      readOnly
                                  />
                              ))
                          }
                          <label className="block text-sm font-medium pt-4 text-gray-600 dark:text-gray-400"
                          >Operators (Bid Officer)</label
                          >
                          {
                              usersData?.operatorUsers?.map((item: UserData) => (
                                  <Input
                                      key={item?.id}
                                      className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                                      defaultValue={item?.email}
                                      readOnly
                                  />
                              ))
                          }

                          <p className="mt-4 font-medium text-foreground">New Administrator?</p>
                          <span className='text-xs font-regular text-foreground my-2'>Make new admin</span>
                          <div className="flex w-full justify-between">
                              <div className='w-full md:w-3/4'>
                                  <Select
                                      options={usersData?.users}
                                      values={selected}
                                      className="dark:bg-natural w-full"
                                      searchBy="email"
                                      color="#1b1d22"
                                      name="settings_users"
                                      labelField="email"
                                      valueField="id"
                                      onChange={setSelected}
                                  />
                              </div>
                          </div>
                          {selected?.length > 0 && (
                              <div className="flex flex-row space-x-4 py-4 text-foreground">
                                  <h1>Administrator Role: </h1>
                                  <div className='flex space-x-4'>
                                      <div className="flex items-center space-x-1">
                                          <input
                                              type="radio"
                                              value="admin"
                                              id="admin"
                                              checked={selectedRole === "admin"}
                                              onChange={(e) => handleRoleChange(e.target.value)}
                                          />
                                          <label htmlFor="admin">Admin</label>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                          <input
                                              type="radio"
                                              value="operator"
                                              id="operator"
                                              checked={selectedRole === "operator"}
                                              onChange={(e) => handleRoleChange(e.target.value)}
                                          />
                                          <label htmlFor="operator">Operator</label>
                                      </div>
                                  </div>
                              </div> 
                          )}
                      </span>
                      <span className="md:w-1/2">
                          <h1 className="text-[16px] font-bold my-4 md:mb-4 text-foreground">
                              SMTP Settings
                          </h1>
                          <label htmlFor="smtpHost" className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                          >SMTP Host</label
                          >
                          <Input
                              name='smtpHost'
                              className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                              defaultValue={payload?.smtpHost}
                              onChange={handlePayloadChange}
                          />
                          <label htmlFor="smtpUser" className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                          >SMTP Username</label
                          >
                          <Input
                              name='smtpUser'
                              className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                              defaultValue={payload?.smtpUser}
                              onChange={handlePayloadChange}
                          />
                          <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                          >SMTP Port</label
                          >
                          <Input
                              name='smtpPort'
                              className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                              defaultValue={payload?.smtpPort}
                              onChange={handlePayloadChange}
                          />
                          <label htmlFor="smtpPassword" className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                          >SMTP Password</label
                          >
                          <Input
                              name='smtpPassword'
                              type="password"
                              className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                              defaultValue={payload?.smtpPassword}
                              onChange={handlePayloadChange}
                          />
                      </span>
                  </div>
                  <hr /> 
                  <Button className='bg-primary w-40 mt-8 mx-auto' onClick={handleSave} disabled={loading}>
                      {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                      Save
                  </Button>
              </div>
          </div>
      </>

  )
}
