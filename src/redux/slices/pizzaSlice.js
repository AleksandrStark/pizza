import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
	'users/fetchPizzasStatus',
	async (params) => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get(
			`https://62c8018a8c90491c2cac37d7.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return data;
	}
);

const initialState = {
	status: 'loading', // loading | success | error
	items: [],
};

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems: (state, action) => {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.status = 'loading';
			state.items = [];
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		},
		[fetchPizzas.rejected]: (state, action) => {
			state.status = 'eror';
			state.items = [];
		},
	},
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
