import { FormProvider, useForm } from "react-hook-form";
import InputText from "../../components/InputText";
import InputSelect from "../../components/InputSelect";
import { FormData } from "../../utils/types";
import { useFormMutation } from "../../redux/services";
import Swal from "sweetalert2";

export default function Form() {
  // Hook para manejar el formulario con validaciones
  const HookForm = useForm<FormData>({
    mode: "all",
    criteriaMode: "all",
  });

  // Hook para enviar los datos del formulario
  const [submitForm, { isLoading, reset }] = useFormMutation();

  const municipios = [
    { value: "1", label: "CALI" },
    { value: "2", label: "PALMIRA" },
    { value: "3", label: "YUMBO" },
  ];

  // Función de envío del formulario
  const onSubmit = async (data: FormData) => {

    console.log("Datos del formulario recibidos:", data);

    // Verificar que el campo municipio contenga el objeto esperado
    const selectedMunicipio = data.municipio;
  
    if (!selectedMunicipio || !selectedMunicipio.value || !selectedMunicipio.label) {
      console.error("Municipio no válido:", selectedMunicipio);
      return;
    }
  
    // Transformar el objeto para que coincida con lo que espera el backend
    data = {
      ...data,
      municipio: {
        id: Number(selectedMunicipio.value), // Asegura que el id sea un número
        nombre: selectedMunicipio.label, // El nombre viene directamente del objeto
      },
    };
  
    console.log("Payload enviado:", data);

    try {
      await submitForm(data) // Se envía los datos del formulario a la API
        .unwrap()
        .then(() => {
          //alert("Formulario enviado con éxito!"); // Mensaje de éxito
          Swal.fire({
            title: "¡Éxito!",
            text: "La operación se realizó correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar"
          });
          reset(); // Limpia el estado de la mutación
          HookForm.reset(); // Reinicia el formulario
        });
    } catch (error) {
      //alert("Error al enviar el formulario");
      Swal.fire({
                  title: 'Error',
                  text: 'No se pudo guardar el formulario',
                  icon: 'error',
                  confirmButtonText: 'OK'
                })
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center overflow-auto bg-white">
      <div className="w-full flex flex-col flex-grow min-h-0 overflow-auto">
        {/*Encabezado */}
        <div className="p-6 flex items-center border-b-[1px] border-[#e0e0e0]">
          <p className="text-2xl font-bold text-[#0f1469]">Registro</p>
        </div>

        {/*Contenedor del formulario */}
        <div className="flex flex-col w-full p-7 flex-grow overflow-hidden">
          <div className="w-full h-fit">
            <FormProvider {...HookForm}>
              <form
                id="registerForm"
                className="space-y-4 flex flex-col border shadow-md rounded-md h-full overflow-auto"
                onSubmit={HookForm.handleSubmit(onSubmit)}>
                {/*Sección de datos generales */}
                <div className="w-full p-6 border-b">
                  <p className="text-2xl font-bold text-[#0f1469]">
                    Datos Generales
                  </p>
                </div>

                <div className="w-full grid grid-cols-2 gap-x-8 px-8 pb-8">
                  <div className="flex flex-col gap-4">
                    <InputText
                      name="razonSocial"
                      type="text"
                      placeholder="Razón Social"
                      rules={{
                        required: {
                          value: true,
                          message: "Razón Social es requerido",
                        },
                      }}
                    />
                    <InputSelect
                      name="departamento"
                      placeholder="Departamento"
                      options={[
                        { value: "1", label: "VALLE DEL CAUCA" }
                      ]}
                      showLabel={!!HookForm.watch("departamento")}
                      rules={{
                        required: {
                          value: true,
                          message: "Departamento es requerido",
                        },
                      }}
                    />
                    <InputSelect
                      name="municipio"
                      placeholder="Ciudad"
                      options={municipios}
                      showLabel={!!HookForm.watch("municipio")}
                      rules={{
                        required: {
                          value: true,
                          message: "Municipio requerido",
                        },
                      }}
                    />
                    <InputText
                      name="telefono"
                      type="tel"
                      placeholder="Teléfono"
                      rules={{
                        required: {
                          value: true,
                          message: "Teléfono es requerido",
                        },
                        pattern: {
                          value: /[0-9]{0,13}/,
                          message: "Formato incorrecto (3008061491)",
                        },
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <InputText
                      name="correo"
                      type="email"
                      placeholder="Correo Electrónico"
                      rules={{
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Formato de correo incorrecto",
                        },
                      }}
                    />
                    <InputText
                      name="fechaRegistro"
                      type="datetime-local"
                      placeholder="Fecha de Registro"
                      rules={{
                        required: {
                          value: true,
                          message: "Fecha de Registro es requerido",
                        },
                      }}
                    />
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>

      {/*Footer fijo */}
      <div className="w-full mt-auto">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-blue-900 text-white rounded-t-2xl py-4 px-6">
          {/* Información del formulario */}
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Total Ingresos Formulario:</p>
            <p className="text-2xl font-bold text-blue-300">$100.000.000.000</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Cantidad de empleados:</p>
            <p className="text-2xl font-bold text-blue-300">999</p>
          </div>

          {/* Botón para enviar el formulario */}
          <div className="flex flex-row gap-4 items-center">
            <p className="text-sm">
              Si ya ingresaste todos los datos, crea tu formulario aquí
            </p>
            <button
              type="submit"
              form="registerForm"
              disabled={isLoading}
              className={`
              py-2 px-6 rounded-lg font-semibold ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600 text-white"
              }`}>
              {isLoading ? "Enviando..." : "Enviar Formulario"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
