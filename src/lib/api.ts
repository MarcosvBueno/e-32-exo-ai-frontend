import axios from 'axios';

export const instance = axios.create({
  baseURL:
    'https://exo-ai-api-dcctg6emdmd4dfd2.canadacentral-01.azurewebsites.net/api/v1',
});
