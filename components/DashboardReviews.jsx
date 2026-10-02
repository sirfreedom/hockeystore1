'use client'
import { CircleDollarSignIcon, ShoppingBasketIcon, StarIcon, TagsIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getDashboard } from '@/Api/UserDataStoreHelper';
import { List } from '@/Api/RateHelper';
import Loading from "@/components/Loading";
import useUserStore from '@/lib/features/user/useUserStore';

const DashboardReviews = () => {
  
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const [DashboardData, setDashboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Reviews, setReviews] = useState([]);

    const Token = useUserStore.getState().token;
    const UserData = useUserStore.getState().user;
    const isExpired = useUserStore.getState().isExpired();
    

    const dashboardCardsData = [
        { title: 'Total Productos', value: DashboardData?.totalProduct, icon: ShoppingBasketIcon },
        { title: 'Total Ganado', value: currency + DashboardData?.totalEarning, icon: CircleDollarSignIcon },
        { title: 'Total Ordenes de Compra', value: DashboardData?.totalOrder, icon: TagsIcon },
        { title: 'Total Ratings', value: DashboardData?.totalRating, icon: StarIcon }
    ]

    useEffect(() => {

        getDashboard(UserData.iduserdatastore, Token).then((data) => {

            if (data?.status === 200) {
                setDashboardData(data);
            }

            if (data?.status === 400) {
                return;
            }

            if (data?.status === 401) {
                localStorage.clear();
            }

            if (data?.status === 500) {
                return;
            }

        });

        List(UserData.iduserdatastore, Token).then((data) => {

            if (data?.status === 200) {
                setReviews(data);
            }

            if (data?.status === 400) {
                return;
            }

            if (data?.status === 401) {
                localStorage.clear();
            }

            if (data?.status === 500) {
                return;
            }

        });

        setLoading(false);

    }, [])

    if (loading) return <Loading />

    return (
        <>

            <div className=" text-slate-500 mb-28">
                <h1 className="text-2xl"> Comprador - Vendedor <span className="text-slate-800 font-medium">Dashboard</span></h1>

                <div className="flex flex-wrap gap-5 my-10 mt-4">
                    {
                        dashboardCardsData?.map((card, index) => (
                            <div key={index} className="flex items-center gap-11 border border-slate-200 p-3 px-6 rounded-lg">
                                <div className="flex flex-col gap-3 text-xs">
                                    <p>{card?.title}</p>
                                    <b className="text-2xl font-medium text-slate-700">{card.value}</b>
                                </div>
                                <card.icon size={50} className=" w-11 h-11 p-2.5 text-slate-400 bg-slate-100 rounded-full" />
                            </div>
                        ))
                    }
                </div>

                {Reviews?.length > 0 ? (
                    <>
                        <h2> Reviews </h2>
                        <div className="mt-5">
                            {Reviews?.map((review, index) => (
                                <div key={index} className="flex max-sm:flex-col gap-5 sm:items-center justify-between py-6 border-b border-slate-200 text-sm text-slate-600 max-w-4xl">
                                    <div>
                                        <div className="flex gap-3">
                                            <Image src={review?.userimgtext} alt={review?.username} className="w-10 aspect-square rounded-full" width={100} height={100} />
                                            <div>

                                                {(review?.isanonymous) ? <p className="font-medium"> Anónimo</p> : (<p className="font-medium">{review?.username}</p>)}

                                                <p className="font-light text-slate-500">{review.ratedate}</p>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-slate-500 max-w-xs leading-6">{review.ratetext}</p>
                                    </div>
                                    <div className="flex flex-col justify-between gap-6 sm:items-end">
                                        <div className="flex flex-col sm:items-end">
                                            <div className='flex items-center'>
                                                {Array(5).fill('').map((_, idx) => (
                                                    <StarIcon key={idx} size={17} className='text-transparent mt-0.5' fill={review?.ratevalue >= idx + 1 ? "#00C950" : "#D1D5DB"} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex h-[60vh] flex-col items-center justify-center text-center">
                        <div className="rounded-full bg-slate-100 p-6 mb-4">
                            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-semibold text-slate-900">No tienes Reviews aún</h1>
                        <p className="text-slate-500 mt-2">¡Parece que es un buen momento para empezar a comprar!</p>
                    </div>
                )}

            </div>

        </>
    );
};

export default DashboardReviews;
