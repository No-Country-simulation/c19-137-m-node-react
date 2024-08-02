import React from 'react';
import Image from 'next/image';
import { Registrar } from '@/components/forms/register';
import { Login } from '@/components/forms/login';
import { FcGoogle } from "react-icons/fc";
import { TbBrandApple } from "react-icons/tb";
import ForgotPassword from '@/components/forms/forgotPassword';

export default function AuthPage() {
  return (
    <div className='flex items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900'>
      <div className='grid items-center justify-center w-full max-w-5xl lg:grid-cols-2'>
        <div className='items-center justify-center hidden lg:flex'>
          <Image src='/logos/authPage.png' alt='logo' width={360} height={182} />
        </div>
        <div className='flex flex-col items-center justify-center w-full px-4 lg:px-8'>
          <div className='w-full max-w-md mb-8'>
            <div className="flex flex-col items-start w-full gap-4 lg:gap-6">
              <h1
                className="text-3xl lg:text-[36px] font-bold text-[#3B82F6] leading-snug"
                style={{ fontFamily: 'Montserrat' }}
              >
                Comparte tus lecturas y descubre nuevas historias
              </h1>
              <h2
                className="text-xl lg:text-[28px] font-normal text-[#1F2937] dark:text-white"
                style={{ fontFamily: 'Montserrat' }}
              >
                Únete a nuestra comunidad
              </h2>
            </div>
            <div className="flex flex-col items-center w-full gap-6 mt-6 lg:mt-8">
              <button className="flex items-center justify-center w-full h-[56px] px-8 py-4 gap-2 bg-white dark:bg-gray-800 border border-[#1F2937] dark:border-gray-600 rounded-full hover:bg-[#F1F1F1] dark:hover:bg-gray-700 transition-colors duration-300">
                <FcGoogle />
                <span className="text-[#1F2937] dark:text-white font-medium">Regístrate con Google</span>
              </button>
              <button className="flex items-center justify-center w-full h-[56px] px-8 py-4 gap-2 bg-black text-white border border-black rounded-full hover:bg-[#333333] dark:bg-gray-700 dark:border-gray-600 transition-colors duration-300">
                <TbBrandApple />
                <span className="font-medium text-white">Regístrate con Apple</span>
              </button>
              <div 
                className="flex items-center justify-center w-full gap-3 text-[#6B7280] dark:text-gray-400 text-lg"
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  height: '22px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 'none',
                  order: 1,
                  alignSelf: 'stretch',
                  flexGrow: 0,
                  padding: '0 32px'
                }}
              >
                <div style={{ flex: 1, height: '1px', backgroundColor: '#6B7280' }}></div>
                <span>o</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#6B7280' }}></div>
              </div>
            </div>
            <br />
            <div className='flex justify-center w-full mt-2'>
              <ForgotPassword />
            </div>
            <div className='w-full mt-6'>
              <Login />
            </div>
        
            <div className='w-full mt-6'>
              <Registrar />
            </div>
            <div className='py-2 text-xs text-center text-[#1F2937] dark:text-gray-300 mt-4'>
              <p>Al registrarte, aceptas los Términos de servicio y la Política</p>
              <p>de privacidad, incluida la política de Uso de Cookies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}