import axios from 'axios';

export const getStatusAPI = async () => {
  const response = await axios.get('http://localhost:4000/api/check');
  return response.data;
};
