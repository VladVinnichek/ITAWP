import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    deliveryMethod: 'pickup',
    paymentMethod: 'cash',
    address: ''
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    setDeliveryMethod: (state, action) => {
      state.deliveryMethod = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity,
  setDeliveryMethod,
  setPaymentMethod,
  setAddress,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;