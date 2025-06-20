import { createSlice } from '@reduxjs/toolkit'
import  Swal  from 'sweetalert2'


const initialState = {
    cartItems: []
  }

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers:{
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id)
            if(!existingItem) {
                state.cartItems.push(action.payload)
                Swal.fire({
                    title: "Product added to the cart successfully",
                    icon: "success",
                    draggable: true,
                    timer: 1000
                  });
            } else(
                Swal.fire({
                    title: "Already added to Cart",
                    text: "Cancel request",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ok"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: "Deleted!",
                        text: "Request cancelled.",
                        icon: "success"
                      });
                    }
                  }) 
            )
        },
        removeFromCart: (state, action) => {
            state.cartItems =  state.cartItems.filter(item => item._id !== action.payload._id)
        },
        clearCart: (state) => {
            state.cartItems = []
        }
    }
  })

  export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
  export default cartSlice.reducer;