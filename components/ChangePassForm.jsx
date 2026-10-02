import { useState, useEffect } from "react"; // <-- Importación corregida
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangePassword } from '@/Api/UserAppHelper';

const ChangePassForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [Pass1, setPass1] = useState('');
    const [Pass2, setPass2] = useState('');
    const [alreadySubmitted, setAlreadySubmitted] = useState(false);
    const [Code, setCode] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        const codParam = searchParams.get("cod");
        if (codParam) {
            setCode(codParam);
        }
    }, [searchParams]);

    const handleSubmit = () => {
        if (!Code.trim()) {
            toast.error('Debe ingresar el código de verificación.', { duration: 5000 });
            return;
        }

        if (Pass1.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres.', { duration: 5000 });
            return;
        }

        if (Pass1 !== Pass2) {
            toast.error('Las contraseñas no coinciden.', { duration: 5000 });
            return;
        }

        setIsButtonDisabled(true);

        ChangePassword(Code, Pass1)
            .then(data => {
                if (data?.status === 202) {
                    toast.success('Se cambio el password Correctamente', { duration: 10000 });
                    setAlreadySubmitted(true);
                    return;
                }

                if (data?.status === 400) {
                    toast.error('Error ', { duration: 8000 });
                    return;
                }

                if (data?.status === 422) {
                    toast.error(data.error, { duration: 15000 });
                    return;
                }

                if (data?.status === 500) {
                    toast.error('Error critico, consulte al sistema, luego.', { duration: 20000 });
                    router.push('/');
                }
            })
            .finally(() => {
                setIsButtonDisabled(false);
            });
    };

    const Home = () => {
        router.push('/');
    };

    return (
        <>
            {!alreadySubmitted ? (
                <div className="flex min-h-screen justify-center items-center bg-slate-50 p-4 sm:p-6">
                    <div className="w-full max-w-md bg-white border border-slate-200 shadow-md rounded-xl p-6 sm:p-8 space-y-6">

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-slate-800">Cambiar contraseña</h2>
                            <p className="text-sm text-slate-500">
                                Escribe el código recibido, si no se introdujo automaticamente. para poder cambiar tu contraseña.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label htmlFor="txtcode" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                                    Código de Verificación
                                </label>
                                <input
                                    id="txtcode"
                                    type="text"
                                    maxLength={50}
                                    placeholder="Código que te llego por mail"
                                    value={Code}
                                    onChange={e => setCode(e.target.value)}
                                    className="w-full px-4 py-2.5 text-base font-mono tracking-widest text-center text-slate-900 bg-white border border-slate-300 rounded-lg outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="password1" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                                    Nueva Contraseña
                                </label>
                                <input
                                    id="password1"
                                    type="password"
                                    className="w-full px-3 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Tu Nueva password"
                                    value={Pass1}
                                    onChange={e => setPass1(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="password2" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                                    Repetir Contraseña
                                </label>
                                <input
                                    id="password2"
                                    type="password"
                                    className="w-full px-3 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Repeti tu password"
                                    value={Pass2}
                                    onChange={e => setPass2(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-2 space-y-4">
                            <button
                                type="button"
                                disabled={isButtonDisabled}
                                onClick={handleSubmit}
                                className="w-full py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition-colors"
                            >
                                Cambiar Contraseña
                            </button>

                            <div className="text-center text-[11px] text-slate-400 space-y-0.5">
                                <p>Al ingresar, acepta las políticas de uso de la plataforma.</p>
                                <p>AppMaker© 2008 Todos los derechos reservados.</p>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <div className="min-h-[80vh] flex flex-col items-center justify-center">
                    <p className="sm:text-2xl lg:text-3xl mx-5 font-semibold text-slate-500 text-center max-w-2xl">
                        Tu contraseña fue cambiada con exito. ya podes ingresar nuevamente.
                    </p>
                    <button onClick={Home} id="btnVolver" className="bg-slate-800 text-white px-12 py-2 rounded mt-10 mb-40 active:scale-95 hover:bg-slate-900 transition">Volver al inicio</button>
                </div>
            )}
        </>
    );
};

export default ChangePassForm;