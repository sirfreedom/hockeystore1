'use client'
import Link from 'next/link'
import { useEffect } from "react"
import { encriptarId } from '@/Api/HashHelper';

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const hashId = product?.id ? encriptarId(product.id) : null;

    useEffect(() => {

    }, []);

    return (

        <>
            <Link href={`/product/${hashId}`} className='group max-xl:mx-auto'>

                <article className="group flex flex-col w-full max-w-60 gap-2">
                    <div className="relative bg-neutral-100 h-40 sm:h-48 rounded-lg flex items-center justify-center overflow-hidden">

                        {product?.isnew && (
                            <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-md uppercase tracking-wider">
                                Nuevo
                            </span>
                        )}

                        <img
                            width={500}
                            height={500}
                            className="max-h-32 sm:max-h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out"
                            src={product?.imgtext}
                            alt={`Imagen del producto ${product?.productname}`}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 text-slate-800 px-1 mt-1">
                        <div className="flex justify-between items-start gap-3">
                            <h3 className="text-sm font-semibold leading-snug line-clamp-2 flex-1 min-w-0">
                                {product?.productname || "Auriculares Inalámbricos Bluetooth Pro Noise Cancelling"}
                            </h3>
                            <span className="text-sm font-bold shrink-0 tabular-nums text-slate-950">
                                {currency || "$"}{product?.price}
                            </span>
                        </div>

                        <div className="flex justify-between items-center gap-3 text-xs text-slate-500 pt-1 border-t border-slate-100">
                            <p className="line-clamp-1 flex-1 min-w-0">
                                {product?.descriptiontext}
                            </p>
                            <span className="shrink-0 font-medium whitespace-nowrap bg-slate-100 px-1.5 py-0.5 rounded">
                                Cantidad: {product?.quantity}
                            </span>
                        </div>
                    </div>
                </article>

            </Link>

        </>
    )
}

export default ProductCard