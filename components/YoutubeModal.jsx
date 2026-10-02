'use client'
import { XIcon } from "lucide-react"

const YoutubeModal = ({ setShowModal, seleccion, link }) => {

    const handleSubmit = () => {
        seleccion(false);
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                {/* Contenedor del Modal - Cambiado a max-w-2xl para que el video se luzca */}
                <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col gap-4 text-slate-700 w-full max-w-2xl mx-auto animate-in fade-in zoom-in duration-200">

                    {/* Contenedor del Video con aspecto 16:9 responsivo */}
                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-black shadow-inner">
                        <iframe
                            className="w-full h-full"
                            src={link.replace("watch?v=", "embed/")}
                            title="YouTube Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Acciones */}
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            onClick={() => handleSubmit()}
                            className="border border-slate-300 text-slate-700 text-sm font-medium px-6 py-2.5 rounded-md hover:bg-slate-100 active:scale-95 transition-all"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
            <XIcon size={30} className="absolute top-5 right-5 text-slate-500 hover:text-slate-700 cursor-pointer" onClick={() => setShowModal(false)} />
        </>
    )
}

export default YoutubeModal