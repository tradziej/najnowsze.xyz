import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Item from './interfaces/item';

class Api {
  private axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: process.env.API_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public getItems(reqConfig?: AxiosRequestConfig) {
    return this.axios.get<{ items: Item[] }>('/items', reqConfig);
  }
}

export default Api;
