import { FavouritesProvider } from "./context/FavouritesContext.jsx";
import Gallery from "./components/Gallery.jsx";

export default function App() {
  return (
    <FavouritesProvider>
      <Gallery />
    </FavouritesProvider>
  );
}
