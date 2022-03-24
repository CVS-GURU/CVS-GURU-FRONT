/* Filter + image 통합 test */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDatas } from 'lib/api/data';
import { DataState, GetDatasRes } from 'types';

export const getDatasThunk = createAsyncThunk(
  'board/getDatas',
  // eslint-disable-next-line consistent-return
  async (_, thunkAPI) => {
    try {
      const response = await getDatas();
      const datas = response.data;
      return datas;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

const initialState: DataState = {
  datasNum: 0,
  isDatasLoading: false,
  isDatasDone: false,
  isDatasError: false,
  datas: [],
};

const data = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setDirection(state, action: PayloadAction<number>) {
      state.datasNum = action.payload;
    },
  },
  extraReducers(builder) {
    /*------------------------------------------------------ */
    builder.addCase(getDatasThunk.pending, (state) => {
      state.isDatasDone = false;
      state.isDatasError = null;
      state.datas = [];
    });

    builder.addCase(
      getDatasThunk.fulfilled,
      (state, action: PayloadAction<GetDatasRes>) => {
        state.isDatasDone = true;
        state.isDatasError = null;
        state.datas = action.payload.cardList;
      },
    );

    builder.addCase(getDatasThunk.rejected, (state, action) => {
      state.isDatasDone = false;
      state.isDatasError = action.error.message;
      state.datas = [];
    });
  },
});
export const dataActions = { ...data.actions };

export default data;
