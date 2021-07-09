import axios from 'axios';

export const instance = axios.create({
  baseURL: "https://videoLibraryBackend.shubambhasin.repl.co",
});