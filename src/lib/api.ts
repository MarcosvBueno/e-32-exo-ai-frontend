import axios from 'axios';


const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
export const instance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
