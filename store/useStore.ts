import { create } from 'zustand';

type Exhibition = {
  id: string;
  title: string;
  museum: string;
  city: string;
  date: string;
  image: string;
  tag: string;
  color: string;
  visitDate: string;
};

export type Store = {
  calendar: Exhibition[];
  addToCalendar: (ex: Exhibition) => void;
  removeFromCalendar: (id: string) => void;
};

export const useStore = create<Store>((set) => ({
  calendar: [],
  addToCalendar: (ex) => set((state) => ({
    calendar: [...state.calendar, ex]
  })),
  removeFromCalendar: (id) => set((state) => ({
    calendar: state.calendar.filter((e) => e.id !== id)
  })),
}));