'use client'
import PageTitle from "@/components/PageTitle";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone, Handshake } from 'lucide-react';
import { Seller } from "@/Api/OrderStoreHelper";
import { Delete } from "@/Api/OrderStoreHelper";
import ComentRateModal from "@/components/ComentRateModal";
import OrderStoreDeleteModal from "@/components/OrderStoreDeleteModal";
import { InsertCommentSeller } from "@/Api/RateHelper";
import toast from "react-hot-toast";
import { ShowCommentSeller } from "@/Api/RateHelper";
import CheckLogin from "@/components/CheckLogin";
import Loading from "@/components/Loading";
import useUserStore from '@/lib/features/user/useUserStore';

export default function StoreSeller() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const [loading, setLoading] = useState(false);
    const [Orders, setOrders] = useState([]);
    const router = useRouter();
    const [Order, setOrder] = useState();
    const [IdOrder, setIdOrder] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showComentModal, setShowComentModal] = useState(false);

    const Token = useUserStore.getState().token;
    const UserData = useUserStore.getState().user;
    const isExpired = useUserStore.getState().isExpired();

    const handlerDelete = (isclose, idtypeorderstorecanceled, descriptiontext) => {

        if (isclose === 0) //Si eligion no, no se borra la orden y se cierra el modal.
        {
            setShowDeleteModal(false);
            return;
        }

        setLoading(true);

        Delete(IdOrder, idtypeorderstorecanceled, descriptiontext, Token).then(data => {

            if (data?.status === 202) {
                DeleteOrder(IdOrder);
                setIdOrder(0);
                setLoading(false);
            }

            if (data?.status === 422) {
                toast(data?.error, { duration: {duration: 3000} });
                setLoading(false);
                router.push('/');
            }

            if (data?.status === 401) {
                localStorage.clear();
                setLoading(false);
                return;
            }

            if (data?.status === 500) {
                toast('hubo un error en el sistema intente mas tarde.',{ duration: 2000 });
                setLoading(false);
                return;
            }

        });
    };

    const DeleteOrder = (id) => {
        setOrders(prev => prev.filter(x => x.idorderstore !== id));
    }

    const handlerShowDelete = (Id) => {
        setIdOrder(Id); //guardo el id de la orden a borrar.
        setShowDeleteModal(true);
    }

    const updateSellerVote = (Id) => {
        setOrders(prev =>
            prev.map(item => item.idorderstore === Id ? { ...item, sellerhasvoted: 1 } : item)
        );
    };

    const handlerComentRate = (comment, rating, isanonimo) => {

        setLoading(true);

        InsertCommentSeller(IdOrder, rating, comment, isanonimo, Token).then(data => {

            if (data?.status === 201) {
                updateSellerVote(IdOrder);
                toast('Gracias por tu comentario y votacion.', {duration: 3000});
                setLoading(false);
                return;
            }

            if (data?.status === 400) {
                toast('Algo salio mal, intenta luego mas tarde...',{duration:  1000});
                setLoading(false);
                return;
            }

            if (data?.status === 401) {
                localStorage.clear();
                setLoading(false);
            }

            if (data?.status === 422) {
                toast(data?.error, {duration : 5000 } );
                setLoading(false);
                return;
            }

            if (data?.status === 500) {
                toast('hubo un error en el sistema intente mas tarde.', {duration: 1000});
                setLoading(false);
                return;
            }

        });
    }


    const handlerShowComentRate = (Id) => {

        setIdOrder(Id); // Guardamos el ID de la orden actual que se va a calificar
        setLoading(true);

        ShowCommentSeller(Id, Token).then(data => {

            if (data) {
                setOrder(data);
                setShowComentModal(true); // Abrir SOLO cuando los datos estén listos
                setLoading(false);
            } else {
                toast.error("No se pudieron cargar los detalles de la orden.");
            }
        });
    }

    useEffect(() => {

        setLoading(true);

        Seller(UserData.iduserdatastore, Token).then(data => {
            setOrders(data);
            setLoading(false);
        });

    }, []);

   
   
    if (loading) return <Loading />

    return (
        <>
            <CheckLogin></CheckLogin>        

            {showDeleteModal && <OrderStoreDeleteModal filtertext={'S'} seleccion={handlerDelete}
                setShowDeleteModal={setShowDeleteModal}
            />}

            {showComentModal && Order && (
                <ComentRateModal
                    seleccion={handlerComentRate}
                    OrderStore={Order}
                    setShowComentModal={setShowComentModal}
                />
            )}

            <div className="min-h-[60vh] bg-slate-50/50 py-1 px-4 sm:px-6">

                {Orders?.length > 0 ? (
                    <div className="max-w-[95rem] mx-auto">

                        <PageTitle
                            heading={"Mis Ventas"}
                            text={`Tienes ${Orders?.length} Ventas registrada`}
                            linkText={'Volver al inicio'}
                        />

                        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">

                            <table className="w-full text-left border-collapse table-auto">
                                <thead>
                                    <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 text-xs uppercase tracking-wider">
                                        <th className="px-4 py-3 font-semibold whitespace-nowrap">Productos</th>
                                        <th className="px-4 py-3 font-semibold whitespace-nowrap">Detalles de Entrega</th>
                                        <th className="px-4 py-3 font-semibold whitespace-nowrap">Fecha</th>
                                        <th className="px-4 py-3 font-semibold whitespace-nowrap text-right">Total</th>
                                        <th className="px-4 py-3 font-semibold text-center whitespace-nowrap">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">

                                    {Orders?.map((orderitem, index) => (
                                        <tr key={index} className="hover:bg-slate-50/50 transition-colors text-sm">

                                            {/* Producto */}
                                            <td className="px-4 py-3">

                                                {orderitem?.orderItemStore.map((item, index) => (
                                                    <div key={'divitem' + index} className="flex items-center gap-3">
                                                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                                                            <img
                                                                key={'img' + index}
                                                                src={item?.imgtext}
                                                                className="h-full w-full object-cover transition hover:scale-110"
                                                                alt={item?.productname}
                                                            />
                                                        </div>
                                                        <div className="font-medium text-slate-900 leading-snug">
                                                            {item?.productname}
                                                        </div>
                                                    </div>
                                                ))}

                                            </td>

                                            <td className="px-4 py-3 min-w-[250px]">

                                                <div className="space-y-0.5">
                                                    <p className="font-medium text-slate-800 leading-tight">
                                                        {orderitem?.nombre} {orderitem?.apellido} <span className="text-slate-400 font-normal">| {orderitem?.username}</span>
                                                    </p>
                                                    <p className="text-slate-600 text-xs flex items-center gap-1">
                                                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                        {orderitem?.email}
                                                    </p>
                                                    <div className="flex flex-col gap-1.5">
                                                        {/* Dirección con su icono */}
                                                        <p className="text-slate-600 text-xs flex items-center gap-1 truncate">
                                                            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            {orderitem?.calle}
                                                        </p>

                                                        <a
                                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(orderitem?.calle)}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-0.5 ml-4.5"
                                                        >
                                                            Ver en Google Maps ↗
                                                        </a>
                                                    </div>
                                                    <p className="text-slate-600 text-xs flex items-center gap-1 truncate" >
                                                        <Phone></Phone>
                                                        Telefono: {'+549' + orderitem?.contact}
                                                    </p>
                                                    <p className="text-slate-600 text-xs flex items-center gap-1 truncate" >
                                                        <Handshake></Handshake>
                                                        <a
                                                            href={`https://wa.me/${'+549' + orderitem?.contact}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-green-600 hover:underline ml-1"
                                                        >
                                                            WhatsApp
                                                        </a>
                                                    </p>
                                                </div>

                                            </td>

                                            {/* Fecha */}
                                            <td className="px-4 py-3 text-slate-600 whitespace-nowrap text-xs">
                                                {orderitem?.fecha}
                                            </td>

                                            {/* Total - Alineado a la derecha */}
                                            <td className="px-4 py-3 text-right">
                                                <div className="text-base font-bold text-slate-950 whitespace-nowrap">
                                                    <span className="text-xs font-medium text-slate-500 mr-0.5">{currency}</span>
                                                    {orderitem?.total.toLocaleString('es-AR', { minimumFractionDigits: 0 })}
                                                </div>
                                            </td>

                                            {/* Acciones Combinadas y Mejoradas */}
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">

                                                    {(!orderitem?.sellerhasvoted) && (
                                                        <button onClick={() => handlerShowComentRate(orderitem.idorderstore)} className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors gap-1.5">
                                                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                                            Comenta la operacion
                                                        </button>
                                                    )}

                                                    {(!orderitem?.buyerhasvoted && !orderitem?.sellerhasvoted) &&
                                                        (
                                                            <button onClick={() => handlerShowDelete(orderitem.idorderstore)} className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700 ring-1 ring-inset ring-red-600/10 hover:bg-red-100 transition-colors gap-1.5 whitespace-nowrap">
                                                                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                Me arrepentí
                                                            </button>
                                                        )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>

                ) : (
                    <div className="flex h-[60vh] flex-col items-center justify-center text-center">
                        <div className="rounded-full bg-slate-100 p-6 mb-4">
                            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-semibold text-slate-900">No tienes ventas aún</h1>
                        <p className="text-slate-500 mt-2">¡Parece que es un buen momento para empezar a Vender!</p>
                    </div>
                )}
            </div>

        </>
    )

}