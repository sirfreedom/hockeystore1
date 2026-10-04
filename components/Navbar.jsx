'use client'
import { Search, ShoppingCart, User, Truck, Wrench, House, Handshake } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getKey } from "@/Api/BaseHelper";
import useCartStore from '@/lib/features/cart/useCartStore';
import useOrderStore from '@/lib/features/order/useOrderStore';
import { Get } from '@/Api/AppStoreConfigHelper';
import useUserStore from '@/lib/features/user/useUserStore';
import MobileMenu from '@/components/MobileMenu';

const Navbar = () => {

    const [isMounted, setIsMounted] = useState(false);
    const { user, clearUser, checkAuth, isAuthenticated, isUserValid } = useUserStore();
    const { clearCart } = useCartStore();
    const itemsCartCount = Object.keys(useCartStore((state) => state.items)).length;
    const { ItemsOrder, CleanOrder } = useOrderStore();
    const router = useRouter();
    const [AppStoreConfig, setAppStoreConfig] = useState();
    const authenticated = isMounted ? checkAuth() : false;
    const validUser = isMounted ? isUserValid() : false;
    const [search, setSearch] = useState('');


    useEffect(() => {
        // Marcamos como montado para habilitar la lógica client-side
        setIsMounted(true);

        // Si la sesión expiró, la limpiamos de forma segura dentro del useEffect
        const isExpired = useUserStore.getState().isExpired();
        if (isExpired && isAuthenticated) {
            clearUser();
        }

        if (!AppStoreConfig || getKey('imgapp')) {
            Get().then(data => {
                setAppStoreConfig(data);
            });
        }
    }, [clearUser]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/shop?search=${search}`, { scroll: false });
        setSearch('');
    };

    const handleRegister = () => {
        router.push('/create-store');
    };

    const handlerLogin = () => {
        router.push('/login');
    };

    const handleLogout = () => {
        clearUser();
        CleanOrder();
        clearCart();
        localStorage.clear();
        router.push('/login');
    };

    return (

        <nav className="relative bg-white w-full">
            <div className="w-full">
                <div className="flex items-center justify-between w-full px-4 py-2 transition-all">

                    <Link href="/" className="relative text-2xl sm:text-4xl font-semibold text-slate-700 shrink-0">
                        <span className="text-green-600">{AppStoreConfig?.nameapp}</span>
                        {AppStoreConfig?.extranameapp}
                        <p className="absolute text-[10px] sm:text-xs font-semibold -top-1 -right-6 sm:-right-8 px-2 sm:px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                            beta
                        </p>
                    </Link>


                    {/* Link Sitio */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-6 text-slate-600 ml-4">

                        <Link href="/shop" className="whitespace-nowrap">
                            Productos
                        </Link>

                        {/* Barra de búsqueda */}
                        <form onSubmit={handleSearch} className="hidden xl:flex items-center min-w-[200px] max-w-md text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full flex-grow">
                            <Search size={18} className="text-slate-600" />
                            <input
                                className="w-full bg-transparent outline-none placeholder-slate-600"
                                maxLength={50}
                                type="text"
                                placeholder="Buscar productos"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                required
                            />
                        </form>

                        {authenticated && (
                            <div className="group relative inline-block">
                                <span className="cursor-pointer hover:text-blue-500 whitespace-nowrap flex items-center gap-1">
                                    <User size={18} /> Mi Cuenta
                                </span>

                                <div className="absolute hidden group-hover:block bg-white shadow-lg p-2 min-w-[200px] z-50">
                                    <Link href="/store" className="block px-4 py-2 hover:bg-slate-100 whitespace-nowrap">
                                        Menu Principal de Usuario
                                    </Link>

                                    {!validUser && (
                                        <Link href="/verificationscreen" className="block px-4 py-2 text-amber-600 hover:bg-slate-100 whitespace-nowrap">
                                            Verificar Usuario
                                        </Link>
                                    )}

                                    <Link href="/store/store-edit" className="block px-4 py-2 hover:bg-slate-100 whitespace-nowrap">
                                        Modificar perfil
                                    </Link>
                                    <Link href="/store/manager-comment" className="block px-4 py-2 hover:bg-slate-100 whitespace-nowrap">
                                        Comentarios
                                    </Link>
                                    <Link href="/store/manage-product" className="block px-4 py-2 hover:bg-slate-100 whitespace-nowrap">
                                        Mis Productos
                                    </Link>
                                    <Link href="/store/add-product" className="block px-4 py-2 hover:bg-slate-100 whitespace-nowrap">
                                        Agregar Producto
                                    </Link>
                                    <Link href="/store/orders" className="block px-4 py-2 hover:bg-slate-100 whitespace-nowrap">
                                        Mis Compras
                                    </Link>
                                    <Link href="/store/Sell-products" className="block px-4 py-2 hover:bg-slate-100 whitespace-nowrap">
                                        Mis Ventas
                                    </Link>
                                    <Link href="/store/decline-BuyOrders" className="block px-4 py-2 hover:bg-slate-100 whitespace-nowrap">
                                        Mis Compras rechazadas
                                    </Link>
                                    <Link href="/store/decline-SellOrders" className="block px-4 py-2 hover:bg-slate-100 whitespace-nowrap">
                                        Mis Ventas rechazadas
                                    </Link>
                                </div>
                            </div>
                        )}

                        <Link href="/" className="whitespace-nowrap">
                            <House size={18} />
                        </Link>

                        <div className="group relative inline-block">
                            <Link href="/mysite" className="hover:text-blue-500 whitespace-nowrap">
                                Nosotros
                            </Link>
                            <div className="absolute hidden group-hover:block bg-white shadow-lg p-2 min-w-[150px] z-50">
                                <Link href="/mysite" className="block px-4 py-2 whitespace-nowrap">
                                    Quienes somos
                                </Link>
                                <Link href="/reportproblem" className="block px-4 py-2 whitespace-nowrap">
                                    Tenes Problemas con el sistema o denuncias ?
                                </Link>
                                <Link href="/mydonation" className="block px-4 py-2 whitespace-nowrap">
                                    Donaciones
                                </Link>
                            </div>
                        </div>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600 whitespace-nowrap">
                            <ShoppingCart size={18} />
                            Carrito

                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">

                                {authenticated ? (
                                    <>
                                        {itemsCartCount}
                                    </>
                                ) : (
                                    <>
                                        0
                                    </>
                                )}

                            </button>

                        </Link>

                        <Link href="/orders" className="relative flex items-center gap-2 text-slate-600 whitespace-nowrap">
                            <Truck size={18} />
                            Ordenes
                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">

                                {authenticated ? (
                                    <>
                                        {ItemsOrder.length}
                                    </>
                                ) : (
                                    <>
                                        0
                                    </>
                                )}

                            </button>
                        </Link>

                        <div className="flex items-center gap-3 ml-2">
                            {!authenticated ? (
                                <>
                                    <button key='btnLogin' id='btnLogin' onClick={handlerLogin} className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full whitespace-nowrap">
                                        Login
                                    </button>
                                    <button key='btnRegistrarse' id='btnRegistrarse' onClick={handleRegister} className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full whitespace-nowrap">
                                        Registrarse
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center gap-3">
                                    {/* Badge con el nombre de usuario */}
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-xs font-semibold text-slate-700">
                                        <span className="size-6 rounded-full bg-green-400 animate-pulse"></span>
                                        <span>{user?.username || "Usuario"}</span>
                                    </div>

                                    <button key='btnLogout' onClick={handleLogout} id='btnLogout' className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full whitespace-nowrap">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    {!authenticated ? (
                        <div className="sm:hidden">
                            <button className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full" onClick={handlerLogin}>
                                Login
                            </button>
                        </div>
                    ) : (

                        <div className="sm:hidden">

                            {/* Menu Mobile */}
                            <MobileMenu></MobileMenu>

                        </div>
                    )
                    }

                </div>
            </div>
            <hr className="border-gray-300" />
        </nav>
    );
};

export default Navbar;
