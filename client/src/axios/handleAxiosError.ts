import { AxiosError } from 'axios';

const handleAxiosError = (e: unknown) => {
  if (e instanceof AxiosError && e.response) {
    return {
      ...e.response.data,
      statusCode: e.response.status,
    };
  }

  return {
    status: 'error',
    message: 'Something went wrong',
    statusCode: 500,
  };
};

export default handleAxiosError;
