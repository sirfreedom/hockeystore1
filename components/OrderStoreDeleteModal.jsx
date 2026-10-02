'use client'
import { XIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { TypeOrderStoreCanceled } from "@/Api/OrderStoreHelper";
import Loading from "@/components/Loading";
import toast from "react-hot-toast"; 
import useUserStore from '@/lib/features/user/useUserStore';

const OrderStoreDeleteModal = ({ setShowDeleteModal, seleccion, filtertext }) => {

    const [lTypeOrderStoreCanceled, setlTypeOrderStoreCanceled] = useState();
    const [loading, setLoading] = useState(true);
    
    const Token = useUserStore.getState().token;
    const UserData = useUserStore.getState().user;
    const isExpired = useUserStore.getState().isExpired();
    
    const [OrderDelete, setOrderDelete] = useState({
        idorderstore:0,
        idtypeorderstorecanceled: -1,
        descriptiontext: ""
    })

    const handleSubmit = (isclose) => {

        if(isclose === 1 && OrderDelete.idtypeorderstorecanceled === -1)
        {
            toast("se debe seleccionar el motivo de cancelacion", {duration: 8000});
            return;
        }

        seleccion(isclose,OrderDelete.idtypeorderstorecanceled,OrderDelete.descriptiontext );
        setShowDeleteModal(false);
    }

    const ddlTypeOrderStoreCanceled_onChange = (e) => {
        const typeId = Number(e.target.value);
        setOrderDelete(prev => ({ ...prev, idtypeorderstorecanceled: typeId }));
    }

    const onChangeHandler = (name, value) => {
        setOrderDelete({ ...OrderDelete, [name]: value });
    }

    useEffect(() => {

        Promise.all([TypeOrderStoreCanceled(filtertext, Token)]).then(([CanceledData]) => {
            setlTypeOrderStoreCanceled(CanceledData);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });

    }, []);


    if (loading) return <Loading />

    return (

        <>

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">

                <div className="bg-white rounded-xl shadow-2xl flex flex-col text-slate-700 w-full max-w-md mx-auto overflow-hidden animate-in zoom-in-95 duration-200">

                    <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50/70">
                        <h2 className="text-xl font-bold text-slate-800">
                            Confirmar <span className="text-red-600">Cancelación</span>
                        </h2>
                        <button
                            type="button"
                            onClick={() => handleSubmit(0)}
                            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
                        >
                            <XIcon size={20} />
                        </button>
                    </div>

                    <div className="p-6 flex flex-col gap-5">

                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-semibold text-slate-700">
                                Motivo de Cancelación <span className="text-red-500">*</span>
                            </label>
                            <div className="relative w-full">
                                <select
                                    className="w-full h-12 px-4 pr-10 text-sm outline-none border border-slate-200 rounded-lg text-slate-800 bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
                                    required
                                    onChange={ddlTypeOrderStoreCanceled_onChange}
                                    value={OrderDelete.idtypeorderstorecanceled}
                                >
                                    <option value="-1" disabled> Seleccione un motivo...</option>
                                    {lTypeOrderStoreCanceled?.map((item, index) => (
                                        <option key={'del' + index} value={item.id}>
                                            {item.descriptiontext}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 w-full">
                            <label htmlFor="txtDescriptionText" className="text-sm font-semibold text-slate-700">
                                Detalles adicionales <span className="text-slate-400 font-normal">(Opcional)</span>
                            </label>
                            <textarea
                                id="txtDescriptionText"
                                onChange={e => onChangeHandler('descriptiontext', e.target.value)}
                                value={OrderDelete.descriptiontext}
                                placeholder="Escribe los detalles aquí..."
                                rows={3}
                                className="w-full p-3 text-sm outline-none border border-slate-200 rounded-lg resize-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all placeholder:text-slate-400"
                                required
                            />
                        </div>

                    </div>

                    <div className="px-6 py-4 bg-slate-50 flex flex-col sm:flex-row-reverse gap-3 border-t">
                        <button
                            type="button"
                            onClick={() => handleSubmit(1)}
                            className="w-full sm:w-auto px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 active:scale-[0.98] transition-all shadow-sm shadow-red-200"
                        >
                            Confirmar Cancelación
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSubmit(0)}
                            className="w-full sm:w-auto px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-100 active:scale-[0.98] transition-all"
                        >
                            Volver atrás
                        </button>
                    </div>

                </div>
            </div>

        </>
    )
}

export default OrderStoreDeleteModal