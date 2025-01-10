import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./components/ThemeProvider";
import MoviePage from "./pages/MoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SearchResults from "./pages/SearchResults";
import WebSeriesDetailsPage from "./pages/WebSeriesDetailsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebSeriesPage from "./pages/WebSeriesPage";
import TypePage from "./pages/TypePage";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/movie" element={<MoviePage />} />
            <Route path="/web-series" element={<WebSeriesPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/type/:type" element={<TypePage />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="/web-series/:id" element={<WebSeriesDetailsPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
