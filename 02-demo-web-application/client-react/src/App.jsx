
import {
  QueryClientProvider, QueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CurrentTime } from "./CurrentTime";

import './App.css'

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Hello from docker! 🐳</h1>
      <CurrentTime api="/api/golang/" />
      <CurrentTime api="/api/node/" />
      <CurrentTime api="/api/dotnet/" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App
