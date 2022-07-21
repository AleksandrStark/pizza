import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalPrice: 0,
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},
		removeItem: (state, action) => {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			state.items = state.items.filter((obj) => obj.id !== action.payload);
			state.totalPrice -= findItem.price * findItem.count;
		},

		minusItem: (state, action) => {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem) {
				findItem.count--;
				state.totalPrice -= findItem.price;
			}
		},
		clearItems: (state) => {
			state.totalPrice = 0;
			state.items = [];
		},
	},
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
