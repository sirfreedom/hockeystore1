'use client'
import React, { useState, useEffect } from 'react';
import { User, FileText, MapPin, Phone } from 'lucide-react';
import { toast } from "react-hot-toast";
import { Save, Get } from '@/Api/UserDataStoreHelper';
import { GetInfo } from '@/Api/OperadorTelefonicoHelper';
import { useRouter } from "next/navigation";
import AddressModal from '@/components/AddressModal';
import MessageBoxModal from "@/components/MessageBoxModal";
import Loading from "@/components/Loading";
import CheckLogin from "@/components/CheckLogin";
import useUserStore from '@/lib/features/user/useUserStore';

const StoreEdit = () => {
    const router = useRouter();
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingUserName, setIsEditingUserName] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [OldTelefono, setOldTelefono] = useState();
    const [loading, setLoading] = useState(true);

    const Token = useUserStore.getState().token;
    const UserData = useUserStore.getState().user;

    const [UserEdit, setUserEdit] = useState({
        id: 0,
        username: '',
        email: '',
        description: '',
        calle: '',
        contact: '',
        provincia: '',
        latitud: '',
        longitud: ''
    });

    const handlerConfirm = (isclose) => {

        if (isclose === 0) //repondio que no
        {
            Update('contact', OldTelefono); //si dijo que no, volvemos con el anterior numero
        }

        if (isclose === 1) //repondio que no
        {
            setOldTelefono(UserEdit.contact); //planchamos el numero incorrecto en la variable general
        }

        setShowConfirmModal(false);
    };

    const handlerContact = () => {

        setIsEditingPhone(!isEditingPhone);

        if (!isEditingPhone) {
            Update('contact', '');
        }

        if (isEditingPhone) {

            if (UserEdit.contact.length === 0) {
                Update('contact', OldTelefono);
                return;
            }

            GetInfo(UserEdit?.contact).then(data => {

                if (data?.status === 400) {
                    toast.error('Error, intente nuevamente mas tarde..', { duration: 3000 });
                    return;
                }

                if (data?.status === 401) {
                    localStorage.clear();
                }

                if (data?.status === 422) {
                    toast.error(data?.error, { duration: 3000 });
                    return;
                }

                if (data?.status === 500) {
                    toast.error('Error critico, consulte al sistema, luego.', { duration: 3000 });
                    return;
                }

                if (data?.empresa === '') {
                    setShowConfirmModal(true);
                    return;
                }

                if (data?.empresa) {

                    toast.success((t) => (
                        <div
                            onClick={() => toast.dismiss(t.id)}
                            className="cursor-pointer flex flex-col items-center justify-center p-3 text-center min-w-[320px] sm:min-w-[450px]"
                        >
                            {/* Título estilo Pop-up */}
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">
                                Se encontró datos como linea valida.
                            </h3>
                            {/* Mensaje */}
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                {'Se encontró correctamente la EMPRESA ' + data?.empresa + ' de la LOCALIDAD de ' + data?.localidad}
                            </p>
                            {/* Indicador sutil para cerrar */}
                            <span className="text-[10px] text-slate-400 mt-4 bg-slate-100 px-2 py-0.5 rounded-full font-semibold">
                                Click para cerrar
                            </span>
                        </div>
                    ), {
                        position: "top-center",
                        duration: 15000,
                        style: {
                            padding: '20px',
                            borderRadius: '12px',
                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', // shadow-xl de Tailwind
                            border: '1px solid #e2e8f0', // border-slate-200
                            background: '#ffffff',
                            maxWidth: '620px', // <-- ESTO quita el límite por defecto de la librería y lo expande de ancho
                            width: '100%',
                        },
                    });
                }

            });
        }

    };

    const getDireccion = (valor) => {
        Update('calle', valor.calle);
        Update('provincia', valor.provincia);
        Update('latitud', valor.lat);
        Update('longitud', valor.long);
    };

    const handlerLocation = () => {
        setShowAddressModal(!isEditingAddress);
        setIsEditingAddress(isEditingAddress);
    };

    const Update = (name, value) => {

        if (name === "contact") {
            // Reemplaza instantáneamente cualquier carácter que NO sea un número por un vacío
            const onlyNumbers = value.replace(/\D/g, "");
            setUserEdit({ ...UserEdit, [name]: onlyNumbers });
        } else {
            setUserEdit({ ...UserEdit, [name]: value });
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "contact") {
            // Reemplaza instantáneamente cualquier carácter que NO sea un número por un vacío
            const onlyNumbers = value.replace(/\D/g, "");
            setUserEdit({ ...UserEdit, [name]: onlyNumbers });
        } else {
            setUserEdit({ ...UserEdit, [name]: value });
        }
    };

    useEffect(() => {

        setLoading(true);

        Get(UserData.iduserdatastore, Token).then(data => {

            if (data) {

                setUserEdit({
                    username: data.username || '',
                    email: data.email || '',
                    descriptiontext: data.descriptiontext || '',
                    calle: data.calle || '',
                    contact: data.contact || '',
                    latitud: data.latitud,
                    longitud: data.longitud
                });

                setOldTelefono(data.contact);
            }

        });

        setLoading(false);

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        Save(
            UserData.iduserdatastore,
            UserEdit.username,
            UserEdit.contact,
            UserEdit.email,
            UserEdit.descriptiontext,
            UserEdit.calle,
            UserEdit.provincia,
            UserEdit.latitud,
            UserEdit.longitud,
            Token
        ).then(data => {

            if (data?.status === 202) {
                toast.success('Guardado ok, Se Actualizara en tu proximo inicio de sesion', {duration: 8000});
                router.push('/store');
            }

            if (data?.status === 400) {
                toast.error('Error, intente nuevamente mas tarde..', { duration: 1000 });
                return;
            }

            if (data?.status === 401) {
                router.push('/');
            }

            if (data?.status === 422) {
                toast.error(data?.error, { duration: 5000 });
                return;
            }

            if (data?.status === 500) {
                toast.error('Error critico, consulte al sistema, luego.', { duration: 1000 });
                return;
            }

            setIsEditingUserName(false);
            setIsEditingEmail(false);
            setIsEditingAddress(false);
            setIsEditingPhone(false);
        });
    };

    if (loading) return <Loading />

    return (
        <>
            <CheckLogin></CheckLogin>

            {showConfirmModal &&
                <MessageBoxModal
                    seleccion={handlerConfirm}
                    setShowConfirmModal={setShowConfirmModal}
                    title={"Telefono no encontrado"}
                    descriptiontext={"No pareciera que el numero exista, quizas nuestra base esta desactualizada, confirma que tu numero es real, asi te podras poner en contacto con tus vendedores o compradores sin problema ¿Deseas continuar?"}
                />}

            {showAddressModal && <AddressModal seleccion={getDireccion} setShowAddressModal={setShowAddressModal} />}

            <div className="min-h-screen bg-slate-50 pt-1 pb-8 px-4">
                <div className="w-full md:w-[95%] max-w-4xl mx-auto bg-white p-4 sm:p-6 text-slate-800 rounded-xl shadow-sm mt-1">
                    <form className="space-y-1" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                                    <User size={14} /> Username
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        id="txtusername"
                                        key="txtusername"
                                        type="text"
                                        name="username"
                                        min={3}
                                        required
                                        value={UserEdit.username}
                                        onChange={handleChange}
                                        disabled={!isEditingUserName}
                                        className={`w-full border rounded-lg px-4 py-2.5 text-slate-600 font-medium focus:outline-none transition-colors ${isEditingUserName
                                            ? 'bg-white border-blue-500 focus:border-blue-600'
                                            : 'bg-slate-50 border-slate-200 cursor-not-allowed opacity-80'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        id="btnusername"
                                        key="btnusername"
                                        onClick={() => setIsEditingUserName(!isEditingUserName)}
                                        className={`whitespace-nowrap font-semibold px-4 py-2.5 rounded-lg border transition-colors min-w-[100px] ${isEditingUserName
                                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        {isEditingUserName ? 'Confirmar' : 'Modificar'}
                                    </button>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                    @ Email
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        id="txtemail"
                                        key="txtemail"
                                        type="email"
                                        name="email"
                                        max={50}
                                        required
                                        min={7}
                                        value={UserEdit.email}
                                        onChange={handleChange}
                                        disabled={!isEditingEmail}
                                        className={`w-full border rounded-lg px-4 py-2.5 text-slate-600 font-medium focus:outline-none transition-colors ${isEditingEmail
                                            ? 'bg-white border-blue-500 focus:border-blue-600'
                                            : 'bg-slate-50 border-slate-200 cursor-not-allowed opacity-80'
                                            }`}
                                    />
                                    <button
                                        id="btnemail"
                                        key="btnemail"
                                        type="button"
                                        onClick={() => setIsEditingEmail(!isEditingEmail)}
                                        className={`whitespace-nowrap font-semibold px-4 py-2.5 rounded-lg border transition-colors min-w-[100px] ${isEditingEmail
                                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        {isEditingEmail ? 'Confirmar' : 'Modificar'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                                <FileText size={14} /> Descripción
                            </label>
                            <textarea
                                id="txtdescriptiontext"
                                key="txtdescriptiontext"
                                rows="4"
                                maxLength={250}
                                name="descriptiontext"
                                value={UserEdit?.descriptiontext || ''}
                                onChange={handleChange}
                                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-600 font-medium focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                            />
                        </div>

                        {/* Dirección y Teléfono */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                                    <MapPin size={14} /> Dirección
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        id="txtcalle"
                                        key="txtcalle"
                                        type="text"
                                        name="calle"
                                        value={UserEdit?.calle}
                                        onChange={handleChange}
                                        disabled={true}
                                        className='w-full border rounded-lg px-4 py-2.5 text-slate-600 font-medium focus:outline-none transition-colors bg-slate-50 border-slate-200 cursor-not-allowed opacity-80'
                                    />
                                    <button
                                        id="btncalle"
                                        key="btncalle"
                                        type="button"
                                        onClick={handlerLocation}
                                        className={`whitespace-nowrap font-semibold px-4 py-2.5 rounded-lg border transition-colors min-w-[100px] ${isEditingAddress
                                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        {isEditingAddress ? 'Confirmar' : 'Modificar'}
                                    </button>
                                </div>
                            </div>

                            {/* Teléfono */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                                    <Phone size={14} /> Teléfono
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        id="txtcontact"
                                        key="txtcontact"
                                        maxLength={10}
                                        required
                                        type="tel"
                                        name="contact"
                                        value={UserEdit.contact}
                                        onChange={(e) => Update('contact', (e.target.value))}
                                        disabled={!isEditingPhone}
                                        className={`w-full border rounded-lg px-4 py-2.5 text-slate-600 font-medium focus:outline-none transition-colors ${isEditingPhone
                                            ? 'bg-white border-blue-500 focus:border-blue-600'
                                            : 'bg-slate-50 border-slate-200 cursor-not-allowed opacity-80'
                                            }`}
                                    />
                                    <button
                                        id="btncontact"
                                        key="btncontact"
                                        type="button"
                                        onClick={handlerContact}
                                        className={`whitespace-nowrap font-semibold px-4 py-2.5 rounded-lg border transition-colors min-w-[100px] ${isEditingPhone
                                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        {isEditingPhone ? 'Confirmar' : 'Modificar'}
                                    </button>
                                </div>
                                <p className="mt-1.5 text-xs text-slate-400 font-medium italic pl-1">
                                    * Sin código de país, solo código de ciudad y número ej: 1152224444
                                </p>
                            </div>
                        </div>

                        {/* Botón de envío */}
                        <div className="flex justify-end pt-4 border-t border-slate-100">
                            <button
                                id="btnsubmit"
                                key="btnsubmit"
                                type="submit"
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
                            >
                                Guardar Perfil
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );


}; // <-- ¡Y acá cerramos el componente StoreEdit!

export default StoreEdit;