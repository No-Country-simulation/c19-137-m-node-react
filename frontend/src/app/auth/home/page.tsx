"use client";

import React, { useState } from 'react';
import CreateAccountPage from '../create/page';
import LoginAccountPage from '../login/page';
import VerifyAccountPage from '../verify/page';
import EnterPasswordPage from '../login2/page';  
import ForgotPasswordPage from '../forgot/page';  // Importa la página de "ForgotPassword"
import ResetPasswordPage from '../reset/page';    // Importa la página de "ResetPassword"

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'create' | 'login' | 'verify' | 'enterpassword' | 'forgot' | 'reset'>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'create':
        return <CreateAccountPage onVerifyClick={() => setCurrentPage('verify')} />;
      case 'login':
        return <LoginAccountPage setPage={setCurrentPage} />;
      case 'verify':
        return <VerifyAccountPage />;
      case 'enterpassword':
        return <EnterPasswordPage />;
      case 'forgot':
        return <ForgotPasswordPage setPage={setCurrentPage} />;  // Asegúrate de pasar setPage
      case 'reset':
        return <ResetPasswordPage setPage={setCurrentPage} />;   // Asegúrate de pasar setPage
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen overflow-y-scroll bg-white relative">
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
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-center p-8 lg:relative gap-[64px]">
        <div className="flex flex-col items-start gap-8 w-full lg:w-[559px] lg:h-[155px]">
          <h1 className="text-[40px] font-bold text-[#3B82F6] leading-[49px]">
            Comparte tus lecturas y descubre nuevas historias
          </h1>
          <h2 className="text-[30px] font-normal text-[#1F2937] leading-[37px]">
            Únete a nuestra comunidad
          </h2>
        </div>
        <div className="flex flex-col items-start gap-[64px] w-full lg:w-[362px] lg:h-[437px]">
          <div className="flex flex-col items-start gap-[24px] w-full lg:w-[362px] lg:h-[287px]">
            <div className="flex flex-col items-start gap-[24px] w-full lg:w-[362px] lg:h-[172px]">
              <div className="flex flex-col items-start gap-[16px] w-full lg:w-[362px] lg:h-[126px]">
                {/* Botón de Google */}
                <button className="flex flex-row items-center justify-center w-full h-[56px] px-8 py-4 gap-2 bg-white border border-[#1F2937] rounded-full hover:bg-[#F1F1F1] transition-colors duration-300">
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
                {/* Botón de Apple */}
                <button className="flex flex-row items-center justify-center w-full h-[56px] px-8 py-4 gap-2 bg-black text-white border border-transparent rounded-full hover:bg-[#333333] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M16.365 1.43c-.895.81-2.121 1.57-3.56 1.47-.61-.032-1.163-.28-1.606-.7-.41-.39-.69-.93-.78-1.5.4-.02.8-.03 1.2-.03.99 0 1.98.23 2.86.69.57.34 1.03.78 1.41 1.3-.06.03-.1.08-.15.13zm3.76 3.26c-1.45-.01-2.64.86-3.31 1.55-.68.7-1.22 1.62-1.04 2.74.02.1.07.2.11.3.15-.02.3-.05.45-.08.96-.16 1.85-.04 2.67.34.84.38 1.54.99 2.14 1.75.18.22.34.45.49.7.37.66.65 1.37.81 2.12.11.53.17 1.07.16 1.61 0 .47-.03.94-.08 1.4-.06.47-.15.94-.27 1.4-.1.4-.28.78-.52 1.12-.28.38-.67.7-1.11.9-.54.25-1.15.38-1.77.36-.38-.01-.76-.07-1.14-.18-.3-.09-.59-.23-.85-.39-.24-.15-.5-.3-.76-.43-.54-.28-1.1-.44-1.67-.52-.75-.11-1.49-.06-2.22.14-.68.18-1.33.44-1.94.78-.3.16-.58.35-.84.57-.32.28-.68.51-1.1.64-.6.2-1.23.27-1.85.17-.52-.08-1.03-.27-1.47-.54-.43-.26-.82-.61-1.15-1.01-.3-.35-.55-.76-.74-1.2-.33-.71-.55-1.47-.65-2.24-.12-.87-.15-1.75-.11-2.63.04-.86.2-1.72.47-2.55.31-.95.76-1.87 1.3-2.74.46-.73.99-1.42 1.57-2.08.5-.59 1.05-1.12 1.65-1.6.6-.5 1.24-.91 1.92-1.24.34-.17.69-.31 1.05-.42.16-.05.33-.1.49-.13.3-.05.6-.1.91-.15.06.02.11.02.17.04 0 .02-.01.04-.01.06.11.02.23.04.34.07.34.1.67.24 1 .41.67.34 1.25.84 1.73 1.42.3.36.55.76.74 1.19.18.38.31.78.41 1.19.2.76.27 1.55.21 2.33-.03.35-.1.69-.19 1.03z"
                    />
                  </svg>
                  <span className="text-white font-medium">
                    Continuar con Apple
                  </span>
                </button>
              </div>
              {/* Línea divisoria */}
              <div className="flex flex-row items-center justify-center w-full h-[24px] text-center">
                <div className="flex-1 h-[1px] bg-[#1F2937]" />
                <span className="px-4 text-[#1F2937] font-medium">o</span>
                <div className="flex-1 h-[1px] bg-[#1F2937]" />
              </div>
            </div>
            {/* Botón de Crear Cuenta */}
            <button
              className="flex flex-row items-center justify-center w-full h-[56px] px-8 py-4 gap-2 bg-[#3B82F6] text-white border border-transparent rounded-full hover:bg-[#2264d1] transition-colors duration-300"
              onClick={() => setCurrentPage('create')}
            >
              Crear cuenta
            </button>
          </div>
          {/* Botón de Iniciar Sesión */}
          <div className="flex flex-row items-start justify-start w-full h-[86px] text-center gap-2">
            <span className="text-[#1F2937] font-medium">¿Ya tienes cuenta?</span>
            <button
              className="text-[#3B82F6] font-medium underline"
              onClick={() => setCurrentPage('login')}
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
      {currentPage !== 'home' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#F7F8F9] p-8 rounded-[32px] relative" style={{ width: '678px', height: '699px' }}>
            {renderPage()}
            <button
              className="absolute top-4 right-4 text-[#1F2937] rounded-full"
              onClick={() => setCurrentPage('home')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
