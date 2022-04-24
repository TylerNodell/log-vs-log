import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

var options = {
    method: 'POST',
    url: 'https://www.fflogs.com/oauth/token',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
        grant_type: 'client_credentials',
        client_id: process.env.FFLOGS_CLIENT_ID,
        client_secret: process.env.FFLOGS_CLIENT_SECRET,
    }
};

const authToken = async () => {
    return await axios(options)
        .then(function (response) {
            // write token to process.env
            process.env.FFLOGS_TOKEN = response.data.access_token;
            return response.data.access_token;
        })
        .catch(function (error) {
            console.log(error);
        });
};


const httpLink = createHttpLink({
    uri: 'https://www.fflogs.com/api/v2/client',
})


const authLink = setContext((_, { headers }) => {
    const token = process.env.TOKEN
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

export default client;
