import React from 'react'

interface TarjetaProps {
  className?: string;
  children: React.ReactNode;
}

export const Tarjeta: React.FC<TarjetaProps> = ({ className, children }) => (
  <div className={`tarjeta ${className}`}>{children}</div>
)

export const ContenidoTarjeta: React.FC<{ className?: string, children: React.ReactNode }> = ({ className, children }) => (
  <div className={`contenido-tarjeta ${className}`}>{children}</div>
)

export const PieDeTarjeta: React.FC<{ className?: string, children: React.ReactNode }> = ({ className, children }) => (
  <div className={`pie-de-tarjeta ${className}`}>{children}</div>
)
