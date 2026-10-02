'use client'
import PageTitle from "@/components/PageTitle";
import { useEffect, useState } from "react";
import { Phone, Handshake } from 'lucide-react';
import { Buyer } from "@/Api/OrderStoreHelper";
import CheckLogin from "@/components/CheckLogin";
import useUserStore from '@/lib/features/user/useUserStore';

export default function StoreOrders() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const [Orders, setOrders] = useState([]);

    const Token = useUserStore.getState().token;
    const UserData = useUserStore.getState().user;
    const isExpired = useUserStore.getState().isExpired();

    useEffect(() => {
   
        Buyer(UserData.iduserdatastore, Token).then(data => {
            setOrders(data);
        });

    }, []);

    
    return (
        <>
            <CheckLogin></CheckLogin>

            <div className="min-h-[60vh] bg-slate-50/50 py-1 px-4 sm:px-6">

                {Orders?.length > 0 ? (
                    <div className="max-w-[95rem] mx-auto">

                        <PageTitle
                            heading={"Mis Ordenes "}
                            text={`Tienes ${Orders?.length} Ordenes registradas`}
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
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">

                                    {Orders?.map((order, index) => (
                                        <tr key={index} className="hover:bg-slate-50/50 transition-colors text-sm">

                                            {/* Producto */}
                                            <td className="px-4 py-3">

                                                {order?.orderItemStore.map((item, index) => (
                                                    <div key={'divitem' + index} className="flex items-center gap-3">
                                                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                                                            <img
                                                                key={'img' + index}
                                                                src={item.imgtext}
                                                                className="h-full w-full object-cover transition hover:scale-110"
                                                                alt={item.productname}
                                                            />
                                                        </div>
                                                        <div className="font-medium text-slate-900 leading-snug">
                                                            {item.productname}
                                                        </div>
                                                    </div>
                                                ))}

                                            </td>

                                            <td className="px-4 py-3 min-w-[250px]">

                                                <div className="space-y-0.5">
                                                    <p className="font-medium text-slate-800 leading-tight">
                                                        {order.nombre} {order.apellido} <span className="text-slate-400 font-normal">| {order.username}</span>
                                                    </p>
                                                    <p className="text-slate-600 text-xs flex items-center gap-1">
                                                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                        {order.email}
                                                    </p>
                                                    <div className="flex flex-col gap-1.5">
                                                        {/* Dirección con su icono */}
                                                        <p className="text-slate-600 text-xs flex items-center gap-1 truncate">
                                                            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            {order.calle}
                                                        </p>

                                                        <a
                                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.calle)}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-0.5 ml-4.5"
                                                        >
                                                            Ver en Google Maps ↗
                                                        </a>
                                                    </div>
                                                    <p className="text-slate-600 text-xs flex items-center gap-1 truncate" >
                                                        <Phone></Phone>
                                                        Telefono: {order.contact}
                                                    </p>
                                                    <p className="text-slate-600 text-xs flex items-center gap-1 truncate" >
                                                        <Handshake></Handshake>
                                                        <a
                                                            href={`https://wa.me/${order.contact}`}
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
                                                {order.fecha}
                                            </td>

                                            {/* Total - Alineado a la derecha */}
                                            <td className="px-4 py-3 text-right">
                                                <div className="text-base font-bold text-slate-950 whitespace-nowrap">
                                                    <span className="text-xs font-medium text-slate-500 mr-0.5">{currency}</span>
                                                    {order.total.toLocaleString('es-AR', { minimumFractionDigits: 0 })}
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
                        <h1 className="text-2xl font-semibold text-slate-900">No tienes órdenes aún</h1>
                        <p className="text-slate-500 mt-2">¡Parece que es un buen momento para empezar a comprar!</p>
                    </div>
                )}
            </div>
        </>
    )
}
