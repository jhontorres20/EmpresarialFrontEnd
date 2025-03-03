import { useNavigate } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Table({
  data = [],
  page,
  size,
  totalPages,
  setPage,
  setSize,
  onDelete,
  onToggleStatus,
}: {
  data: any[];
  page: number;
  size: number;
  totalPages: number;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, currentStatus: boolean) => void;
}) {

  const navigate = useNavigate();

  const handleEdit = (comerciante: any) => {
    navigate("/form", { state: { comerciante } }); // Enviar datos a la vista de edición
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(event.target.value));
    setPage(0); // Resetear a la primera página
  };

  const generatePagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <>
      <table className="w-full">
        <thead className="bg-[#509beb] text-center text-white border sticky top-0">
          <tr className="text-sm">
            <th className="p-2 border">#</th>
            <th className="p-4 border">Razon Social</th>
            <th className="p-4 border">Telefono</th>
            <th className="p-4 border">Correo Electronico</th>
            <th className="p-3 border">Fecha Registro</th>
            <th className="p-1 border">No. Establecimientos</th>
            <th className="p-3 border">Estado</th>
            <th className="p-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const currentIndex = page * size + index + 1;
            return (
              <tr key={index} className="border text-center">
                <td className="border p-4">{currentIndex}</td>
                <td className="border p-4">{item.razonSocial}</td>
                <td className="border p-4">{item.telefono}</td>
                <td className="border p-4">{item.correo}</td>
                <td className="p-4 border">{item.fechaRegistro}</td>
                <td className="p-4 border">{item.numeroEstablecimientos}</td>
                <td className="p-4 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.estado
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.estado ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="p-7 border flex justify-center gap-2">
                  <button onClick={() => handleEdit(item)} title="Editar" className="text-yellow-500">
                    ✏️
                  </button>
                  <button onClick={() => onDelete(item.id)} title="Eliminar" className="text-red-500">
                    ❌
                  </button>
                  <button onClick={() => onToggleStatus(item.id, item.estado)} title="Activar/Desactivar" className="text-green-500">
                    ✔️
                  </button>
                  <button title="Descargar" className="text-black">
                    ⬇️
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Footer para paginación */}
      <div className="flex justify-start items-center mt-4 p-4 bg-white border-t">
        {/* Selector de filas por página */}
        <div className="flex items-center gap-2 m-2">
          <span>Items:</span>
          <select value={size} onChange={handleSizeChange} className="border w-16 rounded p-1">
          <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Controles de paginado */}
        <div className="flex items-center gap-2">
          <button
            disabled={page <= 0}
            onClick={() => handlePageChange(page - 1)}
            className={`p-2 border rounded ${page <= 0 ? "bg-gray-300" : "bg-[#509beb] text-white"}`}>
            &lt;
          </button>

          {generatePagination().map((p, index) => (
            <button
              key={index}
              onClick={() => typeof p === "number" && handlePageChange(p - 1)}
              className={`p-2 border rounded ${
                page + 1 === p ? "bg-[#509beb] text-white" : "bg-white"
              }`}>
              {p}
            </button>
          ))}

          <button
            disabled={page >= totalPages - 1}
            onClick={() => handlePageChange(page + 1)}
            className={`p-2 border rounded ${
              page >= totalPages - 1 ? "bg-gray-300" : "bg-[#509beb] text-white"
            }`}>
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}
