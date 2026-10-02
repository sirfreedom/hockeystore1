'use client'
import React, { useState } from 'react';
import { Plus, Trash2, Layers } from 'lucide-react';

const Notifications = () => {

    const MAX_CATEGORIAS = 6;

    const CATEGORIAS_DISPONIBLES = [
        'Tecnología',
        'Diseño',
        'Marketing',
        'Programación',
        'Finanzas',
        'Recursos Humanos',
        'Ventas',
        'Soporte',
    ];


    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');

    const agregarCategoria = (e) => {
        e.preventDefault();

        if (!categoriaActual) {
            setError('Por favor, selecciona una categoría.');
            return;
        }

        if (!descripcion.trim()) {
            setError('Ingresa una descripción para la categoría.');
            return;
        }

        if (categoriasSeleccionadas.length >= MAX_CATEGORIAS) {
            setError(`Alcanzaste el límite de ${MAX_CATEGORIAS} categorías.`);
            return;
        }

        const nueva = {
            id: Date.now(),
            nombre: categoriaActual,
            descripcion: descripcion.trim(),
        };

        setCategoriasSeleccionadas([...categoriasSeleccionadas, nueva]);
        setCategoriaActual('');
        setDescripcion('');
        setError('');
    };

    const eliminarCategoria = (id) => {
        setCategoriasSeleccionadas(categoriasSeleccionadas.filter((cat) => cat.id !== id));
        setError('');
    };

    // Filtrar o deshabilitar opciones ya seleccionadas
    const estaSeleccionada = (nombre) =>
        categoriasSeleccionadas.some((cat) => cat.nombre === nombre);

    return (
        <>
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-indigo-600" /> Categorías
                    </h2>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {categoriasSeleccionadas.length} / {MAX_CATEGORIAS}
                    </span>
                </div>

                <form onSubmit={agregarCategoria} className="space-y-3 mb-6">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Categoría
                        </label>
                        <select
                            value={categoriaActual}
                            onChange={(e) => {
                                setCategoriaActual(e.target.value);
                                if (error) setError('');
                            }}
                            disabled={categoriasSeleccionadas.length >= MAX_CATEGORIAS}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:bg-gray-50 bg-white"
                        >
                            <option value="">-- Selecciona una categoría --</option>
                            {CATEGORIAS_DISPONIBLES.map((cat) => (
                                <option key={cat} value={cat} disabled={estaSeleccionada(cat)}>
                                    {cat} {estaSeleccionada(cat) ? '(Ya agregada)' : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Texto que busca en esa categoria ej SENIOR, ROJO, REJA 
                        </label>
                        <textarea
                            rows="2"
                            value={descripcion}
                            onChange={(e) => {
                                setDescripcion(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder="Escriba un criterio de busqueda en esa categoria"
                            disabled={categoriasSeleccionadas.length >= MAX_CATEGORIAS}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:bg-gray-50 resize-none"
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs">{error}</p>}

                    <button
                        type="submit"
                        disabled={categoriasSeleccionadas.length >= MAX_CATEGORIAS}
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Agregar Categoría
                    </button>
                </form>

                <ul className="space-y-3">
                    {categoriasSeleccionadas.map((cat) => (
                        <li
                            key={cat.id}
                            className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-start gap-3"
                        >
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-800">{cat.nombre}</h4>
                                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                                    {cat.descripcion}
                                </p>
                            </div>
                            <button
                                onClick={() => eliminarCategoria(cat.id)}
                                className="text-gray-400 hover:text-red-500 p-1 rounded-md transition-colors"
                                title="Eliminar"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Notifications;