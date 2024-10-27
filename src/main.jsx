import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TVShowDetail from "@pages/TVShowDetail";
import RootLayout from "@pages/RootLayout";
import HomePage from "@pages/HomePage";
import MovieDetail from "@pages/MovieDetail";
import ModalProvider from "@components/context/ModalProvider";

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
