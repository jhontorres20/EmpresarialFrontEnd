/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import Select, { GroupBase, OptionsOrGroups, StylesConfig } from "react-select";
import { ErrorMessage } from "@hookform/error-message";

interface InputSelectProps {
  rules?: RegisterOptions;
  name: string;
  placeholder: string;
  options?: OptionsOrGroups<any, GroupBase<unknown>>;
  isClearable?: boolean;
  isSearchable?: boolean;
  showLabel?: boolean;
}

// Configuración de estilos predeterminados para el componente Select
const styleConfigDefault: StylesConfig = {
  control: (provided) => ({
    ...provided,
    border: "1px solid #c3c3c3",
    borderRadius: "0.375rem",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#a0aec0",
    },
    backgroundColor: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#5f62e6" : "transparent",
    color: state.isSelected ? "white" : "#4a5568",
    "&:hover": {
      backgroundColor: "#5f62e6",
      color: "white",
    },
  }),
};

export default function InputSelect({
  name,
  rules,
  placeholder,
  options = [],
  isClearable = true,
  isSearchable = true,
  showLabel = true,
}: InputSelectProps) {
  // Obtiene el contexto del formulario de react-hook-form
  const HookFormContext = useFormContext();

  return (
    <div className="flex flex-col pt-5">
      <Controller
        name={name}
        control={HookFormContext.control} // Control de react-hook-form para manejar el campo
        rules={rules} // Reglas de validación opcionales
        render={({ field }) => (
          <div className="relative w-full">
            {/* Componente Select con las configuraciones dadas */}
            <Select
              {...field}
              id={name}
              placeholder={placeholder}
              options={options}
              isClearable={isClearable}
              isSearchable={isSearchable}
              menuPosition="fixed"
              styles={styleConfigDefault}
              isDisabled={rules?.disabled}
              className="h-10"
            />
            {/* Etiqueta opcional encima del campo */}
            {showLabel && (
              <label
                htmlFor={name}
                className="absolute -top-7 left-0 ml-2 select-none px-1 text-sm font-semibold text-[#9aa1a7] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-left-2 peer-focus:-top-7 peer-focus:ml-4 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-sky-500 peer-active:text-[#b1b9c1] peer-enabled:-left-2">
                {placeholder}
                {rules?.required && " *"}
              </label>
            )}
          </div>
        )}
      />
      {/* Muestra los mensajes de error en caso de validación fallida */}
      {HookFormContext.formState.touchedFields[name] && name && (
        <ErrorMessage
          errors={HookFormContext.formState.errors}
          name={name}
          render={({ messages }) =>
            messages
              ? Object.entries(messages).map(([type, message]) => (
                  <div key={type} className="mt-2 text-sm text-red-600">
                    {message}
                  </div>
                ))
              : null
          }
        />
      )}
    </div>
  );
}
