import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import TVShowDetail from "@pages/TVShowDetail";
import RootLayout from "@pages/RootLayout";
// import HomePage from "@pages/HomePage";
// import MovieDetail from "@pages/MovieDetail";
import ModalProvider from "@components/context/ModalProvider";
// import SearchPage from "@pages/SearchPage";
// import PeoplePage from "@pages/PeoplePage";

const HomePage = lazy(() => import("@pages/HomePage"));
const TVShowDetail = lazy(() => import("@pages/TVShowDetail"));
const MovieDetail = lazy(() => import("@pages/MovieDetail"));
const PeoplePage = lazy(() => import("@pages/PeoplePage"));
const SearchPage = lazy(() => import("@pages/SearchPage"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "tv/:id",
        element: <TVShowDetail />,
      },
      {
        path: "people/:id",
        element: <PeoplePage />,
        loader: async ({ params }) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/person/${params.id}?append_to_response=combined_credits`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
              },
            },
          );
          return res;
        },
      },
      {
        path: "search/",
        element: <SearchPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </StrictMode>,
);
