'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation";
import useUserStore from '@/lib/features/user/useUserStore';

const CheckLogin = () => {

    const router = useRouter();
    const { checkAuth } = useUserStore();

    useEffect(() => {
                
        if (!checkAuth()) {

            router.push('/');
        }

    }, []);

    return (
        <>

        </>
    );
};

export default CheckLogin;

