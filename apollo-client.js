import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
    uri: 'https://www.fflogs.com/api/v2/client',
})


const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists else get it from getAccessToken
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NWNlZTViMC01MWViLTQ2ODgtYmRjZi1lN2NjMmI4YzgwOWQiLCJqdGkiOiJhOWU5YzE1YWE1NTZmYTk4NGMzMTkxMzhmNDNiOTZlNzhlODkyMmQwZmE1ZDZmMGFiZGU4NzZkZmZlNzJkMDc5ZTFlNzRlMjQ5ODE1MmFiZiIsImlhdCI6MTY0ODk0NDQ5NC41MDYyOTcsIm5iZiI6MTY0ODk0NDQ5NC41MDYzLCJleHAiOjE2NTkzMTI0OTQuNDk4OTQxLCJzdWIiOiIiLCJzY29wZXMiOlsidmlldy11c2VyLXByb2ZpbGUiLCJ2aWV3LXByaXZhdGUtcmVwb3J0cyJdfQ.ptnHLAOHPHePRfJuAcOaW6bybDg7dowYjlrPqi21rB5iOB_DshpYdNwSDqiKl-TXCmEoJsCD_PujqQdEiv3JxY2RJcq4iq3o8HLThpIqc1GrYR7j7Jc94OnpRIZCIBj_5gmPlBZl-nfP2HlcCaLYfuVicP3Q6OMWwLLkYa5FQmy1fFlBL-ldfdpYkc3eMzIjfVEPYjDVsj8VbE1WjfSnNNsFFEAx_k9Vo36IH32MxbnvVv8_HOXXI7ZYNfoeYgzw98r16AgRbrQFSILjsG_bIgwKACn-yekMEpnYRXi2NmQVx2LkaT_e4BZWt7yBh4Ag3ZomPGiaM9rJudAFKcv87g-Gp1sSCvWiDn1Z5Re9uD8GLvZaLZWpKcP4PNwhDWItyGZs1dPWd4ozYvaLb04IuTovDLDVrSPdEQ-oxcmzJ7pewVkv8lUhSNRm161tTkOb75TAJ6vmqbhaXKcP-_vUkzSWr70zECgNZ94wBfEaaFUgGITC0Xxc05NhK5GwS42fJPCXhiT60PazhvU0tMbs53vIXPIpz8F_dp2T_HineBgd8VmbGOKxao0NZEZ7NRFEUuUrnGwsvgomLMhrsPvuVG30FflK5nyruXnSqU8G2mAzAZXDVojCepfLdegFCnF-P2pvniSNQDNH--14VsmKn-6cvxkIvSWxdPG-6xY3pgU";
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
