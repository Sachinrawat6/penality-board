import { BASE_URL } from '../constants/index.js';
import axios from 'axios';
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});
