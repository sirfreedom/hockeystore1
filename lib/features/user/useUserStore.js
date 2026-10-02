import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      expiresAt: null, // Timestamp en milisegundos (getTime())
      isValid: false,   // Flag de validez del usuario según la BD

      // Inicia sesión o actualiza los datos del usuario
      setUser: (userData, token = null, expiresAt = null, isValid = false) => {
        if (!userData) return;

        set({
          user: userData,
          token: token || get().token,
          isAuthenticated: true,
          expiresAt: expiresAt ?? get().expiresAt,
          isValid: isValid ?? get().isValid,
        });
      },

      // Setters independientes por si necesitas actualizarlos por separado
      setExpiresAt: (expiresAt) => set({ expiresAt }),
      setIsValid: (isValid) => set({ isValid }),

      // Cierra sesión limpiando todo el estado
      clearUser: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          expiresAt: null,
          isValid: false,
        });
      },

      // Comprueba únicamente si la fecha actual es mayor a la fecha guardada
      isExpired: () => {
        const { expiresAt } = get();
        if (!expiresAt) return true;
        return Date.now() > expiresAt;
      },

      // Consulta de forma separada si el usuario es válido en la BD
      isUserValid: () => {
        return get().isValid;
      },

      // Verifica sesión activa por token y controla expiración
      checkAuth: () => {
        const { user, token, expiresAt, clearUser } = get();

        // Si la fecha actual superó a la fecha límite, cierra la sesión
        if (expiresAt && Date.now() > expiresAt) {
          return false;
        }

        return !!user && !!token;
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;