'use client'
import PageTitle from "@/components/PageTitle";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import useCartStore from '@/lib/features/cart/useCartStore';
import useOrderStore from '@/lib/features/order/useOrderStore';
import { getCart } from '@/Api/ProductHelper';
import { Insert } from '@/Api/OrderStoreHelper';
import toast from "react-hot-toast";
import { IDAPP } from '@/Api/BaseHelper';
import useUserStore from '@/lib/features/user/useUserStore';

export default function Cart() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const router = useRouter();

    const [Products, setProducts] = useState([]);
    const { addItem, removeItem, clearCart, deleteItem } = useCartStore();
    const { AddOrder } = useOrderStore();
    const itemsCart = useCartStore((state) => state.items);
    const itemsCartList = Object.entries(itemsCart);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const Token = useUserStore.getState().token;
    const UserData = useUserStore.getState().user;
    const isExpired = useUserStore.getState().isExpired();

    const Home = () => {
        router.push('/');
    }

    const getQuantity = (id) => {
        let iquantity;
        iquantity = itemsCartList.find((item) => item[0] === id.toString())?.[1] ?? 0;
        return iquantity;
    }

    const getTotal = (id) => {
        const quantity = itemsCartList.find((item) => item[0] === id.toString())?.[1] ?? 0;
        const product = Products.find(x => x.id === id);
        const price = product?.price ?? 0;
        const total = quantity * price;
        return total;
    };

    const DeleteItemFromCart = (id) => {
        deleteItem(id);
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    }

    const AddItemCart = (id) => {
        let iquantity;
        let product;
        iquantity = itemsCartList.find((item) => item[0] === id.toString())?.[1] ?? 0;
        product = Products.find(x => x.id === id);

        if (iquantity === product.quantity) {
            toast("no es posible agregar mas productos, porque el producto solo tiene " + product.quantity + " articulo", { duration: 5000 });
            return;
        }
        addItem(id);
    }

    const RemoveItemCart = (id) => {
        removeItem(id);
    }

    const Refresh = () => {

        let lProductId = [];

        itemsCartList.map(([productId, quantity]) => {
            lProductId.push({ "id": productId });
        });

        getCart(lProductId).then(data => {

            if (data?.status === 200) {
                setProducts(data);
            }

            if (data?.status === 400) {
                toast.error('Error intente nuevamente mas tarde..', { duration: 1000 });
                return;
            }

            if (data?.status === 422) {
                toast.error(data.error, { duration: 5000 });
                return;
            }

            if (data?.status === 401) {
                return;
            }

            if (data?.status === 500) {
                toast.error('Error critico, consulte al sistema, luego.', { duration: 1000 });
                router.push('/');
            }

        });
    }

    const handlePlaceOrder = () => {

        if (isExpired) 
        {
            toast.error('Es necesario loguarte para confirmar la orden', { duration: 3000 });
            return;
        }

        if (isSubmitting) return;

        setIsSubmitting(true);

        const nuevosItems = itemsCartList.map(([p, q]) => ({
            idproduct: p,
            quantity: q
        }));

        // 2. Creamos el objeto final combinando el ID del comprador y los items mapeados
        const ordenCompleta = {
            IdApp: IDAPP,
            idUserDataStoreBuyer: UserData.iduserdatastore,
            orderitem: nuevosItems // <--- Aquí ya van todos los productos juntos
        };

        Insert(ordenCompleta, Token).then(data => {

            if (data && data?.status === 200) {
                clearCart();

                for (var i = 0; i < data?.orders; i++) {
                    AddOrder();
                }

                toast('Orden creada exitosamente', { duration: 2000 });
                router.push('/orders');
            }

            if (data && data?.status === 422) {
                toast(data?.error, { duration: 5000 });
                clearCart();
            }

            if (data?.status === 401) {
                localStorage.clear();
                router.push('/');
            }

        });

    }

    useEffect(() => {

        Refresh();

    }, []);


    return (
        <>

            {itemsCartList?.length > 0 ? (

                <>
                    <div className="min-h-screen mx-6 text-slate-800">

                        <div className="max-w-7xl mx-auto ">

                            <PageTitle heading="Mi Carrito de Compra" text="Items de pre Compra" linkText="" />

                            <div className="flex items-start justify-between gap-5 max-lg:flex-col">

                                <table className="w-full max-w-4xl text-slate-600 table-auto">
                                    <thead>
                                        <tr className="max-sm:text-sm">
                                            <th className="text-left">Producto</th>
                                            <th>Precio </th>
                                            <th>Cantidad</th>
                                            <th>Precio Total</th>
                                            <th className="max-md:hidden">Quitar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            (Products) &&
                                            (

                                                Products?.map((item, index) => (

                                                    <tr key={index} className="space-x-2">
                                                        <td className="flex gap-3 my-4">
                                                            <div className="flex gap-3 items-center justify-center bg-slate-100 size-18 rounded-md">
                                                                <img src={item?.imgtext} className="h-14 w-auto" alt="imagen miniatura para mostrar del carrito de compra" width={45} height={45} />
                                                            </div>
                                                            <div>
                                                                <p className="max-sm:text-sm">{item.name}</p>
                                                                <p className="text-xs text-slate-500">{item.category}</p>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <p>
                                                                {currency}{item?.price.toLocaleString('es-AR', { minimumFractionDigits: 0 })}
                                                            </p>
                                                        </td>
                                                        <td className="text-center">

                                                            <div className="inline-flex items-center gap-1 sm:gap-3 px-3 py-1 rounded border border-slate-200 max-sm:text-sm text-slate-600">
                                                                <button
                                                                    onClick={() => RemoveItemCart(item?.id)}
                                                                    className="p-1 select-none hover:text-red-500 transition-colors"
                                                                    disabled={getQuantity(item?.id) === 1}
                                                                >
                                                                    -
                                                                </button>
                                                                <p className="p-1 font-medium"> {getQuantity(item?.id)} </p>
                                                                <button
                                                                    onClick={() => AddItemCart(item?.id)}
                                                                    className="p-1 select-none hover:text-blue-500 transition-colors"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            {currency}
                                                            {getTotal(item?.id).toLocaleString('es-AR', { minimumFractionDigits: 0 })}
                                                        </td>
                                                        <td className="text-center max-md:hidden">
                                                            <button onClick={() => DeleteItemFromCart(item?.id)} className=" text-red-500 hover:bg-red-50 p-2.5 rounded-full active:scale-95 transition-all">
                                                                <Trash2Icon size={18} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>

                                <div className='w-full max-w-lg lg:max-w-[340px] bg-slate-50/30 border border-slate-200 text-slate-500 text-sm rounded-xl p-7'>
                                    <h2 className='text-xl font-medium text-slate-600'> Confirmacion de compra </h2>
                                    <p className='text-slate-400 text-xs my-2'>
                                        El compromiso de compra es un mutuo acuerdo entre partes.
                                    </p>

                                    <div className='flex gap-2 items-center mt-1'>
                                        <label htmlFor="STRIPE" className='cursor-pointer'>
                                            Aqui no hay medio de pago, el comprador y el vendedor se ponen en contacto.
                                        </label>
                                    </div>

                                    <div className='pb-4 border-b border-slate-200'>
                                        <div className='flex justify-between'>
                                            <div className='flex flex-col gap-1 text-slate-400'>
                                                <p>  </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-between py-4'>
                                        <button
                                            onClick={() => handlePlaceOrder()}
                                            disabled={isSubmitting}
                                            className={`w-full text-white py-2.5 rounded transition-all ${isSubmitting
                                                ? 'bg-slate-400 cursor-not-allowed'
                                                : 'bg-slate-700 hover:bg-slate-900 active:scale-95'
                                                }`}
                                        >
                                            {isSubmitting ? 'Procesando...' : 'Confirmar Orden'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            ) : (
                <>
                    <div className="min-h-[30vh] mx-6 flex items-center justify-center text-slate-400">
                        <h1 className="text-2xl sm:text-4xl font-semibold"> Tu Carrito esta vacio! </h1>
                    </div>
                    <div className="mx-6 flex items-center justify-center text-slate-400">
                        <button onClick={() => Home()} id="btnVolver" key="btnVolver" className="bg-slate-800 text-white px-12 py-2 rounded mt-10 mb-40 active:scale-95 hover:bg-slate-900 transition ">Volver al inicio</button>
                    </div>
                </>
            )}
        </>


    );
};