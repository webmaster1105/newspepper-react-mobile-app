import { get } from '@/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// export interface News {
//   id:number,
//   name:string,
//   content:string,
// }

// export interface NewsList extends Array<News>{}

// Async thunks
export const fetchNews = createAsyncThunk('fetchNews', async (url:string) => {
  const response = await get(url);
  return response.data;
});

export const fetchNewsNextPage = createAsyncThunk('fetchNewsNextPage', async (url:string) => {
  const response = await get(url);
  return response.data;
});

// const initialState:any= []

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    items: [],
    loading: false,
    error: "",
    nextPageUrl:""
  },
  reducers: {
    resetNews: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items = []
    },
  },
     extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.nextPageUrl = action.payload.next_page_url

      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(fetchNewsNextPage.fulfilled, (state, action) => {
        state.items.push(...action.payload.data);
        state.nextPageUrl = action.payload.next_page_url

      });
  }
  
})

// Action creators are generated for each case reducer function
export const { resetNews} = newsSlice.actions

export default newsSlice.reducer