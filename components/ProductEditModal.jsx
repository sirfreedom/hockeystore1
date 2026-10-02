'use client'
import { XIcon } from "lucide-react"
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import { List } from "@/Api/CategoryHelper";
import { Get } from "@/Api/ProductHelper";
import useUserStore from '@/lib/features/user/useUserStore';

const ProductEditModal = ({ ShowModal, returnproduct, idproduct }) => {

    const [loading, setLoading] = useState(true);
    const [Categories, setCategories] = useState();
    const [SubCategory, setSubCategory] = useState();
    const [Category, setCategory] = useState();
    const Token = useUserStore.getState().token;
        
    const [productInfo, setProductInfo] = useState({
        id: idproduct,
        productname: "",
        idcategory: 0,
        descriptiontext: "",
        isnew: false,
        price: 0,
        quantity: 0,
        youtubelink: ""
    })

    const handleAction = (value) => {

        if (value === 1) {
            returnproduct(productInfo);
        }

        if (value === 0) 
        {
            //se cierra el popup sin hacer nada
        }

        ShowModal(false);
    }


    const onChangeHandler = (name, value) => {
        // Lista de campos que deben guardarse como Number
        const numericFields = ['idcategory', 'idcategorypadre', 'price', 'quantity'];
        const parsedValue = numericFields.includes(name) ? (value === "" ? "" : Number(value))  : value;
        setProductInfo(prev => ({ ...prev, [name]: parsedValue }));
    }

    const ddlSubCategory_onChange = (e) => {
        const padreId = Number(e.target.value);
        setProductInfo(prev => ({ ...prev, idcategorypadre: padreId, idcategory: -1 }));
        setCategory(Categories.filter(x => x.idcategory === padreId));
    }


    useEffect(() => {
        setLoading(true);

        Promise.all([List(), Get(idproduct, Token)]).then(([categoriesData, productData]) => {
            setCategories(categoriesData);
            setSubCategory(categoriesData.filter(x => x.idcategory === 0));

            // Seteamos la información inicial del producto en el estado del formulario
            if (productData) {
                setProductInfo({
                    id: idproduct,
                    productname: productData.productname ?? "",
                    idcategory: productData.idcategory ?? -1,
                    idcategorypadre: productData.idcategorypadre ?? -1,
                    descriptiontext: productData.descriptiontext ?? "",
                    price: productData.price ?? 0,
                    isnew: productData.isnew ?? false,
                    quantity: productData.quantity ?? 1,
                    youtubelink: productData.youtubelink ?? ""
                });

                if (productData.idcategorypadre) {
                    setCategory(categoriesData.filter(x => x.idcategory === Number(productData.idcategorypadre)));
                }
            }

            setLoading(false);

        }).catch(err => {
            console.error(err);
            setLoading(false);
        });

    }, [idproduct])


    if (loading) return <Loading />

    return (

        <>

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

                <div className="relative w-[90vw] md:w-[60vw] h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">

                    <div className="p-4 md:p-6 border-b flex justify-between items-center bg-slate-50">
                        <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
                            Modificar <span className="text-blue-600 font-bold">Producto</span>
                        </h2>
                        <button
                            type="button"
                            onClick={() => ShowModal(false)}
                            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                            <XIcon size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 text-slate-600 text-left flex flex-col justify-between">
                        <div className="space-y-6">

                            {/* Campo: Nombre */}
                            <label className="flex flex-col gap-1.5">
                                <span className="text-sm font-medium text-slate-700">Nombre</span>
                                <input
                                    type="text"
                                    id="txtProductName"
                                    onChange={e => onChangeHandler('productname', e.target.value)}
                                    value={productInfo.productname}
                                    placeholder="Nombre y Modelo"
                                    className="w-full p-2.5 outline-none border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    required
                                />
                            </label>

                            {/* Campo: Descripción */}
                            <label className="flex flex-col gap-1.5">
                                <span className="text-sm font-medium text-slate-700">Descripción sobre daños o particularidades... *</span>
                                <textarea
                                    id="txtDescriptionText"
                                    onChange={e => onChangeHandler('descriptiontext', e.target.value)}
                                    value={productInfo.descriptiontext}
                                    placeholder="Escribe los detalles aquí..."
                                    rows={4}
                                    className="w-full p-2.5 outline-none border border-slate-200 rounded-lg resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    required
                                />
                            </label>

                            {/* Fila Responsiva */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                                {/* Precio */}
                                <label className="flex flex-col gap-1.5">
                                    <span className="text-sm font-medium text-slate-700">Precio ($)</span>
                                    <input
                                        type="number"
                                        id="txtPrice"
                                        onChange={e => onChangeHandler('price', e.target.value)}
                                        value={productInfo.price}
                                        placeholder="1000"
                                        min="1000"
                                        className="w-full p-2.5 outline-none border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        required
                                    />
                                </label>

                                {/* Checkbox: ¿Es Nuevo? */}
                                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 h-[46px] select-none">
                                    <input
                                        type="checkbox"
                                        id="chkIsNew"
                                        checked={productInfo.isnew}
                                        onChange={e => onChangeHandler('isnew', e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="text-sm font-medium text-slate-700">¿El producto es nuevo?</span>
                                </label>

                                {/* Cantidad */}
                                <label className="flex flex-col gap-1.5">
                                    <span className="text-sm font-medium text-slate-700">Cantidad</span>
                                    <input
                                        type="number"
                                        id="txtquantity"
                                        name="quantity"
                                        min="1"
                                        onChange={e => onChangeHandler('quantity', e.target.value)}
                                        value={productInfo.quantity}
                                        className="w-full p-2.5 outline-none border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        required
                                    />
                                </label>
                            </div>

                            {/* Selectores de Categoría */}
                            <div className="flex flex-col gap-1.5">
                                <p className="text-sm font-medium text-slate-700">Categoría y Subcategoría *</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <select
                                        className="w-full p-2.5 outline-none border border-slate-200 rounded-lg text-slate-800 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                                        required
                                        onChange={ddlSubCategory_onChange}
                                        value={productInfo.idcategorypadre}
                                    >
                                        <option value="-1" disabled>Seleccione categoría padre...</option>
                                        {SubCategory?.map((subcat, index) => (
                                            <option key={'subcat' + index} value={subcat.id}>
                                                {subcat.descriptiontext}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        name="ddlcategory"
                                        className="w-full p-2.5 outline-none border border-slate-200 rounded-lg text-slate-800 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                                        required
                                        onChange={e => onChangeHandler('idcategory', e.target.value)}
                                        value={productInfo.idcategory}
                                    >
                                        <option value="-1" disabled>Seleccione subcategoría...</option>
                                        {Category?.map((cat, index) => (
                                            <option key={'cat' + index} value={cat.id}>
                                                {cat.descriptiontext}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <label className="flex flex-col gap-1.5">
                                <span className="text-sm font-medium text-slate-700">Enlace de YouTube <span className="text-xs text-slate-400 font-normal">(Opcional)</span></span>
                                <input
                                    type="text"
                                    id="txtYouTubeLink"
                                    name="youtubelink"
                                    value={productInfo.youtubelink}
                                    onChange={e => onChangeHandler('youtubelink', e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="w-full p-2.5 outline-none border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                />
                            </label>

                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-8 pt-4 border-t border-slate-100 bg-white">
                            <button
                                type="button"
                                onClick={() => handleAction(0)}
                                className="order-2 sm:order-1 px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 active:scale-[0.98] transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                onClick={() => handleAction(1)}
                                className="order-1 sm:order-2 px-5 py-2.5 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 active:scale-[0.98] transition-all shadow-sm"
                            >
                                Guardar Producto
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ProductEditModal;