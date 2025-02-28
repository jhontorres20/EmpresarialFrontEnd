import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../modules/login";

//Mock de `useLoginMutation` para simular un login exitoso
jest.mock("../redux/services", () => ({
  useLoginMutation: () => [
    jest.fn(async () => ({
      data: { token: "fakeToken123" }, //Respuesta simulada exitosa
    })),
  ],
}));

describe("Login Component", () => {
  test("debe ejecutar login correctamente y mostrar el token en la consola", async () => {
    const consoleSpy = jest.spyOn(console, "log"); //Espiar el console.log

    render(<Login />);

    //Simular entrada de email
    fireEvent.change(screen.getByPlaceholderText("Correo electronico"), {
      target: { value: "test@example.com" },
    });

    //Simular entrada de contraseña
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "password123" },
    });

    //Marcar el checkbox de términos
    fireEvent.click(screen.getByLabelText("Acepta los terminos y condiciones"));

    //Click en el botón de login
    fireEvent.click(screen.getByText("Login"));

    //Esperar a que se ejecute la mutación y verificar el log del token
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(" Token generado:", {
        token: "fakeToken123",
      });
    });

    consoleSpy.mockRestore(); //Restaurar el console.log original
  });
});
