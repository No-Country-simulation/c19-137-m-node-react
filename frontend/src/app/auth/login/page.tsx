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
        <button className="flex items-center justify-center w-full h-[56px] px-8 py-4 gap-2 bg-white border border-[#1F2937] rounded-full hover:bg-[#F1F1F1] transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M23.73 12.14c0-.77-.07-1.53-.18-2.27H12v4.3h6.6c-.29 1.48-1.11 2.73-2.35 3.58v3h3.81c2.24-2.07 3.57-5.12 3.57-8.61z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.96-1.07 7.95-2.88l-3.81-3c-1.08.72-2.43 1.14-4.14 1.14-3.18 0-5.87-2.15-6.84-5.04H1.29v3.11C3.27 21.3 7.3 24 12 24z"
            />
            <path
              fill="#4A90E2"
              d="M5.16 14.22C4.86 13.5 4.68 12.71 4.68 12s.18-1.5.48-2.22V6.67H1.29C.47 8.3 0 10.11 0 12s.47 3.7 1.29 5.33l3.87-3.11z"
            />
            <path
              fill="#FBBC05"
              d="M12 4.8c1.77 0 3.34.61 4.58 1.81l3.43-3.42C17.96 1.08 15.24 0 12 0 7.3 0 3.27 2.7 1.29 6.67l3.87 3.11C6.13 6.95 8.82 4.8 12 4.8z"
            />
          </svg>
          <span className="text-[#1F2937] font-medium">
            Continuar con Google
          </span>
        </button>
        <button className="flex items-center justify-center w-full h-[56px] px-8 py-4 gap-2 bg-[#000000] text-white border border-transparent rounded-full hover:bg-[#333333] transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path
              d="M16.365 1.43c-.946-.043-2.053.592-2.715 1.3-.587.623-1.09 1.616-.954 2.586.996.077 2.057-.525 2.683-1.248.573-.616 1.013-1.594.986-2.638zM20.798 8.595c-.965-.116-1.813.495-2.405.495-.631 0-1.44-.465-2.38-.453-.122 1.065.36 2.12.964 2.801.612.69 1.329 1.155 2.164 1.131.678-.014.938-.218 1.759-.218.81 0 1.047.218 1.749.205.719-.012 1.17-.565 1.619-1.263-.048-.029-1.581-.636-1.611-2.683zM18.442 5.265c.587-.696 1.04-1.672.928-2.655-.895.033-1.969.607-2.611 1.326-.571.646-1.084 1.63-.947 2.57 1.043.042 2.037-.528 2.63-1.241zM13.557 8.71c-.485-.557-1.191-.985-2.009-.985-.792 0-1.529.453-2.014.453-.485 0-1.257-.441-2.064-.429-.837.012-1.619.488-2.14 1.179-.877 1.164-1.182 3.36-.482 5.267.406 1.045.967 2.11 1.7 2.105.666-.005.924-.421 1.716-.421.792 0 1.027.421 1.714.421.702-.012 1.144-.995 1.547-2.03.407-1.05.577-2.071.589-2.117-.012-.048-2.022-.793-2.033-3.139z"
            />
          </svg>
          <span className="text-white font-medium">
            Continuar con Apple
          </span>
        </button>
        <div className="flex flex-row items-center gap-12 w-full h-[22px]">
          <div className="flex-1 h-[1px] bg-[#1F2937]" />
          <span className="text-[#1F2937] font-medium">o</span>
          <div className="flex-1 h-[1px] bg-[#1F2937]" />
        </div>
        <input type="text" placeholder="Teléfono, Correo electrónico o nomb." className="w-full h-14 px-8 py-4 border border-[#000000] rounded-lg" />
        <button className="w-full h-14 px-8 py-4 bg-[#F97316] rounded-full" onClick={() => setPage('enterpassword')}>
          <span className="text-lg font-bold text-white">Iniciar sesión</span>
        </button>
        <button className="w-full h-14 px-8 py-4 border border-[#F97316] rounded-full" onClick={() => setPage('forgot')}>
          <span className="text-lg font-bold text-[#F97316]">¿Olvidaste tu contraseña?</span>
        </button>
        <div className="text-center">
          <span className="text-[#1F2937]">
            ¿No tienes cuenta?{' '}
            <button
              className="text-[#F97316] font-bold underline"
              onClick={() => setPage('create')}
            >
              Regístrate
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginAccountPage;
