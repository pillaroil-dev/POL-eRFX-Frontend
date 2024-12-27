import { createStore } from 'zustand/vanilla';
import { persist, createJSONStorage } from 'zustand/middleware';

type File = {
  name: string;
  path: string;
  size: number;
}

type Recepient = {
  bidId: number;
  contractorId: number;
}

interface TenderStore {
  $files: File[];
  $tenders: any[];
  $recepients: Recepient[];
  $setTender: ({ tender, files, recepients }: { tender?: TenderStore['$tenders'], files?: TenderStore['$files'], recepients?: TenderStore['$recepients'] }) => void;
}

//@ts-ignore
const tenderStore = createStore<TenderStore>(persist((set) => ({
  $files: [],
  $tenders: [],
  $recepients: [],
  $setTender: ({ tender, files, recepients }: { tender?: TenderStore['$tenders'], files?: TenderStore['$files'], recepients?: TenderStore['$recepients'] }) => set((state: TenderStore) => ({ $tenders: tender, $files: files, $recepients: recepients })),
}),
  {
    name: '@tender',
    storage: createJSONStorage(() => sessionStorage)
  },)
);

export default tenderStore;
