# Photo Gallery

A responsive photo gallery built with React, Vite and Tailwind CSS. It fetches 30 photos from the Picsum Photos API, lets you search by author name, and lets you mark favourites that survive a page refresh.

> Built for the Celebrare Frontend React Internship pre-screening assignment.

![Screenshot placeholder](./public/Screenshot1.png)
![Screenshot placeholder](./public/Screenshot2.png)


## Features

- Fetches 30 photos on load, with a loading spinner and an error message
- Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop
- Real-time, case-insensitive search by author (no API call while typing)
- Heart button to add or remove favourites
- Favourites saved in `localStorage` and restored on refresh

## Tech stack

React 19 (functional components + hooks), Vite, Tailwind CSS v4 (`@tailwindcss/vite`), native Fetch API, `localStorage`. No UI component libraries.

## API

`https://picsum.photos/v2/list?limit=30`. Fields used: `id`, `author`, `download_url`.

## Getting started

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173).

Other commands: `npm run build` (production build), `npm run preview` (serve the build).

## Folder structure

```
src/
├── components/
│   ├── Gallery.jsx      # search, useCallback, useMemo, loading/error/grid UI
│   └── PhotoCard.jsx    # one photo, author, heart button
├── context/
│   └── FavouritesContext.jsx  # useReducer + localStorage + Context
├── hooks/
│   └── useFetchPhotos.js      # custom hook: { photos, loading, error }
├── App.jsx
├── main.jsx
└── index.css
```

## How it works

- **`useFetchPhotos`** fetches the photos once on mount, checks `response.ok`, and returns `photos`, `loading` and `error`. An `AbortController` cancels the request on unmount.
- **Favourites reducer** keeps an array of photo IDs. The `TOGGLE_FAVOURITE` action removes the ID if it is present and adds it otherwise, always returning a new array.
- **localStorage**: a lazy initializer reads and validates saved IDs before the first render; a `useEffect` writes the array back whenever it changes. Invalid or missing data falls back to an empty list.
- **`useCallback`** keeps the search handler's function reference stable; **`useMemo`** recomputes the filtered list only when `photos` or `searchTerm` change.

## Author

Kshitiz Shukla · kshitizshukla05@gmail.com · [GitHub](https://github.com/kshitiz0504)
