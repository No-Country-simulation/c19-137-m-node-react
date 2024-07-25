import React from 'react';

type LoginAccountPageProps = {
  setPage: React.Dispatch<React.SetStateAction<'home' | 'create' | 'login'>>;
};

const LoginAccountPage: React.FC<LoginAccountPageProps> = ({ setPage }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative">
      <div 
        className="absolute bg-[#F7F8F9] rounded-[32px]" 
        style={{ width: '678px', height: '699px', left: 'calc(50% - 678px/2)', top: 'calc(50% - 699px/2 - 2px)' }}
      >
        <div 
          className="flex flex-col items-center justify-center gap-[32px]" 
          style={{ width: '362px', height: '549px', position: 'absolute', left: 'calc(50% - 362px/2)', top: 'calc(50% - 549px/2 + 0.5px)' }}
        >
          <h1 
            className="font-semibold text-[25px] leading-[30px] text-center text-[#1F2937]" 
            style={{ width: '362px', height: '30px' }}
          >
            Inicia sesión
          </h1>
          <div className="flex flex-col items-start gap-[24px]" style={{ width: '362px', height: '438px' }}>
            <div className="flex flex-col items-start gap-[24px]" style={{ width: '362px', height: '172px' }}>
              <button className="flex flex-row items-center justify-center w-full h-[56px] px-8 py-4 gap-2 bg-white border border-[#1F2937] rounded-full">
                <img src="/path-to-google-icon.png" alt="Google Icon" className="w-6 h-6" />
                <span className="text-lg font-semibold text-[#1F2937]">Iniciar sesión con Google</span>
              </button>
              <button className="flex flex-row items-center justify-center w-full h-[54px] px-8 py-4 gap-2 bg-white border border-[#1F2937] rounded-full">
                <img src="/path-to-apple-icon.png" alt="Apple Icon" className="w-6 h-5" />
                <span className="text-lg font-semibold text-[#1F2937]">Iniciar sesión con Apple</span>
              </button>
            </div>
            <div className="flex flex-row items-center gap-3 w-full h-[22px]">
              <hr className="w-[168.5px] border border-[#D9D9D9]" />
              <span className="text-xl font-medium text-[#000000]">o</span>
              <hr className="w-[154px] border border-[#D9D9D9]" />
            </div>
            <div className="flex flex-col items-start gap-[48px]" style={{ width: '362px', height: '242px' }}>
              <div className="flex flex-row items-center justify-center px-10 py-4 gap-2 border border-[#000000] rounded-md" style={{ height: '54px' }}>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="flex-grow font-semibold text-[#1F2937] text-[18px] leading-[22px] focus:outline-none"
                  style={{ height: '22px' }}
                />
              </div>
              <button 
                type="submit" 
                className="relative flex items-center justify-center px-8 py-4 bg-[#F97316] rounded-full text-white font-bold mt-4" 
                style={{ width: '362px', height: '54px' }}
              >
                Siguiente
              </button>
              <button 
                className="relative flex items-center justify-center px-8 py-4 border border-[#F97316] rounded-full text-[#F97316] font-bold" 
                style={{ width: '362px', height: '54px' }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <p className="text-center font-semibold text-[#1F2937] mt-4" style={{ width: '362px', height: '17px', fontSize: '14px' }}>
              ¿No tienes cuenta? <a href="/register" className="text-[#F97316]">Regístrate</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAccountPage;
