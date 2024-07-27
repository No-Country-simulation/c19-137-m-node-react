// src/app/auth/create/page.tsx

"use client";

import React from 'react';

interface CreateAccountPageProps {
  onVerifyClick: () => void;
}

const CreateAccountPage: React.FC<CreateAccountPageProps> = ({ onVerifyClick }) => {

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
      <h1 className="font-semibold text-[25px] leading-[30px] text-center text-[#1F2937]">
        Crear una nueva cuenta
      </h1>
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md">
        <input type="text" placeholder="Nombre" className="w-full h-14 px-8 py-4 border border-[#1F2937] rounded-lg" />
        <input type="text" placeholder="Nombre de usuario" className="w-full h-14 px-8 py-4 border border-[#1F2937] rounded-lg" />
        <input type="email" placeholder="Correo electrónico" className="w-full h-14 px-8 py-4 border border-[#1F2937] rounded-lg" />
        <button
          type="button"
          onClick={onVerifyClick}
          className="w-full h-14 bg-[#F97316] rounded-full"
        >
          <span className="text-lg font-bold text-white">Verificar</span>
        </button>
        <p className="text-center text-sm font-semibold text-[#1F2937]">
          Al registrarte, aceptas los{' '}
          <a href="#" className="text-blue-600 underline">
            Términos de servicio
          </a>{' '}
          y la{' '}
          <a href="#" className="text-blue-600 underline">
            Política de privacidad
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default CreateAccountPage;
