'use client'
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import SellerSidebar from "@/components/store/StoreSidebar";
import HomeLayout from "@/components/Navbar";
import { getKey } from "@/Api/BaseHelper";
import UserLogin from "@/components/UserLogin";
//import { useRouter } from "next/navigation";

const StoreLayout = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [storeInfo, setStoreInfo] = useState();

    const fetchIsSeller = async () => {

        setStoreInfo({
            UserName: getKey('username') || '',
            LogoImgText: getKey('logoimgtext') 
        })

        setLoading(false)
    }

    useEffect(() => {

        fetchIsSeller();

    }, [])

    return loading ? (
        <Loading />

    ) : storeInfo?.UserName ? (
        <div className="flex flex-col h-screen">
            <HomeLayout></HomeLayout>
            <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
                <SellerSidebar  />
                <div className="flex-1 h-full p-5 lg:pl-12 lg:pt-12 overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    ) : (
        <>
            <div className="flex flex-col h-screen">
            <HomeLayout></HomeLayout>
            <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
                <div className="flex-1 h-full p-5 lg:pl-12 lg:pt-12 overflow-y-scroll">
                    <UserLogin></UserLogin>    
                </div>
            </div>
        </div>

        </>
    )
}

export default StoreLayout