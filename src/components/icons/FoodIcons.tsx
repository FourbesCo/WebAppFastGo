
import React from 'react';

export const BurgerIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`w-16 h-16 flex items-center justify-center ${className}`}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 20H8C6.9 20 6 20.9 6 22V24C6 25.1 6.9 26 8 26H32C33.1 26 34 25.1 34 24V22C34 20.9 33.1 20 32 20Z" fill="#FFA000"/>
      <path d="M30 12H10C8.9 12 8 12.9 8 14V16C8 17.1 8.9 18 10 18H30C31.1 18 32 17.1 32 16V14C32 12.9 31.1 12 30 12Z" fill="#FFA000"/>
      <path d="M32 28H8C6.9 28 6 28.9 6 30V32C6 33.1 6.9 34 8 34H32C33.1 34 34 33.1 34 32V30C34 28.9 33.1 28 32 28Z" fill="#FFA000"/>
      <path d="M10 14H30V16H10V14Z" fill="#FFCA28"/>
      <path d="M8 22H32V24H8V22Z" fill="#FFCA28"/>
      <path d="M8 30H32V32H8V30Z" fill="#FFCA28"/>
    </svg>
  </div>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`w-16 h-16 flex items-center justify-center ${className}`}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="16" r="8" fill="#64B5F6"/>
      <path d="M32 34C32 28.48 26.62 24 20 24C13.38 24 8 28.48 8 34" fill="#1976D2"/>
      <path d="M8 34C8 28.48 13.38 24 20 24C26.62 24 32 28.48 32 34H8Z" fill="#1976D2"/>
      <circle cx="20" cy="16" r="8" stroke="#1976D2" strokeWidth="2"/>
    </svg>
  </div>
);

export const SettingsIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`w-16 h-16 flex items-center justify-center ${className}`}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.06 21.44C32.02 20.96 31.72 20.56 31.28 20.4C29.96 19.96 28.86 18.86 28.42 17.54C27.98 16.22 28.18 14.72 28.94 13.56C29.22 13.12 29.18 12.54 28.82 12.16L27.84 11.18C25.8 9.14 25.8 9.14 23.76 11.18L22.78 12.16C22.42 12.52 21.84 12.58 21.4 12.3C20.24 11.54 18.74 11.34 17.42 11.78C16.1 12.22 15 13.32 14.56 14.64C14.4 15.08 14 15.38 13.52 15.42C11.98 15.52 11.98 15.52 11.98 17.44V18.54C11.98 20.46 11.98 20.46 13.52 20.56C14 20.6 14.4 20.9 14.56 21.34C15 22.66 16.1 23.76 17.42 24.2C18.74 24.64 20.24 24.44 21.4 23.68C21.84 23.4 22.42 23.44 22.78 23.8L23.76 24.78C25.8 26.82 25.8 26.82 27.84 24.78L28.82 23.8C29.18 23.44 29.24 22.86 28.96 22.42C28.2 21.26 28 19.76 28.44 18.44C28.88 17.12 29.98 16.02 31.3 15.58C31.74 15.42 32.04 15.02 32.08 14.54C32.18 13 32.18 13 30.26 13H29.16C27.24 13 27.24 13 27.14 14.54C27.1 15.02 26.8 15.42 26.36 15.58C25.04 16.02 23.94 17.12 23.5 18.44C23.06 19.76 23.26 21.26 24.02 22.42C24.3 22.86 24.26 23.44 23.9 23.8L22.92 24.78C20.88 26.82 20.88 26.82 22.92 24.78L21.94 23.8C21.58 23.44 21.52 22.86 21.8 22.42C22.56 21.26 22.76 19.76 22.32 18.44C21.88 17.12 20.78 16.02 19.46 15.58C19.02 15.42 18.72 15.02 18.68 14.54C18.58 13 18.58 13 20.5 13H21.6C23.52 13 23.52 13 23.62 14.54C23.66 15.02 23.96 15.42 24.4 15.58C25.72 16.02 26.82 17.12 27.26 18.44C27.7 19.76 27.5 21.26 26.74 22.42C26.46 22.86 26.5 23.44 26.86 23.8L27.84 24.78C29.88 26.82 29.88 26.82 27.84 24.78" stroke="#607D8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="20" r="3" fill="#607D8B"/>
    </svg>
  </div>
);

export const SodaIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`w-16 h-16 flex items-center justify-center ${className}`}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 8H26V12C26 12 28 13 28 16L26 34H14L12 16C12 13 14 12 14 12V8Z" fill="#F44336"/>
      <path d="M26 8H14V12H26V8Z" fill="#B71C1C"/>
      <path d="M14 12H26C26 12 28 13 28 16L26 34H14L12 16C12 13 14 12 14 12Z" fill="#F44336"/>
      <path d="M24 18C24 18 23 22 20 22C17 22 16 18 16 18L17 14H23L24 18Z" fill="#FFEB3B"/>
    </svg>
  </div>
);

export const PizzaIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`w-16 h-16 flex items-center justify-center ${className}`}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M34 20C34 20 27 38 20 38C13 38 6 20 6 20C6 20 13 8 20 8C27 8 34 20 34 20Z" fill="#FFA726"/>
      <circle cx="14" cy="18" r="2" fill="#FF5722"/>
      <circle cx="20" cy="26" r="2" fill="#FF5722"/>
      <circle cx="26" cy="18" r="2" fill="#FF5722"/>
      <path d="M34 20C34 20 27 38 20 38C13 38 6 20 6 20" stroke="#E65100" strokeWidth="2"/>
    </svg>
  </div>
);

export const CupcakeIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`w-16 h-16 flex items-center justify-center ${className}`}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 16C28 16 28 22 26 24H14C12 22 12 16 12 16C12 12.69 15.58 10 20 10C24.42 10 28 12.69 28 16Z" fill="#FFCDD2"/>
      <path d="M14 24L12 34H28L26 24H14Z" fill="#F8BBD0"/>
      <path d="M20 10C20 10 18 6 20 4C22 2 26 4 26 8" stroke="#D81B60" strokeWidth="2"/>
      <circle cx="15" cy="18" r="1" fill="#E91E63"/>
      <circle cx="24" cy="20" r="1" fill="#E91E63"/>
      <circle cx="18" cy="22" r="1" fill="#E91E63"/>
    </svg>
  </div>
);

export const FriesIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`w-16 h-16 flex items-center justify-center ${className}`}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 10V26H28V10H12Z" fill="#FFCA28"/>
      <path d="M12 26L10 34H30L28 26H12Z" fill="#FFCA28"/>
      <path d="M14 10V20M18 10V22M22 10V18M26 10V24" stroke="#F57F17" strokeWidth="2"/>
    </svg>
  </div>
);

export const HotDogIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`w-10 h-10 flex items-center justify-center ${className}`}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 18C8 16.9 8.9 16 10 16H30C31.1 16 32 16.9 32 18V22C32 23.1 31.1 24 30 24H10C8.9 24 8 23.1 8 22V18Z" fill="#FFA000"/>
      <path d="M10 20H30V22C30 22.55 29.55 23 29 23H11C10.45 23 10 22.55 10 22V20Z" fill="#FFECB3"/>
      <path d="M12 16V24M16 16V24M20 16V24M24 16V24M28 16V24" stroke="#E65100" strokeWidth="0.5"/>
      <path d="M10 20H30" stroke="#E65100" strokeWidth="0.5"/>
    </svg>
  </div>
);
