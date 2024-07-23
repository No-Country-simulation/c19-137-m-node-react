"use client";

import React, { useState } from 'react';

const HomePage = () => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  return (
    <div className="flex min-h-screen overflow-y-scroll bg-white relative">
      {!showCreateAccount ? (
        <>
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
                    onClick={() => setShowCreateAccount(true)}
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
                <button className="flex flex-row items-center justify-center w-full lg:w-[362px] h-[54px] px-8 py-4 border border-[#F97316] rounded-full">
                  <span className="text-lg font-bold text-[#F97316]">Iniciar sesión</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-20 p-8">
          <h1 className="text-4xl font-bold text-[#3B82F6]">Crear una nueva cuenta</h1>
          {/* Aquí puedes agregar el formulario de creación de cuenta */}
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
      )}
    </div>
  );
};

export default HomePage;
