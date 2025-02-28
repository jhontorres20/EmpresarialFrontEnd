/* eslint-disable @typescript-eslint/no-explicit-any */
// Configuración global para Jest simulando variables de entorno
(global as any).importMeta = {
  env: {
    VITE_API_STAG_URL: "https://fakeapi.com", // API falsa para Jest
  },
};
