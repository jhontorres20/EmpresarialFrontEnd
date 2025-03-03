import { CubeTransparentIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { logout } from "../redux/slice";
import { useEffect } from "react";

export default function Layout() {

  const navigate = useNavigate();

  // Obtiene los datos del usuario desde Redux
  const user = useAppSelector((state) => state.appSlice.user);
  // Obtiene la función dispatch para ejecutar acciones en Redux
  const dispatch = useAppDispatch();

   // Verifica si el token ha expirado
   useEffect(() => {
    if (user?.exp) {
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
      if (currentTime >= user.exp) {
        dispatch(logout()); // Elimina el estado del usuario
        navigate("/"); // Redirige al login
      }
    }
  }, [user, dispatch, navigate]);

  const roleLabels: Record<string, string> = {
    ROLE_ADMIN: 'Administrador',
    ROLE_USER: 'Usuario',
    ROLE_MANAGER: 'Gerente',
    ROLE_EDITOR: 'Editor',
  };
  
  const getRoleLabel = (role: string) => roleLabels[role] || 'Rol desconocido';

  return (
    <div className="drawer h-screen flex flex-col">
      {/* Fondo del drawer */}
      <div className="drawer-content flex flex-col h-full">
        {/* Navbar fijo en la parte superior */}
        <div className="navbar sticky top-0 z-50 w-full bg-base-300 px-6 justify-between">
          {user && (
            <>
              {/* Icono y enlaces de navegación */}
              <CubeTransparentIcon className="w-8 h-8" />
              <Link to="/list" className="text-lg font-bold">
                Lista Formulario
              </Link>
              <div className="h-6 border border-slate-500"></div>
              <Link to="/form" className="text-lg font-bold">
                Crear Formulario
              </Link>
              {/* Sección de usuario con nombre, rol y botón de cerrar sesión */}
              <div className="flex flex-row gap-4 items-center">
                <UserCircleIcon className="w-8 h-8" />
                <div className="flex flex-col">
                  <span className="text-lg font-bold">{`${user?.sub}`}</span>
                  {user?.roles?.length ? (<span className="text-lg font-bold">{`${user?.roles && user?.roles.length > 0 && user?.roles.map(getRoleLabel).join(', ')}`}</span>)
                  : (
                    <span className="text-lg font-bold text-gray-500">Sin roles asignados</span>
                  )}
                  <button
                    onClick={() => {
                      dispatch(logout()); // Cierra sesión eliminando los datos del usuario en Redux
                      navigate("/");
                    }}
                    className="text-base font-bold">
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Contenedor para el contenido principal de la página */}
        <div className="flex-grow min-h-0 w-full overflow-hidden">
          <Outlet /> {/* Renderiza el contenido de la ruta actual */}
        </div>
      </div>
    </div>
  );
}
