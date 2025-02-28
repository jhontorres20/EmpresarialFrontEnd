import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React, { useEffect } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";

const TableFooter = ({
  range,
  setPage,
  page,
  slice,
  onClick,
  visiblePages = 5, // Número de páginas visibles en el paginador
}: {
  range: number[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  slice: unknown[];
  rowPerPage: number;
  onClick: (
    newValue: SingleValue<{ label: string; value: string }>,
    actionMeta: ActionMeta<{ label: string; value: string }>
  ) => void;
  visiblePages?: number;
}) => {
  // Opciones de cantidad de filas por página
  const RowsPerPage = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "30", value: "30" },
    { label: "40", value: "40" },
  ];

  // Función para retroceder una página
  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Función para avanzar una página
  const goToNextPage = () => {
    if (page < range.length) {
      setPage(page + 1);
    }
  };

  // Efecto para ajustar la página en caso de cambios en los datos
  useEffect(() => {
    if (page === 0) {
      setPage(0);
    } else if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  // Calcular qué páginas mostrar en el paginador
  const getVisiblePages = () => {
    let start = Math.max(1, page - Math.floor(visiblePages / 2));
    const end = Math.min(range.length, start + visiblePages - 1);

    if (end - start < visiblePages - 1) {
      start = Math.max(1, end - visiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex items-center gap-2">
      <p>Items</p>
      {/* Selector para cambiar el número de filas por página */}
      <Select
        id="rows"
        name="rows"
        placeholder={""}
        styles={{
          control(base) {
            return {
              ...base,
              borderStyle: "none",
              "&:hover": { borderColor: "hsl(0, 0%, 0%)" },
            };
          },
        }}
        options={RowsPerPage}
        defaultValue={RowsPerPage[0]}
        isSearchable={false}
        menuPosition={"fixed"}
        onChange={onClick}
      />

      {/* Botón para retroceder de página */}
      <button
        className="cursor-pointer"
        onClick={goToPreviousPage}
        disabled={page === 1}>
        <ChevronLeftIcon className="h-6" />
      </button>

      {/* Renderiza las páginas visibles en el paginador */}
      {getVisiblePages().map((pageNum) => (
        <button
          key={pageNum}
          className={`px-3 py-1 rounded ${
            page === pageNum ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setPage(pageNum)}>
          {pageNum}
        </button>
      ))}

      {/* Botón para avanzar de página */}
      <button
        className="cursor-pointer"
        onClick={goToNextPage}
        disabled={page === range.length}>
        <ChevronRightIcon className="h-6" />
      </button>
    </div>
  );
};

export default TableFooter;
