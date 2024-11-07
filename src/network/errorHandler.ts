import { AxiosError } from 'axios';
import ShowToast from '@components/showToast';

export const ErrorHandler = (error: AxiosError) => {
  if (error === null) throw new Error('Unrecoverable error! Error is null!');

  if (error.code === 'ERR_NETWORK') {
    ShowToast(
      'error',
      'Network Error',
      'Please check your internet connection and try again.',
    );
    console.log('Connection problems..');
  } else if (error.code === 'ERR_CANCELED') {
    ShowToast(
      'info',
      'Request Canceled',
      'Your request has been canceled. Please try again later.',
    );
    console.log('Connection canceled..');
  }

  if (error?.response) {
    const statusCode = error.response.status;

    if (statusCode === 404) {
      ShowToast(
        'error',
        'Not Found',
        'The requested resource could not be found.',
      );
      console.log('The requested resource does not exist or has been deleted.');
    } else if (statusCode === 401) {
      ShowToast(
        'error',
        'Invalid User',
        'Please log in with correct credentials',
      );
      console.log('Please login to access this resource.');
    } else if (statusCode >= 500) {
      ShowToast(
        'error',
        'Server Error',
        'Oops! Something went wrong on our end. Please try again later.',
      );
      console.log(`Server error: ${statusCode}`);
    } else {
      ShowToast(
        'error',
        'Error',
        `An unexpected error occurred: ${statusCode}.`,
      );
      console.log(`Unexpected error: ${statusCode}`);
    }
  } else if (error.request) {
    ShowToast(
      'error',
      'Request Error',
      'The request was made but no response was received.',
    );
    console.log('In request', error.request);
  } else {
    ShowToast('error', 'Error', `An error occurred: ${error.message}.`);
    console.log('Error', error.message);
  }
};
