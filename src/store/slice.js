import {createSlice} from "@reduxjs/toolkit"

export const  Slice=createSlice({
    name:"user",
    initialState:{
       users:null,
       all:null
    },reducers:{
        setUsers:(state,action)=>{
            state.users=action.payload;
        }  , clearUsers: (state) => {
            state.users = null; // Clear the user state
        },
        setAllUsers:(state,action)=>{
            state.all=action.payload
        }

    }
})

export const {setUsers,clearUsers,setAllUsers}=Slice.actions;
export default Slice.reducer;