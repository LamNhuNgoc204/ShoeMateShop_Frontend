import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../helpers/AxiosInstance";

export const getCategoryThunk= createAsyncThunk(
    'category/getCategories',
    async (data, {rejectWithValue}) => {
        try {
            const response = await AxiosInstance().get('/categories/get-categories')
            if(response.status) {
                return response.data;
            } else {
                rejectWithValue(response.message);
            }
        } catch (error) {
            console.log(error.message);
            rejectWithValue(error.message);
        }
    }
)