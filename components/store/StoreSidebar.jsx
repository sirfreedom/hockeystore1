'use client'
import { usePathname } from "next/navigation";
import { 
  HomeIcon, 
  LayoutListIcon, 
  SquarePenIcon, 
  SquarePlusIcon, 
  Truck, 
  ListX, 
  NotebookText, 
  User, 
  UserRoundPen 
} from "lucide-react";
import Link from "next/link";
import { getKey } from "@/Api/BaseHelper";
import CheckLogin from "@/components/CheckLogin";

const StoreSidebar = () => {
  const pathname = usePathname();
  const LogoImg = getKey('logoimgtext');
  const UserName = getKey('username');

  // Estructura organizada por secciones para mayor claridad visual
  const sidebarGroups = [
    {
      title: "General",
      links: [
        { name: 'Dashboard', href: '/store', icon: HomeIcon },
        { name: 'Modificar Perfil', href: '/store/store-edit', icon: User },
        { name: 'Cambiar Foto Perfil', href: '/store/store-photo', icon: UserRoundPen },
      ]
    },
    {
      title: "Catálogo",
      links: [
        { name: 'Agregar Producto', href: '/store/add-product', icon: SquarePlusIcon },
        { name: 'Editar Producto', href: '/store/manage-product', icon: SquarePenIcon },
        { name: 'Responder Preguntas', href: '/store/manager-comment', icon: NotebookText },
      ]
    },
    {
      title: "Órdenes y Transacciones",
      links: [
        { name: 'Tus Ventas', href: '/store/Sell-products', icon: LayoutListIcon },
        { name: 'Tus Compras', href: '/store/orders', icon: Truck },
        { name: 'Ventas Rechazadas', href: '/store/decline-SellOrders', icon: ListX },
        { name: 'Compras Rechazadas', href: '/store/decline-BuyOrders', icon: ListX },
      ]
    }
  ];

  return (
    <>
      <CheckLogin />

      <div className="hidden sm:block flex h-full flex-col gap-3 border-r border-slate-200 w-full sm:w-60 min-w-60 bg-white p-3 text-slate-700 select-none">
        
        {/* Encabezado Perfil compacto */}
        {LogoImg && (
          <div className="flex flex-col items-center gap-2 pt-2 pb-3 border-b border-slate-100">
            <Link
              href="/store/store-photo"
              className="relative w-20 h-20 rounded-full shadow-sm overflow-hidden group cursor-pointer block border border-slate-200"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={LogoImg}
                alt="Foto de perfil"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-white text-[10px] font-medium text-center px-1">
                  Cambiar
                </span>
              </div>
            </Link>
            <p className="text-sm font-semibold text-slate-800 tracking-wide text-center truncate max-w-full px-2">
              {UserName}
            </p>
          </div>
        )}

        {/* Lista de enlaces compacta */}
        <div className="flex flex-col gap-4 overflow-y-auto py-1">
          {sidebarGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="flex flex-col gap-1">
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {group.title}
              </span>
              
              <div className="flex flex-col gap-0.5">
                {group.links.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative flex items-center gap-2.5 px-2.5 py-1.5 text-xs rounded-md transition-all duration-150 ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon 
                        size={16} 
                        className={`shrink-0 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} 
                      />
                      <span className="truncate">{link.name}</span>

                      {/* Indicador activo lateral */}
                      {isActive && (
                        <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-emerald-500 rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default StoreSidebar;