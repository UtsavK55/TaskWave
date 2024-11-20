import {_delete, _get, _post, _put} from '@network/axiosInstance';
import {ErrorHandler} from '@network/errorHandler';
import {AxiosError} from 'axios';

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

export const updateData = async (url: string) => {
  try {
    const response = await _put(url);
    return response;
  } catch (error) {
    ErrorHandler(error as AxiosError);
  }
};
export const deleteData = async (url: string) => {
  try {
    const response = await _delete(url);
    return response;
  } catch (error) {
    ErrorHandler(error as AxiosError);
  }
};
