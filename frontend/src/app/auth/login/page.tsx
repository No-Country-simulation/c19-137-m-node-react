"use client";

import React from 'react';

interface LoginAccountPageProps {
  setPage: (page: 'home' | 'create' | 'login' | 'enterpassword' | 'verify' | 'forgot' | 'reset') => void;
}

const LoginAccountPage: React.FC<LoginAccountPageProps> = ({ setPage }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
      <h1 className="font-semibold text-[25px] leading-[30px] text-center text-[#1F2937]">
        Iniciar sesión
      </h1>
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md">
        <input type="email" placeholder="Correo electrónico" className="w-full h-14 px-8 py-4 border border-[#000000] rounded-lg" />
        <input type="password" placeholder="Contraseña" className="w-full h-14 px-8 py-4 border border-[#000000] rounded-lg" />
        <button className="w-full h-14 px-8 py-4 bg-[#F97316] rounded-full" onClick={() => setPage('enterpassword')}>
          <span className="text-lg font-bold text-white">Iniciar sesión</span>
        </button>
        <button className="w-full h-14 px-8 py-4 border border-[#F97316] rounded-full" onClick={() => setPage('forgot')}>
          <span className="text-lg font-bold text-[#F97316]">¿Olvidaste tu contraseña?</span>
        </button>
      </div>
    </div>
  );
};

export default LoginAccountPage;
