import axios from 'axios';
import config from 'config';


const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


export interface UploadImageResponse {
  fileName: string;
  expirationDate: string;
  imageUrl: string;
}

export const uploadImage = async (formData: FormData): Promise<UploadImageResponse> => {
  const response = await axiosInstance.post<UploadImageResponse>('/v1/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export default axiosInstance;