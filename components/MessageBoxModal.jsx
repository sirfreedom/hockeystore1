'use client'
import { XIcon } from "lucide-react"
import { useState, useEffect } from "react"

const MessageBoxModal = ({ setShowConfirmModal, seleccion, title, descriptiontext }) => {

    const [Title, setTitle] = useState(title);
    const [DescriptionText, setDescriptionText] = useState(descriptiontext);

    const handleSubmit = (value) => {
        seleccion(value);
    }

    useEffect(() => {

        setTitle(title);
        setDescriptionText(descriptiontext);

    }, []);


    return (

        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

                {/* Contenedor del Modal */}
                <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col gap-5 text-slate-700 w-full max-w-sm mx-auto animate-in fade-in zoom-in duration-200">

                    <h2 className="text-3xl">
                        <span className="font-semibold">
                            {Title}
                        </span>
                    </h2>

                    <div className="text-slate-600">
                        {DescriptionText}
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col gap-2 mt-2">
                        <button
                            onClick={() => handleSubmit(1)}
                            className="bg-slate-800 text-white text-sm font-medium py-2.5 rounded-md hover:bg-slate-900 active:scale-95 transition-all" >
                            Si
                        </button>
                        <button
                            onClick={() => handleSubmit(0)}
                            className="border border-slate-300 text-slate-700 text-sm font-medium py-2.5 rounded-md hover:bg-slate-100 active:scale-95 transition-all" >
                            No
                        </button>
                    </div>
                </div>
                <XIcon size={30} className="absolute top-5 right-5 text-slate-500 hover:text-slate-700 cursor-pointer" onClick={() => handleSubmit(0)} />
            </div>
        </>
    )
}

export default MessageBoxModal