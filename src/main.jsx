import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { FlashProvider } from './FlashContext';
import App from "./App.jsx";

import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FlashProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </FlashProvider>
  </StrictMode>,
);
