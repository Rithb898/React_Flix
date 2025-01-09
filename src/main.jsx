import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./components/ThemeProvider";
import MoviePage from "./pages/MoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SearchResults from "./pages/SearchResults";
import WebSeriesDetailsPage from "./pages/WebSeriesDetailsPage";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='container mx-auto'>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/movie' element={<MoviePage />} />
          <Route path='/movie/:id' element={<MovieDetailsPage />} />
          <Route path='/movie/type/:type' element={<MoviePage />} />
          <Route path="search" element={<SearchResults />} />
          <Route path='/web-series/:id' element={<WebSeriesDetailsPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  </BrowserRouter>
);
