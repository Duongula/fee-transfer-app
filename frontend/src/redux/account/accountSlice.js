import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getAccount = createAsyncThunk("account/getAccount", async (_, thunkAPI) => {
    try {
        const res = await fetch('/account')
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const getUniversities = createAsyncThunk("account/getUniversities", async (_, thunkAPI) => {
    try {
        const res = await fetch('/account/get-account-uni');
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
});

const initialState = {
    account: {},
    universities: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}


const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAccount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.account = action.payload;
            })
            .addCase(getAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUniversities.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUniversities.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.universities = action.payload;
            })
            .addCase(getUniversities.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
})

export const { reset } = accountSlice.actions;
export default accountSlice.reducer;