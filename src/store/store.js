import { create } from 'zustand';

export const useStore = create((set) => ({
  pageData: null,
  setPageData: (data) => set({ pageData: data }),
}));