import React, { useEffect, useState } from 'react';
import {Button} from '../../../components/ui/react/button';
import {Input} from '../../../components/ui/react/input';
import {Badge} from '../../../components/ui/react/badge';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { Checkbox } from './checkbox';


const OnboardingForm = () => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('bid');
    const [checked, setChecked] = useState(false)
    

    const handleSubmit = async () => {
        setLoading(true);

        if (activeTab === 'bid') {
            const company_name = (document.querySelector('input[name="company_name"]') as HTMLInputElement).value;
            const business_phone = (document.querySelector('input[name="business_phone"]') as HTMLInputElement).value;
            const home_phone = (document.querySelector('input[name="home_phone"]') as HTMLInputElement).value;

            if (!company_name || !business_phone || !home_phone) {
                setLoading(false)
                toast.error("All fields are required.");
                return;
            }

            const payload = {
                companyName: company_name,
                businessPhone: business_phone,
                homePhone: home_phone,
                falconRegistration: checked
            };
            const res = await fetch("/api/auth/onboarding", {
                method: "POST",
                body: JSON.stringify(payload)
            });
            const responseMessage = await res.json();
            if (res.status === 200) {
                setLoading(false)
                toast.success(responseMessage.message)
                setTimeout(() => {
                    window.location.replace("/auth/congratulations")
                }, 1500);
            } else {
                setLoading(false)
                toast.error(responseMessage.message)
            };

        };
        if (activeTab === 'fx') {
            const first_name = (document.querySelector('input[name="first_name"]') as HTMLInputElement).value;
            const last_name = (document.querySelector('input[name="last_name"]') as HTMLInputElement).value;
            const business_phone_2 = (document.querySelector('input[name="business_phone_2"]') as HTMLInputElement).value;

            if (!first_name || !last_name || !business_phone_2) {
                setLoading(false)
                toast.error("All fields are required.");
                return;
            }

            const payload = {
                firstName: first_name,
                lastName: last_name,
                businessPhone: business_phone_2
            };
            const res = await fetch("/api/auth/onboarding", {
                method: "POST",
                body: JSON.stringify(payload)
            });
            const responseMessage = await res.json();
            if (res.status === 200) {
                setLoading(false)
                toast.success(responseMessage.message)
                setTimeout(() => {
                    window.location.replace("/auth/congratulations")
                }, 1500);
            } else {
                setLoading(false)
                toast.error(responseMessage.message)
            };
        };
    };

    return (
        <div className="flex flex-col w-full h-full">
            <h1 className="font-semibold text-3xl my-6">Onboarding</h1>
            <p className="text text-slate-500">Enter your details to get started.</p>
            <p className="text-xs my-2 text-slate-500">
                Ensure your information is accurate. It can't be changed later.
            </p>

            <div className="flex justify-center space-x-2 mt-8">
                <Badge
                    id="bidTab"
                    variant="outline"
                    className={`px-8 py-2 tab ${activeTab === 'bid' ? 'active bg-gray-600 text-white' : ''} cursor-pointer`}
                    onClick={() => setActiveTab('bid')}
                >
                    Bid Onboarding
                </Badge>
                <Badge
                    id="fxTab"
                    variant="outline"
                    className={`px-8 py-2 tab ${activeTab === 'fx' ? 'active bg-gray-600 text-white' : ''} cursor-pointer`}
                    onClick={() => setActiveTab('fx')}
                >
                    Fx Onboarding
                </Badge>
            </div>

            {activeTab === 'bid' && (
                <div id="bidOnboarding" className="onboarding-section">
                    <div className="w-full flex flex-col items-center mx-auto gap-4">
                        {/* Bid onboarding inputs */}
                        <div className="w-full flex flex-col my-12 items-center mx-auto gap-4">
                            <Input
                                type="text"
                                placeholder="Company name"
                                name="company_name"
                                className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-2/3"
                            />
                            <Input
                                type="tel"
                                placeholder="Business phone"
                                name="business_phone"
                                className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-2/3"
                                maxLength={11}
                                minLength={11}
                            />
                            <Input
                                type="tel"
                                placeholder="Home phone"
                                name="home_phone"
                                maxLength={11}
                                minLength={11}
                                className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-2/3"
                            />
                            <div className="flex items-center space-x-2 border border-primary p-3 rounded-lg">
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                                >
                                    Are you a Falcon member?
                                </label>
                                <Checkbox checked={checked} onCheckedChange={() => setChecked(!checked)} name="falcon_registration" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'fx' && (
                <div id="fxOnboarding" className="onboarding-section">
                    <div className="w-full flex flex-col items-center mx-auto gap-4">
                        {/* Fx onboarding inputs */}
                        <div className="w-full flex flex-col my-12 items-center mx-auto gap-4">
                            <div className="flex gap-4 w-2/3">
                                <Input
                                    type="text"
                                    placeholder="First name"
                                    name="first_name"
                                    className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-1/2"
                                />
                                <Input
                                    type="text"
                                    placeholder="Last name"
                                    name="last_name"
                                    className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-1/2"
                                />
                            </div>
                            <Input
                                type="tel"
                                placeholder="Business phone"
                                name="business_phone_2"
                                className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-2/3"
                                maxLength={11}
                                minLength={11}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-center">
                <Button className="w-2/3 bg-primary" onClick={handleSubmit} disabled={loading}>
                    {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Continue
                </Button>
            </div>
        </div>
    );
};

export { OnboardingForm };

// Remember to adapt your CSS accordingly, either by importing a CSS file or using inline styles.