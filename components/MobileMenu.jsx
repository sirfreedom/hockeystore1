import React, { useState } from 'react';
import { Menu, X, Home, ShoppingBag, Info, Phone, ChevronDown } from 'lucide-react';
import { useRouter } from "next/navigation";
import useCartStore from '@/lib/features/cart/useCartStore';
import useOrderStore from '@/lib/features/order/useOrderStore';
import useUserStore from '@/lib/features/user/useUserStore';

export default function MobileMenu() {

  const { clearUser } = useUserStore();
  const { clearCart } = useCartStore();
  const { CleanOrder } = useOrderStore();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const router = useRouter();
  const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        clearUser();
        CleanOrder();
        clearCart();
        localStorage.clear();
        router.push('/login');
    };


  return (
    /* Barra superior sin desplegar en FONDO BLANCO */
    <header className="bg-white text-slate-800 p-4 relative border-b border-slate-200">
      {/* Barra superior de la App */}
      <div className="flex items-center justify-between">

        {/* Botón hamburguesa en FONDO BLANCO */}
        <button
          onClick={toggleMenu}
          className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs focus:outline-none md:hidden"
          aria-label="Abrir menú"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay oscuro de fondo */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Menú Desplegable Lateral (Gris claro) */}
      <aside
        className={`fixed top-0 right-0 w-64 h-full bg-slate-50 text-slate-700 z-50 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Encabezado del Menú */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <span className="font-semibold text-lg text-slate-900"> Menu</span>
          <button
            onClick={toggleMenu}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links de Navegación */}
        <nav className="p-4 space-y-1">
          <a
            href="#inicio"
            onClick={toggleMenu}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-200/70 text-slate-700 hover:text-slate-900 transition"
          >
            <Home size={20} />
            <span className="font-medium">Inicio</span>
          </a>

          {/* Opción con Submenú */}
          <div>

            <button
              onClick={() => setOpenSubmenu(!openSubmenu)}
              className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-slate-200/70 text-slate-700 hover:text-slate-900 transition"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />
                <span className="font-medium"> Mi cuenta </span>
              </div>
              <ChevronDown
                size={18}
                className={`transform transition-transform ${openSubmenu ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {/* Submenú desplegable */}
            {openSubmenu && (

              <div className="pl-10 space-y-1 my-1 border-l-2 border-slate-200 ml-5">
                <a
                  href="/store/manage-product"
                  onClick={toggleMenu}
                  className="block p-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-md"
                >
                  Mis Productos
                </a>

                <a
                  href="/store/orders"
                  onClick={toggleMenu}
                  className="block p-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-md"
                >
                  Mis Compras
                </a>

                <a
                  href="/store/Sell-products"
                  onClick={toggleMenu}
                  className="block p-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-md"
                >
                  Mis Ventas
                </a>

              </div>
            )}
          </div>

          <a
            href="/mysite"
            onClick={toggleMenu}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-200/70 text-slate-700 hover:text-slate-900 transition"
          >
            <Info size={20} />
            <span className="font-medium">Nosotros</span>
          </a>

          <a
            href="/reportproblem"
            onClick={toggleMenu}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-200/70 text-slate-700 hover:text-slate-900 transition"
          >
            <Phone size={20} />
            <span className="font-medium">Problemas?</span>
          </a>

          <button className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full" onClick={handleLogout}>
            logout
          </button>

        </nav>
      </aside>
    </header>
  );
}