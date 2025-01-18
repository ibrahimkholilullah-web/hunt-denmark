import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import router from "./Router/router";
import AuthProvider from "./Components/AuthProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from 'react-helmet-async';


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <HelmetProvider>
    <RouterProvider router={router} />
    </HelmetProvider>
    <Toaster></Toaster>
    </QueryClientProvider>
     
    </AuthProvider>
  </React.StrictMode>
);
