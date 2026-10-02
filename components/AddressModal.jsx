'use client'
import { XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import Localidad from "@/components/Localidad";

const AddressModal = ({ setShowAddressModal, seleccion }) => {

    const [DireccionModal, setDireccionModal] = useState({
        provincia: "",
        calle: "",
        lat: 0,
        long: 0
    });

    const returnLocation = (valor) => {
        setDireccionModal({ ...DireccionModal, provincia: valor.provincia, calle: valor.calle, lat: valor.lat, long: valor.long });
    };

    const handleAddressChange = (e) => {
        setDireccionModal({
            ...DireccionModal,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        seleccion(DireccionModal);
        setShowAddressModal(false)
    }

    return (
        <>
            <form onSubmit={e => toast.promise(handleSubmit(e), { loading: 'Agregando Direccion...' })} className="fixed inset-0 z-50 bg-white/60 backdrop-blur h-screen flex items-center justify-center">
                <div className="flex flex-col gap-5 text-slate-700 w-full max-w-sm mx-6">

                    <h2 className="text-3xl ">Agregar <span className="font-semibold">Direccion</span></h2>

                    <Localidad seleccion={returnLocation} />

                    <button className="bg-slate-800 text-white text-sm font-medium py-2.5 rounded-md hover:bg-slate-900 active:scale-95 transition-all">Guardar Direccion </button>
                </div>
                <XIcon size={30} className="absolute top-5 right-5 text-slate-500 hover:text-slate-700 cursor-pointer" onClick={() => setShowAddressModal(false)} />
            </form>
        </>
    )
}

export default AddressModal