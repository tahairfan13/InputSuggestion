// src/store/useFormulaStore.js
import create from 'zustand';

const useFormulaStore = create((set) => ({
  tags: [],
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  removeTag: (index) => set((state) => ({
    tags: state.tags.filter((_, i) => i !== index),
  })),
  clearTags: () => set({ tags: [] }),
}));

export default useFormulaStore;
