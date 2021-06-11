import axios  from 'axios';  

const api = axios({
    method: 'get',
    url: 'https://o53hpo7bf9.execute-api.us-west-2.amazonaws.com/dev/orders',
  }).then((response) => {
    return response.data;
    
  });
;

export default api;