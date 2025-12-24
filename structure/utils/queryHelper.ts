import { QueryClient } from "@tanstack/react-query";

const queryHelper = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnReconnect: true,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default queryHelper;
