import React from 'react';

interface LoginAccountPageProps {
  setPage: (page: 'home' | 'create' | 'login') => void;
}

const LoginAccountPage: React.FC<LoginAccountPageProps> = ({ setPage }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
      <h1 className="font-semibold text-[25px] leading-[30px] text-center text-[#1F2937]">
        Iniciar sesión
      </h1>
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md">
        <button className="flex items-center justify-center w-full h-14 gap-2 bg-white border border-[#1F2937] rounded-full">
          <img src="/path-to-google-icon.png" alt="Google Icon" className="w-6 h-6" />
          <span className="text-lg font-semibold text-[#1F2937]">Iniciar sesión con Google</span>
        </button>
        <button className="flex items-center justify-center w-full h-14 gap-2 bg-white border border-[#1F2937] rounded-full">
          <img src="/path-to-apple-icon.png" alt="Apple Icon" className="w-6 h-5" />
          <span className="text-lg font-semibold text-[#1F2937]">Iniciar sesión con Apple</span>
        </button>
        <div className="flex items-center gap-3 w-full">
          <hr className="flex-grow border border-[#D9D9D9]" />
          <span className="text-xl font-medium text-[#000000]">o</span>
          <hr className="flex-grow border border-[#D9D9D9]" />
        </div>
        <input type="text" placeholder="Teléfono, Correo electrónico o nombre de usuario" className="w-full h-14 px-8 py-4 border border-[#000000] rounded-lg" />
        <button className="w-full h-14 px-8 py-4 bg-[#F97316] rounded-full">
          <span className="text-lg font-bold text-white">Siguiente</span>
        </button>
        <button className="w-full h-14 px-8 py-4 border border-[#F97316] rounded-full">
          <span className="text-lg font-bold text-[#F97316]">¿Olvidaste tu contraseña?</span>
        </button>
        <p className="text-center text-sm font-semibold text-[#1F2937]">
          ¿No tienes cuenta?{' '}
          <a href="#" className="text-blue-600 underline" onClick={() => setPage('create')}>
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginAccountPage;
