import { Modal } from '.';
//* 공통 redux state
export interface CommonState {
  validateMode: boolean;
  isSidebarOpen: boolean;
  isMobileMenuListOpen: boolean;
}

export type DataState = {
  datasNum: number;
  isDatasLoading: boolean;
  isDatasDone: boolean;
  isDatasError: any;
  datas: any[];
  kakaoMap: any;
};

export type ModalReduxState = {
  modal: Modal;
};

export type FilterReduxState = {
  isFilterOpen: boolean;
};
