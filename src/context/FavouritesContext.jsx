import { createContext, useContext, useEffect, useReducer } from "react";

const STORAGE_KEY = "photo-gallery-favourites";

function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const id = String(action.payload);
      return state.includes(id)
        ? state.filter((favId) => favId !== id) // remove
        : [...state, id]; // add
    }
    default:
      return state; 
  }
}

function getInitialFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    
    return [...new Set(parsed.map((id) => String(id)))];
  } catch {
    return [];
  }
}

const FavouritesContext = createContext(null);

export function FavouritesProvider({ children }) {
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    getInitialFavourites
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {
      
    }
  }, [favourites]);

  return (
    <FavouritesContext.Provider value={{ favourites, dispatch }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used inside FavouritesProvider");
  }
  return context;
}
