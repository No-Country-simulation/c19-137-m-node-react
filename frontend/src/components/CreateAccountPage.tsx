"use client";

import React from 'react';

const CreateAccountPage = ({ setShowCreateAccount }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-20 p-8">
      <h1 className="text-4xl font-bold text-[#3B82F6]">Crear una nueva cuenta</h1>
      <form className="flex flex-col gap-4 w-full lg:w-[400px]">
        <input type="text" placeholder="Nombre" className="px-4 py-2 border border-[#1F2937] rounded-md" />
        <input type="email" placeholder="Correo electrónico" className="px-4 py-2 border border-[#1F2937] rounded-md" />
        <input type="password" placeholder="Contraseña" className="px-4 py-2 border border-[#1F2937] rounded-md" />
        <button type="submit" className="px-4 py-2 bg-[#F97316] text-white rounded-md">
          Crear cuenta
        </button>
      </form>
      <button
        className="mt-4 px-4 py-2 bg-[#1F2937] text-white rounded-md"
        onClick={() => setShowCreateAccount(false)}
      >
        Volver
      </button>
    </div>
  );
};

export default CreateAccountPage;
