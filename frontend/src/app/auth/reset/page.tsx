"use client";

import React, { useState } from 'react';

interface ResetPasswordPageProps {
  setPage: (page: 'home' | 'login' | 'forgot') => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ setPage }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
      <h1 className="font-semibold text-[25px] leading-[30px] text-center text-[#1F2937]">
        Restablecer contraseña
      </h1>
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md">
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Nueva contraseña"
            className="w-full h-14 px-8 py-4 border border-[#000000] rounded-lg pr-12"
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
            placeholder="Confirmar contraseña"
            className="w-full h-14 px-8 py-4 border border-[#000000] rounded-lg pr-12"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button className="w-full h-14 px-8 py-4 bg-[#F97316] rounded-full">
          <span className="text-lg font-bold text-white">Restablecer</span>
        </button>
        <button className="w-full h-14 px-8 py-4 border border-[#F97316] rounded-full" onClick={() => setPage('forgot')}>
          <span className="text-lg font-bold text-[#F97316]">Regresar</span>
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
