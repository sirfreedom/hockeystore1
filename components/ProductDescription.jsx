'use client'
import { ArrowRight, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import QuestionStore from "@/components/QuestionStore";

const ProductDescription = ({ productstore,Rates }) => {

    const [selectedTab, setSelectedTab] = useState('Preguntas');

    useEffect(() => {

    }, [])

    return (
        <div className="my-18 text-sm text-slate-600">

            <div className="flex border-b border-slate-200 mb-6 max-w-2xl">
                {['Preguntas' , 'Reviews'  ].map((tab, index) => (
                    <button className={`${tab === selectedTab ? 'border-b-[1.5px] font-semibold' : 'text-slate-400'} px-3 py-2 font-medium`} key={index} onClick={() => setSelectedTab(tab)}>
                        {tab}
                    </button>
                ))}
            </div>
       
            {selectedTab === "Preguntas" && (
                <div>
                    <QuestionStore IdProduct={productstore?.id} />
                </div>
            )}

            {selectedTab === "Reviews" && (
                <div className="flex flex-col gap-3 mt-14">

                    {Rates?.map((item,index) => (
                        <div key={index} className="flex gap-5 mb-10">
                            
                            <Image src={item?.userimgtext} alt="imagen del username" className="size-10 rounded-full" width={100} height={100} />

                            <div>
                                <div className="flex items-center">
                                    
                                    {Array(5).fill('').map((_, index) => (
                                        <StarIcon key={index} size={18} className='text-transparent mt-0.5' fill={item.ratevalue >= index + 1 ? "#00C950" : "#D1D5DB"} />
                                    ))}
                                    
                                </div>
                                <p className="text-sm max-w-lg my-4">
                                    {item?.ratetext}
                                </p>
                                <p className="font-medium text-slate-800">{item?.username}</p>
                                <p className="mt-3 font-light">{item?.ratedate}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Store Page */}
            <div className="flex gap-3 mt-14">
                <Image src={productstore?.logoimgtext} alt="" className="size-11 rounded-full ring ring-slate-400" width={100} height={100} />
                <div>
                    <p className="font-medium text-slate-600">Product by {productstore?.username}</p>
                    <Link href={`/shop/${productstore?.username}`} className="flex items-center gap-1.5 text-green-500"> view store <ArrowRight size={14} /></Link>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription