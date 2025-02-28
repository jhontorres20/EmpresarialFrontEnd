import { useState, useEffect } from 'react';

// Función para calcular el rango de páginas en la paginación
const calculateRange = (data: unknown[], rowsPerPage: number) => {
	const range: unknown[] = [];
	const num = Math.ceil(data.length / rowsPerPage); // Calcula el número total de páginas
	for (let i = 1; i <= num; i++) {
		range.push(i);
	}
	return range;
};

// Función para obtener una porción de los datos según la página y cantidad de filas por página
const sliceData = (data: unknown[], page: number, rowsPerPage: number) => {
	return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

// Hook personalizado para manejar la paginación de una tabla
const useTable = (data: unknown[], page: number, rowsPerPage: number) => {
	const [ tableRange, setTableRange ] = useState<number[] | unknown[]>([]); // Estado para almacenar el rango de páginas
	const [ slice, setSlice ] = useState<unknown[]>([]); // Estado para almacenar los datos de la página actual

	// Efecto para recalcular la paginación cuando los datos cambian
	useEffect(() => {
		if (page > 0) {
			const range = calculateRange(data, rowsPerPage);
			setTableRange([ ...range ]); // Actualiza el rango de páginas

			const slice = sliceData(data, page, rowsPerPage);
			setSlice([ ...slice ]); // Actualiza los datos mostrados en la tabla
		}
	}, [ data, setTableRange, page, setSlice, rowsPerPage ]);

	return { slice, range: tableRange };
};

export default useTable;