import { createStore } from 'zustand/vanilla'
import jwt from 'jsonwebtoken';
import { prisma } from '@/utilities/helpers/prismaInstace';


interface STORE {
  $loading: boolean;
  $userData: any;
  $vendors: [];
  $recepientList: [];
  $setVendors: ({ vendorList }: { vendorList: [] }) => Promise<void>;
  $setUserData: ({ userData }: { userData: any }) => Promise<void>;
  $setLoading: (loading: boolean) => void;
  $setRecepientList: (list: any) => void;
}

const store = createStore<STORE>((set) => ({
  $loading: false,
  $userData: {},
  $vendors: [],
  $recepientList: [],
  $setRecepientList: (list: any) => set((state) => ({$recepientList: list})),
  $setVendors: async ({ vendorList }: { vendorList: [] }) => set((state) => ({ $vendors: vendorList })),
  $setUserData: async ({ userData }: { userData: any }) => set((state) => ({$userData: userData})),
  $setLoading: (loading: boolean) => set({$loading: loading})
}));

export default store;