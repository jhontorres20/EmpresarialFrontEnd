import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { InputHTMLAttributes } from "react";

interface InputTextProps {
  rules?: RegisterOptions;
  name: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder: string;
}

export default function InputText(props: InputTextProps) {
  // Obtiene el contexto del formulario de react-hook-form
  const HookFormContext = useFormContext();

  return (
    <div className="flex flex-col pt-5">
      <Controller
        name={props.name}
        control={HookFormContext.control} // Control de react-hook-form para manejar el input
        rules={props.rules} // Reglas de validación opcionales
        render={({ field }) => (
          <div className="relative w-full">
            {/* Campo de entrada con estilos y validaciones */}
            <input
              id={props.name}
              type={props.type}
              className="peer input input-bordered h-10 w-full placeholder-transparent"
              disabled={props.rules?.disabled} // Deshabilita si está especificado en las reglas
              placeholder={props.placeholder}
              required={
                typeof props.rules?.required === "object" &&
                props.rules.required.value
              }
              {...field}
            />
            {/* Etiqueta del campo de entrada */}
            <label
              htmlFor={props.name}
              className="absolute -top-7 left-0 ml-4 select-none px-1 text-sm font-semibold text-[#9aa1a7] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-left-2 peer-focus:-top-7 peer-focus:ml-4 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-sky-500 peer-active:text-[#b1b9c1] peer-enabled:-left-2">
              {props.placeholder}
              {typeof props.rules?.required === "object" &&
                props.rules.required.value &&
                " *"}
            </label>
          </div>
        )}
      />
      {/* Muestra los mensajes de error si el campo tiene errores de validación */}
      {HookFormContext.formState.touchedFields[props.name] && props.name && (
        <ErrorMessage
          errors={HookFormContext.formState.errors}
          name={props.name}
          render={({ messages }) => {
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <div className="mt-2 flex flex-col" key={type}>
                    <div className="flex w-fit flex-row gap-2 py-1 pl-2 text-sm text-red-500 transition-opacity duration-300 ease-in-out">
                      <p>•</p>
                      <p className="border-b border-b-red-500">{message}</p>
                    </div>
                  </div>
                ))
              : null;
          }}
        />
      )}
    </div>
  );
}
