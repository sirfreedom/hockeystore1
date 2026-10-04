'use client'
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";
import { Trash2Icon } from "lucide-react";
import Image from "next/image"
import Loading from "@/components/Loading";
import { MyProducts } from "@/Api/ProductHelper";
import { Disabled } from "@/Api/ProductHelper";
import { Delete } from "@/Api/ProductHelper";
import { Update } from "@/Api/ProductHelper";
import ProductEditModal from "@/components/ProductEditModal";
import MessageBoxModal from "@/components/MessageBoxModal";
import CheckLogin from "@/components/CheckLogin";
import useUserStore from '@/lib/features/user/useUserStore';


export default function StoreManageProducts() {

  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
  const [loading, setLoading] = useState(true);
  const [Products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [IdProduct, setIdProduct] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const Token = useUserStore.getState().token;
  const UserData = useUserStore.getState().user;
  const isExpired = useUserStore.getState().isExpired();

  const toggleStock = async (Idproduct, isdisabled) => {

    await Disabled(Idproduct, isdisabled === true ? false : true, Token).then(data => {

      if (data?.status === 202) //Accepted
      {
        UpdateValor(Idproduct, isdisabled === true ? false : true);
        toast.success('Esta accion Habilita o Deshabilita un producto en el sitio', { duration: 2000 });
      }

      if (data?.status === 403) {
        toast.error('No autorizado. Por favor, inicia sesión nuevamente.');
        return;
      }

      if (data?.status === 400) {
        toast.error('Error al agregar el producto, intente nuevamente mas tarde..', { duration: 1000 });
        return;
      }

      if (data?.status === 401) {
        localStorage.clear();
      }

      if (data?.status === 500) {
        toast.error('Error critico, consulte al sistema, luego.', { duration: 1000 });
        return;
      }

    });
  }

  const handlerShowEdit = (Id) => {
    setIdProduct(Id);
    setShowEditModal(showEditModal => !showEditModal);
  }

  //se llama solo cuando se actualiza 
  const UpdateEdit = (productupdate) => {

    setProducts(Products =>
      Products.map(producto => {
        if (producto.id === productupdate.id) {
          return {
            ...producto,
            price: productupdate.price,
            descriptiontext: productupdate.descriptiontext,
            isnew: productupdate.isnew,
            quantity: productupdate.quantity,
            youtubelink: productupdate.youtubelink,
            idcategory: productupdate.idcategory,
            productname: productupdate.productname
          };
        }
        return producto;
      })
    );

    Update(productupdate.id,
      productupdate.idcategory,
      productupdate.productname,
      productupdate.descriptiontext,
      productupdate.isnew,
      productupdate.price,
      productupdate.quantity,
      productupdate.youtubelink,
      Token
    ).then(data => {

      if (data.status === 202) {
        toast.success('Producto actualizado correctamente', 3000);
        return;
      }

      if (data?.status === 400) {
        toast.error('Error al agregar el producto, intente nuevamente mas tarde..', 2000);
        return;
      }

      if (data?.status === 401) {
        localStorage.clear();
        return;
      }

      if (data?.status === 500) {
        toast.error('Error critico, consulte al sistema, luego.', 1000);
        return;
      }

    });
  }

  const UpdateValor = (id, valor) => {
    setProducts(Products =>
      Products.map(producto => {
        if (producto.id === id) {
          return { ...producto, isdisabled: valor };
        }
        return producto;
      })
    );
  };


  const handlerShowConfirm = (IdProductStore) => {
    setIdProduct(IdProductStore); //guardo el id del producto a borrar.
    setShowConfirmModal(true);
  }

  const handlerConfirm = (isclose) => {

    if (isclose === 0) {
      setShowConfirmModal(false);
      return;
    }

    Delete(IdProduct, Token).then(data => {

      if (data?.status === 202) {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== IdProduct));
        toast.success('Producto eliminado correctamente', 3000);
        setIdProduct(0);
        return;
      }

      if (data?.status === 400) {
        toast.error('Error al agregar el producto, intente nuevamente mas tarde..', 2000);
        return;
      }

      if (data?.status === 401) {
        localStorage.clear();
        return;
      }

      if (data?.status === 500) {
        toast.error('Error critico, consulte al sistema, luego.', 2000);
        return;
      }

    });

  };


  useEffect(() => {

    MyProducts(UserData.iduserdatastore, Token).then(data => {

      if (data.status === 200) {
        setProducts(data);
        return;
      }

      if (data?.status === 403) {
        return;
      }

      if (data?.status === 400) {
        toast.error('Error al agregar el producto, intente nuevamente mas tarde..', { duration: 1000 });
        return;
      }

      if (data?.status === 401) {
        localStorage.clear();
        return;
      }

      if (data?.status === 500) {
        toast.error('Error critico, consulte al sistema, luego.', { duration: 1000 });
        return;
      }

    });

    setLoading(false);

  }, [])

  if (loading) return <Loading />

  return (
    <>

      <CheckLogin></CheckLogin>

      {showConfirmModal &&
        <MessageBoxModal
          seleccion={handlerConfirm}
          setShowConfirmModal={setShowConfirmModal}
          title={"Eliminar el producto"}
          descriptiontext={"Eliminas la publicacion de tu inventario, esta acción no se puede deshacer. ¿Deseas continuar?"}
        />}

      {showEditModal && <ProductEditModal ShowModal={handlerShowEdit} returnproduct={UpdateEdit} idproduct={IdProduct} />}

      {Products?.length > 0 ? (

<div className="w-full mx-auto">
  <div className="mb-3">
    <h1 className="text-2xl sm:text-3xl text-slate-500">
      Tus <span className="text-slate-800 font-bold">Publicaciones</span>
    </h1>
    <p className="text-slate-400 text-xs sm:text-sm">
      Gestiona el inventario y estado de tus publicaciones
    </p>
  </div>

  <div className="bg-white shadow-md border border-slate-200 rounded-xl overflow-hidden">
    <div className="w-full">
      <table className="w-full text-left border-collapse table-auto">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Producto</th>
            <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Precio</th>
            <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Stock</th>
            <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Estado</th>
            <th className="hidden sm:block px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">Editar</th>
            <th className="hidden sm:block px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {Products?.map((product) => (
            <tr key={product?.id} className="hover:bg-slate-50 transition-colors">

              {/* Producto */}
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 shrink-0">
                    <Image
                      width={36}
                      height={36}
                      className="h-full w-full object-cover rounded-lg border border-slate-200 shadow-sm"
                      src={product?.imgtext}
                      alt={product?.descriptiontext || ''}
                    />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-900 line-clamp-2">
                    {product.productname}
                  </div>
                </div>
              </td>

              {/* Precio */}
              <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm font-semibold text-slate-700">
                {currency} {product?.price?.toLocaleString('es-ES')}
              </td>

              {/* Stock */}
              <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm text-slate-600">
                {product?.quantity} {product?.quantity > 1 ? 'uds' : 'ud'}
              </td>

              {/* Estado */}
              <td className="px-3 py-2.5 whitespace-nowrap">
                {product?.isnew ? (
                  <span className="px-2 py-0.5 text-[11px] font-medium bg-green-100 text-green-700 rounded-full">Nuevo</span>
                ) : (
                  <span className="px-2 py-0.5 text-[11px] font-medium bg-blue-100 text-blue-700 rounded-full">Usado</span>
                )}
              </td>

              {/* Editar */}
              <td className="hidden sm:block px-3 py-2.5 whitespace-nowrap text-center">
                <button 
                  onClick={() => handlerShowEdit(product.id)} 
                  className="inline-flex items-center justify-center rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors gap-1"
                >
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span>Modificar</span>
                </button>
              </td>

              {/* Acciones */}
              <td className="hidden sm:block px-3 py-2.5 whitespace-nowrap text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={product?.isdisabled !== true}
                      onChange={() => toggleStock(product.id, product?.isdisabled)}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>

                  <button 
                    onClick={() => handlerShowConfirm(product?.id)} 
                    className="text-red-500 hover:bg-red-50 p-1.5 rounded-full active:scale-95 transition-all"
                  >
                    <Trash2Icon size={16} />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
      ) : (
        <div className="flex h-[60vh] flex-col items-center justify-center text-center">
          <div className="rounded-full bg-slate-100 p-6 mb-4">
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">No hay publicaciones </h1>
          <p className="text-slate-500 mt-2">Siempre es un buen para que vendas algun producto que tengas descuidado por ahi.. </p>
        </div>
      )}


    </>
  )
}
