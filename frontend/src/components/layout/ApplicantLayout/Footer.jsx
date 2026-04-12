import React from 'react';
import Logo from '@/components/ui/Logo';// Adjust path if needed

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
                    <a href="#" className="hover:text-purple-light transition-colors">Privacidad</a>
                    <a href="#" className="hover:text-purple-light transition-colors">Términos</a>
                    <a href="#" className="hover:text-purple-light transition-colors">Contacto</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;