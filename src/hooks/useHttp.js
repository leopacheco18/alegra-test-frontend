import { useState } from "react";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const requestPost = async ( path, data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        backendUrl  + path,
        data,
        { headers: headers }
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      return error;
    }
  };

  
  const requestGet = async (path, customHeaders) => {
    try {
      setIsLoading(true);
      let headersToSend = {
        ...headers,
        ...customHeaders
      }
      const response = await axios.get(
        backendUrl + path,
        { headers: headersToSend }
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      return error;
    }
  };


  return { isLoading, requestPost, requestGet };
};

export default useHttp;
