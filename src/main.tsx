import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router/index.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import { persistor, store } from "./redux/store.ts";

// Crea la raíz de la aplicación y renderiza el componente principal
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Proveedor de Redux para gestionar el estado global */}
    <Provider store={store}>
      {/* PersistGate asegura que el estado persistido se recupere antes de renderizar la aplicación */}
      <PersistGate loading={<>...</>} persistor={persistor}>
        {/* RouterProvider maneja la navegación con React Router */}
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
