import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    userId: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartUserId: (state, action) => {
            const userId = action.payload;
            state.userId = userId;
            const savedCart = localStorage.getItem(`snitch_cart_${userId}`);
            state.items = savedCart ? JSON.parse(savedCart) : [];
        },
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            if (state.userId) {
                localStorage.setItem(`snitch_cart_${state.userId}`, JSON.stringify(state.items));
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            if (state.userId) {
                localStorage.setItem(`snitch_cart_${state.userId}`, JSON.stringify(state.items));
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item._id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
            if (state.userId) {
                localStorage.setItem(`snitch_cart_${state.userId}`, JSON.stringify(state.items));
            }
        },
        clearCartState: (state) => {
            state.items = [];
            state.userId = null;
        },
        clearPersistentCart: (state) => {
            if (state.userId) {
                localStorage.removeItem(`snitch_cart_${state.userId}`);
            }
            state.items = [];
        }
    }
});

export const { setCartUserId, addItem, removeItem, updateQuantity, clearCartState, clearPersistentCart } = cartSlice.actions;
export default cartSlice.reducer;
