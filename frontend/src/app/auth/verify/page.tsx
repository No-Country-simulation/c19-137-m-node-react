"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const VerifyAccountPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleConfirmClick = () => {
    // Lógica de confirmación de verificación
    // Redireccionar a la página de inicio o a otra página
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
      <h1 className="font-semibold text-[25px] leading-[30px] text-center text-[#1F2937]">
        Verificar Cuenta
      </h1>
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md">
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            className="w-full h-14 px-8 py-4 border border-[#1F2937] rounded-lg pr-12"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Repetir contraseña"
            className="w-full h-14 px-8 py-4 border border-[#1F2937] rounded-lg pr-12"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button
          type="button"
          onClick={handleConfirmClick}
          className="w-full h-14 bg-[#F97316] rounded-full"
        >
          <span className="text-lg font-bold text-white">Confirmar</span>
        </button>
      </div>
    </div>
  );
};

export default VerifyAccountPage;
