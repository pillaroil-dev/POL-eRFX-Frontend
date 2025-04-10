import React, { useRef, useState } from "react";
import { Input } from "./input";
import Select from "react-dropdown-select";
import { Button } from "./button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { ReloadAfter } from "@/utilities/helpers/reload";

type UserData = {
  id: number;
  email: string;
};

export default function SettingsComponent({
  usersData,
  settings,
  token,
}: {
  usersData: {
    adminUsers: UserData[];
    operatorUsers: UserData[];
    fxadminUsers: UserData[];
    fxoperatorUsers: UserData[];
    users: UserData[];
  };
  settings: any[];
  token: string;
}) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingButtonId, setLoadingButtonId] = useState(null);
  const buttonRef = useRef(null);

  const data = settings[0];

  const [payload, setPayload] = useState({
    ...data,
    newAdminEmail: "",
    fullname: "",
  });

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreviewUrl(event.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePayloadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-pol-rfx-secret": token,
        },
        body: JSON.stringify({
          payload,
          role: selectedRole,
          appLogo: imagePreviewUrl,
        }),
      });

      const { message } = await res.json();

      if (res.ok) {
        toast.success(message);
        ReloadAfter(1500);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("An error occurred while saving settings");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (id: number) => {
    try {
      setLoadingButtonId(id);
      const res = await fetch("/api/v1/settings", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-pol-rfx-secret": token,
        },
        body: JSON.stringify({ id: id }),
      });

      const { message } = await res.json();
      toast.success(message);
      ReloadAfter(1500);

    } catch (error) {
      toast.error("An error occurred while deleting admin");
    } finally {
      setLoadingButtonId(null);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-x-4 ml-24 w-[calc(100%-7rem)] p-4 md:p-8 mt-24 mb-8 h-full rounded-2xl">
        <h1 className="text-xl font-bold mb-4 text-foreground">Settings</h1>
        <div className="flex flex-col my-8 gap-y-4 ">
          <div className="flex flex-col md:flex-row justify-between gap-x-4 w-full">
            <span className="md:w-1/2">
              <h1 className="text-2xl font-bold mb-4 text-foreground">
                POL eRFX
              </h1>
              <label className="block text- font-medium text-gray-600 dark:text-gray-400">
                4 Justice Rose Ukeje St, Lekki Phase I, Lekki 106104, Lagos
              </label>
            </span>
            <span className="md:w-1/2 mt-12 md:mt-0 relative">
              <h1 className="text-[16px] font-bold mb-4 text-foreground">
                APP Settings
              </h1>
              <label
                htmlFor="appName"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                App Name
              </label>
              <Input
                name="appName"
                className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                defaultValue={payload?.appName}
                onChange={handlePayloadChange}
              />
              <label
                htmlFor="appUrl"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                App Url
              </label>
              <Input
                name="appUrl"
                className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                defaultValue={payload?.appUrl}
                onChange={handlePayloadChange}
              />
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 text-foreground">
                App Logo
              </label>
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
              <label className="block text-sm pb-2 font-bold text-gray-600 dark:text-gray-400">
                Admin
              </label>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-background">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Admin Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-background dark:divide-gray-400">
                  {usersData?.adminUsers?.map((item: UserData) => (
                    <tr key={item?.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-400">
                        {item?.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <button
                          id={String(item.id)}
                          ref={buttonRef}
                          onClick={() => handleDeleteAdmin(item?.id)}
                          disabled={item.id === loadingButtonId && true}
                          className={`px-2 text-xs py-1 text-white ${item.id === loadingButtonId ? 'bg-gray-400 rounded' : 'bg-red-600 rounded hover:bg-red-700'} focus:outline-none focus:shadow-outline`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <label className="block text-sm pb-2 font-bold pt-4 text-gray-600 dark:text-gray-400">
                Operators (Bid Officer)
              </label>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-background">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Operator Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-background dark:divide-gray-400">
                  {usersData?.operatorUsers?.map((item: UserData) => (
                    <tr key={item?.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-400">
                        {item?.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <button
                        id={String(item.id)}
                        ref={buttonRef}
                        disabled={item.id === loadingButtonId && true}
                          onClick={() => handleDeleteAdmin(item?.id)}
                           className={`px-2 text-xs py-1 text-white ${item.id === loadingButtonId ? 'bg-gray-400 rounded' : 'bg-red-600 rounded hover:bg-red-700'} focus:outline-none focus:shadow-outline`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

               <label className="block text-sm pb-2 font-bold text-gray-600 dark:text-gray-400">
                FX Admin
              </label>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-background">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      FX Admin Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-background dark:divide-gray-400">
                  {usersData?.fxadminUsers?.map((item: UserData) => (
                    <tr key={item?.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-400">
                        {item?.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <button
                        id={String(item.id)}
                        ref={buttonRef}
                        disabled={item.id === loadingButtonId && true}
                          onClick={() => handleDeleteAdmin(item?.id)}
                          className={`px-2 text-xs py-1 text-white ${item.id === loadingButtonId ? 'bg-gray-400 rounded' : 'bg-red-600 rounded hover:bg-red-700'} focus:outline-none focus:shadow-outline`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <label className="block text-sm pb-2 font-bold pt-4 text-gray-600 dark:text-gray-400">
                FX Operators (FX Bid Officer)
              </label>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-background">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      FX Operator Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-background dark:divide-gray-400">
                  {usersData?.fxoperatorUsers?.map((item: UserData) => (
                    <tr key={item?.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-400">
                        {item?.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <button
                        id={String(item.id)}
                        ref={buttonRef}
                        disabled={item.id === loadingButtonId && true}
                          onClick={() => handleDeleteAdmin(item?.id)}
                          className={`px-2 text-xs py-1 text-white ${item.id === loadingButtonId ? 'bg-gray-400 rounded' : 'bg-red-600 rounded hover:bg-red-700'} focus:outline-none focus:shadow-outline`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="mt-4 font-medium text-foreground">
                New Administrator?
              </p>
              <span className="text-xs font-regular text-foreground my-2">
                Add new admin
              </span>
              <div className="flex w-full flex-col gap-2 justify-between">
                <div className="w-full flex-col md:w-2/3 rounded-md border border-solid">
                  <Input
                    name="fullname"
                    placeholder="Full Name"
                    value={payload.fullname}
                    onChange={handlePayloadChange}
                  />
                </div>
                <div className="w-full flex-col md:w-2/3 rounded-md border border-solid">
                <Input
                    name="newAdminEmail"
                    placeholder="Email address"
                    value={payload.newAdminEmail}
                    onChange={handlePayloadChange}
                  />
                </div>
              </div>
              {payload.newAdminEmail?.length > 5 && (
                <div className="flex flex-row space-x-4 py-4 text-foreground">
                  <h1>Administrator Role: </h1>
                  <div className="flex space-x-4">
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

                    <div className="flex items-center space-x-1">
                      <input
                        type="radio"
                        value="fx-admin"
                        id="fx-admin"
                        checked={selectedRole === "fx-admin"}
                        onChange={(e) => handleRoleChange(e.target.value)}
                      />
                      <label htmlFor="fx-admin">FX Admin</label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <input
                        type="radio"
                        value="fx-operator"
                        id="fx-operator"
                        checked={selectedRole === "fx-operator"}
                        onChange={(e) => handleRoleChange(e.target.value)}
                      />
                      <label htmlFor="fx-operator">FX Operator</label>
                    </div>
                  </div>
                </div>
              )}
            </span>
            <span className="md:w-1/2">
              <h1 className="text-[16px] font-bold my-4 md:mb-4 text-foreground">
                SMTP Settings
              </h1>
              <label
                htmlFor="smtpHost"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                SMTP Host
              </label>
              <Input
                name="smtpHost"
                className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                defaultValue={payload?.smtpHost}
                onChange={handlePayloadChange}
              />
              <label
                htmlFor="smtpUser"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                SMTP Username
              </label>
              <Input
                name="smtpUser"
                className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                defaultValue={payload?.smtpUser}
                onChange={handlePayloadChange}
              />
              <label
                htmlFor="smtpPort"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                SMTP Port
              </label>
              <Input
                name="smtpPort"
                className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                defaultValue={payload?.smtpPort}
                onChange={handlePayloadChange}
              />
              <label
                htmlFor="smtpPassword"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                SMTP Password
              </label>
              <Input
                name="smtpPassword"
                type="password"
                className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none"
                defaultValue={payload?.smtpPassword}
                onChange={handlePayloadChange}
              />
            </span>
          </div>
          <hr />
          <Button
            className="bg-primary w-40 mt-8 mx-auto"
            onClick={handleSave}
            disabled={loading}
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
