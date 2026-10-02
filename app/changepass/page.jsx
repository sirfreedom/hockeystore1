'use client'
import React, { Suspense } from 'react';
import ChangePassForm from '@/components/ChangePassForm';

export default function ChangePassPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen justify-center items-center">Cargando...</div>}>
            <ChangePassForm />
        </Suspense>
    );
}