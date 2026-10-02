'use client'
import DashboardReviews from "@/components/DashboardReviews";
import CheckLogin from "@/components/CheckLogin";

export default function DashboardPage() {

    return (
        <>
        
        <CheckLogin></CheckLogin>
        <DashboardReviews></DashboardReviews>

        </>
    )
}

