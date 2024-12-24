import {createSlice} from "@reduxjs/toolkit"

export const  Slice=createSlice({
    name:"user",
    initialState:{
       users:null,
       role:localStorage.getItem('role') || null,
       auth: localStorage.getItem('auth') || false,
    },reducers:{
        setAuth:(state,action)=>{
            state.auth = action.payload;
        },
        setUsers:(state,action)=>{
            state.users=action.payload;
        }  , clearUsers: (state) => {
            state.users = null; // Clear the user state
        },
        removeAuth: (state) => {
            state.auth = false;
          },
        setRole:(state,action)=>{
            state.role=action.payload
        }

    }
})

export const {setUsers,clearUsers,setRole,setAuth,removeAuth}=Slice.actions;
export default Slice.reducer;