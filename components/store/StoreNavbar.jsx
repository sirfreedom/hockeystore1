'use client'
import useUserStore from '@/lib/features/user/useUserStore';

const StoreNavbar = () => {

    const Token = useUserStore.getState().token;
    const UserData = useUserStore.getState().user;
    const isExpired = useUserStore.getState().isExpired();

    return (
        <>
            <div className="flex items-center justify-end px-5 py-1 border-b border-slate-200 transition-all">
                <div className="flex items-center gap-3 mr-4">
                    <p>
                        {UserData.username}
                    </p>
                </div>
            </div>
        </>
    )
}

export default StoreNavbar