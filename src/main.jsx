import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/css/app.css";
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink,ApolloProvider } from '@apollo/client';

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('auth_token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoic29meWFuMUBnbWFpbC5jb20iLCJpYXQiOjE2NjYxNDI1NzYsImV4cCI6MTY2NzQzODU3Nn0.Mt9QEbz_-fDyH5M4A30j2GMMLOMQ2iwcR2j8dxT1zWM`}
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache()
});
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
