'use client'
import React, { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';

const UserPass = () => {

    const [user, setUser] = useState({
        password: '',
        confirmPassword: ''
    });

    // Estados para ocultar/mostrar cada contraseña
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Estados para el feedback de validación
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
        setError('');
        setSuccess(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de coincidencia
        if (user.password !== user.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setError('');
        setSuccess(true);
    };


    return (
        <>

            <div className="w-full bg-white text-slate-800">

                {/* Cabecera */}
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                    <User size={22} className="text-blue-600" />
                    Cambio de password
                </h3>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Doble campo de Contraseña */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-slate-300 rounded-lg pl-4 pr-12 py-2.5 text-slate-600 font-medium focus:outline-none focus:border-blue-500 tracking-wide"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                Confirmar Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={user.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-slate-300 rounded-lg pl-4 pr-12 py-2.5 text-slate-600 font-medium focus:outline-none focus:border-blue-500 tracking-wide"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Botón de envío */}
                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
                        >
                            Guardar Perfil
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
};

export default UserPass;
