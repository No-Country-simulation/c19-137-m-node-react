import React from 'react';
import Image from 'next/image';
import { Registrar } from '@/components/forms/register';
import { Login } from '@/components/forms/login';
import { FcGoogle } from "react-icons/fc";
import { TbBrandApple } from "react-icons/tb";
import Link from 'next/link';
import ForgotPassword from '@/components/forms/forgotPassword';

export default function AuthPage() {
  return (
    <div className='flex items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900'>
      <div className='grid w-full max-w-5xl lg:grid-cols-2 items-center justify-center'>
        <div className='hidden lg:flex items-center justify-center'>
          <Image src='/logos/authPage.png' alt='logo' width={360} height={182} />
        </div>
        <div className='flex flex-col items-center justify-center w-full px-4 lg:px-8'>
          <div className='w-full max-w-md mb-8'>
            <h1 className="text-4xl lg:text-[40px] font-bold text-[#3B82F6] leading-tight mb-4 text-center">
              Comparte tus lecturas y descubre nuevas historias
            </h1>
            <h2 className="text-2xl lg:text-[30px] font-normal text-[#1F2937] dark:text-white mb-8 text-center">
              Únete a nuestra comunidad
            </h2>
            <div className="flex flex-col items-center w-full gap-6">
              <button className="flex items-center justify-center w-full h-[56px] px-8 py-4 gap-2 bg-white dark:bg-gray-800 border border-[#1F2937] dark:border-gray-600 rounded-full hover:bg-[#F1F1F1] dark:hover:bg-gray-700 transition-colors duration-300">
                <FcGoogle />
                <span className="text-[#1F2937] dark:text-white font-medium">Regístrate con Google</span>
              </button>
              <button className="flex items-center justify-center w-full h-[56px] px-8 py-4 gap-2 bg-black text-white border border-black rounded-full hover:bg-[#333333] dark:bg-gray-700 dark:border-gray-600 transition-colors duration-300">
                <TbBrandApple />
                <span className="font-medium text-white">Regístrate con Apple</span>
              </button>
              <div className="w-full text-center text-[#6B7280] dark:text-gray-400 text-lg">o</div>
            </div>
          </div>
          <div className='w-full max-w-md flex justify-center items-center'>
            <div className="flex flex-col items-center w-full gap-2 justify-center">
              <div className="w-full mb-4 flex flex-col items-center justify-center">
                <Registrar />
                <div className='py-2 text-xs text-center text-[#1F2937] dark:text-gray-300'>
                  <p>Al registrarte, aceptas los Términos de servicio y la Política</p>
                  <p>de privacidad, incluida la política de Uso de Cookies</p>
                </div>
                <Login />
                <div className='w-full p-0 m-1 flex justify-center'>
                  <ForgotPassword />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
