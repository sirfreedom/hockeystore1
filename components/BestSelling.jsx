'use client'
import Title from '@/components/Title'
import ProductCard from '@/components/ProductCard'
import { useEffect, useState } from "react"
import { NewProducts } from '@/Api/ProductHelper'


const BestSelling = () => {

    const [Products, setProducts] = useState([]);

    useEffect(() => {
        
        NewProducts().then(data => {
            setProducts(data);
        });
        
    }, []);


    return (
        <div className='px-6 my-30 max-w-6xl mx-auto'>
            <Title title='Nuevos productos' description={'Mostrando ' + Products?.length + ' Productos' }  href='/shop' />
            
            <div className='mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between'>
            
                {Products?.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
                
            </div>
        </div>
    )
}

export default BestSelling