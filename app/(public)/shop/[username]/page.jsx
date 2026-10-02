'use client'
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPinIcon } from "lucide-react";
import Loading from "@/components/Loading";
import { StarIcon } from 'lucide-react';
import { UserStore } from "@/Api/UserDataStoreHelper";
import { ProductStore } from "@/Api/ProductHelper";
import UserStatus from "@/components/UserStatus";


export default function StoreShop() {

    const { username } = useParams()
    const [Products, setProducts] = useState([])
    const [UserShop, setUserShop] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        UserStore(username).then(data => {

            if (data?.status === 200) {
                setUserShop(data);
            }

            if (data?.status === 400) {
                toast.error('Error al agregar el producto, intente nuevamente mas tarde..', { duration: 1000 });
            }

            if (data?.status === 500) {
                toast.error('Error critico, consulte al sistema, luego.', { duration: 1000 });
                router.push('/');
            }

        });

        ProductStore(username).then(data => {

            if (data?.status === 200) {
                setProducts(data);
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

        setLoading(false);
    }, [])

    return !loading ? (

        <div className="min-h-[70vh] mx-6">

            <>

                {UserShop ? (

                    <>

                        <div className="max-w-7xl mx-auto bg-slate-50 rounded-xl p-6 md:p-10 mt-6 flex flex-col md:flex-row items-center gap-6 shadow-xs">
                            <div>
                                <img
                                    src={UserShop?.logoimgtext}
                                    key="imgLogo"
                                    alt="imagen proporcionada por el sitio para determinar el logo"
                                    className="size-32 sm:size-38 object-cover border-2 border-slate-100 rounded-md"
                                    width={200}
                                    height={200}
                                />

   
                                <div>
                                    <div className='flex'>
                                        {UserShop?.username}
                                    </div>
                                    <div className='flex'>
                                        {Array(5).fill('').map((_, index) => (
                                            <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={UserShop?.ratevalue >= index + 1 ? "#00C950" : "#D1D5DB"} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-semibold text-slate-800">
                                    {UserShop?.nombre} - {UserShop?.apellido}
                                </h2>
                                <h3>
                                    <UserStatus isVerified={UserShop?.validuser} ></UserStatus>
                                </h3>
                                <p className="text-sm text-slate-600 mt-2 max-w-lg">
                                    {UserShop?.descriptiontext}
                                </p>
                                <div className="space-y-2 text-sm text-slate-500">
                                    <div className="flex items-center">
                                        <MapPinIcon className="w-4 h-4 text-gray-500 mr-2" />
                                        <span>
                                            {UserShop?.provincia}
                                        </span>
                                    </div>
                                    La informacion del contacto como direccion, telefono, y demas solo te aparecera cuando compres un producto
                                </div>
                            </div>
                        </div>


                        <div className=" max-w-7xl mx-auto mb-40">
                            <h1 className="text-2xl mt-12">
                                <span className="text-slate-800 font-medium">
                                    Podes ver los productos o servicios que vendo
                                </span>
                            </h1>
                            <div className="mt-5 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto">

                                {Products?.map((product, index) =>
                                    <ProductCard key={index} product={product} />
                                )}

                            </div>
                        </div>
                    </>
                )
                    : (
                        <div className="flex h-[60vh] flex-col items-center justify-center text-center">
                            <div className="rounded-full bg-slate-100 p-6 mb-4">
                                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-semibold text-slate-900">No hay productos relacionados al usuario que intentas ver..</h1>
                            <p className="text-slate-500 mt-2"> Verifica si el usuario es correcto </p>
                        </div>
                    )
                }
            </>
        </div>
    ) : <Loading />
}