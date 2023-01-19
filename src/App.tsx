import { ChakraProvider } from "@chakra-ui/react";
import theme from "./chakra/theme";

// Fonts
import "@fontsource/azeret-mono/400.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CreatePage from "./components/CreatePage";
import HomePage from "./components/HomePage";
import ModalProvider from "./components/ModalProvider";
import Root from "./components/Root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="create" element={<CreatePage />} />
    </Route>
  )
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </QueryClientProvider>
  </ChakraProvider>
);
