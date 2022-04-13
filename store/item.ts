/* Filter + image 통합 test */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemReduxState } from 'types';

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

const initialState: ItemReduxState = {};

const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setMyPageTabkey(state, action: PayloadAction<string>) {
      //state.myPageTabKey = action.payload;
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
