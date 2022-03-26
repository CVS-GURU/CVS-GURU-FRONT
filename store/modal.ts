import { createSlice } from '@reduxjs/toolkit';
import { ModalReduxState } from 'types';

const initialState: ModalReduxState = {
  modal: {
    open: false,
    type: 'check',
    title: '',
    message: '',
    subMessage: '',
    confirmButtonMessage: '확인',
    cancelButttonMessage: '취소',
    isNeedBackgroundClickBlock: false,
    isToast: false,
    isMultipleLayer: false,
    multipleLayerType: '',
    className: '',
    confirmFunction: null,
    cancelFunction: null,
  },
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal(state, action) {
      state.modal = { ...state.modal, ...action.payload };
    },
    openModal(state) {
      state.modal.open = true;
    },
    closeModal(state) {
      state.modal.open = false;
    },
    initModal(state) {
      state.modal.open = false;
      state.modal.type = 'check';
      state.modal.title = '';
      state.modal.message = '';
      state.modal.subMessage = '';
      state.modal.confirmButtonMessage = '확인';
      state.modal.cancelButttonMessage = '취소';
      state.modal.isNeedBackgroundClickBlock = false;
      state.modal.isToast = false;
      state.modal.isMultipleLayer = false; //모달에서 또 모달을 띄워야 할 때 사용
      state.modal.multipleLayerType = ''; //모달에서 또 모달을 띄워야 할 때 사용
      state.modal.className = '';
      state.modal.confirmFunction = null;
      state.modal.cancelFunction = null;
    },
  },
});

export const modalActions = { ...modal.actions };
export default modal;
