import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useListQuery } from "../../redux/services";
import { Link } from "react-router-dom";

export default function List() {
  // Estados para el paginado dinámico
  const [page, setPage] = useState<number>(0); // Backend usa 0-indexed pages
  const [size, setSize] = useState<number>(10); // Tamaño por defecto

  // Hook para obtener los datos con el paginado dinámico
  const { data, error, isLoading, refetch } = useListQuery({ page, size });

  // Refetch cuando cambian página o tamaño
  useEffect(() => {
    refetch();
  }, [page, size, refetch]);

  // Función para cambiar la cantidad de filas por página
  const handleRowsPerPageChange = (newSize: number) => {
    setSize(newSize);
    setPage(0); // Resetear a la primera página cuando cambia el tamaño
  };

  const DownloadCsvButton = () => {
    const handleDownload = async () => {

      const token = localStorage.getItem('authToken'); // O desde donde almacenes tu token

    if (!token) {
      alert('Token de autenticación no encontrado');
      return;
    }

      try {
        const response = await fetch('http://localhost:8080/comerciante/generarCsv', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Error al descargar el archivo.');
        }
  
        // Obtener el blob del archivo
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
  
        // Crear un enlace temporal para descargar el archivo
        const a = document.createElement('a');
        a.href = url;
        a.download = 'comerciantes.csv'; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
  
        // Limpiar recursos
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error al descargar el archivo:', error);
        alert('Hubo un error al descargar el archivo.');
      }
    };
  
    return (      
      <button onClick={handleDownload} className="font-bold rounded-lg py-2 px-4 border border-[#eb0070] text-[#eb0070]">
      Descargar Reporte en CSV
    </button>
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center overflow-auto bg-white">
      <div className="w-full flex flex-col flex-grow min-h-0 overflow-auto">
        {/*Encabezado */}
        <div className="p-6 flex items-center border-b-[1px] border-[#e0e0e0]">
          <p className="text-2xl font-bold text-[#0f1469]">
            Lista de Formularios Creados
          </p>
        </div>

        {/*Mensajes de carga o error */}
        {isLoading && <p className="m-auto">Cargando...</p>}
        {error && <p className="m-auto">Error al cargar los datos</p>}

        <div className="flex flex-col w-full p-7 flex-grow min-h-0 overflow-auto">
          {/*Botones superiores */}
          <div className="w-full flex justify-end items-end mb-4 gap-4">
            {/* Botón para crear un nuevo formulario */}
            <Link
              to="/form"
              className="font-bold rounded-lg py-2 px-4 border border-[#eb0070] bg-[#eb0070] text-white">
              Crear Formulario Nuevo
            </Link>
            {/* Botón para descargar el reporte en CSV */}            
            <DownloadCsvButton />
          </div>

          {/*Contenedor con scroll si es necesario */}
          {data && data?.content && data?.content.length > 0 && (
            <div className="w-full flex-grow min-h-0 overflow-auto">
            <Table
              data={data.content}
              page={page}
              size={size}
              totalPages={data.totalPages}
              setPage={setPage}
              setSize={handleRowsPerPageChange}
            />
          </div>
          )}          
        </div>
      </div>

      {/*Footer fijo */}
      <footer className="w-full bg-blue-900 text-white px-6 mt-auto text-center">
        <p className="text-sm py-6">
          Prueba Técnica de Uso Exclusivo de OLSoftware S.A.
        </p>
      </footer>
    </div>
  );
}
