"use client";

import React from 'react';

interface ForgotPasswordPageProps {
  setPage: (page: 'home' | 'login' | 'reset') => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ setPage }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
      <h1 className="font-semibold text-[25px] leading-[30px] text-center text-[#1F2937]">
        Recuperar contraseña
      </h1>
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md">
        <input type="email" placeholder="Correo electrónico" className="w-full h-14 px-8 py-4 border border-[#000000] rounded-lg" />
        <button className="w-full h-14 px-8 py-4 bg-[#F97316] rounded-full" onClick={() => setPage('reset')}>
          <span className="text-lg font-bold text-white">Siguiente</span>
        </button>
        <button className="w-full h-14 px-8 py-4 border border-[#F97316] rounded-full" onClick={() => setPage('login')}>
          <span className="text-lg font-bold text-[#F97316]">Regresar</span>
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
