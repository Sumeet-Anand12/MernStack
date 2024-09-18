import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { toast } from 'react-toastify';


const initialState = {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
  }

   const userSlice= createSlice({
        name:'user',
        initialState,
        reducers:{
            loginRequest(state, action){
              state.loading=true;
              state.user={};
              state.isAuthenticated=false;
              state.error=null

            },
            loginSuccess(state, action){
              state.loading=false;
              state.user=action.payload;
              state.isAuthenticated=true;
              state.error=null;
            //   state.message = action.payload; 

            },
            loginFailed(state, action){
              state.loading=false;
              state.user={};
              state.isAuthenticated=false;
              state.error=action.payload

            },


            logoutSuccess(state, action){
                state.loading=false;
                state.user=action.payload;
                state.isAuthenticated=false;
                state.error=null;
                state.message = action.payload; 
            },
            logoutFailed(state, action){
                state.loading=false;
                state.user=state.user;
                state.isAuthenticated=state.isAuthenticated;
                state.error=null;
                state.message = action.payload; 
  
            },

            loadUserRequest(state, action) {
              state.loading = true;
              state.isAuthenticated = false;
              state.user = {};
              state.error = null;
            },
            loadUserSuccess(state, action) {
              state.loading = false;
              state.isAuthenticated = true;
              state.user = action.payload;
              state.error = null;
            },
            loadUserFailed(state, action) {
              state.loading = false;
              state.isAuthenticated = false;
              state.user = {};
              state.error = action.payload;
            },
            clearAllErrors(state, action) {
                state.error = null;
                state = state.user;
              },
          
        }
        
  });
   export const login=(email, password)=> async (dispatch)=>{
      dispatch(userSlice.actions.loginRequest());
       try {
           const {data}=await axios.post('api/v1/users/login',{
            email, password
           },
           {
            withCredentials:true, headers:{
                "Content-Type":"application/json"
            }
           }
        );
        dispatch(userSlice.actions.loginSuccess(data.data.user));
        if (data.message) {
            toast.success(data.message);
          }
        dispatch(userSlice.actions.clearAllErrors());
       } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response.data.message));
       }
   }
   
   export const getUser=()=> async (dispatch)=>{
      dispatch(userSlice.actions.loadUserRequest());
       try {
           const {data}=await axios.get('api/v1/users/current-user',
           {
            withCredentials:true, 
           }
        );
        // console.log(data.data.user);
        dispatch(userSlice.actions.loadUserSuccess(data.data.user));
       
        dispatch(userSlice.actions.clearAllErrors());
       } catch (error) {
        // dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
       }
   }
   

  export const logout = () => async (dispatch) => {
    try {
    

      const { data } = await axios.post(
        "api/v1/users/logout",
        { withCredentials: true }
      );
    

      dispatch(userSlice.actions.logoutSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.logoutFailed(error.response.data.message));
    }
  };
  export const clearAllUserErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
  };
  
  // export const { loginRequest, loginSuccess, loginFailed, logoutSuccess, logoutFailed, clearAllErrors } = userSlice.actions;


   export default userSlice.reducer;