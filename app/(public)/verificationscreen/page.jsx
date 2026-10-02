'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { SendCode } from '@/Api/NotificationHelper';
import { Verified } from '@/Api/UserDataStoreHelper';
import CheckLogin from "@/components/CheckLogin";
import useUserStore from '@/lib/features/user/useUserStore';

const verificationscreen = () => {

    const [Code, setCode] = useState('');
    const router = useRouter();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const Token = useUserStore.getState().token;
    const UserData = useUserStore.getState().user;
    const isExpired = useUserStore.getState().isExpired();


    const { clearUser } = useUserStore();

    const handleChange = (e) => {
        setCode(e.target.value);
    };

    useEffect(() => {

    }, []);

    const handleSubmit = () => {

        if (Code.length <= 20) {
            toast.error('Debes ingresar un codigo para verificar, verifica SPAM en tu cuenta de correo.', { duration: 5000 });
            return;
        }

        Verified(Code).then(data => {

            if (data?.status === 202) {
                toast.success('Validado con exito, volve a loguearte.', { duration: 5000 });
                clearUser();
                router.push('/');
            }

            if (data?.status === 422) {
                toast.error(data?.error, { duration: 8000 });
                setCode('');
                return;
            }

            if (data?.status === 400) {
                toast.error('Error al agregar el producto, intente nuevamente mas tarde..', { duration: 1000 });
                setCode('');
                return;
            }

            if (data?.status === 500) {
                toast.error('Error critico, consulte al sistema, luego.', { duration: 1000 });
                return;
            }

        });

    };


    const handlerSendCode = () => {

        SendCode(UserData.iduserdatastore).then(data => {

            if (data?.status === 202) {
                toast.success('Se envio un correo a tu cuenta..', { duration: 5000 });
                return;
            }

            if (data?.status === 400) {
                toast.error('Error al agregar el producto, intente nuevamente mas tarde..', { duration: 1000 });
                return;
            }

            if (data?.status === 500) {
                toast.error('Error critico, consulte al sistema, luego.', { duration: 1000 });
                router.push('/');
            }

        });

        setIsButtonDisabled(true);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 60000);

    }


    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '40px 20px 20px 20px',
            boxSizing: 'border-box',
        },
        card: {
            backgroundColor: '#ffffff',
            padding: '40px 30px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            maxWidth: '500px', // Cambiado a un ancho fijo máximo para que no se estire demasiado en pantallas grandes
            width: '100%',
            textAlign: 'center',
            margin: '0',
        },
        title: {
            margin: '0 0 10px 0',
            fontSize: '24px',
            fontWeight: '700',
            color: '#1f2937',
        },
        subtitle: {
            margin: '0 0 30px 0',
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.5',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '20px', // Espacio antes de los botones
        },
        input: {
            padding: '15px',
            fontSize: '18px',
            letterSpacing: '2px',
            textAlign: 'center',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
        },
        buttonContainer: {
            display: 'flex',
            gap: '12px', // Espacio controlado entre los dos botones
            justifyContent: 'space-between',
            width: '100%',
        },
        button: {
            flex: '2', // Toma un poco más de espacio (equivalente al col-8)
            padding: '14px',
            fontSize: '15px',
            fontWeight: '600',
            color: '#ffffff',
            backgroundColor: '#2563eb',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
        },
        resend: {
            flex: '1', // Toma un poco menos de espacio (equivalente al col-4)
            padding: '14px',
            fontSize: '15px',
            fontWeight: '600',
            color: '#ffffff',
            backgroundColor: '#da8320',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
        }
    };

    return (
        <>
            <CheckLogin></CheckLogin>

            <div style={styles.container}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Verifica tu cuenta</h2>

                    <p style={styles.subtitle}>
                        Ingresa el código de verificación
                    </p>

                    <div style={styles.form}>
                        <input
                            type="text"
                            maxLength="50"
                            placeholder="Ingrese el código enviado por mail"
                            value={Code}
                            onChange={handleChange}
                            style={styles.input}
                            autoFocus
                        />
                    </div>

                    {/* Contenedor Flexbox para alinear los botones lado a lado */}
                    <div style={styles.buttonContainer}>
                        <button
                            type="button"
                            style={styles.resend}
                            disabled={isButtonDisabled}
                            className={`p-1 select-none transition-colors ${(isButtonDisabled) ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-500'}`}
                            onClick={handlerSendCode}
                        >
                            {isButtonDisabled ? 'Chequea Correo' : 'Reenviar Codigo'}
                        </button>

                        <button
                            type="button"
                            style={styles.button}
                            onClick={handleSubmit}
                        >
                            Verificar Código
                        </button>
                    </div>

                </div>
            </div>

        </>
    );
};

export default verificationscreen;