import React from 'react';

interface CreateAccountPageProps {
  setPage: (page: 'home' | 'create' | 'login') => void;
}

const CreateAccountPage: React.FC<CreateAccountPageProps> = ({ setPage }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
      <h1 className="font-semibold text-[25px] leading-[30px] text-center text-[#1F2937]">
        Crear una nueva cuenta
      </h1>
      <form className="flex flex-col items-center justify-center gap-6 w-full max-w-md">
        <input type="text" placeholder="Nombre" className="w-full px-4 py-2 border border-[#1F2937] rounded-md" />
        <input type="email" placeholder="Correo electrónico" className="w-full px-4 py-2 border border-[#1F2937] rounded-md" />
        <input type="password" placeholder="Contraseña" className="w-full px-4 py-2 border border-[#1F2937] rounded-md" />
        <input type="password" placeholder="Confirmar contraseña" className="w-full px-4 py-2 border border-[#1F2937] rounded-md" />
        <button type="submit" className="w-full px-4 py-2 bg-[#F97316] text-white rounded-md">
          Registrarse
        </button>
      </form>
      <p className="text-sm text-center text-[#1F2937]">
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
  );
};

export default CreateAccountPage;
