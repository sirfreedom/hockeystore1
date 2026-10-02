'use client'
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Get } from "@/Api/ProductHelper";
import { GetRates } from "@/Api/RateHelper" 
import { GetImages } from "@/Api/ProductHelper";
import { desencriptarId } from '@/Api/HashHelper';
import Loading from "@/components/Loading";
import { toast } from "react-hot-toast";

export default function Product() {

    const { productId } = useParams();
    const [loading, setLoading] = useState(true);
    const [ProductStore,setProductStore] = useState();
    const [Rates, setRates] = useState([]);
    const [Images, setImages] = useState([]);
    const hashId = productId; // El ID encriptado que recibimos de la URL
    const decryptedId = desencriptarId(hashId); // Desencriptamos el ID para obtener el ID original

 useEffect(() => 
    {
        setLoading(true);  
        
        if(decryptedId === '')
        {
            toast.error('El codigo no es correcto');
            setLoading(false); 
            return;
        }   

        GetRates(decryptedId).then(data => {
            setRates(data);
        });

        Get(decryptedId).then(data => {
           setProductStore(data);
        });
        
        GetImages(decryptedId).then(data => {
            setImages(data);
        });


        setLoading(false);  
        
        
    }, []);


    if (loading) return <Loading />

    return (
        <div className="mx-6">
            <div className="max-w-7xl mx-auto">
                {/* Product Details */}
                {ProductStore && (<ProductDetails productstore={ProductStore} images={Images} />)}

                {/* Description & Reviews */}
                {ProductStore && (<ProductDescription productstore={ProductStore} Rates={Rates}  />)}
            </div>
        </div>
    );
}