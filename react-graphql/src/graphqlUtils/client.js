import { toast } from "react-toastify";

const reqHeaders = new Headers();
const graphqlAPIEndpoint = 'http://localhost:4000/';
reqHeaders.append("Content-Type", "application/json");
const getRequestOptions = ({query = '', variables = {}})=>({
  method: 'POST',
  headers: reqHeaders,
  body: JSON.stringify({query, variables}),
  redirect: 'follow'
});

const graphqlAPIClient = ({query, variables})=> {
    return fetch(graphqlAPIEndpoint, getRequestOptions({query, variables}))
        .then(res =>{
            return res.json();
        })
        .catch(error => {
            toast.error('network call failed.');
            console.log('error', error)
        });
}

export default graphqlAPIClient;