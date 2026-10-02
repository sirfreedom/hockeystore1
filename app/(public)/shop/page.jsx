'use client'
import { Suspense } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Find } from '@/Api/ProductHelper';
import { TreeMenu } from '@/Api/CategoryHelper';
import { SelectedTreeMenu } from '@/Api/ProductHelper';
import Link from 'next/link';
import { encriptarId } from '@/Api/HashHelper';
import React from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';

function ShopContent() {

  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const [Categories, setCategories] = useState([]);
  const [Products, setProducts] = useState([]);

  const TreeMenuFill = (id) => {
    
    SelectedTreeMenu(id).then(data => {
      setProducts(data);
    });

  }

  useEffect(() => {

    TreeMenu().then(data => {
      setCategories(data);
    });

  }, []);


  useEffect(() => {

    Find(searchTerm).then(data => {
      setProducts(data);
    });

  }, [searchTerm]);

  return (
    <>

      <div className="w-[100%] mx-auto py-8">

        <div className="flex flex-col md:flex-row gap-6">

          <div className="w-full md:w-[30%] bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Categoria de productos Activos</h2>
            <div>

              <Box sx={{ minHeight: 352, minWidth: 250 }}    >
                <RichTreeView items={Categories}
                  onItemExpansionToggle={(event, itemId, isExpanded) => {
                    //if(isExpanded)
                    //{
                    //    console.log(itemId);
                    //}

                  }}
                  onSelectedItemsChange={(event, itemId) => {
                    if (!itemId) return;

                    // Función recursiva para encontrar el nodo en el árbol
                    const findNode = (nodes, id) => {
                      for (const node of nodes) {
                        if (node.id === id) return node;
                        if (node.children) {
                          const childNode = findNode(node.children, id);
                          if (childNode) return childNode;
                        }
                      }
                      return null;
                    };

                    const clickedNode = findNode(Categories, itemId);

                    if (clickedNode) {
                      // Verificamos si tiene la propiedad children y si tiene elementos
                      const isParent = clickedNode.children && clickedNode.children.length > 0;

                      if (isParent) {
                        //console.log("Tocaste un PADRE:", clickedNode.label);
                      } 
                      if (!isParent) 
                      {
                          TreeMenuFill(clickedNode.id);
                      }
                    }
                  }}

                />
              </Box>

            </div>

          </div>

          {/* PARTE DERECHA (70%) */}
          <div className="w-full md:w-[70%]">
            <div className="mb-6">
              <h1 className="text-3xl text-slate-500">
                <span className="text-slate-800 font-bold">Productos en Stock</span>
              </h1>
              <p className="text-slate-400 text-sm"></p>
            </div>

            <div className="bg-white shadow-md border border-slate-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">

                {Products?.length > 0 ? (

                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Producto</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Precio</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Stock</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Estado</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden sm:table-cell">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {Products?.map((product) => (
                        <tr key={product?.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link href={`/product/${encriptarId(product.id)}`} className='group max-xl:mx-auto'>
                              <div className="flex items-center gap-4">
                                <div className="h-12 w-12 flex-shrink-0">
                                  <Image
                                    width={48}
                                    height={48}
                                    className='h-full w-full object-cover rounded-lg border border-slate-200 shadow-sm'
                                    src={product?.imgtext}
                                    alt={product?.descriptiontext}
                                  />
                                </div>
                                <div className="text-sm font-medium text-slate-900">{product.productname}</div>
                              </div>
                            </Link>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-700">
                            {currency} {product?.price.toLocaleString()}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            {product?.quantity} {product?.quantity > 1 ? 'unidades' : 'unidad'}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {product?.isnew ? (
                              <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Nuevo</span>
                            ) : (
                              <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Usado</span>
                            )}
                          </td>

                          <td>
                            <Link
                              href={`/product/${encriptarId(product.id)}`}
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-200 group text-center whitespace-nowrap"
                            >
                              Ver detalles
                              <svg
                                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                ) : (
                  <div className="flex h-[60vh] flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-slate-100 p-6 mb-4">
                      <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h1 className="text-2xl font-semibold text-slate-900">El resultado de la búsqueda es vacío</h1>
                    <p className="text-slate-500 mt-2"> Podes buscar en la barra principal de la pagina, o en el arbol de productos disponibles a tu izquierda.
                      Si no encontras... Animate a publicar algo.
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>



    </>
  )
}


export default function Shop() {
  return (
    <Suspense fallback={<div>Cargando shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}