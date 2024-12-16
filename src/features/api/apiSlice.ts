import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../../store/store";

export const apiSlice = createApi({
    reducerPath : 'api',
    baseQuery : fetchBaseQuery(
        { baseUrl : "http://192.168.29.215:3300",
           prepareHeaders :  (headers, {getState}) =>{
                const token = (getState() as RootState).auth.token;

                if(token){
                    headers.set('Authorization', `Bearer ${token}`);
                }
                return headers;
           }
        }),

        endpoints : (builder) => ({
            // first type in the mutation typedef is response type and the second one is requestbodytype
            login : builder.mutation<{ id : string ; username : string ; token : string; message : string } , { username : string ; password : string }>({
                query : (credentials) => ({
                    url : '/auth/login',
                    method : 'POST',
                    body : credentials
                })
            }),

        }),
});

export const { useLoginMutation } = apiSlice;
export default apiSlice;