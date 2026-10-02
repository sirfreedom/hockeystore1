'use client'
import { setKey } from "@/Api/BaseHelper";
import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import { Get } from '@/Api/AppStoreConfigHelper';
import { LoginApp } from "@/Api/UserAppHelper";
import { createDate } from "@/Api/BaseHelper";
import useOrderStore from '@/lib/features/order/useOrderStore';
import { useRouter } from "next/navigation";
import useUserStore from '@/lib/features/user/useUserStore';

const UserLogin = () => {

    const [Email, setEmail] = useState('');
    const [Pass, setPass] = useState('');
    const [AppStoreConfig, setAppStoreConfig] = useState();
    const [IsLoading, setIsLoading] = useState(false);
    const { ItemsOrder, AddOrder, RemoveOrder, CleanOrder } = useOrderStore();
    const { setUser, setExpiresAt, setIsValid, clearUser } = useUserStore();
    const DATE_NOW = new Date();
    const EXPIRATION_DATE_KEY = 'ExpirationDate';
    const EXPIRATION_DATE_Y = 'expirationdateY';
    const EXPIRATION_DATE_M = 'expirationdateM';
    const EXPIRATION_DATE_D = 'expirationdateD';
    const EXPIRATION_DATE_HH = 'expirationdateHH';
    const EXPIRATION_DATE_MM = 'expirationdateMM';
    const TOKEN_KEY = 'token';
    const router = useRouter();

    useEffect(() => {

        if (!AppStoreConfig) {
            Get().then(data => {
                setAppStoreConfig(data);
            });
        }

    }, [])


    const handleLogin = async () => {

        setIsLoading(true);

        if (Email.length < 3 || Pass.length < 6) {
            toast.error('Debe llenar los campos con usuario o pass, tu usuario es ese? ', { duration: 2000 });
            return;
        }

        LoginApp(Email, Pass).then(data => {

            if (data?.status === 200) {

                CleanOrder();

                toast.success('Login Ok.', { duration: 1000 });

                setKey('username', data.username);
                setKey('nombre', data.nombre);
                setKey('apellido', data.apellido);
                setKey('descriptiontext', data.descriptiontext);
                setKey('provincia', data.provincia);
                setKey('calle', data.calle);
                setKey('logoimgtext', data.logoimgtext);
                setKey('email', data.email);
                setKey('contact', data.contact);
                setKey('latitud', data.latitud);
                setKey('longitud', data.longitud);
                setKey('iduserdatastore', data.iduserdatastore);
                setKey('validuser', data.validuser)

                for (var i = 0; i < data.orders; i++) {
                    AddOrder();
                }

                setKey(EXPIRATION_DATE_M, data.expirationmonth);
                setKey(EXPIRATION_DATE_D, data.expirationday);
                setKey(EXPIRATION_DATE_HH, data.expirationhour);
                setKey(EXPIRATION_DATE_MM, data.expirationminute);
                setKey(EXPIRATION_DATE_Y, data.expirationyear);

                const expirationDate = createDate(
                    data.expirationyear,
                    data.expirationmonth,
                    data.expirationday,
                    data.expirationhour,
                    data.expirationminute
                );

                setKey(EXPIRATION_DATE_KEY, expirationDate.getTime());
                setKey(TOKEN_KEY, data.token);
     
                setUser(
                    data,          // userData
                    data.token,         // token
                    expirationDate.getTime(),   // expiresAt (número)
                    data.validuser        // isValid (boolean)
                );

                router.push('/');
            }

            if (data?.status === 422) {
                toast.error(data.error, { duration: 3000 });
                return;
            }

            if (data?.status === 400) {
                toast.error('Ocurrio un error, intente luego mas tarde', { duration: 1000 });
                return;
            }

        });

        setIsLoading(false);
    };

    return (
        <>

            <div className="flex min-h-screen justify-center items-start bg-slate-20 p-2 pt-0">
                <div className="w-full max-w-md p-1 bg-white border border-slate-100 shadow-sm rounded-none mt-0">
                    <div className="space-y-3 text-center mb-1">
                        <div className="flex justify-center mb-2">
                            <img src={AppStoreConfig?.imgtext} alt='imagen de la aplicacion' />
                        </div>
                    </div>

                    <div className="space-y-5" >

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
                                className="w-full px-3 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-none outline-none focus:border-slate-800 focus:bg-white disabled:opacity-60 transition-colors"
                                placeholder="usuario@tuemail.com"
                                onChange={e => setEmail(e.target.value)}
                                value={Email}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                                    Contraseña
                                </label>
                                <a href="/resetpass" className="text-xs text-slate-600 hover:text-slate-900 underline font-medium">
                                    ¿Olvidó su password?
                                </a>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="w-full px-3 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-none outline-none focus:border-slate-800 focus:bg-white disabled:opacity-60 transition-colors"
                                placeholder="••••••••"
                                onChange={e => setPass(e.target.value)}
                                value={Pass}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleLogin}
                            className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold tracking-wider text-white bg-slate-900 hover:bg-slate-800 active:bg-black rounded-none disabled:opacity-60 transition duration-150 uppercase"
                        >
                            {IsLoading ? (
                                <span className="inline-block animate-pulse">Cargando credenciales...</span>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center text-[11px] text-slate-400 space-y-1">
                        <p>Al ingresar, acepta las políticas de uso de la plataforma.</p>
                        <p>AppMaker© 2008 Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default UserLogin;
