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
import App from './App';
import './index.css';

const errorLink = onError(({ networkError }) => {
  if (networkError) {
    console.error('GraphQL error:', networkError?.message);
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://beta.pokeapi.co/graphql/v1beta" })
]);

//Create Apollo client
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </React.StrictMode>
)
