import axios from 'axios';

// API 호출
export const getContents = async (url: string) => {
  const { data } = await axios.get(encodeURI(url));
  return data.data;
};

export const getContentsDetail = async (url: string) => {
  const { data } = await axios.get(encodeURI(url));
  return data.data;
};
