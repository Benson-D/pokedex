import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  from, 
  HttpLink
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

// Define an errorLink that logs any GraphQL network errors to the console
const errorLink = onError(({ networkError }) => {
  if (networkError) {
    console.error('GraphQL error:', networkError?.message);
  }
});

// Create a link that combines the errorLink and a new HttpLink with the PokeAPI endpoint
const link = from([
  errorLink,
  new HttpLink({ uri: "https://beta.pokeapi.co/graphql/v1beta" })
]);

//Create Apollo client with the link and an in-memory cache
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

// Create client 
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>
)
