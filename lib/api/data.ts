import {} from "types";
import axios from "./fileClient";
import elsAxios from "./elsClient";
export const getDatas = () => {
  return axios.get("/api/file/datas");
};

export const fileUpload = (formData: any) => {
  axios.post("/api/file/uploadFiles", formData).then((response) => {
    if (response.data.success) {
      return response.data;
    } else {
      //alert('사진 업로드를 실패했습니다.');
    }
  });
};

// const param = {
//   size: 10,
// };

// [광주시_KT_유동인구];
// //10.1.193.1:3030/api/els/get_ggju_tour_dong

// http: [행정동_공통코드];
// //10.1.193.1:3030/api/els/get_dong_code

// http: [광주시_소비];
// //10.1.193.1:3030/api/els/get_gg_spend

//http://10.1.193.1:3030
export const get_ggju_tour_dong = async () => {
  return axios.post("/api/els/get_ggju_tour_dong");
};

export const get_dong_code = async () => {
  return axios.post("/api/els/get_dong_code");
};

export const get_gg_spend = () => {
  axios.post("/api/els/get_gg_spend").then((response) => {
    if (response.data.success) {
      return response.data;
    } else {
      //alert('사진 업로드를 실패했습니다.');
    }
  });
};

type GetDatasetDataParams = {
  index_name: string;
  size: string;
};
export const getDatasetData = async (params: GetDatasetDataParams) => {
  return elsAxios.post("/api/els/get_els_data", params);
};
