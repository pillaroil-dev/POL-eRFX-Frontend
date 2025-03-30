import { useState } from 'react';
import {Button} from '../../../components/ui/react/button';
import {Input} from '../../../components/ui/react/input';
import {Badge} from '../../../components/ui/react/badge';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { Checkbox } from './checkbox';


const OnboardingForm = () => {
    type OnBoardingStateType = {
        loading: boolean;
        activeTab: string;
        checked: boolean;
        first_name: string;
        last_name: string;
        company_name: string;
        business_phone: string;
        business_phone_2: string;
        home_phone: string;
    };

    const [onBoardingState, setOnBoardingState] = useState<OnBoardingStateType>({
        loading: false,
        activeTab: 'bid',
        checked: false,
        first_name: "",
        last_name: "",
        company_name: "",
        business_phone: "",
        business_phone_2: "",
        home_phone: "",
    });

    async function handleSubmit() {
        setOnBoardingState((prevState) => ({
            ...prevState,
            loading: true,
        }));
        if (onBoardingState.activeTab === 'bid') {
            if (!onBoardingState.company_name || !onBoardingState.business_phone || !onBoardingState.home_phone) {
            setOnBoardingState((prevState) => ({
                ...prevState,
                loading: false,
            }));
                toast.error("All fields are required.");
                return;
            }

            const payload = {
                companyName: onBoardingState.company_name,
                businessPhone: onBoardingState.business_phone,
                homePhone: onBoardingState.home_phone,
                falconRegistration: onBoardingState.checked
            };
            const res = await fetch("/api/auth/onboarding", {
                method: "POST",
                body: JSON.stringify(payload)
            });
            const responseMessage = await res.json();
            if (res.status === 200) {
                setOnBoardingState((prevState) => ({
                    ...prevState,
                    loading: false,
                }));
                toast.success(responseMessage.message);
                setTimeout(() => {
                    window.location.replace("/auth/congratulations");
                }, 1500);
            } else {
                setOnBoardingState((prevState) => ({
                    ...prevState,
                    loading: false,
                }));
                toast.error(responseMessage.message);
            };

        };
        if (onBoardingState.activeTab === 'fx') {

            if (!onBoardingState.first_name || !onBoardingState.last_name || !onBoardingState.business_phone_2) {
                setOnBoardingState((prevState) => ({
                    ...prevState,
                    loading: false,
                }));
                toast.error("All fields are required.");
                return;
            }

            const payload = {
                firstName: onBoardingState.first_name,
                lastName: onBoardingState.last_name,
                businessPhone: onBoardingState.business_phone_2
            };
            const res = await fetch("/api/auth/onboarding", {
                method: "POST",
                body: JSON.stringify(payload)
            });
            const responseMessage = await res.json();
            if (res.status === 200) {
                setOnBoardingState((prevState) => ({
                    ...prevState,
                    loading: false,
                }));
                toast.success(responseMessage.message);
                setTimeout(() => {
                    window.location.replace("/auth/congratulations");
                }, 1500);
            } else {
                setOnBoardingState((prevState) => ({
                    ...prevState,
                    loading: false,
                }));
                toast.error(responseMessage.message);
            };
        };
    }

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
                    className={`px-8 py-2 tab ${onBoardingState.activeTab === 'bid' ? 'active bg-gray-600 text-white' : ''} cursor-pointer`}
                    onClick={() => setOnBoardingState((prevState) => ({
                        ...prevState,
                        activeTab: 'bid'
                    }))}
                >
                    Bid Onboarding
                </Badge>
                <Badge
                    id="fxTab"
                    variant="outline"
                    className={`px-8 py-2 tab ${onBoardingState.activeTab === 'fx' ? 'active bg-gray-600 text-white' : ''} cursor-pointer`}
                    onClick={() => setOnBoardingState((prevState) => ({
                        ...prevState,
                        activeTab: 'fx'
                    }))}
                >
                    Fx Onboarding
                </Badge>
            </div>

            {onBoardingState.activeTab === 'bid' && (
                <div id="bidOnboarding" className="onboarding-section">
                    <div className="w-full flex flex-col items-center mx-auto gap-4">
                        {/* Bid onboarding inputs */}
                        <div className="w-full flex flex-col my-12 items-center mx-auto gap-4">
                            <Input
                                type="text"
                                placeholder="Company name"
                                value={onBoardingState.company_name}
                                onChange={(e) => setOnBoardingState((prevState) => ({
                                    ...prevState,
                                    company_name: e.target.value,
                                }))}
                                name="company_name"
                                className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-2/3"
                            />
                            <Input
                                type="tel"
                                placeholder="Business phone"
                                name="business_phone"
                                value={onBoardingState.business_phone}
                                onChange={(e) => setOnBoardingState((prevState) => ({
                                    ...prevState,
                                    business_phone: e.target.value
                                }))}
                                className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-2/3"
                                maxLength={11}
                                minLength={11}
                            />
                            <Input
                                type="tel"
                                placeholder="Home phone"
                                name="home_phone"
                                value={onBoardingState.home_phone}
                                onChange={(e) => setOnBoardingState((prevState) => ({
                                    ...prevState,
                                    home_phone: e.target.value
                                }))}
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
                                <Checkbox checked={onBoardingState.checked} onCheckedChange={() => setOnBoardingState((prevState) => ({
                                    ...prevState,
                                    checked: !onBoardingState.checked,
                                }))} name="falcon_registration" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {onBoardingState.activeTab === 'fx' && (
                <div id="fxOnboarding" className="onboarding-section">
                    <div className="w-full flex flex-col items-center mx-auto gap-4">
                        {/* Fx onboarding inputs */}
                        <div className="w-full flex flex-col my-12 items-center mx-auto gap-4">
                            <div className="flex gap-4 w-2/3">
                                <Input
                                    type="text"
                                    placeholder="First name"
                                    name="first_name"
                                    value={onBoardingState.first_name}
                                    onChange={(e) => setOnBoardingState((prevState) => ({
                                        ...prevState,
                                        first_name: e.target.value
                                    }))}
                                    className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-1/2"
                                />
                                <Input
                                    type="text"
                                    placeholder="Last name"
                                    value={onBoardingState.last_name}
                                    onChange={(e) => setOnBoardingState((prevState) => ({
                                        ...prevState,
                                        last_name: e.target.value
                                    }))}
                                    name="last_name"
                                    className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-1/2"
                                />
                            </div>
                            <Input
                                type="tel"
                                placeholder="Business phone"
                                value={onBoardingState.business_phone_2}
                                onChange={(e) => setOnBoardingState((prevState) => ({
                                    ...prevState,
                                    business_phone_2: e.target.value
                                }))}
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
                <Button className="w-2/3 bg-primary" onClick={handleSubmit} disabled={onBoardingState.loading}>
                    {onBoardingState.loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Continue
                </Button>
            </div>
        </div>
    );
};

export { OnboardingForm };