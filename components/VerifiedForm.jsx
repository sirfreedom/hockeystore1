'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Verified } from '@/Api/UserDataStoreHelper';
import { toast } from "react-hot-toast";

const VerifiedForm = () => {

    const searchParams = useSearchParams();
    const cod = searchParams.get("cod");
    const [Title, setTitle] = useState();
    const [Msg,setMsg] = useState();
    const [IsVerified, setIsVerified] = useState(false);

    useEffect(() => {

        Verified(cod).then(data => {

            if (data?.status === 202) {
                setIsVerified(true);
                setTitle('¡Validación Exitosa!');
                setMsg('¡Gracias por validar su usuario. Su cuenta ha sido verificada correctamente.!');
                toast.success('Codigo Validado Correctamente', { duration: 10000 });
                return;
            }

            if (data?.status === 400) {
                toast.error('Error al agregar el producto, intente nuevamente mas tarde..', { duration: 8000 });
                return;
            }

            if (data?.status === 422) {
               toast.error(data.error, { duration: 15000 });
               setTitle('Algo no salio bien...');
               setMsg(data.error);
               return;
            }

            if (data?.status === 500) {
                toast.error('Error critico, consulte al sistema, luego.', { duration: 20000 });
                router.push('/');
            }

        });

    }, [])

    return (
        <>

            <div className="min-h-screen flex items-start justify-center bg-gray-50 pt-16 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl pt-6 pb-8 px-8 text-center border border-gray-100 animate-fade-in">

                    {(IsVerified === true)
                        &&
                        (
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">

                                <svg
                                    className="h-10 w-10 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>

                            </div>
                        )
                    }

                    {(IsVerified === false)
                        &&
                        (
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                                <svg
                                    className="h-10 w-10 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12" // Esta línea dibuja la 'X'
                                    ></path>
                                </svg>
                            </div>

                        )
                    }

                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
                        {Title}
                    </h1>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        {Msg}
                    </p>

                    <a
                        href="/"
                        className="inline-block w-full py-3 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        Ir a pagina principal
                    </a>

                </div>
            </div>

        </>
    );
};

export default VerifiedForm;