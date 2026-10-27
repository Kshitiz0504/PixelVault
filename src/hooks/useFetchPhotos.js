
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_PHOTOS_API_URL;

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPhotos() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "Unexpected response from the photo API"
          );
        }

        setPhotos(data);
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(err.message || "Something went wrong");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    if (!API_URL) {
      setError("API URL is missing. Check your .env file.");
      setLoading(false);
    } else {
      loadPhotos();
    }

    return () => controller.abort();
  }, []);

  return { photos, loading, error };
}
