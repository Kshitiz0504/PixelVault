import { useFavourites } from "../context/FavouritesContext.jsx";

export default function PhotoCard({ photo }) {
  const { favourites, dispatch } = useFavourites();
  const isFavourite = favourites.includes(String(photo.id));

  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-900/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-violet-900/10">
      <div className="relative overflow-hidden">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="aspect-[4/3] w-full bg-violet-100 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={() =>
            dispatch({ type: "TOGGLE_FAVOURITE", payload: photo.id })
          }
          aria-pressed={isFavourite}
          aria-label={
            isFavourite
              ? `Remove ${photo.author}'s photo from favourites`
              : `Add ${photo.author}'s photo to favourites`
          }
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur transition active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
            isFavourite
              ? "bg-violet-600 text-white"
              : "bg-white/85 text-slate-500 hover:bg-white hover:text-violet-600"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill={isFavourite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3 px-4 py-3.5">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700"
        >
          {photo.author.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {photo.author}
          </p>
          <p className="text-xs text-slate-500">Photographer</p>
        </div>
      </div>
    </article>
  );
}