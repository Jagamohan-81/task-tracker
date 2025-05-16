import { create } from 'zustand';

type UIState = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  filterStatus: 'all' | 'completed' | 'pending';
  setFilterStatus: (status: UIState['filterStatus']) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  filterStatus: 'all',
  setFilterStatus: (status) => set({ filterStatus: status }),
}));
