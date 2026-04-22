import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 mt-auto h-20">
            <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Branding */}
                <div className="flex items-center gap-2 opacity-60 grayscale">
                    <Logo className="w-6 h-6" />
                    <span className="font-bold text-slate-900 tracking-tight">APPLIK</span>
                </div>

                {/* Copyright */}
                <p className="text-slate-500 text-sm">
                    © 2026 APPLIK. Todos los derechos reservados.
                </p>

                {/* Simple Links */}
                <div className="flex gap-6 text-sm font-medium text-slate-500">
                    <Link to="/privacidad" className="hover:text-violet-600 transition-colors">Privacidad</Link>
                    <Link to="/terminos"   className="hover:text-violet-600 transition-colors">Términos</Link>
                    <Link to="/contacto"   className="hover:text-violet-600 transition-colors">Contacto</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;