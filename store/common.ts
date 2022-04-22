/* Filter + image 통합 test */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState } from 'types';

// export const getDatasThunk = createAsyncThunk(
//   'board/getDatas',
//   // eslint-disable-next-line consistent-return
//   async (_, thunkAPI) => {
//     try {
//       const response = await getDatas();
//       const datas = response.data;
//       return datas;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error.message });
//     }
//   },
// );

const initialState: CommonState = {
  validateMode: false,
  isSidebarOpen: true,
  isMobileSize: false,
  isMobileMenuListOpen: false,
  isMobileWebViewOpen: false,
  isContentsFullPage: false,
  webviewPage: '',
  myPageTabKey: '1',

  page1: 0,
  page2: 0,
  page3: 0
};

const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setPage1(state, action: PayloadAction<number>) {
      state.page1 = action.payload;
    },
    setPage2(state, action: PayloadAction<number>) {
      state.page2 = action.payload;
    },
    setPage3(state, action: PayloadAction<number>) {
      state.page3 = action.payload;
    },

    setMyPageTabkey(state, action: PayloadAction<string>) {
      state.myPageTabKey = action.payload;
    },
    setIsMobileSize(state, action: PayloadAction<boolean>) {
      state.isMobileSize = action.payload;
    },
    setWebviewPage(state, action: PayloadAction<string>) {
      state.webviewPage = action.payload;
    },
    setIsSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
    setIsMobileMenuListOpen(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.isMobileMenuListOpen = action.payload;
        return;
      }
      state.isMobileMenuListOpen = !state.isMobileMenuListOpen;
    },
    setContentFullpage(state, action: PayloadAction<boolean>) {
      state.isContentsFullPage = action.payload;
    },

    setIsMobileWebViewOpen(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.isMobileWebViewOpen = action.payload;
        return;
      }
      state.isMobileWebViewOpen = !state.isMobileWebViewOpen;
    }
  },
  extraReducers(builder) {
    /*------------------------------------------------------ */
    // builder.addCase(getDatasThunk.pending, (state) => {
    //   state.isDatasDone = false;
    //   state.isDatasError = null;
    //   state.datas = [];
    // });
    // builder.addCase(
    //   getDatasThunk.fulfilled,
    //   (state, action: PayloadAction<GetDatasRes>) => {
    //     state.isDatasDone = true;
    //     state.isDatasError = null;
    //     state.datas = action.payload.cardList;
    //   }
    // );
    // builder.addCase(getDatasThunk.rejected, (state, action) => {
    //   state.isDatasDone = false;
    //   state.isDatasError = action.error.message;
    //   state.datas = [];
    // });
  }
});
export const commonActions = { ...common.actions };

export default common;
