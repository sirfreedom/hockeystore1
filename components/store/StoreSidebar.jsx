'use client'
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { HomeIcon, LayoutListIcon, SquarePenIcon, SquarePlusIcon, Truck, ListX, NotebookText, User, UserRoundPen } from "lucide-react";
import Link from "next/link";
import { getKey } from "@/Api/BaseHelper";
import CheckLogin from "@/components/CheckLogin";

const StoreSidebar = () => {

    const pathname = usePathname();
    const LogoImg = getKey('logoimgtext');
    const UserName = getKey('username');

    const sidebarLinks = [
        { name: 'Dashboard', href: '/store', icon: HomeIcon },
        { name: 'Modificar Perfil', href: '/store/store-edit', icon: User },
        { name: 'Cambiar Foto Perfil', href: '/store/store-photo', icon: UserRoundPen },
        { name: 'Responder preguntas', href: '/store/manager-comment', icon: NotebookText },
        { name: 'Agregar Producto', href: '/store/add-product', icon: SquarePlusIcon },
        { name: 'Editar Producto', href: '/store/manage-product', icon: SquarePenIcon },
        { name: 'Tus Ventas', href: '/store/Sell-products', icon: LayoutListIcon },
        { name: 'Tus Compras', href: '/store/orders', icon: Truck },
        { name: 'Compras Rechazadas', href: '/store/decline-BuyOrders', icon: ListX },
        { name: 'Ventas Rechazadas', href: '/store/decline-SellOrders', icon: ListX }
    ]

    useEffect(() => {

    }, [])

    return (

       <>
            <CheckLogin></CheckLogin>

            <div className="flex h-full flex-col gap-5 border-r border-slate-200 w-full sm:w-60 min-w-60">

                {(LogoImg) &&
                    (
                        <div className="flex flex-col gap-3 justify-center items-center pt-6">
                            <Link
                                href="/store/store-photo"
                                className="relative w-28 h-28 sm:w-44 sm:h-44 rounded-full shadow-md overflow-hidden group cursor-pointer block"
                            >
                                <img
                                    className="w-full h-full object-cover"
                                    src={LogoImg}
                                    alt="Foto de perfil"
                                />

                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white text-xs font-medium text-center px-2">
                                        Cambiar imagen
                                    </span>
                                </div>
                            </Link>

                            <p className="text-slate-700 font-medium text-center">{UserName}</p>
                        </div>
                    )}

                <div className="flex flex-col w-full">
                    {
                        sidebarLinks.map((link, index) => (
                            <Link key={index} href={link.href} className={`relative flex items-center gap-3 text-slate-500 hover:bg-slate-50 p-3 px-4 transition ${pathname === link.href && 'bg-slate-100 text-slate-700 font-medium'}`}>
                                <link.icon size={18} className="shrink-0" />
                                <p className="text-sm">{link.name}</p>
                                {pathname === link.href && <span className="absolute bg-green-500 right-0 top-1.5 bottom-1.5 w-1 sm:w-1.5 rounded-l"></span>}
                            </Link>
                        ))
                    }
                </div>
            </div>
       
       </>

    )
}

export default StoreSidebar
