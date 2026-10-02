import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: {},

      addItem: (idInput) => {
        // 1. Extraer el ID sea como sea que venga
        const productId = typeof idInput === 'object' ? (idInput.id || idInput._id) : idInput;

        //console.log("Intentando agregar ID:", productId);

        if (!productId) {
          //console.error("ERROR: El ID llegó vacío o indefinido", idInput);
          return;
        }

        // Convertimos a String para evitar el problema de llaves numéricas
        const cleanId = String(productId);

        set((state) => ({
          items: {
            ...state.items,
            [cleanId]: (state.items[cleanId] || 0) + 1
          }
        }));
        
       // console.log("Estado actualizado:", get().items);
      },

      removeItem: (productId) => set((state) => {
        const cleanId = String(productId);
        const newItems = { ...state.items };
        if (newItems[cleanId] > 1) {
          newItems[cleanId] -= 1;
        } else {
          delete newItems[cleanId];
        }
        return { items: newItems };
      }),

      // ELIMINACIÓN DEFINITIVA: Quita el producto sin importar el número de unidades
      deleteItem: (productId) => set((state) => {
        const cleanId = String(productId);
        const newItems = { ...state.items };
        
        delete newItems[cleanId]; // Elimina la propiedad directamente
        
        return { items: newItems };
      }),

      clearCart: () => set({ items: {} }),
    }),
    { name: 'cart-storage' }
  )
);

export default useCartStore;