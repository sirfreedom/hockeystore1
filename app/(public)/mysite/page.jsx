'use client'
import ProblemStore from "@/components/ProblemStore";
import { Get } from "@/Api/AppStoreConfigHelper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const MySite = () => {

    const [AppStoreConfig,setAppStoreConfig] = useState();
    const router = useRouter()

    useEffect(() => {
    
    {(!AppStoreConfig) &&
        Get().then(data => {
        setAppStoreConfig(data);
    });

    }

    }, [])

    const ProductShop = () => {
        router.push('/shop');
    };

    return (
        <>

            <div className="bg-gray-50 text-gray-800 antialiased">
                <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                            {AppStoreConfig?.title1}
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-light">
                            {AppStoreConfig?.welcome}
                        </p>
                    </div>
                </section>

                {/* 2. Nuestra Misión & Rol como Intermediario */}
                <section className="py-16 px-4 max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 relative inline-block">
                                {AppStoreConfig?.title2} 
                                <span className="absolute bottom-0 left-0 w-16 h-1 bg-blue-600 rounded">

                                </span>
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {AppStoreConfig?.foryou1} 
                            </p>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                {AppStoreConfig?.foryou2} 
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {AppStoreConfig?.title3} 
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {AppStoreConfig?.foryou3} 
                            </p>
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-sm text-blue-800 font-semibold">
                                    🔒 
                                    {AppStoreConfig?.foryou4} 
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div>
                    <ProblemStore></ProblemStore>
                </div>


                {/*
        
                <section className="bg-white py-16 px-4 border-t border-b border-gray-100">
                    <div className="max-w-5xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Los pilares de nuestro compromiso</h2>
                        <p className="text-gray-500 mt-2">La transparencia es la base de cada una de nuestras operaciones.</p>
                    </div>

                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">

                        <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Garantía Asegurada</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                ...
                            </p>
                        </div>

                        <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 00-2 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Proveedores Verificados</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                ...
                            </p>
                        </div>

                        <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Soporte Humano 24/7</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                ...
                            </p>
                        </div>
                    </div>
                </section>
                */}

                {/* 4. Call to Action */}
                <section className="py-20 px-4 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Listo para explorar el marketplace?</h2>
                    <p className="text-gray-600 max-w-xl mx-auto mb-8">
                        Descubre cientos de productos seleccionados de la comunidad..
                    </p>
                    <button onClick={ProductShop} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                        Comenzar a comprar
                    </button>
                </section>
            </div>


        </>
    );
};

export default MySite;
