import {AxiosError} from 'axios';
import {_get, _post} from '@network/axiosInstance';
import {ErrorHandler} from '@network/errorHandler';

export const fetchData = async (url: string, config?: {}) => {
  try {
    const response = await _get(url, config);
    return response?.data;
  } catch (error) {
    ErrorHandler(error as AxiosError);
  }
};

export const addData = async (url: string) => {
  try {
    const response = await _post(url);
    return response;
  } catch (error) {
    ErrorHandler(error as AxiosError);
  }
};
