import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../../components/utils/calcTotalPrice';
import { getCartFromLS } from '../../../components/utils/getCartFromLS';
import { CartItem, CartSliceState } from './types';

const initialState: CartSliceState = getCartFromLS();

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<CartItem>) => {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}
			state.totalPrice = calcTotalPrice(state.items);
		},
		removeItem: (state, action: PayloadAction<string>) => {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			state.items = state.items.filter((obj) => obj.id !== action.payload);
			if (findItem) state.totalPrice -= findItem.price * findItem.count;
		},

		minusItem: (state, action: PayloadAction<string>) => {
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
