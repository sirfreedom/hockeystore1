'use client'
import PageTitle from "@/components/PageTitle";
import { useEffect, useState } from "react";
import { SellerRejected } from "@/Api/OrderStoreCanceledHelper";
import CheckLogin from "@/components/CheckLogin";
import useUserStore from '@/lib/features/user/useUserStore';

export default function declinesellorders() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const [Orders, setOrders] = useState([]);

    const Token = useUserStore.getState().token;
    const UserData = useUserStore.getState().user;
    const isExpired = useUserStore.getState().isExpired();

    useEffect(() => {

        SellerRejected(UserData.iduserdatastore, Token).then(data => {

            setOrders(data);
        });

    }, []);

    return (
        <>

            <CheckLogin></CheckLogin>

            <div className="min-h-[60vh] bg-slate-50/50 py-6 w-full px-0">
                {Orders?.length > 0 ? (
                    <div className="w-full max-w-none">
                        <div className="px-4">
                            <PageTitle
                                heading={"Mis Ordenes de compra rechazadas"}
                                text={`Tienes ${Orders?.length} Ordenes registradas`}
                                linkText={'Volver al inicio'}
                            />
                        </div>

                        <div className="mt-6 w-full overflow-x-auto rounded-none sm:rounded-xl border-y sm:border border-slate-200 bg-white shadow-sm">
                            <table className="w-full text-left border-collapse table-auto">

                                <thead>
                                    <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 text-xs uppercase tracking-wider">
                                        <th className="px-4 py-3 font-semibold">Productos</th>
                                        <th className="px-4 py-3 font-semibold whitespace-nowrap">Usuario</th>
                                        <th className="px-4 py-3 font-semibold">Motivo Cancelación</th>
                                        <th className="px-4 py-3 font-semibold">Obs Cancelación</th>
                                        <th className="px-4 py-3 font-semibold whitespace-nowrap">Fecha Orden</th>
                                        <th className="px-4 py-3 font-semibold whitespace-nowrap">Fecha Cancelación</th>
                                        <th className="px-4 py-3 font-semibold whitespace-nowrap text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {Orders?.map((order, index) => (
                                        <tr key={order.idorderstore || index} className="hover:bg-slate-50/50 transition-colors text-sm">

                                            {/* Producto */}
                                            <td className="px-4 py-3">
                                                {order?.orderItemStore?.map((item, idx) => (
                                                    <div key={'divitem' + idx} className="flex items-center gap-3 mb-2 last:mb-0">
                                                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                                                            <img
                                                                src={item.imgtext}
                                                                className="h-full w-full object-cover transition hover:scale-110"
                                                                alt={item.productname}
                                                            />
                                                        </div>
                                                        <div className="font-medium text-slate-900 leading-snug break-words">
                                                            {item.productname}
                                                        </div>
                                                    </div>
                                                ))}
                                            </td>

                                            {/* Usuario */}
                                            <td className="px-4 py-3 text-slate-800 text-xs whitespace-nowrap">
                                                <p className="font-medium text-slate-900 leading-tight">
                                                    <span className="text-slate-900 font-normal">{order.username}</span>
                                                </p>
                                            </td>

                                            {/* Motivo Cancelación */}
                                            <td className="px-4 py-3 text-slate-900 text-xs">
                                                <p className="font-medium text-slate-900 leading-snug break-words">
                                                    {order.motivocancelacion}
                                                </p>
                                            </td>

                                            {/* Obs Cancelación */}
                                            <td className="px-4 py-3 text-slate-900 text-xs">
                                                <p className="font-medium text-slate-800 leading-snug break-words">
                                                    {order.descripcioncancelacion}
                                                </p>
                                            </td>

                                            {/* Fecha Orden */}
                                            <td className="px-4 py-3 text-slate-700 whitespace-nowrap text-xs">
                                                {order.fecha}
                                            </td>

                                            {/* Fecha Cancelación */}
                                            <td className="px-4 py-3 text-slate-700 whitespace-nowrap text-xs">
                                                {order.fechacancelacion}
                                            </td>

                                            {/* Total */}
                                            <td className="px-4 py-3 text-right">
                                                <div className="text-base font-bold text-slate-950 whitespace-nowrap">
                                                    <span className="text-xs font-medium text-slate-500 mr-0.5">{currency}</span>
                                                    {order.total?.toLocaleString('es-AR', { minimumFractionDigits: 0 })}
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
                        <h1 className="text-2xl font-semibold text-slate-900">No tienes ventas rechazadas...</h1>
                        <p className="text-slate-500 mt-2">Podes estar tranquilo</p>
                    </div>
                )}
            </div>
        </>
    )

}