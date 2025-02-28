import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store"; // Asegúrate de importar el tipo de RootState

// Determina la URL de la API dependiendo del entorno de ejecución
const API_URL =
	typeof process !== "undefined" && process.env.VITE_API_STAG_URL
		? process.env.VITE_API_STAG_URL
		: import.meta.env.VITE_API_STAG_URL;

// Configuración de la base de consulta para RTK Query
const baseQuery = fetchBaseQuery({
	baseUrl: API_URL, // URL base para todas las peticiones
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).appSlice.token; // Obtiene el token desde Redux

		if (token) {
			headers.set("Authorization", `Bearer ${token}`); // Agrega el token a los headers para autenticación
		}

		return headers;
	},
});

// Creación de la API con RTK Query
export const api = createApi({
	reducerPath: "api", // Define el nombre del slice en el store
	baseQuery, // Usa la configuración de baseQuery para manejar las peticiones
	endpoints: () => ({}), // Se definen endpoints más adelante en los servicios
});
