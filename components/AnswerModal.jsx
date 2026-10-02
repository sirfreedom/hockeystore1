'use client'
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { Get } from '@/Api/QuestionStoreHelper';
import useUserStore from '@/lib/features/user/useUserStore';

const AnswerModal = ({ ShowModal, seleccion, IdQuestionStore }) => {
    const [Answer, setAnswer] = useState('');
    const [Question, setQuestion] = useState();
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const Token = useUserStore.getState().token;
    const UserData = useUserStore.getState().user;
    const isExpired = useUserStore.getState().isExpired();

    useEffect(() => {

        Get(IdQuestionStore, Token).then(data => {

            if (data?.status === 200) {
                setQuestion(data);
            }

            if (data?.status === 400) {
                return;
            }

            if (data?.status === 401) {
                localStorage.clear();
            }

            if (data?.status === 500) {
                return;
            }

        });

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault(); // Previene la recarga de la página si se usa submit

        if (!Answer.trim()) {
            return;
        }

        seleccion(1, Answer); // 1 para indicar que se envió con éxito
        ShowModal(false);
    }

    const handleCancel = () => {
        seleccion(0, ''); // 0 para indicar que se canceló
        ShowModal(false);
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">

                {/* Contenedor Principal del Modal */}
                <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden max-h-[90vh] animate-in zoom-in-95 duration-200">

                    {/* Botón de cierre flotante superior */}
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="absolute top-4 right-4 z-10 p-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-700 rounded-full transition-all active:scale-95"
                        aria-label="Cerrar modal"
                    >
                        <X size={18} />
                    </button>

                    {/* Cabecera: Info del Producto */}
                    <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-4 pr-14">
                        <img
                            src={Question?.imgtext}
                            alt={Question?.productname}
                            className="w-14 h-14 object-cover rounded-lg border border-gray-200 shrink-0"
                        />
                        <div className="overflow-hidden">
                            <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase block">Responder consulta</span>
                            <h2 className="text-base font-semibold text-gray-800 truncate">{Question?.productname}</h2>
                        </div>
                    </div>

                    {/* Cuerpo con Scroll Interno */}
                    <div className="p-6 overflow-y-auto space-y-5 flex-1">

                        {/* Componente de la Pregunta */}
                        <div className="flex items-start gap-4">
                            <img
                                src={Question?.userimgtext}
                                alt={Question?.username}
                                className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline justify-between gap-2 mb-1 flex-wrap">
                                    <span className="font-medium text-sm text-gray-900">{Question?.username}</span>
                                    <span className="text-xs text-gray-400">{Question?.ts}</span>
                                </div>
                                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                                    <p className="text-sm text-gray-700 italic leading-relaxed">
                                        "{Question?.questiontext}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="modal-answer" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Tu Respuesta:
                                </label>
                                <textarea
                                    id="modal-answer"
                                    rows="4"
                                    className="w-full px-3 py-2.5 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400 bg-white transition-shadow"
                                    placeholder="Escribe una respuesta clara y detailed para el cliente..."
                                    value={Answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    disabled={isSubmitting}
                                    maxLength={500}
                                    required
                                />
                                <div className="text-right text-[11px] text-gray-400 mt-1">
                                    {Answer.length} / 500 caracteres
                                </div>
                            </div>

                            {/* Mensajes de Estado */}
                            {statusMessage?.text && (
                                <div className={`p-3 rounded-lg text-xs ${statusMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                                    }`}>
                                    {statusMessage.text}
                                </div>
                            )}

                            {/* Footer de Acciones */}
                            <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => handleCancel()}
                                    disabled={isSubmitting}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !Answer.trim()}
                                    className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center min-w-[110px] shadow-sm transition-colors"
                                >
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        'Enviar'
                                    )}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AnswerModal;