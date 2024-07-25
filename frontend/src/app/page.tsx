"use client";

import React, { useState } from 'react';
import CreateAccountPage from './CreateAccountPage';
import LoginAccountPage from './LoginAccountPage';

const HomePage = () => {
  const [page, setPage] = useState<'home' | 'create' | 'login'>('home');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const renderModal = () => {
    if (isCreateModalOpen) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#F7F8F9] p-8 rounded-[32px] relative" style={{ width: '678px', height: '699px' }}>
            <CreateAccountPage setPage={setPage} />
            <button
              className="absolute top-4 right-4 text-[#1F2937] rounded-full"
              onClick={() => setIsCreateModalOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      );
    }

    if (isLoginModalOpen) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#F7F8F9] p-8 rounded-[32px] relative" style={{ width: '678px', height: '699px' }}>
            <LoginAccountPage setPage={setPage} />
            <button
              className="absolute top-4 right-4 text-[#1F2937] rounded-full"
              onClick={() => setIsLoginModalOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      );
    }

    return null;  // Make sure there's a final return statement.
  };  // This closing brace should be present

  return (
    <div className={`flex min-h-screen overflow-y-scroll ${isCreateModalOpen || isLoginModalOpen ? 'bg-gray-300' : 'bg-white'} relative`}>
      {/* Sección del 50% - Imagen */}
      <div className="relative w-1/2 flex items-center justify-center lg:block hidden">
        <div
          className="absolute w-[358.29px] h-[182px]"
          style={{
            left: '180px',
            top: 'calc(50% - 182px / 2 - 0.5px)',
            backgroundImage: 'url(https://s3-alpha-sig.figma.com/img/2efe/6572/e3e6600884d44873a6751036e1062436?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Es98cPAdZM~FvpdI25Op-~RvyJFk2srfp96pEbNJP593fdXrt~1nhhAC-YmcGPxWeVGi2O~~C3FepfD4Hwg5Y48slXqGA8ETdgmr~-osXd4Aj3ENaJhWwEdliS16Wlho8UyoRUkc6JAUwDooInBlLbNgcICINukBGTkdSjC98gEGQA4ggjBisDydYT~1O0MvvcWJCQo~0644F2kpA0AnufGmmaOAc7nwqsnaFq4Xam7nVOt-Kvb1EOV76Olwf~UsmxU-W3cUWGCbPL-nTWGkX6PTc96TTu5wX0F246x8CYv4CJ6TJy-8wZwX5mDb6NPgsKDCQ99X0f0bQRcGdA8Jwg__)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
      {/* Sección del 50% - Contenido */}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-20 p-8 lg:relative">
        <div className="flex flex-col items-start gap-8 w-full lg:w-[559px] lg:h-[155px]">
          <h1 className="text-4xl lg:text-[40px] font-bold text-[#3B82F6] leading-tight">
            Comparte tus lecturas y descubre nuevas historias
          </h1>
          <h2 className="text-2xl lg:text-[30px] font-normal text-[#1F2937]">
            Únete a nuestra comunidad
          </h2>
        </div>
        <div className="flex flex-col items-start gap-16 w-full lg:w-[362px] lg:h-[437px]">
          <div className="flex flex-col items-start gap-6 w-full lg:w-[362px] lg:h-[287px]">
            <div className="flex flex-col items-start gap-6 w-full lg:w-[362px] lg:h-[172px]">
              <div className="flex flex-col items-start gap-4 w-full lg:w-[362px] lg:h-[126px]">
                <button className="flex flex-row items-center justify-center w-full lg:w-[362px] h-[56px] px-8 py-4 gap-2 bg-white border border-[#1F2937] rounded-full">
                  <img src="/path-to-google-icon.png" alt="Google Icon" className="w-6 h-6" />
                  <span className="text-lg font-semibold text-[#1F2937]">Registrarse con Google</span>
                </button>
                <button className="flex flex-row items-center justify-center w-full lg:w-[362px] h-[54px] px-8 py-4 gap-2 bg-white border border-[#1F2937] rounded-full">
                  <img src="/path-to-apple-icon.png" alt="Apple Icon" className="w-6 h-5" />
                  <span className="text-lg font-semibold text-[#1F2937]">Registrarse con Apple</span>
                </button>
              </div>
              <div className="flex flex-row items-center gap-3 w-full lg:w-[362px] lg:h-[22px]">
                <hr className="w-[168.5px] border border-[#D9D9D9]" />
                <span className="text-xl font-medium text-[#000000]">o</span>
                <hr className="w-[154px] border border-[#D9D9D9]" />
              </div>
              <button
                className="flex flex-row items-center justify-center w-full lg:w-[362px] h-[54px] px-8 py-4 bg-[#F97316] rounded-full"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <span className="text-lg font-bold text-white">Crear cuenta</span>
              </button>
              <p className="text-xs text-[#000000]">
                Al registrarte, aceptas los Términos de servicio y la Política de privacidad, incluida la política de Uso de Cookies
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 w-full lg:w-[362px] lg:h-[86px]">
            <span className="text-xl font-semibold text-[#1F2937]">
              ¿Ya tienes una cuenta?
            </span>
            <button
              className="flex flex-row items-center justify-center w-full lg:w-[362px] h-[54px] px-8 py-4 border border-[#F97316] rounded-full"
              onClick={() => setIsLoginModalOpen(true)}
            >
              <span className="text-lg font-bold text-[#F97316]">Iniciar sesión</span>
            </button>
          </div>
        </div>
      </div>
      {renderModal()}
    </div>
  );
};

export default HomePage;
