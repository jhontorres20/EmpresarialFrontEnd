import { FormProvider, useForm } from "react-hook-form";
import InputText from "../../components/InputText";
import InputSelect from "../../components/InputSelect";
import { FormData } from "../../utils/types";
import {  useCreateFormMutation,  useUpdateFormMutation,} from "../../redux/services";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const comerciante = location.state?.comerciante || null; // Datos recibidos desde la vista anterior

  // Formularios
  const HookForm = useForm<FormData>({
    mode: "all",
    criteriaMode: "all",
    defaultValues: comerciante || {
      razonSocial: "",
      departamento: "",
      municipio: { value: "", label: "" },
      telefono: "",
      correo: "",
      fechaRegistro: "",
    },
  });

  // Mutations
  const [createForm, { isLoading: isCreating }] = useCreateFormMutation();
  const [updateForm, { isLoading: isUpdating }] = useUpdateFormMutation();

  const isLoading = isCreating || isUpdating;

  const municipios = [
    { value: "1", label: "CALI" },
    { value: "2", label: "PALMIRA" },
    { value: "3", label: "YUMBO" },
  ];

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      Swal.fire("Error", "Token de autenticación no encontrado.", "error");
      return;
    }

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: comerciante
        ? "¿Deseas actualizar este registro?"
        : "¿Deseas crear un nuevo registro?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    const selectedMunicipio = data.municipio;

    if (!selectedMunicipio || !selectedMunicipio.value || !selectedMunicipio.label) {
      Swal.fire("Error", "Debes seleccionar un municipio válido.", "error");
      return;
    }

    const payload = {
      ...data,
      municipio: {
        id: Number(selectedMunicipio.value),
        nombre: selectedMunicipio.label,
      },
    };

    try {
      if (comerciante) {
        await updateForm({ id: comerciante.id, body: payload }).unwrap();
        Swal.fire("¡Actualizado!", "El registro fue actualizado con éxito.", "success");
      } else {
        await createForm(payload).unwrap();
        Swal.fire("¡Creado!", "El registro fue creado con éxito.", "success");
      }

      HookForm.reset();
      navigate("/list");
    } catch (error) {
      Swal.fire("Error", "No se pudo procesar el formulario.", "error");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (comerciante) {
      HookForm.reset({
        ...comerciante,
        municipio: municipios.find((m) => m.label === comerciante.municipio?.nombre) || {
          value: "",
          label: "",
        },
      });
    }
  }, [comerciante, HookForm]);

  return (
    <div className="flex h-full w-full flex-col items-center overflow-auto bg-white">
      <div className="w-full flex flex-col flex-grow min-h-0 overflow-auto">
        {/*Encabezado */}
        <div className="p-6 flex items-center border-b-[1px] border-[#e0e0e0]">
          <p className="text-2xl font-bold text-[#0f1469]">Registro</p>
        </div>

        {/*Contenedor del formulario */}
        <div className="flex flex-col w-full p-7 flex-grow overflow-auto">
          
          <div className="p-6 flex items-center border-b-[1px] border-[#e0e0e0]">
            <p className="text-2xl font-bold text-[#0f1469]">
              {comerciante ? "Editar Registro" : "Crear Registro"}
            </p>
          </div>
          
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
                        { value: "1", label: "VALLE DEL CAUCA" },
                        { value: "2", label: "CUNDINAMARCA" },
                        { value: "3", label: "HUILA" },
                        { value: "4", label: "MAGDALENA" },
                        { value: "4", label: "ANTIOQUIA" }
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
              {isLoading ? "Guardando..." : comerciante ? "Actualizar Registro" : "Crear Registro"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
