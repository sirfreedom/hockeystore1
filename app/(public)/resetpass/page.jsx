'use client'
import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import { SendCodeLostPassword } from '@/Api/NotificationHelper';

const ResetPass = () => {
    const [Email, setEmail] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handlerSendCode = async () => {

        if (!Email.trim()) {
            toast.error('Para enviar el código debe ingresar su correo', { duration: 5000 });
            return;
        }

        SendCodeLostPassword(Email).then(data => {

            if (data?.status === 202) {
                setEmail('')
                toast.success('Se envió un correo a tu cuenta.', { duration: 3000 });
            }

            if (data?.status === 422) {
                toast.error(data?.error, { duration: 5000 });

                setIsButtonDisabled(true);
                setTimeout(() => {
                    setIsButtonDisabled(false);
                }, 1000);
                return;
            }

            if (data?.status === 400) {
                toast.error('Error al enviar el código, intente nuevamente más tarde.', { duration: 8000 });
                return;
            }

            if (data?.status === 500) {
                toast.error('Error crítico, consulte al sistema.', { duration: 10000 });
                return;
            }

        });

        setIsButtonDisabled(true);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 90000);

    };

    return (

        <>

            {/* Agregué pt-20 al contenedor principal para desplazarlo hacia abajo */}
            <div className="flex min-h-screen justify-center items-start bg-slate-50 px-4 pb-4 pt-20 md:px-8 md:pb-8">
                <div className="w-full max-w-md bg-white border border-slate-200 shadow-md rounded-xl overflow-hidden split-container">

                    <div className="px-8 pb-8 pt-0 flex flex-col justify-between border-b md:border-b-0 border-slate-100">
                        <div className="space-y-4 mt-0">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold text-slate-800">Solicita tu código</h2>
                                <p className="text-sm text-slate-500">
                                    Ingresa tu correo electrónico para enviarte un código de verificación.
                                </p>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                                    Usuario o Correo
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    disabled={isButtonDisabled}
                                    className="w-full px-3 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:bg-white disabled:opacity-60 transition-colors"
                                    placeholder="usuario@tuemail.com"
                                    onChange={e => setEmail(e.target.value)}
                                    value={Email}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="button"
                                disabled={isButtonDisabled}
                                onClick={handlerSendCode}
                                className={`w-full py-3 text-sm font-semibold text-white rounded-lg transition-colors select-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
                        ${isButtonDisabled
                                        ? 'bg-amber-600/50 cursor-not-allowed'
                                        : 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800'
                                    }`}
                            >
                                {isButtonDisabled ? 'Revisa correo' : 'Enviar Código'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>



        </>


    );
};

export default ResetPass;