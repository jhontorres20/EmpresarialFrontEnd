/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";

// Función para configurar y crear un store de Redux con API y slice proporcionados
export const setupApiStore = (api: any, slice: any) => {
  return configureStore({
    reducer: {
      [ api.reducerPath ]: api.reducer, // Agrega el reducer del API con su nombre de ruta
      app: slice.reducer, // Agrega el reducer del slice de la aplicación
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware), // Agrega el middleware del API
  });
};
