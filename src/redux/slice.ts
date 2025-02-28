import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definición de la estructura del estado de la aplicación
export interface State {
  token: string | null;  
  user: {
    sub: string | null
    roles: string[] | null
    iat: number | null
    exp: number | null
  } | null;

}

// Estado inicial
const initialState: State = {
  token: null,
  user: null,
};

// Creación del slice de Redux
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Acción para iniciar sesión
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    // Acción para establecer usuario
    setUser: (state, action: PayloadAction<{ user: State[ "user" ] }>) => {
      state.user = action.payload.user;
    },
    // Acción para cerrar sesión
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

// Exportación de acciones y reducer
export const { login, setUser, logout } = appSlice.actions;
export default appSlice.reducer;
