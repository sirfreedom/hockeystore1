'use client'
import { useEffect, useState } from "react"
import { ListType } from '@/Api/ProblemStoreHelper';
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Insert } from '@/Api/ProblemStoreHelper';

const ProblemStore = () => {
    const [TypeProblem, setTypeProblem] = useState();
    const [alreadySubmitted, setAlreadySubmitted] = useState(false);
    const [IdTypeProblem, setIdTypeProblem] = useState(0);
    const [DescriptionText, setDescriptionText] = useState('');
    const [Email, setEmail] = useState('');
    const router = useRouter();

    useEffect(() => {

        ListType().then(data => {
            setTypeProblem(data);
        });

    }, [])


    const handleSubmit = () => {

        if (Email.trim().length < 10) {
            toast("Es importante que incluyas un email correcto", { duration: 3000 });
            return;
        }

        if (DescriptionText.trim().length < 5) {
            toast("Es importante que describas el problema", { duration: 3000 });
            return;
        }

        if (IdTypeProblem === '0') {
            toast("Es importante que incluyas el tipo de problema que tenes.", { duration: 3000 });
            return;
        }

        Insert(IdTypeProblem, Email, DescriptionText,TypeProblem.find(x => x.id == IdTypeProblem).descriptiontext).then(data => {

            if (data?.status === 201) {
                toast.success('Agregado..! ', { duration: 3000 });
                setDescriptionText('');
                setEmail('');
                setIdTypeProblem(0);
                setAlreadySubmitted(true);
                return;
            }

            if (data?.status === 422) {
                toast.error(data.error, { duration: 8000 });
                return;
            }

           if (data?.status === 401) {
                localStorage.clear();
            }

            if (data?.status === 400) {
                toast.error('Error, intente nuevamente mas tarde..', { duration: 1000 });
                return;
            }

            if (data?.status === 500) {
                toast.error('Error critico, consulte al sistema, luego.', { duration: 1000 });
                return;
            }

        });

    };

    const Home = () => {
        router.push('/');
    };

    const styles = {
        contenedor: {
            maxWidth: '500px',
            margin: '40px auto',
            padding: '24px',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        },
        titulo: {
            margin: '0 0 8px 0',
            color: '#1a202c',
            fontSize: '24px',
            textAlign: 'center'
        },
        subtitulo: {
            margin: '0 0 24px 0',
            color: '#718096',
            fontSize: '14px',
            textAlign: 'center'
        },
        formulario: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        },
        grupoCampo: {
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
        },
        etiqueta: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#4a5568'
        },
        input: {
            padding: '10px 12px',
            borderRadius: '6px',
            border: '1px solid #cbd5e0',
            fontSize: '15px',
            outline: 'none',
            transition: 'border-color 0.2s',
            fontFamily: 'inherit'
        },
        textarea: {
            resize: 'vertical',
            minHeight: '100px'
        },
        boton: {
            padding: '12px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#3182ce',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            marginTop: '8px'
        },
        alerta: {
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '14px',
            border: '1px solid',
            textAlign: 'center'
        }
    };

    return (
        <>

            {!alreadySubmitted ? (

                <div style={styles.contenedor}>
                    <h2 style={styles.titulo}>Reportar un Problema del Sistema</h2>
                    <p style={styles.subtitulo}>Ayúdanos a mejorar. Cuéntanos qué está fallando.</p>

                    <div style={styles.formulario}>

                        <div style={styles.grupoCampo}>
                            <label htmlFor="ddlTypeProblemStore" style={styles.etiqueta}>Tipo de inconveniente:</label>
                            <select
                                id="ddlTypeProblemStore"
                                key="ddlTypeProblemStore"
                                required
                                value={IdTypeProblem}
                                onChange={(e) => setIdTypeProblem(e.target.value)}
                                style={styles.input}
                            >
                                <option value="0"> -- Selecciona un tipo de problema -- </option>
                                {TypeProblem?.map((typeproblem, index) => (
                                    <option key={index} value={typeproblem?.id}>
                                        {typeproblem?.descriptiontext}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.grupoCampo}>
                            <label htmlFor="Email" style={styles.etiqueta}>Email:</label>
                            <input
                                type="email"
                                id="txtEmail"
                                key="txtEmail"
                                value={Email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="algo@tuEmail.com"
                                className="border border-slate-300 outline-slate-400 w-full p-2 rounded"
                            />
                        </div>

                        <div style={styles.grupoCampo}>
                            <label htmlFor="descripcion" style={styles.etiqueta}>Detalle del problema:</label>
                            <textarea
                                id="descriptiontext"
                                key="descriptiontext"
                                rows="5"
                                value={DescriptionText}
                                required
                                onChange={(e) => setDescriptionText(e.target.value)}
                                placeholder="Describe brevemente qué sucedió, pasos para reproducirlo, etc..."
                                style={{ ...styles.input, ...styles.textarea }}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={e => handleSubmit(e)}
                            style={styles.boton}
                            disabled={DescriptionText.length < 5}
                            className={`p-1 select-none transition-colors ${(DescriptionText.length === 0 || Email.length === 0) ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-500'
                                }`}
                        >
                            Enviar Problema
                        </button>
                    </div>
                </div>

            ) : (
                <div className="min-h-[80vh] flex flex-col items-center justify-center">
                    <p className="sm:text-2xl lg:text-3xl mx-5 font-semibold text-slate-500 text-center max-w-2xl">
                        Gracias por formar parte y compartir tu experiencia con nosotros, te respondere lo antes posible
                    </p>
                    <button onClick={() => Home()} id="btnVolver" key="btnVolver" className="bg-slate-800 text-white px-12 py-2 rounded mt-10 mb-40 active:scale-95 hover:bg-slate-900 transition ">Volver al inicio</button>
                </div>
            )}

        </>
    );
};

export default ProblemStore;