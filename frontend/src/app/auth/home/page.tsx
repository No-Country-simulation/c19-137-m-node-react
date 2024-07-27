"use client";

import React, { useState } from 'react';
import CreateAccountPage from '../create/page';
import LoginAccountPage from '../login/page';
import VerifyAccountPage from '../verify/page';

const HomePage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  const renderModal = () => {
    if (isVerifyModalOpen) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#F7F8F9] p-8 rounded-[32px] relative" style={{ width: '678px', height: '699px' }}>
            <VerifyAccountPage />
            <button
              className="absolute top-4 right-4 text-[#1F2937] rounded-full"
              onClick={() => setIsVerifyModalOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      );
    }

    if (isCreateModalOpen) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#F7F8F9] p-8 rounded-[32px] relative" style={{ width: '678px', height: '699px' }}>
            <CreateAccountPage onVerifyClick={() => { setIsCreateModalOpen(false); setIsVerifyModalOpen(true); }} />
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
            <LoginAccountPage />
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

    return null; // Make sure there's a final return statement.
  };

  return (
    <div className={`flex min-h-screen overflow-y-scroll ${isCreateModalOpen || isLoginModalOpen || isVerifyModalOpen ? 'bg-gray-300' : 'bg-white'} relative`}>
      {/* Sección del 50% - Imagen */}
      <div className="relative w-1/2 flex items-center justify-center lg:block hidden">
        <div
          className="absolute w-[358.29px] h-[182px]"
          style={{
            left: '180px',
            top: 'calc(50% - 182px / 2 - 0.5px)',
            backgroundImage: "url('https://s3-alpha-sig.figma.com/img/2efe/6572/e3e6600884d44873a6751036e1062436?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Es98cPAdZM~FvpdI25Op-~RvyJFk2srfp96pEbNJP593fdXrt~1nhhAC-YmcGPxWeVGi2O~~C3FepfD4Hwg5Y48slXqGA8ETdgmr~-osXd4Aj3ENaJhWwEdliS16Wlho8UyoRUkc6JAUwDooInBlLbNgcICINukBGTkdSjC98gEGQA4ggjBisDydYT~1O0MvvcWJCQo~0644F2kpA0AnufGmmaOAc7nwqsnaFq4Xam7nVOt-Kvb1EOV76Olwf~UsmxU-W3cUWGCbPL-nTWGkX6PTc96TTu5wX0F246x8CYv4CJ6TJy-8wZwX5mDb6NPgsKDCQ99X0f0bQRcGdA8Jwg__')",
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
                {/* Botón de Google */}
                <button className="flex flex-row items-center justify-center w-full lg:w-[362px] h-[56px] px-8 py-4 gap-2 bg-white border border-[#1F2937] rounded-full hover:bg-[#F1F1F1] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
                    <path fill="#4285F4" d="M24 9.5c2.2 0 4.2 0.8 5.8 2.2l4.3-4.3c-3.1-2.9-7.3-4.6-10.1-4.5C13.6 3 8.2 8.5 8.2 15.3s5.3 12.3 12.2 12.3c4.7 0 9-1.8 12.2-4.6v-5.2H24v4.2h7.5c-1.7 4.1-5.4 6.9-10.5 6.9-6.3 0-11.5-5.1-11.5-11.5s5.1-11.5 11.5-11.5z" />
                    <path fill="#34A853" d="M8.2 27.8c-0.2 0.9-0.3 1.8-0.3 2.8s0.1 1.9 0.3 2.8l6.3-2.8c-0.3-1-0.5-2.1-0.5-3.3s0.2-2.3 0.5-3.3L8.2 15c-0.2 0.9-0.3 1.8-0.3 2.8s0.1 1.9 0.3 2.8z" />
                    <path fill="#FBBC05" d="M24 10.5c1.7 0 3.2 0.5 4.5 1.3l3.3-3.3c-2-1.7-4.6-2.8-7.8-2.8-5.4 0-10.1 3.4-12.1 8.1l3.3 3.3c0.9-2.6 3-4.4 5.8-4.4z" />
                    <path fill="#EA4335" d="M36.4 14.5l-3.3 3.3c1.6 2.8 2.7 6.2 2.7 10s-1.1 7.2-2.7 10l3.3 3.3c2.3-3.5 3.6-7.8 3.6-12.3s-1.3-8.8-3.6-12.3z" />
                  </svg>
                  <span className="text-[#1F2937] font-medium">Regístrate con Google</span>
                </button>
                {/* Botón de Apple */}
                <button className="flex flex-row items-center justify-center w-full lg:w-[362px] h-[56px] px-8 py-4 gap-2 bg-black text-white border border-black rounded-full hover:bg-[#333333] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                    <path fill="currentColor" d="M16.7 1.4c-1 0.1-2.2 0.7-2.9 1.6-0.6 0.8-1.1 2-0.9 3.1 1.1 0.1 2.3-0.5 3-1.5 0.7-0.9 1.1-2.1 0.8-3.2zM12 6.5C10.6 6.5 9 7.5 8 9.1c-2.2 3.1-1.8 8.8 1.5 11.3 0.9 0.7 1.9 1 2.5 1 0.6 0 1.4-0.3 2.4-0.9 1-0.6 1.4-0.9 2.5-0.9 1.1 0 1.6 0.3 2.5 0.9 1 0.6 1.8 0.9 2.4 0.9 0.6 0 1.6-0.3 2.5-1 2.1-1.6 2.9-4.1 2.9-6.4 0-4.2-3.2-6.5-6.4-6.5z" />
                  </svg>
                  <span className="text-white font-medium">Regístrate con Apple</span>
                </button>
              </div>
              <div className="w-full text-center text-[#6B7280] text-lg">o</div>
            </div>
            {/* Botón de creación de cuenta */}
            <button
              className="w-full lg:w-[362px] h-[56px] bg-[#3B82F6] text-white font-medium rounded-full hover:bg-[#2563EB] transition-colors duration-300"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Crear una cuenta
            </button>
          </div>
          {/* Botón de inicio de sesión */}
          <button
            className="w-full lg:w-[362px] h-[56px] bg-[#1F2937] text-white font-medium rounded-full hover:bg-[#111827] transition-colors duration-300"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
      {renderModal()}
    </div>
  );
};

export default HomePage;
