// Create a nextjs endpoint to get the data from the FFLogs API
// Initialize a Apollo client to connect to the FFLogs API v2
// Use client credentials oauth2 to get a token

// import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: 'https://www.fflogs.com/api/v2/client',
})

const getAccessToken = () => {
  return fetch('https://www.fflogs.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.FFLOGS_CLIENT_ID,
      client_secret: process.env.FFLOGS_CLIENT_SECRET,
    }),
  })
      .then(res => res.json())
      .then(json => json.access_token);
}

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists else get it from getAccessToken
  const token = localStorage.getItem('token') || getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    }
  }
})



// initialize the apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  });





export default function logs(req, res) {

}