'use client'
import React, { useState, useEffect } from 'react';
import { InProduct } from '@/Api/QuestionStoreHelper';
import Image from "next/image";
import toast from 'react-hot-toast';
import { InsertQuestion } from '@/Api/QuestionStoreHelper';
import { useRouter } from "next/navigation";
import useUserStore from '@/lib/features/user/useUserStore';

const QuestionStore = ({ IdProduct }) => {

    const [Questions, setQuestions] = useState();
    const [NewQuestion, setNewQuestion] = useState('');
    const router = useRouter();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const Token = useUserStore.getState().token;
    const UserData = useUserStore.getState().user;
    const isExpired = useUserStore.getState().isExpired();
    const { checkAuth } = useUserStore();
    
    useEffect(() => {

        InProduct(IdProduct, Token).then(data => {
            setQuestions(data);
        });

    }, [])


    const SaveQuestion = (questiontext) => {

        setQuestions(prev => [
            ...prev, // Copia todas las preguntas anteriores
            {
                id: Date.now(), // Buena práctica: una clave única
                ts: new Date().toLocaleDateString('es-AR'),
                questiontext: questiontext,
                userimgtext: UserData?.logoimgtext,
                username: UserData?.username
            }
        ]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (NewQuestion.trim().length < 6) {
            toast('No es posible enviar menos de 5 caracteres, intente hacer una pregunta real');
            return;
        }

        InsertQuestion(IdProduct, UserData.iduserdatastore, NewQuestion, Token).then(data => {

            if (data?.status === 201) {
                toast.success('Consulta ingresada con existo. notificando al vendedor.', {duration: 3000} );
                SaveQuestion(NewQuestion);
                setNewQuestion('');
            }

            if (data?.status === 400) {
                toast.error('Error al agregar, intente luego en otro momento', {duration: 2000 } );
                return;
            }

            if (data?.status === 422) {
                toast.error(data.error, {duration : 5000 });
                setNewQuestion('');
                return;
            }

            if (data?.status === 401) {
                localStorage.clear();
                return;
            }

            if (data?.status === 500) {
                toast.error('Error critico, consulte al sistema, luego.', {duration : 2000});
                router.push('/');
            }
        });

        setIsButtonDisabled(true);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 60000);

    };

    return (
        <>
            <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', padding: '20px' }}>

                <section style={{ marginBottom: '40px' }}>

                    <div style={{ borderBottom: '2px solid #eeeeee4f', paddingBottom: '10px' }}>
                        Preguntale al vendedor
                    </div>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <textarea
                            rows="3"
                            placeholder="Escribí tu pregunta sobre el producto..."
                            value={NewQuestion}
                            disabled={isButtonDisabled || !checkAuth() }
                            onChange={(e) => setNewQuestion(e.target.value)}
                            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', resize: 'vertical' }}
                            required
                        />

                        <button
                            type="submit"
                            onClick={handleSubmit} // Asignamos la función al hacer click
                            disabled={isButtonDisabled || !checkAuth() }   // El botón se deshabilita según el estado
                            className={`p-1 select-none transition-colors ${ (isButtonDisabled || !checkAuth() )? 'opacity-50 cursor-not-allowed' : 'hover:text-red-500' }`}
                            style={{
                                alignSelf: 'flex-end',
                                padding: '10px 20px',
                                backgroundColor: (isButtonDisabled || !checkAuth() )  ? '#ccc' : '#3483fa', // Color gris si está bloqueado
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: (isButtonDisabled || !checkAuth() ) ? 'not-allowed' : 'pointer', // Cambia el cursor si está bloqueado
                                fontWeight: 'bold'
                            }}
                        >
                            {isButtonDisabled ? 'Espera 1 min, para relizar la proxima pregunta' : 'Preguntar'}
                        </button>

                    </form>
                </section>

                <section>

                    {Questions?.length === 0 ? (

                        <p style={{ color: '#666' }}> Nadie hizo preguntas todavía. ¡Sé el primero!</p>

                    ) : (

                        <>

                            <div style={{ marginBottom: '20px' }}>
                                Últimas preguntas realizadas
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                {Questions?.map((question, index) => (

                                    <div key={question?.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>

                                        <div style={{ marginBottom: '8px' }}>
                                            <span style={{ fontWeight: 'bold', color: '#333' }}>
                                                {question?.username}
                                            </span>
                                            <span style={{ fontWeight: 'bold', color: '#333' }}>
                                                <Image src={question?.userimgtext} alt={question?.username} className="size-11 rounded-full ring ring-slate-400" width={100} height={100} />
                                            </span>
                                            <span style={{ fontWeight: 'bold', color: '#333' }}>
                                                {question?.questiontext}
                                            </span>
                                            <span style={{ fontSize: '12px', color: '#999', marginLeft: '10px' }}>
                                                {question?.ts}
                                            </span>
                                        </div>

                                        {question?.answertext ? (
                                            <div style={{ marginLeft: '15px', color: '#666', borderLeft: '2px solid #ccc', paddingLeft: '10px' }}>
                                                <p style={{ margin: 0, fontSize: '14px' }}>
                                                    <span style={{ color: '#00a650', fontWeight: 'bold' }}>Respuesta: </span>
                                                    {question?.answertext}
                                                </p>
                                            </div>
                                        ) : (
                                            <p style={{ marginLeft: '15px', margin: 0, fontSize: '13px', color: '#999', fontStyle: 'italic' }}>
                                                Aún sin respuesta.
                                            </p>
                                        )}


                                    </div>
                                ))}
                            </div>

                        </>
                    )}
                </section>

            </div>


        </>
    )
}

export default QuestionStore