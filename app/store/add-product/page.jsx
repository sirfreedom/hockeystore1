'use client'
import { useEffect, useState } from "react";
import { List } from "@/Api/CategoryHelper";
import ImageResizer from "@/components/ImageResizerComponent";
import { Insert } from "@/Api/ProductHelper";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import CheckLogin from "@/components/CheckLogin";
import useUserStore from '@/lib/features/user/useUserStore';

export default function StoreAddProduct() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [Categories, setCategories] = useState();
    const [SubCategory, setSubCategory] = useState();
    const [Category, setCategory] = useState();
    const Token = useUserStore.getState().token;
    const UserData = useUserStore.getState().user;

    const [productInfo, setProductInfo] = useState({
        iduserdatastore: UserData.iduserdatastore || 0,
        idcategory: 0,
        productname: "",
        descriptiontext: "",
        price: "",
        quantity: 1,
        isnew: false,
        youtubelink: "",
        imgtext1: "",
        imgtext2: "",
        imgtext3: "",
        imgtext4: ""
    })

    const onChangeHandler = (name, value) => {
        setProductInfo({ ...productInfo, [name]: value });
    }

    const returnimageText1 = (valor) => {
        setProductInfo({ ...productInfo, imgtext1: valor });
    };

    const returnimageText2 = (valor) => {
        setProductInfo({ ...productInfo, imgtext2: valor });
    };

    const returnimageText3 = (valor) => {
        setProductInfo({ ...productInfo, imgtext3: valor });
    };

    const returnimageText4 = (valor) => {
        setProductInfo({ ...productInfo, imgtext4: valor });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (productInfo?.idcategory === 0) {
            toast.error('Por favor, seleccione una categoría válida', { duration: 2000 });
            return;
        }

        if (productInfo.imgtext1.trim() === "" && productInfo.imgtext2.trim() === "" && productInfo.imgtext3.trim() === "" && productInfo.imgtext4.trim() === "") {
            toast.error('Es obligatorio cargar al menos una imagen', { duration: 2000 });
            return;
        }

        Insert(productInfo?.idcategory, productInfo?.productname,
            productInfo.iduserdatastore, productInfo.descriptiontext, productInfo.isnew, productInfo.price, productInfo.quantity,
            productInfo.youtubelink, productInfo.imgtext1, productInfo.imgtext2, productInfo.imgtext3,
            productInfo.imgtext4, Token).then(data => {

                if (data?.status === 201) {
                    toast.success('Producto agregado correctamente', 3000);
                    router.push('manage-product');
                }

                if (data?.status === 400) {
                    toast.error('Error al agregar el producto, intente nuevamente mas tarde..', 2000);
                    return;
                }

                if (data?.status === 422) {
                    toast.error(data.error, { duration: 3000 });
                    return;
                }

                if (data?.status === 401) {
                    localStorage.clear();
                    return;
                }

                if (data?.status === 500) {
                    toast.error('Error critico, intente nuevamente.', 3000);
                    return;
                }

            });
    }

    const ddlSubCategory_onChange = (e) => {
        e.preventDefault();
        setCategory(Categories.filter(x => x.idcategory === Number(e.target.value)));
    }

    useEffect(() => {

        setLoading(true);

        List().then(data => {
            setCategories(data);
            setSubCategory(data.filter(x => x.idcategory === 0));
            setLoading(false);
        });

    }, [])

    return (

        <>
        <CheckLogin></CheckLogin>

            <form className="text-slate-500 mb-28">
                <h1 className="text-2xl mb-10">Agregar Nuevo <span className="text-slate-800 font-medium"> Producto </span></h1>

                {/* Contenedor Principal Flex */}
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* COLUMNA IZQUIERDA: Datos del producto */}
                    <div className="flex-1">
                        <label className="flex flex-col gap-2 mb-6">
                            Nombre * ej Guantes para mujer talle S
                            <input type="text" id="txtName" key="txtName" onChange={e => onChangeHandler('productname', e.target.value)} value={productInfo.productname} placeholder="Nombre y Modelo" className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required />
                        </label>

                        <label className="flex flex-col gap-2 mb-6">
                            Descripción sobre daños o alguna particularidad del producto
                            <textarea id="txtDescriptionText" key="txtDescriptionText" onChange={e => onChangeHandler('descriptiontext', e.target.value)} value={productInfo.descriptiontext} placeholder="Descripcion del producto" rows={5} className="w-full p-2 px-4 outline-none border border-slate-200 rounded resize-none" required />
                        </label>

                        <div className="flex gap-5 mb-6">
                            <label htmlFor="price" className="flex flex-col gap-2 flex-1">
                                Precio ($)
                                <input type="number" key="txtPrice" id="txtPrice" min="1000" onChange={e => onChangeHandler('price', e.target.value)} value={productInfo.price} placeholder="0" className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required />
                            </label>

                            <label htmlFor="quantity" className="flex flex-col gap-2 flex-1">
                                El producto es nuevo ?
                                <input type="checkbox" key="chkIsNew" id="chkIsNew" onChange={e => onChangeHandler('isnew', e.target.checked)} />
                            </label>

                            <label htmlFor="quantity" className="flex flex-col gap-2 flex-1">
                                Cantidad
                                <input type="number" key="txtQuantity" min="1" step="1" id="txtQuantity" onChange={e => onChangeHandler('quantity', e.target.value)} value={productInfo.quantity} className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required />
                            </label>
                        </div>


                        <div className="flex flex-col gap-2 mb-6">
                            <p className="text-black font-medium">Categoría</p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <select
                                    key='ddlsubcategory'
                                    className="flex-1 p-2 px-4 outline-none border border-slate-200 rounded text-black bg-white"
                                    required
                                    onChange={ddlSubCategory_onChange}
                                    defaultValue="-1"
                                >
                                    {/* Forzamos fondo blanco y texto negro en cada opción */}
                                    <option value="-1" disabled className="bg-white text-black">Seleccione Sub Categoría</option>
                                    {SubCategory?.map((subcat, index) => (
                                        <option key={'subcat' + index} value={subcat.id} className="bg-white text-black">
                                            {subcat.descriptiontext}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    key='ddlcategory'
                                    name="idstoredata"
                                    className="flex-1 p-2 px-4 outline-none border border-slate-200 rounded text-black bg-white"
                                    required
                                    onChange={e => onChangeHandler('idcategory', e.target.value)}
                                    defaultValue="-1"
                                >
                                    {/* Forzamos fondo blanco y texto negro en cada opción */}
                                    <option value="-1" disabled className="bg-white text-black">Seleccione Categoria</option>
                                    {Category?.map((cat, index) => (
                                        <option key={'cat' + index} value={cat.id} className="bg-white text-black">
                                            {cat.descriptiontext}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-5 mb-6">
                            <label htmlFor="quantity" className="flex flex-col gap-2 flex-1">
                                Youtube Link
                                <input type="text" name="youtubelink" onChange={e => onChangeHandler('youtubelink', e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full p-2 px-4 outline-none border border-slate-200 rounded" />
                            </label>
                        </div>

                        <button onClick={onSubmitHandler} disabled={loading} className="w-full lg:w-max bg-slate-800 text-white px-10 py-3 hover:bg-slate-900 rounded transition mt-4">
                            Agregar Producto
                        </button>
                    </div>

                    {/* COLUMNA DERECHA: Imágenes */}
                    <div className="lg:w-1/3">
                        <div className="lg:sticky lg:top-10">
                            <p className="mb-4 font-medium text-slate-700">Imágenes del producto</p>
                            <div className="grid grid-cols-2 gap-3">

                                <label className="self-center md:self-start mb-4">
                                    <ImageResizer
                                        quality={100}
                                        hh={400}
                                        ww={400}
                                        imagetext={returnimageText1}
                                        nametext="Imagen principal del producto"
                                        classimg="h-24 w-24 md:h-32 md:w-32 rounded-xl object-cover shadow-lg border-2 border-white bg-gray-50 transition hover:border-slate-200"
                                    />
                                </label>

                                <label className="self-center md:self-start mb-4">
                                    <ImageResizer
                                        quality={100}
                                        hh={400}
                                        ww={400}
                                        imagetext={returnimageText2}
                                        nametext="imagen producto"
                                        classimg="h-24 w-24 md:h-32 md:w-32 rounded-xl object-cover shadow-lg border-2 border-white bg-gray-50 transition hover:border-slate-200"
                                    />
                                </label>

                                <label className="self-center md:self-start mb-4">
                                    <ImageResizer
                                        quality={100}
                                        hh={400}
                                        ww={400}                                    
                                        imagetext={returnimageText3}
                                        nametext="imagen producto"
                                        classimg="h-24 w-24 md:h-32 md:w-32 rounded-xl object-cover shadow-lg border-2 border-white bg-gray-50 transition hover:border-slate-200"
                                    />
                                </label>

                                <label className="self-center md:self-start mb-4">
                                    <ImageResizer
                                        quality={100}
                                        hh={400}
                                        ww={400}                                    
                                        imagetext={returnimageText4}
                                        nametext="imagen producto"
                                        classimg="h-24 w-24 md:h-32 md:w-32 rounded-xl object-cover shadow-lg border-2 border-white bg-gray-50 transition hover:border-slate-200"
                                    />
                                </label>

                            </div>

                        </div>
                    </div>

                </div>
            </form>

        </>
    )
}