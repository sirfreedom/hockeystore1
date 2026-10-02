'use client'
import React, { Suspense } from 'react';
import VerifiedForm from "@/components/VerifiedForm";

const VerifiedPage = () => {

    return (
        <>

                   <Suspense fallback={<div className="flex min-h-screen justify-center items-center">Cargando...</div>}>
                       <VerifiedForm />
                   </Suspense>

        </>
    );
};

export default VerifiedPage;