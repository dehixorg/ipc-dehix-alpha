// apiService.jsx
import { Api_Methods } from '../utils/common/enum'; // Importing Api_Methods

import { axiosInstance } from '../lib/axiosinstance';

export const apiService = async ({
  method,
  endpoint,
  body = null,
  params = {},
}) => {
  try {
    let response;
    switch (method) {
      case Api_Methods.GET:
        response = await axiosInstance.get(endpoint, { params });
        break;
      case Api_Methods.POST:
        response = await axiosInstance.post(endpoint, body, { params });
        break;
      case Api_Methods.PUT:
        response = await axiosInstance.put(endpoint, body, { params });
        break;
      case Api_Methods.DELETE:
        response = await axiosInstance.delete(endpoint, { params });
        break;
      case Api_Methods.PATCH:
        response = await axiosInstance.patch(endpoint, body, { params });
        break;
      default:
        throw new Error(`Unsupported request method: ${method}`);
    }

    return {
      success: response.status >= 200 && response.status < 400,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      data: error.response ? error.response.data : error.message,
    };
  }
};
