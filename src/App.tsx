import { ChakraProvider } from "@chakra-ui/react";
import theme from "./chakra/theme";
import "@fontsource/azeret-mono/400.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import CreatePage from "./components/CreatePage";
import HomePage from "./components/HomePage";
import ModalProvider from "./components/ModalProvider";
import Root from "./components/Root";
import HomeProvider from "./components/HomeProvider";

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
      <AuthProvider>
        <ModalProvider>
          <HomeProvider>
            <RouterProvider router={router} />
          </HomeProvider>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ChakraProvider>
);
