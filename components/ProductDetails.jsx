'use client'
import useCartStore from '@/lib/features/cart/useCartStore';
import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon, BaggageClaim, User } from "lucide-react";
import { FaYoutube } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { AiOutlineUnorderedList } from "react-icons/ai";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import YoutubeModal from "@/components/YoutubeModal";
import UserStatus from "@/components/UserStatus";

const ProductDetails = ({ productstore, images }) => {

    const [mainImage, setMainImage] = useState();
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const productId = productstore.id;
    const { addItem, removeItem, deleteFromCart } = useCartStore();
    const quantity = useCartStore((state) => state.items[productId] || 0);
    const [showYoutubeModal, setShowYoutubeModal] = useState(false);

    const router = useRouter()

    const addToCartHandler = () => {

        addItem(productId);

        if (quantity === productstore?.quantity) {
            toast("no es posible agregar mas productos, porque el producto solo tiene " + productstore?.quantity + " articulo", { duration: 12000 });
        }
    }

    const handlerYoutube = (valor) => {
        setShowYoutubeModal(false);
    }

    const handlerShowYoutube = () => {
        setShowYoutubeModal(true);
    }

    const removeFromCartHandler = () => {
        removeItem(productId);
    }

    const btnImage_OnClick = (image) => {
        setMainImage(image?.imgtext);
    }

    const handleCartAction = () => {
        router.push('/cart');
    };

    const handleGoHome = () => {
        router.push('/');
    };

    useEffect(() => {

        setMainImage(productstore?.imgtext);
    }, []);

    return (
        <>

            {showYoutubeModal && <YoutubeModal seleccion={handlerYoutube}
                setShowYoutubeModal={setShowYoutubeModal} link={productstore.youtubelink} />
            }

            <div className="text-gray-600 text-sm mt-8 mb-5">
                Categoria : {productstore?.category}
            </div>

            <div className="flex max-lg:flex-col gap-12">

                <div className="flex max-sm:flex-col-reverse gap-3">

                    <div className="flex sm:flex-col gap-3">

                        {images.map((image, index) => (
                            <div id='btnImage' key={index} onClick={() => btnImage_OnClick(image)} className="bg-slate-100 flex items-center justify-center size-26 rounded-lg group cursor-pointer">
                                <img src={image?.imgtext} className="group-hover:scale-103 group-active:scale-95 transition" alt="Imagen del producto" width={45} height={45} />
                            </div>
                        ))}

                    </div>

                    <div className="flex justify-center items-center h-100 sm:size-113 bg-slate-100 rounded-lg ">
                        {mainImage && (
                            <Image src={mainImage} alt="Imagen principal del producto" width={250} height={250} />
                        )}
                    </div>

                </div>

                <div className="flex-1">

                    <h1 className="text-3xl font-semibold text-slate-800">
                        {productstore?.productname}
                    </h1>

                    <div className='flex items-center mt-2'>

                        {Array(5).fill('').map((_, index) => (
                            <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={productstore?.ratevalue >= index + 1 ? "#00C950" : "#D1D5DB"} />
                        ))}

                        <p className="text-sm ml-3 text-slate-500">{productstore?.reviews} Reviews </p>
                    </div>

                    <div className="flex items-start my-6 gap-3 text-2xl font-semibold text-slate-800">
                        <p> {currency}{productstore?.price} </p>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500">
                        <User size={25} />
                        <UserStatus isVerified={productstore?.validuser} ></UserStatus>
                        <br></br>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500">
                        <TagIcon size={25} />
                        <p> Cantidad total de productos {productstore?.quantity} </p>
                        <br></br>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500">
                        <BaggageClaim size={25} />
                        <p> Total de productos agregados {quantity} </p>
                        <br></br>
                    </div>


                    {productstore?.youtubelink && (
                        <div className="flex items-center gap-2 text-slate-500">
                            <FaYoutube size={25} color="#FF0000" />
                            <a onClick={() => handlerShowYoutube()} className="text-blue-500 hover:underline">
                                Miralo en Youtube
                            </a>
                        </div>
                    )}

                    <div className="flex items-end gap-5 mt-10">
                        {
                            (
                                <div className="flex flex-col gap-3">
                                    <p className="text-lg text-slate-800 font-semibold">Cantidad</p>

                                    <div className="inline-flex items-center gap-1 sm:gap-3 px-3 py-1 rounded border border-slate-200 max-sm:text-sm text-slate-600">
                                        <button
                                            onClick={removeFromCartHandler}
                                            className="p-1 select-none hover:text-red-500 transition-colors"
                                            disabled={quantity === 0} // Opcional: deshabilitar si es 0
                                        >
                                            -
                                        </button>

                                        <p className="p-1 font-medium"> {quantity} </p>

                                        <button
                                            onClick={addToCartHandler}
                                            className="p-1 select-none hover:text-blue-500 transition-colors"
                                            disabled={(quantity === productstore.quantity)}
                                        >
                                            +
                                        </button>
                                    </div>

                                </div>
                            )
                        }

                        {(quantity < productstore.quantity)
                            &&
                            (<button
                                onClick={addToCartHandler}
                                className="bg-emerald-700 text-white px-10 py-3 text-sm font-medium rounded hover:bg-emerald-800 active:scale-95 transition">
                                {'Agregar al Carrito'}
                            </button>
                            )
                        }

                        {
                            (quantity > 0) &&
                            (
                                <button
                                    onClick={handleCartAction}
                                    className="bg-blue-600 text-white px-10 py-3 text-sm font-medium rounded hover:bg-blue-700 active:scale-95 transition">
                                    {'Ver Carrito'}
                                </button>
                            )
                        }

                    </div>

                    <hr className="border-gray-300 my-5" />

                    <div className="flex flex-col gap-4 text-slate-500">
                        <p className="flex gap-3">
                            <AiOutlineUnorderedList className="text-slate-400" />
                            {productstore?.descriptiontext}
                        </p>
                    </div>

                    <hr className="border-gray-300 my-5" />

                    <div className="flex flex-col gap-4 text-slate-500">
                        <button
                            onClick={handleGoHome}
                            className="bg-slate-800 text-white px-10 py-3 text-sm font-medium rounded hover:bg-slate-900 active:scale-95 transition">
                            {'Volver al inicio'}
                        </button>
                    </div>

                </div>
            </div>


        </>
    )
}

export default ProductDetails