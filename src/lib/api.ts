import axios from 'axios';

export const instance = axios.create({
  baseURL:
    'https://e-32-api.1y8btmri0t69.us-east.codeengine.appdomain.cloud/api/v1',
});
