import axios from 'axios';
import Toast from 'react-native-toast-message';
import { zg2uni } from '../utils';

const apiHelper = axios.create({
  baseURL: process.env.HOST_NAME,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiHelper.interceptors.request.use(
  async (config) => {
    try {
      //   const token = await AsyncStorage.getItem("authToken");
      //   if (token) {
      //     config.headers.Authorization = `Bearer ${token}`;
      //   }
      console.log('Request Config:', config.url);
      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);


apiHelper.interceptors.response.use(
  (response) => {
    console.log('Response Data:', response.data);
    return response;
  },
  async (error) => {
    console.error('Response Error:', error);

    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        Toast.show({
          type: 'error',
          text1: 'Unauthorized',
          text2: 'Please log in again.',
        });

        // Optional: Clear tokens and redirect to login screen
        // await AsyncStorage.removeItem("authToken");
        // Navigate to login (adjust based on your navigation setup)
        // navigation.navigate("Login");
      } else if (status === 500) {
        Toast.show({
          type: 'error',
          text1: 'Server Error',
          text2: 'Something went wrong on the server.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: zg2uni(data?.message) || 'An error occurred.',
        });
      }
    }

    return Promise.reject(error);
  },
);

export default apiHelper;
