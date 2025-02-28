import { FormProvider, useForm } from "react-hook-form";
import InputText from "../../components/InputText";
import InputCheckBox from "../../components/InputCheckBox";
import { useLoginMutation } from "../../redux/services";
import { LoginData } from "../../utils/types";
import { useAppDispatch } from "../../redux/hook";
import { login, setUser, State } from "../../redux/slice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import Swal from "sweetalert2";

export default function Login() {
  
  const navigate = useNavigate();

  // Accion personalizada para que sepa que debe insertar algo en el estado
  const dispatch = useAppDispatch();
  // Inicializa el formulario con react-hook-form y define las reglas de validación
  const HookForm = useForm<LoginData>({
    mode: "all", // Valida en tiempo real
    criteriaMode: "all", // Muestra todos los errores encontrados en los campos
  });

  // Hook para la mutación de login
  const [loginService] = useLoginMutation();

  // Función de envío del formulario
  const onSubmit = async ({ ...data }) => {
    try {
      // Envía la solicitud de autenticación con los datos del formulario
      await loginService({
        email: data.email,
        password: data.password,
        terms: data.terms,
      })
        .unwrap()
        .then((response) => {          
          // Despachar la acción para actualizar el estado global con el token
          dispatch(login({ token: response.token }));

          localStorage.setItem('authToken', response.token);

          const userData:State[ "user" ] = jwtDecode(response.token);
          // Despachar la acción para establecer los datos del usuario
          dispatch(setUser({ user: userData }));
          navigate("/list");

          console.log("✅ Autenticación exitosa:", response);
        })
        .catch((e) => {
          Swal.fire({
            title: 'Error',
            text: 'Usuario o contraseña inválidas',
            icon: 'error',
            confirmButtonText: 'OK'
          })
          console.error("⚠️ Error en la autenticación:", e);
        });
    } catch (error) {
      console.error("⚠️ Error al intentar iniciar sesion:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-login bg-cover">
      <div className="border-[1px] border-slate-400 bg-white p-7 shadow-md rounded-xl">
        <div></div>
        <div>
          {/* Proveedor del formulario para manejar la validación y envío de datos */}
          <FormProvider {...HookForm}>
            <form
              className="p-4 space-y-4 flex flex-col"
              onSubmit={HookForm.handleSubmit(onSubmit)}>
              {/* Campo de entrada para el correo electrónico */}
              <InputText
                name="email"
                type="text"
                placeholder="Correo electronico"
                rules={{
                  required: {
                    value: true,
                    message: "Correo electronico es requerido",
                  },
                }}
              />

              {/* Campo de entrada para la contraseña */}
              <InputText
                name="password"
                type="password"
                placeholder="Contraseña"
                rules={{
                  required: {
                    value: true,
                    message: "Contraseña es requerida",
                  },
                }}
              />

              {/* Checkbox para aceptar los términos y condiciones */}
              <InputCheckBox
                name="terms"
                placeholder="Acepta los terminos y condiciones"
                rules={{
                  required:
                    "Debe aceptar los terminos y condiciones para continuar",
                }}
              />

              {/* Botón de envío del formulario, deshabilitado si el formulario no es válido */}
              <div className="flex justify-center">
                <button
                  disabled={!HookForm.formState.isValid}
                  className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
