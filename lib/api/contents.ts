import axios from 'axios';

// API 호출
export const getContents = async (url: string) => {
  const { data } = await axios.get(url);
  return data.data;
};
