const { createSlice } = require("@reduxjs/toolkit");

export const userSlice = createSlice({
    name:'user',
    initialState:{account:'',status:''},
    reducers:{
        setUser:(state,action)=>{
            state.account = action.payload;
        },
        setUserStatus:(state,action)=>{
            state.status = action.payload;
        }
    }
});

export const {setUser,setUserStatus} = userSlice.actions;