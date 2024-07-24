import React from 'react';

interface CreateAccountPageProps {
  setPage: (page: 'home' | 'create' | 'login') => void;
}

const CreateAccountPage: React.FC<CreateAccountPageProps> = ({ setPage }) => {
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
            Crear una nueva cuenta
          </h1>
          <form className="flex flex-col gap-[24px]" style={{ width: '362px', height: '438px' }}>
            <input type="text" placeholder="Nombre" className="px-4 py-2 border border-[#1F2937] rounded-md" />
            <input type="email" placeholder="Correo electrónico" className="px-4 py-2 border border-[#1F2937] rounded-md" />
            <input type="password" placeholder="Contraseña" className="px-4 py-2 border border-[#1F2937] rounded-md" />
            <button type="submit" className="relative flex items-center justify-center px-8 py-4 bg-[#F97316] rounded-full text-white font-bold" style={{ height: '54px' }}>
              Crear cuenta
            </button>
          </form>
          <p className="text-[#1F2937] text-center text-[14px] font-semibold leading-[17px] mt-4" style={{ width: '362px', height: '17px' }}>
            ¿Ya tienes una cuenta?{' '}
            <button 
              className="text-[#F97316] font-bold"
              onClick={() => setPage('login')}
            >
              Inicia sesión aquí
            </button>
          </p>
          <button
            className="relative flex items-center justify-center px-8 py-4 border border-[#F97316] rounded-full text-[#F97316] font-bold" 
            style={{ width: '362px', height: '54px' }}
            onClick={() => setPage('home')}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
