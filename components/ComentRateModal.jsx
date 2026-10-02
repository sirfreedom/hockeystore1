'use client'
import { XIcon } from "lucide-react"
import { Star } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const ComentRateModal = ({ setShowComentModal, seleccion, OrderStore }) => {

    const [IsAnonimo, setIsAnonimo] = useState(false);
    const [Comment, setComment] = useState('');
    const [Rating, setRating] = useState(0); // Estado inicial: 0 estrellas
    const [hover, setHover] = useState(0);   // Estado opcional para efecto visual al pasar el mouse

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Rating === 0) {
            toast.error("Por favor, selecciona al menos una estrella para calificar.");
            return;
        }

        if (Comment.trim().length < 5) {
            toast.error("Por favor, escribe un comentario un poco más detallado (mínimo 5 caracteres).");
            return;
        }

        seleccion(Comment, Rating, IsAnonimo);
        setShowComentModal(false);
    }

    const handlerClose = () => {
        setShowComentModal(false);
    }

    return (

        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">

                    {/* Botón superior para cerrar */}
                    <button
                        onClick={() => setShowComentModal(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                    >
                        <XIcon size={24} />
                    </button>


                    <div className="flex items-center p-4 border-b bg-slate-50 pr-12">
                        <img
                            src={OrderStore?.imgtextuser}
                            alt={OrderStore?.username}
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shrink-0"
                        />
                        <div className="ml-3">
                            <h3 className="text-sm font-bold text-gray-800">Calificame</h3>
                            <p className="text-xs text-gray-500">@{OrderStore?.username}</p>
                        </div>
                    </div>

                    {/* Contenido Desplazable */}
                    <div className="overflow-y-auto p-4 flex-grow space-y-4">

                        {/* Sección de Productos (Muestra imágenes) */}
                        <div className="space-y-2">
                            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Productos de la orden</span>

                            <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto border border-slate-100 rounded-xl bg-slate-50/50 p-2">
                                {OrderStore?.showcomentitem && OrderStore.showcomentitem.length > 0 ? (
                                    OrderStore.showcomentitem.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-2 shadow-sm">
                                            <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-md overflow-hidden">
                                                <img
                                                    key={'img' + index}
                                                    src={item?.imgtext}
                                                    alt={item?.productname}
                                                    className="w-full h-full object-scale-down p-1"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-grow">
                                                <p className="text-xs font-semibold text-gray-800 truncate">
                                                    {item?.productname}
                                                </p>
                                                <p className="text-[10px] text-gray-400">Reseña del producto</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-400 text-center py-2">No hay items que mostrar</p>
                                )}
                            </div>
                        </div>

                        {/* Formulario de Comentario */}
                        <form id="commentForm" onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Tu opinión importa
                                </label>
                                <textarea
                                    required
                                    id="comment"
                                    rows="3"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none text-sm text-gray-700 bg-gray-50"
                                    placeholder="Escribe tu comentario sobre el producto y vendedor..."
                                    value={Comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>

                            {/* Checkbox Anónimo Estilizado */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="chkAnonimo"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    checked={IsAnonimo}
                                    onChange={(e) => setIsAnonimo(e.target.checked)}
                                />
                                <label htmlFor="chkAnonimo" className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                                    Valorar de forma anónima
                                </label>
                            </div>

                            {/* Sistema de Estrellas */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Nivel de satisfacción
                                </label>
                                <div className="flex items-center gap-1.5">
                                    {Array.from({ length: 5 }, (_, i) => {
                                        const starValue = i + 1;
                                        return (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setRating(starValue)}
                                                onMouseEnter={() => setHover(starValue)}
                                                onMouseLeave={() => setHover(0)}
                                                className="focus:outline-none transition-transform active:scale-90"
                                            >
                                                <Star
                                                    className={`shrink-0 size-6 transition-colors ${starValue <= (hover || Rating)
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "text-gray-300 fill-transparent"
                                                        }`}
                                                />
                                            </button>
                                        );
                                    })}
                                    <span className="ml-2 text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                        {Rating} / 5
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Pie del Modal: Acciones */}
                    <div className="p-4 border-t bg-gray-50 flex flex-col sm:flex-row-reverse gap-2">
                        <button
                            form="commentForm"
                            type="submit"
                            disabled={Rating === 0 || Comment.trim().length < 5}
                            className="w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 rounded-lg transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:active:scale-100 shadow-sm"
                        >
                            Publicar
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowComentModal(false)}
                            className="w-full sm:w-1/2 border border-slate-300 text-slate-700 text-sm font-medium py-2.5 rounded-lg hover:bg-white active:scale-95 transition-all"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>

            <XIcon size={30} className="absolute top-5 right-5 text-slate-500 hover:text-slate-700 cursor-pointer" onClick={() => handlerClose()} />

        </>
    )
}

export default ComentRateModal