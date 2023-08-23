import { createContext, useState } from "react";

//1.Creamos el contexto
export const FiltersContext = createContext();

//2.Proveemos el contexto
const FiltersProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        minPrice: 0,
        brand: 'all',
        name: '',
        variant: 'all'
    });
    return (
        <FiltersContext.Provider value={{
            filters, setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}

export default FiltersProvider;