import axios from "axios";
import Toast from "react-native-toast-message";
import { zg2uni } from "../utils";

const baseURL = (process.env.EXPO_PUBLIC_API_URL ?? "")
  .trim()
  .replace(/\/$/, "");

if (!baseURL) {
  console.warn("EXPO_PUBLIC_API_URL is not set. API requests will fail.");
}

const apiHelper = axios.create({
  baseURL: baseURL || undefined,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiHelper.interceptors.request.use(
  async (config) => {
    try {
      const fullUrl = config.baseURL
        ? `${config.baseURL}${config.url}`
        : config.url;
      console.log("Request:", config.method?.toUpperCase(), fullUrl);
      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  },
);

apiHelper.interceptors.response.use(
  (response) => {
    console.log("Response Data:", response.data);
    return response;
  },
  async (error) => {
    console.error("Response Error:", error?.message ?? error);
    if (error.code === "ECONNABORTED") {
      Toast.show({
        type: "error",
        text1: "Timeout",
        text2: "Request took too long.",
      });
    } else if (error.code === "ERR_NETWORK" || !error.response) {
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2:
          "Cannot reach server. Check your connection and that the API is running.",
      });
    } else if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        Toast.show({
          type: "error",
          text1: "Unauthorized",
          text2: "Please log in again.",
        });

        // Optional: Clear tokens and redirect to login screen
        // await AsyncStorage.removeItem("authToken");
        // Navigate to login (adjust based on your navigation setup)
        // navigation.navigate("Login");
      } else if (status === 500) {
        Toast.show({
          type: "error",
          text1: "Server Error",
          text2: "Something went wrong on the server.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: zg2uni(data?.message) || "An error occurred.",
        });
      }
    }

    return Promise.reject(error);
  },
);

export default apiHelper;
