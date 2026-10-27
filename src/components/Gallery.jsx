import { useCallback, useMemo, useState } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos.js";
import PhotoCard from "./PhotoCard.jsx";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState("");

  
  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const clearSearch = useCallback(() => setSearchTerm(""), []);

  
  const filteredPhotos = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return photos;
    return photos.filter((photo) => photo.author.toLowerCase().includes(term));
  }, [photos, searchTerm]);

  const hasPhotos = !loading && !error && photos.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-slate-50 to-slate-50 font-sans text-slate-900 antialiased">
      <header className="mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 sm:pt-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          PixelVault
        </h1>
        <p className="mt-3 max-w-xl text-base text-slate-600">
          Browse photos by photographer and save the ones you like. Your
          favourites stay saved when you come back.
        </p>

        <div className="relative mt-8 w-full max-w-xl">
          <label htmlFor="search" className="sr-only">
            Search by author
          </label>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by author name"
            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-24 text-sm shadow-sm placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-100"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1.5 text-xs font-semibold text-violet-700 hover:bg-violet-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              Clear
            </button>
          )}
        </div>

        {hasPhotos && (
          <p className="mt-4 text-sm text-slate-500" aria-live="polite">
            Showing {filteredPhotos.length} of {photos.length} photos
          </p>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        {loading && (
          <div
            className="flex flex-col items-center gap-4 py-24"
            role="status"
            aria-live="polite"
          >
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
            <p className="text-sm font-medium text-slate-600">
              Loading photos…
            </p>
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="mx-auto max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600">
              !
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-900">
              Could not load photos
            </p>
            <p className="mt-1 text-sm text-red-600">{error}</p>
            <p className="mt-3 text-sm text-slate-600">
              Check your internet connection and refresh the page.
            </p>
          </div>
        )}

        {!loading && !error && photos.length === 0 && (
          <p className="py-24 text-center text-slate-600">
            The API returned no photos.
          </p>
        )}

        {hasPhotos && filteredPhotos.length === 0 && (
          <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-900/5">
            <p className="text-lg font-semibold text-slate-900">
              No photos found
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Nothing matches “{searchTerm.trim()}”. Try a different author
              name.
            </p>
          </div>
        )}

        {filteredPhotos.length > 0 && !loading && !error && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}