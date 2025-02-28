import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Hook personalizado para usar useDispatch con el tipo correcto de AppDispatch del store
export const useAppDispatch: () => AppDispatch = useDispatch;

// Hook personalizado para usar useSelector con el tipo correcto de RootState del store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
