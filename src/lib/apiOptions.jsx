export const apiOptions = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization:
      `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};
