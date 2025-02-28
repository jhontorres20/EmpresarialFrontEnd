import { RegisterOptions, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface CheckboxProps {
  rules?: RegisterOptions;
  name: string;
  placeholder: string; // Texto que se mostrará al lado del checkbox
}

export default function Checkbox({ rules, name, placeholder }: CheckboxProps) {
  // Obtiene el contexto del formulario proporcionado por react-hook-form
  const HookFormContext = useFormContext();

  return (
    <div className="flex flex-col">
      {/* Etiqueta y checkbox con su respectivo placeholder */}
      <label htmlFor={name} className="flex items-center gap-2">
        <input
          id={name}
          type="checkbox"
          className="checkbox"
          disabled={rules?.disabled} // Deshabilita el checkbox si está configurado en las reglas
          {...HookFormContext.register(name, rules)} // Registra el checkbox en el formulario
        />
        <span>{placeholder}</span>
      </label>
      {/* Mensaje de error si el campo ha sido tocado y tiene un error */}
      {HookFormContext.formState.touchedFields[name] &&
        HookFormContext.formState.errors[name] && (
          <ErrorMessage
            errors={{ [name]: HookFormContext.formState.errors[name] }}
            name={name}
            render={({ message }) => (
              <div className="mt-2 text-sm text-red-500">{message}</div>
            )}
          />
        )}
    </div>
  );
}
