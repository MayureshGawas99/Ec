import { createSlice } from "@reduxjs/toolkit";

const boughtSlice =  createSlice({
    name:"bought",
    initialState:{
        value:[]
    },
    reducers:{
        addToBought(state,action){
            const {product,quantity=1,date} = action.payload;
            const existingItem = state.value.find(({product:prod})=> prod.id === product.id)
            if (existingItem){
                existingItem.quantity += quantity;
            }else{
                state.value.push(action.payload);
            }
        },
        removeFromBought(state,action){
            const {product} = action.payload;
            const index = state.value.findIndex(({product:prod})=> prod.id === product.id);
            if (index>-1){
                const existingItem = state.value[index];
                if (existingItem.quantity === 1){
                    state.value.splice(index,1);
                }else{
                    existingItem.quantity -= 1;
                }
            }
        },
        clearBought(state){
            state.value= [];
        }
    }
});
export const {addToBought,removeFromBought,clearBought} = boughtSlice.actions;
export default boughtSlice.reducer;