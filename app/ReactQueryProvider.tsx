"use client";

import { useState, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: JSX.Element | JSX.Element[] | string | string[] | ReactNode;
  debug?: boolean;
};

export default function ReactQueryProvider(props: Props) {
  const { children, debug = false } = props;
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {debug && <ReactQueryDevtools initialIsOpen={true} />}
      {children}
    </QueryClientProvider>
  );
}
