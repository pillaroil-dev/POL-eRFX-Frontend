import { createStore } from 'zustand/vanilla';
import { persist, createJSONStorage } from 'zustand/middleware';


interface ReportStore {
    $reports: any;
    $setReports: (data: any) => void;
}

//@ts-ignore
const reportStore = createStore<ReportStore>(persist((set) => ({
    $reports: {},
    $setReports: (data) => set((state) => ({
        $reports: data
    })),
}),
    {
        name: '@report',
        storage: createJSONStorage(() => sessionStorage)
    },
));

export default reportStore;
