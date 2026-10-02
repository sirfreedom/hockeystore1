'use client'
import { useEffect, useState } from "react"
import toast from 'react-hot-toast';
import { User, MapPin, Phone } from 'lucide-react';
import AddressModal from '@/components/AddressModal';
import Loading from "@/components/Loading";
import ImageResizer from "@/components/ImageResizerComponent";
import { useRouter } from 'next/navigation';
import { Insert } from "@/Api/UserAppHelper";
import MessageBoxModal from "@/components/MessageBoxModal";
import { GetInfo } from '@/Api/OperadorTelefonicoHelper';
import { IDAPP } from '@/Api/BaseHelper';

export default function CreateStore() {

  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [IsBlockButton,setIsBlockButton] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [CalleSelected, setCalleSelected] = useState("");
  const [message] = useState("Se completo la carga de tu tienda, esta en proceso de revision por nuestro equipo, te notificaremos una vez que se apruebe tu tienda o si es necesario realizar algun cambio")
  const router = useRouter();

  const returnimageText1 = (valor) => {
    setStoreInfo({ ...storeInfo, logoimgtext: valor });
  };

  const getDireccion = (valor) => {
    setStoreInfo({ ...storeInfo, provincia: valor.provincia, calle: valor.calle, lat: valor.lat, long: valor.long });
    setCalleSelected(valor.calle);
  };

  const Home = () => {
    router.push('/');
  };

  const [storeInfo, setStoreInfo] = useState({
    idapp: IDAPP,
    idtypeuserapp: 0,
    nombre: '',
    apellido: '',
    pass: '',
    username: '',
    descriptiontext: '',
    provincia: '',
    calle: '',
    logoimgtext: '',
    email: '',
    contact: '',
    lat: 0,
    long: 0
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      const onlyNumbers = value?.replace(/\D/g, "");
      setStoreInfo({ ...storeInfo, [name]: onlyNumbers });
    } else {
      setStoreInfo({ ...storeInfo, [name]: value });
    }
  };

  const Update = (name, value) => {
    if (name === "contact") {
      const onlyNumbers = value.replace(/\D/g, "");
      setStoreInfo({ ...storeInfo, [name]: onlyNumbers });
    } else {
      setStoreInfo({ ...storeInfo, [name]: value });
    }
  };

  const fetchSellerStatus = async () => {
    setLoading(false)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (storeInfo.contact === '') {
      toast.error('El telefono es necesario para ponerse en contacto con compradores y vendedores.', { duration: 3000 });
      return;
    }

    if (storeInfo.nombre.length === 0 || storeInfo.apellido.length === 0) {
      toast.error('el nombre y el apellido son requeridos', { duration: 3000 });
      return;
    }

    if (storeInfo.email.length === 0) {
      toast.error('El Email es necesario para contactarte con los vendedores, compradores y validar tu identidad..', { duration: 3000 });
      return;
    }

    if (storeInfo.username.length === 0) {
      toast.error('El Username es requerido', { duration: 3000 });
      return;
    }

    if (storeInfo.pass === '' || storeInfo.pass.length < 6) {
      toast.error('El password tiene que tener 6 digitos o mas', { duration: 3000 });
      return;
    }

    if (storeInfo.calle.length === 0) {
      toast.error('La direccion o PUNTO DE ENCUENTRO es REQUERIDA, puede ser la vereda de enfrente a la vuelta, o cerca, pero VALIDA, es para saber la zona donde vive comprador o vendedor.', { duration: 15000 });
      return;
    }

    setIsBlockButton(true);

    Insert(storeInfo.nombre, storeInfo.apellido, storeInfo.pass, storeInfo.username, storeInfo.descriptiontext, storeInfo.provincia, storeInfo.calle, storeInfo.logoimgtext, storeInfo.email, storeInfo.contact, storeInfo.lat, storeInfo.long).then(data => {

      if (data?.status === 201) {
        setAlreadySubmitted(true);
        setIsBlockButton(false);
        toast.success('Se inserto correctamente el registro, ya podes agregar productos', { duration: 2000 });
      }

      if (data?.status === 422) {
        toast.error(data.error, { duration: 5000 });
        setIsBlockButton(false);
        return;
      }

      if (data?.status === 400) {
        toast.error('Error al agregar el usuario', { duration: 1000 });
        return;
      }

      if (data?.status === 500) {
        toast.error('Error critico, consulte al sistema, luego.', { duration: 1000 });
        router.push('/');
      }

    });

  }

  const handlerConfirm = (isclose) => {

    if (isclose === 0) //repondio que no
    {
      Update('contact', '');
      setIsEditingPhone(true);
    }

  };

  const handlerContact = () => {

    setIsEditingPhone(!isEditingPhone);

    if (isEditingPhone) {

      if (storeInfo.contact === '') {
        toast.error('El telefono no puede ir vacio', { duration: 2000 });
        return;
      }

      if (storeInfo.contact.length < 10) {
        toast.error('El telefono debe tener 10 numeros', { duration: 2000 });
        return;
      }

      GetInfo(storeInfo?.contact).then(data => {

        if (data?.status === 400) {
          toast.error('Error, intente nuevamente mas tarde..', { duration: 2000 });
          router.push('/');
        }

        if (data?.status === 401) {
          toast.error('No autorizado. Por favor, inicia sesión nuevamente.', { duration: 3000 });
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

        if (data?.empresa === '') {
          setShowConfirmModal(true);
          return;
        }

        if (data?.empresa !== '') {

          toast.success((t) => (
            <div
              onClick={() => toast.dismiss(t.id)}
              className="cursor-pointer flex flex-col items-center justify-center p-3 text-center min-w-[320px] sm:min-w-[450px]"
            >
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">
                Se encontró datos como linea valida.
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                {'Se encontró correctamente la EMPRESA ' + data?.empresa + ' de la LOCALIDAD de ' + data?.localidad}
              </p>
              <span className="text-[10px] text-slate-400 mt-4 bg-slate-100 px-2 py-0.5 rounded-full font-semibold">
                Click para cerrar
              </span>
            </div>
          ), {
            position: "top-center",
            duration: 5000,
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


  useEffect(() => {
    fetchSellerStatus();
  }, [])


  return !loading ? (
    <>

      {showConfirmModal &&
        <MessageBoxModal
          seleccion={handlerConfirm}
          setShowConfirmModal={setShowConfirmModal}
          title={"Telefono no encontrado"}
          descriptiontext={"No pareciera que el numero exista, quizas nuestra base esta desactualizada, confirma que tu numero es real, asi te podras poner en contacto con tus vendedores o compradores sin problema ¿Deseas continuar?"}
        />}

      {showAddressModal && <AddressModal seleccion={getDireccion} setShowAddressModal={setShowAddressModal} />}

      {!alreadySubmitted ? (

        <div className="mx-6 min-h-[70vh] my-0 flex flex-col items-center justify-center">
          <div
            className="max-w-5xl w-full mx-auto flex flex-col items-start gap-6 text-slate-500 bg-white p-8 rounded-lg shadow-sm"
          >
            {/* Título - Ocupa todo el ancho */}
            <div className="w-full border-b pb-4">
              <h3 className="text-3xl">
                Crea tu perfil <span className="text-slate-800 font-medium"> - Tienda </span>
              </h3>
            </div>

            {/* Contenedor Principal en Dos Columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

              {/* COLUMNA IZQUIERDA: Imagen y Datos Principales */}
              <div className="flex flex-col gap-4">

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 font-semibold text-sm">Nombre</p>
                    <input name="nombre" required onChange={onChangeHandler} value={storeInfo.nombre} type="text" placeholder="Tu nombre" className="border border-slate-300 outline-slate-400 w-full p-2 rounded" />
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-sm">Apellido</p>
                    <input name="apellido" onChange={onChangeHandler} value={storeInfo.apellido} type="text" placeholder="Tu apellido, no es obligatorio" className="border border-slate-300 outline-slate-400 w-full p-2 rounded" />
                  </div>
                </div>

                <div>
                  <p>
                    <User size={14} />
                  </p>
                  <p className="mb-1 font-semibold text-sm">
                    Nick
                  </p>
                  <input name="username" required onChange={onChangeHandler} value={storeInfo.username} type="text" placeholder="Tu usuario nick o nombre de la tienda" className="border border-slate-300 outline-slate-400 w-full p-2 rounded" />
                </div>

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
                      pattern="[0-9]{10}"
                      value={storeInfo.contact}
                      onChange={onChangeHandler}
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

                <div>
                  <p className="mb-1 font-semibold text-sm">@ Email</p>
                  <input name="email" required onChange={onChangeHandler} value={storeInfo.email} type="email" placeholder="Enter your store email" className="border border-slate-300 outline-slate-400 w-full p-2 rounded" />
                </div>

                <div>
                  <p className="mb-1 font-semibold text-sm">Contraseña</p>
                  <input name="pass" required onChange={onChangeHandler} type="password" placeholder="Tu contraseña del sitio" className="border border-slate-300 outline-slate-400 w-full p-2 rounded" />
                </div>

                <div>
                  <p>
                    <MapPin size={14} />
                  </p>
                  <p className="mb-1 font-semibold text-sm">
                    Dirección de punto de encuentro (Aproximada pero real)
                  </p>
                  <input name="calle" required value={CalleSelected} readOnly type="text" placeholder="Haz clic para seleccionar dirección" onClick={() => setShowAddressModal(true)} className="border border-slate-300 outline-slate-400 w-full p-2 rounded cursor-pointer bg-slate-50" />
                </div>

                <div>
                  <button
                    id="btnGuardar"
                    key="btnGuardar"
                    disabled={IsBlockButton}
                    type="button"
                    onClick={onSubmitHandler}
                    className="bg-slate-800 text-white px-16 py-3 rounded active:scale-95 hover:bg-slate-900 transition shadow-lg">
                    Guardar Perfil
                  </button>
                </div>

              </div>

              <div className="flex flex-col gap-4">

                <label className="self-center md:self-start mb-4">
                  <ImageResizer
                    imagetext={returnimageText1}
                    quality={100}
                    hh={250}
                    ww={250}
                    nametext="Tienda Logo o Foto de Perfil"
                    classimg="h-48 w-48 rounded-full object-cover shadow-2xl border-4 border-white bg-gray-50"
                  />
                </label>

                <div>
                  <p className="mb-1 font-semibold text-sm">Descripción</p>
                  <textarea
                    name="descriptiontext"
                    onChange={onChangeHandler}
                    value={storeInfo.descriptiontext}
                    rows={3}
                    placeholder="Contanos un poco de vos, para darle credibilidad a la comunidad"
                    className="border border-slate-300 outline-slate-400 w-full p-2 rounded resize-none"
                  />
                </div>

              </div>

            </div>
          </div>
        </div>

      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <p className="sm:text-2xl lg:text-3xl mx-5 font-semibold text-slate-500 text-center max-w-2xl">{message}</p>
          <button onClick={() => Home()} id="btnVolver" key="btnVolver" className="bg-slate-800 text-white px-12 py-2 rounded mt-10 mb-40 active:scale-95 hover:bg-slate-900 transition ">Volver al inicio</button>
        </div>

      )}
    </>
  ) : (<Loading />)
}