'use client'
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import PageTitle from "@/components/PageTitle";
import { WaitingToResponse } from '@/Api/QuestionStoreHelper';
import { Delete } from '@/Api/QuestionStoreHelper';
import { InsertAnswer } from '@/Api/QuestionStoreHelper';
import MessageBoxModal from "@/components/MessageBoxModal";
import AnswerModal from "@/components/AnswerModal";
import CheckLogin from "@/components/CheckLogin";
import useUserStore from '@/lib/features/user/useUserStore';

const ManagerComments = () => {

    const Token = useUserStore.getState().token;
    const UserData = useUserStore.getState().user;
    const isExpired = useUserStore.getState().isExpired();

    const [Questions, setQuestions] = useState();
    const [IdComent, setIdComent] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [IsSubmited,setIsSubmited] = useState(false);

    const handlerShowComent = (Id) => {
        setIdComent(Id);
        setShowQuestionModal(true);
    }

    const handlerShowDelete = (Id) => {
        setIdComent(Id);
        setShowDeleteModal(true);
    }

    const handlerAnswer = (isclose, AnswerText) => {

        if (isclose === 0) {
            setShowQuestionModal(false);
            return;
        }

        if(IsSubmited) {
            return;            
        }

        setIsSubmited(true); // evita

        InsertAnswer(IdComent,AnswerText,Token).then(data => {

            if (data?.status === 201) {
                DeleteComent(IdComent);
                toast.success('Se inserto la respuesta a la pregunta correctamente.', {duration : 3000});
                setShowQuestionModal(false);
                return;
            }

            if (data?.status === 400) {
                toast.error('Error insertar la respuesta, intente nuevamente mas tarde..', {duration : 2000});
                return;
            }

            if (data?.status === 401) {
                localStorage.clear();
            }

            if (data?.status === 500) {
                toast.error('Error critico, consulte al sistema, luego.', {duration : 2000});
                return;
            }
        });
        
        setShowQuestionModal(false);
    }

    const DeleteComent = (Id) => {
        setQuestions(prev => prev.filter(x => x.id !== Id));
    }

    const handlerDelete = (valor) => {

        if (valor === 0) {
            setShowDeleteModal(false);
            setIdComent(0);
            return;
        }

        Delete(IdComent, Token).then(data => {

            if (data.status === 202) {
                DeleteComent(IdComent);
                toast.success('Pregunta eliminada correctamente', {duration : 3000});
                setIdComent(0);
                setShowDeleteModal(false);
                return;
            }

            if (response?.status === 400) {
                toast.error('Error al eliminar la pregunta, intente nuevamente mas tarde..', {duration : 1000});
                return;
            }

            if (response?.status === 401) {
                localStorage.clear();
                return;                
            }

            if (response?.status === 500) {
                toast.error('Error critico, consulte al sistema, luego.', {duration : 1000});
                return;
            }
        });

    }

    useEffect(() => {

        WaitingToResponse(UserData.iduserdatastore, Token).then(data => {
            setQuestions(data);
        });

    }, []);

    return (
        <>

        <CheckLogin></CheckLogin>

            {showDeleteModal &&
                <MessageBoxModal
                    seleccion={handlerDelete}
                    setShowDeleteModal={setShowDeleteModal}
                    title={"Eliminar el comentario"}
                    descriptiontext={"Eliminas el comentario ? "}
                ></MessageBoxModal>
            }

            {showQuestionModal &&
                <AnswerModal
                    IdQuestionStore={IdComent}
                    seleccion={handlerAnswer}
                    ShowModal={setShowQuestionModal}
                ></AnswerModal>
            }

            <div className="min-h-[60vh] bg-slate-50/50 py-1 px-4 sm:px-6">

                {Questions?.length > 0 ? (
                    <div className="max-w-[95rem] mx-auto">
                        <PageTitle
                            heading={"Preguntas"}
                            text={`Tienes ${Questions?.length} Preguntas registradas sin contestar`}
                            linkText={'Volver al inicio'}
                        />

                        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                            <table className="w-full text-left border-collapse table-auto">
                                <thead>
                                    <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 text-xs uppercase tracking-wider">
                                        <th className="px-4 py-3 font-semibold whitespace-nowrap">Producto</th>
                                        <th className="px-4 py-3 font-semibold whitespace-nowrap">Usuario</th>
                                        <th className="px-4 py-3 font-semibold whitespace-nowrap">Pregunta</th>
                                        <th className="px-4 py-3 font-semibold whitespace-nowrap">Fecha</th>
                                        <th className="px-4 py-3 font-semibold text-center whitespace-nowrap">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {Questions?.map((question, index) => (
                                        <tr key={'tr' + index} className="hover:bg-slate-50/50 transition-colors text-sm">

                                            <td className="px-4 py-3">

                                                <div key={'divitem' + index} className="flex items-center gap-3 mb-2 last:mb-0">
                                                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                                                        <img
                                                            src={question.imgtext}
                                                            className="h-full w-full object-cover transition hover:scale-110"
                                                            alt={question.productname}
                                                        />
                                                    </div>
                                                    <div className="font-medium text-slate-900 leading-snug">
                                                        {question.productname}
                                                    </div>
                                                </div>

                                            </td>

                                            <td className="px-4 py-3">

                                                <div key={'divitem' + index} className="flex items-center gap-3 mb-2 last:mb-0">
                                                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                                                        <img
                                                            src={question.userimgtext}
                                                            className="h-full w-full object-cover transition hover:scale-110"
                                                            alt={question.username}
                                                        />
                                                        {question.username}
                                                    </div>
                                                    <div className="font-medium text-slate-900 leading-snug">
                                                        {question.username}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Detalles de Entrega */}
                                            <td className="px-4 py-3 min-w-[250px]">
                                                {question.questiontext}
                                            </td>

                                            {/* Fecha */}
                                            <td className="px-4 py-3 text-slate-600 whitespace-nowrap text-xs">
                                                {question.ts}
                                            </td>

                                            {/* Acciones */}
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">

                                                    {!question.answertext && (
                                                        <button onClick={() => handlerShowComent(question.id)} className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors gap-1.5">
                                                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                                            Responde la pregunta
                                                        </button>
                                                    )}

                                                    {!question.answertext && (
                                                        <button onClick={() => handlerShowDelete(question.id)} className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700 ring-1 ring-inset ring-red-600/10 hover:bg-red-100 transition-colors gap-1.5 whitespace-nowrap">
                                                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                            Eliminar comentario
                                                        </button>
                                                    )}

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-[60vh] flex-col items-center justify-center text-center">
                        <div className="rounded-full bg-slate-100 p-6 mb-4">
                            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-semibold text-slate-900">No tenes preguntas de productos sin contestar..</h1>
                        <p className="text-slate-500 mt-2">¡Podes seguir mirando, productos para comprar tranquilo...</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default ManagerComments


