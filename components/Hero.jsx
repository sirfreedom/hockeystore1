'use client'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from '@/components/CategoriesMarquee'
import { useState, useEffect } from "react";
import { Find } from '@/Api/HeadSlideHelper';
import Link from "next/link";

const Hero = () => {

    const [HeadSlide, setHeadSlide] = useState([]);

    useEffect(() => {
        Find().then(data => {

            setHeadSlide(data);

        });

    }, []);

    return (
        <>

            <div className='mx-6'>
                <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>

                    {HeadSlide?.filter(item => item.orden === 0).map((item, index) => (

                        <div key={'div1' + index} className='relative flex-1 flex flex-col bg-green-200 rounded-3xl xl:min-h-100 group'>
                            <div key={'div2' + index} className='p-5 sm:p-16'>
                                <div key={'div3' + index} className='inline-flex items-center gap-3 bg-green-300 text-green-600 pr-4 p-1 rounded-full text-xs sm:text-sm'>
                                    <span key={'span1' + index} className='bg-green-600 px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs'>
                                        Siempre sumando productos
                                    </span>

                                    <ChevronRightIcon className='group-hover:ml-2 transition-all' size={16} />
                                </div>
                                <h2 key={'h2' + index} className='text-3xl sm:text-5xl leading-[1.2] my-3 font-medium bg-gradient-to-r from-slate-600 to-[#A0FF74] bg-clip-text text-transparent max-w-xs  sm:max-w-md'>
                                    {item.descriptiontext}
                                </h2>
                            </div>

                            <Image
                                key={'img1' + index}
                                src={item?.imgtext}
                                id={item?.id}
                                alt={item?.descriptiontext}
                                width={1500}
                                height={1500}
                                className='sm:absolute bottom-25 right-0 md:right-0 w-full sm:max-w-lg'
                            />
                        </div>

                    ))}

                    <div key={'div11'} className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600'>

                        {HeadSlide?.filter(item => item.orden !== 0).map((item, index) => (
                            <div key={'div12' + index} className={'flex-1 flex items-center justify-between w-full ' + 'bg-blue-200' + ' rounded-3xl p-6 px-8 group'}>
                                <div>
                                    <p href='/shop' key={'p1' + index} className='text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#FFAD51] bg-clip-text text-transparent max-w-40'>
                                        {item?.descriptiontext}
                                    </p>
                                    <p href='/shop' key={'p2' + index} className='flex items-center gap-1 mt-4'>
                                        <Link href="/shop" className="hover:text-blue-500 whitespace-nowrap">
                                            Mira mas...
                                            <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} />
                                        </Link>
                                    </p>
                                </div>
                                <img key={'img2' + index}
                                    id={item.id}
                                    className='w-35'
                                    src={item?.imgtext}
                                />
                            </div>

                        ))}

                    </div>

                </div>

                <CategoriesMarquee key={'cat1'} />
                
            </div>


        </>
    )
}

export default Hero