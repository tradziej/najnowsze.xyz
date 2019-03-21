import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Item from './interfaces/item';

type Response = { status: 'ok' } | { error: string };

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

  public markAsRead(reqConfig?: AxiosRequestConfig) {
    return this.axios.put<Response>('/read', null, reqConfig);
  }
}

export default Api;
