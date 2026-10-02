import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useOrderStore = create(
  persist(
    (set) => ({
      // Lista de objetos
      ItemsOrder: [],

      // Agrega un nuevo objeto con valor 1
      AddOrder: () => set((state) => ({
        ItemsOrder: [...state.ItemsOrder, { value: 1 }]
      })),

      // Elimina el último objeto guardado
      RemoveOrder: () => set((state) => ({
        ItemsOrder: state.ItemsOrder.slice(0, -1)
      })),

      // Limpia toda la lista
      CleanOrder: () => set({ ItemsOrder: [] }),
    }),
    { name: 'order-storage' }
  )
);

export default useOrderStore;