/* Filter + image 통합 test */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDatas } from 'lib/api/data';
import { FilterReduxState } from 'types';

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

const initialState: FilterReduxState = {
  isFilterOpen: false,
  searchQuery: '',
};

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setIsFilterOpen(state, action: PayloadAction<boolean>) {
      state.isFilterOpen = action.payload;
    },
  },
});
export const filterActions = { ...filter.actions };

export default filter;
