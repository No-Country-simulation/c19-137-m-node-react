'use client'; // Indica que este archivo debe ser tratado como un componente de cliente

import React, { useState } from 'react';
import { Avatar } from '../components/ui/avatar';
import { Separador } from '../components/ui/separator';
import { Tarjeta, ContenidoTarjeta, PieDeTarjeta } from '../components/ui/card';
import { IconoCorazon, IconoMensaje } from '../components/ui/icons';

const PerfilDeUsuario: React.FC = () => {
  const [bannerSrc, setBannerSrc] = useState('/placeholder.svg');
  const [avatarSrc, setAvatarSrc] = useState('/placeholder-user.jpg');
  const [selectedTab, setSelectedTab] = useState('Libros');

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isAvatarDefault = avatarSrc === '/placeholder-user.jpg';
  const isBannerDefault = bannerSrc === '/placeholder.svg';

  return (
    <div className="relative overflow-hidden" style={{ marginLeft: '20%', width: '80%' }}>
      {/* Sección de Banner */}
      <div className={`relative h-64 overflow-hidden ${isBannerDefault ? 'bg-blue-100' : ''}`}>
        <img 
          src={bannerSrc} 
          alt="Banner" 
          className={`w-full h-full object-cover ${isBannerDefault ? 'hidden' : ''}`}
        />
        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleBannerChange} />
      </div>

      {/* Contenedor del Avatar */}
      <div className="contenedor-avatar absolute top-32 left-1/2 transform -translate-x-1/2 z-20">
        <div className={`rounded-full w-48 h-48 border-4 border-background relative overflow-hidden ${isAvatarDefault ? 'bg-orange-100' : ''}`}>
          <img 
            src={avatarSrc} 
            alt="Avatar" 
            className={`w-full h-full object-cover ${isAvatarDefault ? 'hidden' : ''}`}
          />
          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleAvatarChange} />
        </div>
      </div>

      {/* Información del Perfil */}
      <div className="bg-background p-6 rounded-b-lg mt-2">
        {/* Botón Editar Perfil */}
        <div className="flex justify-between mb-4 items-center">
          <div className="grid gap-1">
            <div className="text-2xl font-bold">John Doe</div>
            <div className="text-lg text-muted-foreground">@johndoe</div>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            Editar perfil
          </button>
        </div>
        
        <div className="grid gap-4">
          <div className="flex items-center justify-between mt-2 mb-4">
            <div className="text-lg text-muted-foreground mt-2 mb-4">
              Soy un ingeniero de software y me encanta programar! Mira mis últimos proyectos.
            </div>
            <div className="flex items-center gap-6 text-lg text-muted-foreground mt-2 mb-4">
              <div>
                <span className="font-medium">100</span> Seguidores
              </div>
              <div>
                <span className="font-medium">250</span> Siguiendo
              </div>
              <div>
                <span className="font-medium">50</span> Publicaciones
              </div>
            </div>
          </div>
          {/* Eliminar la línea divisora gris */}
          {/* <hr className="my-0.5 border-t-2 border-gray-300" /> */}
          
          {/* Barra de botones */}
          <div>
            <div className="flex justify-between">
              {['Libros', 'My Posts', 'My Followers'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`flex-grow px-4 py-0 text-lg ${
                    selectedTab === tab
                      ? 'border-b-2 border-orange-500'
                      : 'border-b-2 border-transparent'
                  } transition-all duration-300`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido según la pestaña seleccionada */}
      <div className="p-8 bg-orange-100 rounded-b-lg">
        {selectedTab === 'Libros' && (
          <div>Contenido de Libros</div>
        )}
        {selectedTab === 'My Posts' && (
          <div>Contenido de My Posts</div>
        )}
        {selectedTab === 'My Followers' && (
          <div>Contenido de My Followers</div>
        )}
      </div>
    </div>
  );
};

export default PerfilDeUsuario;
