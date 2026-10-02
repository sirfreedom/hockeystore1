'use client'
import { useEffect, useState } from "react";
import { setKey } from "@/Api/BaseHelper";
import { SaveLogo } from "@/Api/UserDataStoreHelper";
import ImageResizer from "@/components/ImageResizerComponent";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import CheckLogin from "@/components/CheckLogin";
import useUserStore from '@/lib/features/user/useUserStore';

const StorePhoto = () => {
 
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [PhotoPerfil, setPhotoPerfil] = useState('');
    
    const Token = useUserStore.getState().token;
    const UserData = useUserStore.getState().user;
    const isExpired = useUserStore.getState().isExpired();

    const returnimageText1 = (valor) => {
        setPhotoPerfil(valor);
    };

    const handleVolverInicio = () => {
        router.push("/store"); // Ajusta la ruta de inicio según sea necesario
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (PhotoPerfil.length === 0) {
            toast.error('debes subir una foto para poder guardar', { duration: 3000 });
            return;
        }

        SaveLogo(UserData.iduserdatastore, PhotoPerfil,Token).then(data => {

            if (data?.status === 202) {
                toast.success('Se Guardo la foto de perfil correctamente', { duration: 3000 });
                router.push('/store');
            }

            if (data?.status === 400) {
                toast.error('Error al agregar el producto, intente nuevamente mas tarde..', { duration: 3000 });
                return;
            }

            if (data?.status === 401) {
                localStorage.clear();
                router.push('/');
            }

            if (data?.status === 500) {
                toast.error('Error critico, consulte al sistema, luego.', { duration: 3000 });
                return;
            }

        });

        setKey('logoimgtext', PhotoPerfil);

    }

    useEffect(() => {

        setLoading(false);

    }, [])


    return !loading ? (
        <>
            <CheckLogin></CheckLogin>

            <div className="mx-6 my-0 pt-4 flex flex-col items-center justify-start bg-slate-50">
                <div
                    className="max-w-3xl w-full flex flex-col items-center gap-8 text-slate-600 bg-white p-10 rounded-2xl shadow-lg"
                >
                    {/* Título - Centrado */}
                    <div className="w-full border-b pb-6 text-center">
                        <h3 className="text-3xl font-light text-slate-700">
                            Actualización de foto <span className="text-slate-950 font-semibold"> - Perfil </span>
                        </h3>
                    </div>

                    {/* Sección de la Imagen - Centrada */}
                    <div className="flex flex-col items-center gap-4 py-6">
                        <label className="cursor-pointer hover:opacity-90 transition-opacity">
                            <ImageResizer
                                quality={100}
                                hh={250}
                                ww={250}
                                imagetext={returnimageText1}
                                nametext="Tienda Logo o Foto de Perfil"
                                classimg="h-56 w-56 rounded-full object-cover shadow-xl border-4 border-white bg-slate-100"
                            />
                        </label>
                    </div>

                    {/* Sección de Botones - Centrados e Inferiores */}
                    <div className="w-full pt-8 border-t flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
                        <button
                            id="btnGuardar"
                            key="btnGuardar"
                            onClick={onSubmitHandler}
                            type="button"
                            className="bg-slate-900 text-white px-16 py-3.5 rounded-lg font-medium active:scale-95 hover:bg-slate-800 transition shadow-md w-full sm:w-auto"
                        >
                            Guardar Perfil
                        </button>
                        <button
                            onClick={() => handleVolverInicio()} // Mantiene tu función original Home()
                            id="btnVolver"
                            key="btnVolver"
                            type="button"
                            className="bg-slate-200 text-slate-800 px-16 py-3.5 rounded-lg font-medium active:scale-95 hover:bg-slate-300 transition w-full sm:w-auto"
                        >
                            Volver al inicio
                        </button>
                    </div>

                </div>
            </div>

        </>
    ) : (<Loading />)
}

export default StorePhoto;
